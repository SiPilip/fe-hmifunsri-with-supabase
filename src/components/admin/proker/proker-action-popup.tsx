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
import ProkerUpdate from "./proker-update";
import ProkerDelete from "./proker-delete";

export default function ProkerActionPopup({ data }: any) {
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
              <p>Nama Program</p>
              <p className="mt-2 rounded-md border-[1px] border-gray-300 p-2">
                {data.name}
              </p>
            </div>
            <div>
              <p>Tanggal Pelaksanaan</p>
              <p className="mt-2 rounded-md border-[1px] border-gray-300 p-2">
                {data.date}
              </p>
            </div>
            <div>
              <p>Event Format</p>
              <p className="mt-2 rounded-md border-[1px] border-gray-300 p-2">
                {data.event_format}
              </p>
            </div>
            <div>
              <p>Description</p>
              <p className="mt-2 rounded-md border-[1px] border-gray-300 p-2">
                {data.description}
              </p>
            </div>
            <div>
              <p>Dinas</p>
              <p className="mt-2 rounded-md border-[1px] border-gray-300 p-2">
                {data.dinas}
              </p>
            </div>
            <div>
              <p>Benefits</p>
              <ul className="mt-2 list-disc rounded-md border-[1px] border-gray-300 p-2">
                {data.benefits.map((benefit: any) => (
                  <li className="ml-7">{benefit}</li>
                ))}
              </ul>
            </div>
            <div>
              <p>Assets</p>
              <ul className="mt-2 grid grid-cols-2 rounded-md border-[1px] border-gray-300 p-2">
                {data.assets.map((asset: any, index: any) => (
                  <img
                    src={`https://dmmbmseiwjawuhqpskcp.supabase.co/storage/v1/object/public${asset}`}
                    alt={data.name + " image" + (index + 1)}
                  />
                ))}
              </ul>
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
            <ProkerUpdate dataProker={data} />
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
            <ProkerDelete data={data} />
          </DialogContent>
        </Dialog>
      </PopoverContent>
    </Popover>
  );
}
