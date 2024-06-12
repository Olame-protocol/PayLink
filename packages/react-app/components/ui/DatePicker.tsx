import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/utils/utils";

export function DatePicker({ placeholder = "Pick a date" }: { placeholder?: string }) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger className="w-full border-none bg-white/[6%] hover:bg-white/[6%]" asChild>
        <Button variant={"outline"} className={cn("flex w-full justify-between text-left font-normal text-white hover:text-white", !date && "text-gray-300/70")}>
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
          <CalendarIcon className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" className="bg-forest/10 text-forest" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
