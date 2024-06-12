import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BsThreeDotsVertical } from "react-icons/bs";

function ClientList() {
  return (
    <Table className="bg-white/[6%]">
      <TableHeader className="text-base">
        <TableRow className="border-none bg-green-petrolium hover:bg-green-petrolium">
          <TableHead className="w-64 font-semibold text-forest">Clients</TableHead>
          <TableHead className="w-96 font-semibold text-forest">Email</TableHead>
          <TableHead className="w-64 font-semibold text-forest">Service</TableHead>
          <TableHead className="w-64 font-semibold text-forest">Phone number</TableHead>
          <TableHead className="text-right font-semibold text-forest">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="cursor-pointer border-b border-white/30 text-green-petrolium hover:bg-white/[8%]">
          <TableCell className="font-medium">Derick Zihalirwa</TableCell>
          <TableCell>muhindogali@gmail.com</TableCell>
          <TableCell>Web Developement</TableCell>
          <TableCell>(+256) 7349435363</TableCell>
          <TableCell className="flex items-center justify-center">
            <BsThreeDotsVertical />
          </TableCell>
        </TableRow>
        <TableRow className="cursor-pointer border-b border-white/30 text-green-petrolium hover:bg-white/[8%]">
          <TableCell className="font-medium">Derick Zihalirwa</TableCell>
          <TableCell>muhindogali@gmail.com</TableCell>
          <TableCell>Web Developement</TableCell>
          <TableCell>(+256) 7349435363</TableCell>
          <TableCell className="flex items-center justify-center">
            <BsThreeDotsVertical />
          </TableCell>
        </TableRow>
        <TableRow className="cursor-pointer border border-b border-white/30 text-green-petrolium hover:bg-white/[8%]">
          <TableCell className="font-medium">Derick Zihalirwa</TableCell>
          <TableCell>muhindogali@gmail.com</TableCell>
          <TableCell>Web Developement</TableCell>
          <TableCell>(+256) 7349435363</TableCell>
          <TableCell className="flex items-center justify-center">
            <BsThreeDotsVertical />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default ClientList;
