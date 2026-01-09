"use client";

import {
    Amphora,
    Music,
    PartyPopper,
    RefreshCcw,
    Trophy
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {Calendar22, DatePickerProps} from "@/components/DatePicker";

// Menu items.
const items = [
    {
        title: "Sport",
        icon: Trophy,
        subCategories: ["Football", "Hockey", "Basketball", "Other"],
    },
    {
        title: "Music",
        icon: Music,
        subCategories: ["Rock", "Metal", "Jazz", "Pop", "Dance/Electronic", "Other"],
    },
    {
        title: "Arts & Theatre",
        icon: Amphora,
        subCategories: ["Comedy", "Spectacular", "Theatre", "Dance", "Other" ],
    },
    {
        title: "Miscellaneous",
        icon: PartyPopper,
        subCategories: ["Food & Drink"],
    },
    {
        title: "All",
        icon: RefreshCcw,
        subCategories: [],
    },
]

export interface SideBarProps {
    selectedCategory: string;
    selectedSubCategory: string;
    onCategoryChange: (category: string) => void;
    onSubCategoryChange: (subCategory: string) => void;
    datePickerProps: DatePickerProps;
}

export function AppSidebar( { selectedCategory, selectedSubCategory, onCategoryChange, onSubCategoryChange, datePickerProps }: SideBarProps ) {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <div className="flex flex-col gap-3 mt-2 mb-1.5 text-zinc-100 font-bold size-3">
                                FILTERS:
                            </div>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} >
                                    <SidebarMenuButton 
                                        onClick={() => onCategoryChange(item.title)}
                                        isActive={selectedCategory === item.title}
                                        tooltip={item.title}
                                    >
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                    {selectedCategory === item.title && item.subCategories.length > 0 && (
                                        <div className="ml-6 mt-1 flex flex-col gap-1" >
                                            {item.subCategories.map((subCategory) => (
                                                <button
                                                    key={subCategory}
                                                    className={`text-left px-3 py-1.5 text-sm rounded-md hover:bg-accent 
                                                                ${selectedSubCategory === subCategory ? "sub-category-active" : "text-zinc-400"}`}
                                                    onClick={() => onSubCategoryChange(subCategory)}
                                                >
                                                    {subCategory}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                        <SidebarMenu>
                            <Calendar22 
                                selectedDate={datePickerProps.selectedDate}
                                onDateChange={datePickerProps.onDateChange}
                            />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}