import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input-admin";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea-admin";
import { updateProker } from "@/lib/networks/prokerQueries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// schema for login form
const schema = z.object({
  name: z.string(),
  date: z.string(),
  event_format: z.string(),
  description: z.string(),
  dinas: z.string(),
  benefits: z.string(),
  assets: z.instanceof(FileList).refine(
    (fileList) => {
      return Array.from(fileList).every(
        (file) => file.type === "image/png" || file.type === "image/jpeg",
      );
    },
    {
      message: "Semua file harus berupa gambar dengan format PNG atau JPEG",
    },
  ),
});
export type FormFields = z.infer<typeof schema>;

export default function ProkerUpdate({ dataProker }: any) {
  // state loading for form
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  // use form import
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  // form action
  const { mutate: postForm } = useMutation({
    mutationFn: (data: FormFields) => updateProker(data, dataProker.id),
    onSuccess: () => {
      location.reload();
      toast.success("Data berhasil ditambahkan.");
      reset();
      setIsLoadingForm(false);
    },
    onError: () => {
      toast.error("Periksa kembali data anda.");
      setIsLoadingForm(false);
    },
  });

  function onSubmit(data: FormFields) {
    setIsLoadingForm(true);
    postForm(data);
  }

  useEffect(() => {
    setValue("event_format", dataProker.event_format);
    setValue("dinas", dataProker.dinas);
  }, []);

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Nama Program Kerja"
          id="name"
          {...register("name")}
          defaultValue={dataProker.name}
        />
        {errors.name?.message && <span>{errors.name.message}</span>}

        <Input
          placeholder="Tanggal Pelaksanaan"
          id="date"
          defaultValue={dataProker.date}
          {...register("date")}
        />
        {errors.date?.message && <span>{errors.date.message}</span>}

        <Select
          onValueChange={(val) => setValue("event_format", val)}
          defaultValue={dataProker.event_format}
        >
          <SelectTrigger>
            <SelectValue placeholder="Online / Offline" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Online">Online</SelectItem>
            <SelectItem value="Offline">Offline</SelectItem>
          </SelectContent>
        </Select>
        {errors.event_format?.message && (
          <span>{errors.event_format.message}</span>
        )}

        <Textarea
          placeholder="Deskripsi Program"
          id="description"
          defaultValue={dataProker.description}
          {...register("description")}
        />
        {errors.description?.message && (
          <span>{errors.description.message}</span>
        )}

        <Select
          onValueChange={(val) => setValue("dinas", val)}
          defaultValue={dataProker.dinas}
        >
          <SelectTrigger>
            <SelectValue placeholder="Dinas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inti">Inti</SelectItem>
            <SelectItem value="kominfo">Kominfo</SelectItem>
            <SelectItem value="akademik">Akademik</SelectItem>
            <SelectItem value="psdm">PSDM</SelectItem>
            <SelectItem value="pmb">PMB</SelectItem>
            <SelectItem value="kwu">Kewirausahaan</SelectItem>
            <SelectItem value="kastrad">
              Kajian Strategis dan Advokasi
            </SelectItem>
            <SelectItem value="adm">Administrasi</SelectItem>
          </SelectContent>
        </Select>
        {errors.dinas?.message && <span>{errors.dinas.message}</span>}

        <Input
          placeholder="Benefits, ex: Benefits1, Benefits2, Benefits3, ..."
          id="benefits"
          defaultValue={dataProker.benefits}
          {...register("benefits")}
        />
        {errors.benefits?.message && <span>{errors.benefits.message}</span>}

        <div className="flex flex-row items-center gap-5">
          <label className="text-nowrap text-sm">
            Upload Gambar (jpeg/png)
          </label>
          <Input
            type="file"
            className="border-2"
            multiple
            placeholder="tes"
            accept="image/png, image/jpeg"
            id="assets"
            {...register("assets")}
          />
        </div>
        {errors.assets?.message && <span>{errors.assets.message}</span>}

        <Button disabled={isLoadingForm}>Ubah Program Kerja</Button>
      </form>
    </>
  );
}
