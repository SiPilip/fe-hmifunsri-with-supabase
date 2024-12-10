import { supabase } from "../createClient";

export async function postDivisi(itemDivisi: any, dataDinas: any) {
  try {
    const divisiData = {
      slug: itemDivisi.toLowerCase().replace(/\s+/g, "_"),
      title: itemDivisi,
      dinas_slug: dataDinas.slug,
    };

    console.log(itemDivisi);

    const { error } = await supabase.from("divisi").insert(divisiData);

    if (error) throw new Error(error.message);
  } catch (err: any) {
    throw new Error(err);
  }
}
