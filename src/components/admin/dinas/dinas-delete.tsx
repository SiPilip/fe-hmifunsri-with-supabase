import { deleteProker } from "@/lib/networks/prokerQueries";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function DinasDelete({ data }: any) {
  // delete action
  const { mutate: deleteData } = useMutation({
    mutationFn: () => deleteProker(data.id),
    onSuccess: () => {
      location.reload();
    },
    onError: () => {
      toast.error("Gagal menghapus data anda.");
    },
  });

  return (
    <>
      <h1 className="text-lg font-medium">
        Apakah anda yakin untuk menghapus program kerja ini?
      </h1>
      <p>Nama Proker: {data.name}</p>

      <button
        className="w-fit rounded-md bg-red-600 p-2 px-8 text-white hover:bg-red-700"
        onClick={() => deleteData()}
      >
        Yakin
      </button>
    </>
  );
}
