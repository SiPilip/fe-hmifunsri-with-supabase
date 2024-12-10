import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllDinas } from "@/lib/networks/dinas";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function DinasList({ isLoadingForm }: any) {
  const {
    isLoading: isLoadingAllDinas,
    data: allDinas,
    refetch,
    isRefetching,
  } = useQuery({
    queryFn: () => getAllDinas(),
    queryKey: ["dataAllDinas"],
  });

  useEffect(() => {
    refetch();
  }, [isLoadingForm]);

  if (isLoadingAllDinas || isRefetching) return <p>Loading</p>;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Nama Dinas</TableHead>
            <TableHead>Divisi</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Gambar</TableHead>
            {/* <TableHead>Aksi</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allDinas?.map((item, index) => (
            <TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                {item.divisi && item.divisi.length > 0
                  ? item.divisi.map((item) => (
                      <ul className="list-disc pl-5">
                        <li>{item}</li>
                      </ul>
                    ))
                  : "-"}
              </TableCell>
              <TableCell className="line-clamp-2 text-left">
                {item.desc}
              </TableCell>
              <TableCell>{item.img}</TableCell>
              <TableCell>{/* <ProkerActionPopup data={item} /> */}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
