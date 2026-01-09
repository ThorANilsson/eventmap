"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export interface DatePickerProps {
    selectedDate: Date | null;
    onDateChange: (date: Date | null) => void;
}

export function Calendar22({selectedDate, onDateChange}: DatePickerProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 mt-2 text-zinc-100 font-bold size-3">
                DATE: {selectedDate ? selectedDate : null}
            </div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal bg-zinc-900 hover:bg-zinc-100 text-white"
                    >
                        {selectedDate ? selectedDate.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <Button 
                    className={"w-24 justify-between font-normal bg-zinc-900 hover:bg-zinc-100 text-white"}
                    onClick={() => onDateChange(null)}
                >
                    Reset Date
                </Button>
                <PopoverContent className="w-auto overflow-hidden p-0 bg-zinc-900 text-white" align="start">
                    <Calendar
                        mode="single"
                        selected={selectedDate || undefined}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            onDateChange(date || null)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
