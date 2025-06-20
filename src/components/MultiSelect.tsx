"use client";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import {
    Command,
    CommandInput,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Checkbox } from '@/components/ui/checkbox';

type Option = {
    label: string;
    value: string;
};

type MultiSelectProps = {
    options: Option[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    label?: string;
};

export default function MultiSelect({
    options,
    selected,
    onChange,
    placeholder = "Select...",
    label,
}: MultiSelectProps) {
    const toggleValue = (value: string) => {
        const exists = selected.includes(value);
        const updated = exists
            ? selected.filter((v) => v !== value)
            : [...selected, value];
        onChange(updated);
    };

    return (
        <div className="space-y-2">
            {label && <p className="text-sm font-medium">{label}</p>}
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                        {selected.length > 0
                            ? `${selected.length} selected`
                            : placeholder}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder="Search..." />
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    onSelect={() => toggleValue(option.value)}
                                >
                                    <Checkbox
                                        checked={selected.includes(option.value)}
                                        onCheckedChange={() => toggleValue(option.value)}
                                        className="mr-2"
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
