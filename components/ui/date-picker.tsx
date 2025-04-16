"use client";

import * as React from "react";
import { format, parseISO, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  name: string;
  selected?: string; 
  onSelect?: (date: string) => void;
}

export function DatePickerDemo({ name, selected, onSelect }: DatePickerProps) {
  const [localDate, setLocalDate] = React.useState<Date | undefined>(() => {
    const parsed = selected ? parseISO(selected) : undefined;
    return parsed && isValid(parsed) ? parsed : undefined;
  });

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setLocalDate(selectedDate); 
      if (onSelect) {
        onSelect(format(selectedDate, "yyyy-MM-dd")); 
      }
    }
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal bg-black",
              !localDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {localDate ? format(localDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={localDate}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <input
        type="hidden"
        name={name}
        value={localDate ? format(localDate, "yyyy-MM-dd") : ""}
        required
      />
    </div>
  );
}
