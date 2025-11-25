"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JobType } from "@/lib/types/jobType";
import { Input } from "../ui/input";
import { JobStatus } from "@/lib/types/jobStatus";
import { Badge } from "../ui/badge";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  status: JobStatus[];
  isLoggedIn: boolean;
}

const statusBadge = {
  Unchanged: <Badge variant="secondary">Unchanged</Badge>,
  New: (
    <Badge
      variant="secondary"
      className="bg-blue-500 text-white dark:bg-blue-600"
    >
      New
    </Badge>
  ),
  Updated: <Badge>Updated</Badge>,
  Deleted: <Badge variant="destructive">Deleted</Badge>,
};

export function DataTable<TData, TValue>({
  columns,
  data,
  status,
  isLoggedIn = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4 space-x-1 ">
        <Input
          placeholder="Filter job name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Select
          value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
          onValueChange={(value) => {
            if (value === "All") table.getColumn("type")?.setFilterValue(null);
            else table.getColumn("type")?.setFilterValue(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter job type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value={JobType.CHOREOGRAPHER}>
                Choreographer
              </SelectItem>
              <SelectItem value={JobType.DANCER}>Dancer</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={
            (table.getColumn("startDate")?.getFilterValue() as string) ?? ""
          }
          onValueChange={(value) => {
            if (value === "All")
              table.getColumn("startDate")?.setFilterValue(null);
            else table.getColumn("startDate")?.setFilterValue(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter By Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value={"1"}>1 - Jan</SelectItem>
              <SelectItem value={"2"}>2 - Feb</SelectItem>
              <SelectItem value={"3"}>3 - Mar</SelectItem>
              <SelectItem value={"4"}>4 - Apr</SelectItem>
              <SelectItem value={"5"}>5 - May</SelectItem>
              <SelectItem value={"6"}>6 - Jun</SelectItem>
              <SelectItem value={"7"}>7 - Jul</SelectItem>
              <SelectItem value={"8"}>8 - Aug</SelectItem>
              <SelectItem value={"9"}>9 - Sep</SelectItem>
              <SelectItem value={"10"}>10 - Oct</SelectItem>
              <SelectItem value={"11"}>11 - Nov</SelectItem>
              <SelectItem value={"12"}>12 - Dec</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {isLoggedIn && <TableHead>Status</TableHead>}
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {isLoggedIn && (
                    <TableCell> {statusBadge[status[row.index]]} </TableCell>
                  )}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
