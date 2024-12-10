import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input-admin";
import { Textarea } from "@/components/ui/textarea-admin";
import { useMutation } from "@tanstack/react-query";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";
import { HiPlusCircle, HiTrash } from "react-icons/hi2";
import ErrorMessageForm from "../error-message-form";
import { postDinas } from "@/lib/networks/dinas";

// schema for login form
const schema = z.object({
  title: z.string().min(1, "Nama dinas wajib diisi"),
  slug: z.string().min(1, "Isi nama dinas terlebih dahulu"),
  desc: z.string().min(1, "Deskripsi dinas wajib diisi"),
  img: z.instanceof(FileList).refine(
    (fileList) => {
      return (
        fileList.length > 0 &&
        Array.from(fileList).every(
          (file) => file.type === "image/png" || file.type === "image/jpeg",
        )
      );
    },
    {
      message:
        "Semua file harus berupa gambar dengan format PNG atau JPEG dan tidak boleh kosong",
    },
  ),
  divisi: z.array(z.string().min(1, "Nama divisi wajib diisi")).optional(),
});
export type FormFields = z.infer<typeof schema>;

export default function DinasCreate({ setIsLoadingForm, isLoadingForm }: any) {
  const [slugDinas, setDinasSlug] = useState("");

  // use form import
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      divisi: [], // Default kosong, bisa ditambahkan jika perlu
    },
  });

  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: "divisi",
  });

  // form action
  const { mutate: postForm } = useMutation({
    mutationFn: (data: FormFields) => postDinas(data),
    onSuccess: () => {
      toast.success("Data berhasil ditambahkan.");
      setIsLoadingForm(false);
      reset();
    },
    onError: () => {
      toast.error("Periksa kembali data anda.");
      setIsLoadingForm(false);
    },
  });

  function onSubmit(data: FormFields) {
    setIsLoadingForm(true);
    postForm(data);

    //data image ga kebaca di service dinas.ts tapi kebaca di onsubmit
  }

  return (
    <>
      <h2 className="mb-5">Input Data</h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Nama Dinas, ex: Akademik"
          id="title"
          {...register("title")}
          onChange={(e) => {
            const slug = e.target.value.toLowerCase().replace(/\s+/g, "_");
            setDinasSlug(slug);
            setValue("slug", slug);
          }}
        />
        {errors.title?.message && (
          <ErrorMessageForm message={errors.title.message} />
        )}

        <Input
          placeholder="slug"
          id="slug"
          {...register("slug")}
          disabled
          value={slugDinas}
        />
        {errors.slug?.message && (
          <ErrorMessageForm message={errors.slug.message} />
        )}

        <Textarea
          placeholder="Deskripsi Dinas"
          id="desc"
          {...register("desc")}
        />
        {errors.desc?.message && (
          <ErrorMessageForm message={errors.desc.message} />
        )}

        <div className="flex flex-row items-center gap-5">
          <label className="text-nowrap text-sm">
            Upload Gambar (jpeg/png)
          </label>
          <Input
            type="file"
            className="border-2"
            accept="image/png, image/jpeg"
            id="img"
            {...register("img")}
          />
        </div>
        {errors.img?.message && (
          <ErrorMessageForm message={errors.img.message} />
        )}

        <hr />
        {fields.map((field, index) => (
          <div className="flex flex-row gap-3">
            <Controller
              name={`divisi.${index}`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={`Divisi ${index + 1}, ex: Lorem Ipsum`}
                />
              )}
            />
            <button type="button" onClick={() => remove(index)}>
              <HiTrash />
            </button>
            {errors.divisi?.[index] && (
              <ErrorMessageForm message={errors.divisi[index]?.message} />
            )}
          </div>
        ))}
        <div
          className="flex w-fit cursor-pointer flex-row items-center gap-2 rounded-md bg-gray-100 p-2 px-4 hover:bg-gray-200"
          onClick={() => append("")}
        >
          <HiPlusCircle /> Tambah Divisi
        </div>

        <Button disabled={isLoadingForm}>Tambah Dinas</Button>
      </form>
    </>
  );
}
