import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllProker } from "@/lib/networks/prokerQueries";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { HiEllipsisHorizontalCircle } from "react-icons/hi2";

export default function ProkerList({ isLoadingForm }: any) {
  const {
    isLoading: isLoadingAllProker,
    data: allProker,
    refetch,
    isRefetching,
  } = useQuery({
    queryFn: () => getAllProker(),
    queryKey: ["dataProfileUser"],
  });

  useEffect(() => {
    refetch();
  }, [isLoadingForm]);

  if (isLoadingAllProker || isRefetching) return <p>Loading</p>;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Program</TableHead>
            <TableHead>Dinas</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Online/Offline</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allProker?.map((item) => (
            <TableRow>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.dinas}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell className="text-center">{item.event_format}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <HiEllipsisHorizontalCircle className="text-3xl text-gray-400" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
