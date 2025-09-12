"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  date,
  onSelect,
  placeholder = "Pick a date",
  className,
  disabled,
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-10 w-full justify-start border px-3 py-2 text-left font-normal",
            "border-input bg-background text-foreground",
            "hover:bg-accent hover:text-accent-foreground",
            "focus:border-primary focus:ring-primary/20 focus:ring-2",
            "dark:border-input dark:bg-background dark:text-foreground",
            "dark:hover:bg-accent dark:hover:text-accent-foreground",
            !date && "text-muted-foreground",
            className,
          )}
          disabled={disabled}
        >
          <CalendarIcon className="text-muted-foreground mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-popover dark:border-border w-auto border p-0 shadow-xl backdrop-blur-sm"
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
