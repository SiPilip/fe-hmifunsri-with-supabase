import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  HiEllipsisHorizontalCircle,
  HiEye,
  HiPencilSquare,
  HiTrash,
} from "react-icons/hi2";

export default function DinasActionPopup({ data }: any) {
  return (
    <Popover>
      <PopoverTrigger>
        <HiEllipsisHorizontalCircle className="text-3xl text-gray-400" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 bg-white p-3 shadow-md">
        <Dialog>
          <DialogTrigger>
            <button className="flex items-center gap-2 p-3 text-left hover:bg-gray-100">
              <HiEye className="text-xl" /> Lihat Lengkap
            </button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
            <div>
              <p>Nama Dinas</p>
              <p className="mt-2 rounded-md border-[1px] border-gray-300 p-2">
                {data?.title}
              </p>
            </div>
            <div>
              <p>Deskripsi Dinas</p>
              <p className="mt-2 rounded-md border-[1px] border-gray-300 p-2">
                {data.desc}
              </p>
            </div>
            <div>
              <p>Divisi</p>
              <p className="mt-2 rounded-md border-[1px] border-gray-300 p-2">
                {data.divisi && data.divisi.length > 0
                  ? data.divisi.map((item: any) => (
                      <ul className="list-disc pl-5">
                        <li>{item}</li>
                      </ul>
                    ))
                  : "-"}
              </p>
            </div>
            <div>
              <p>Logo Dinas</p>
              <img
                src={`https://dmmbmseiwjawuhqpskcp.supabase.co/storage/v1/object/public${data.img}`}
                alt={data.title + " image"}
                className="w-32 border-[1px] border-gray-300 p-2"
              />
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <button className="flex items-center gap-2 p-3 text-left hover:bg-gray-100">
              <HiPencilSquare className="text-xl" /> Ubah Program
            </button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
            {/* <ProkerUpdate dataProker={data} /> */}
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <button className="flex items-center gap-2 p-3 text-left text-red-700 hover:bg-gray-100">
              <HiTrash className="text-xl" />
              Hapus Program
            </button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
            {/* <ProkerDelete data={data} /> */}
          </DialogContent>
        </Dialog>
      </PopoverContent>
    </Popover>
  );
}
