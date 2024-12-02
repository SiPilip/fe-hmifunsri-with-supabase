import { useQuery } from "@tanstack/react-query";
import { supabase } from "../createClient";
import { v4 as uuidv4 } from "uuid";

interface ColumnProker {
  name: string | null;
  date: string | null;
  event_format: string | null;
  description: string | null;
  dinas: string | null;
  benefits: any | null;
  assets: any | null;
}

async function postProker(data: any) {
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

export async function getAllProker() {
  try {
    const { data, error } = await supabase
      .from("proker")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data;
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

async function getProkerData() {
  try {
    const { data: fetchedData, error } = await supabase
      .from("proker")
      .select("*");

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      // console.log(fetchedData);
      return fetchedData;
    }
  } catch (err) {
    console.error("Error in fetchData:", err);
  }
}

function useProkerData() {
  const { data } = useQuery<ColumnProker[], Error>({
    queryKey: ["memberQuery"],
    queryFn: () =>
      new Promise<ColumnProker[]>((resolve, reject) => {
        getProkerData()
          .then((res) => {
            if (res) {
              resolve(res);
            } else {
              reject("No data found");
            }
          })
          .catch((err) => {
            reject(err);
          });
      }),
  });

  return data;
}

export { postProker, useProkerData, getProkerData };
export type { ColumnProker };
