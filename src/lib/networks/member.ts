import { supabase } from "../createClient";
import { v4 as uuidv4 } from "uuid";

export async function getAllMember() {
  try {
    const { data, error } = await supabase
      .from("member")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw new Error(error.message);

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function postProker(data: any) {
  try {
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
    const { error } = await supabase.from("proker").insert(processedValues);

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
