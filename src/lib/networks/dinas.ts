import { supabase } from "../createClient";
import { v4 as uuidv4 } from "uuid";
import { postDivisi } from "./divisi";

export async function getAllDinas() {
  try {
    const { data, error } = await supabase
      .from("dinas")
      .select("*")
      .order("title", { ascending: true });

    if (error) throw new Error(error.message);

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function postDinas(data: any) {
  try {
    console.log(data);

    let fileName = `${data.slug}_${uuidv4()}`;
    fileName = fileName.replace(" ", "-");

    const { error: uploadError } = await supabase.storage
      .from(`img/dinas`)
      .upload(fileName, data.img);

    if (uploadError) {
      throw new Error(`Gagal upload foto ${data.slug}: ${uploadError.message}`);
    }

    const filePath = `/img/dinas/${data.slug}`;

    // olah data, untuk dimasukin ke supabase
    const processedValues = {
      ...data,
      img: filePath,
    };

    // create data
    const { error } = await supabase.from("dinas").insert(processedValues);

    if (processedValues.divisi.length > 0) {
      await Promise.all(
        processedValues.divisi.map(async (item: any) => {
          await postDivisi(item, processedValues);
        }),
      );
    }

    if (error) throw new Error(error.message);
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function updateProker(data: any, id: any) {
  // keluarin assets, dan inisiasi tempat file gambar
  const assetsArray = Object.values(data.assets);
  const pathImage: any = [];

  // mapping asset array untuk filename
  await Promise.all(
    assetsArray.map(async (file: any) => {
      let fileName = `${data.name}_${uuidv4()}`;
      fileName = fileName.replace(" ", "-");

      const { error: uploadError } = await supabase.storage
        .from(`img/proker/${data.dinas.toLowerCase()}`)
        .upload(fileName, file);

      if (uploadError) {
        throw new Error(
          `Gagal upload foto ${data.name}: ${uploadError.message}`,
        );
      }

      pathImage.push(`/img/proker/${data.dinas.toLowerCase()}/${fileName}`);
    }),
  );

  // olah data, untuk dimasukin ke supabase
  const processedValues = {
    ...data,
    dinas: data.dinas.toLowerCase(),
    benefits: data.benefits
      ? data.benefits.split(",").map((item: any) => item.trim())
      : [],
    assets: pathImage,
  };

  // create data
  const { error } = await supabase
    .from("proker")
    .update(processedValues)
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteProker(id: any) {
  // delete data
  const { error } = await supabase.from("proker").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
