"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AreaSearchButtonProps {
  showSearchButton: boolean;
  isSearching: boolean;
  onSearchAreaClick: () => void;
}

export default function AreaSearchButton({
  showSearchButton,
  isSearching,
  onSearchAreaClick,
}: AreaSearchButtonProps) {
  if (!showSearchButton) {
    return null;
  }

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-[1000]">
      <Button
        disabled={isSearching}
        onClick={onSearchAreaClick}
        className="bg-white text-black border border-gray-300 shadow-lg hover:bg-gray-100 rounded-full"
      >
        {isSearching ? (
          <span className="flex flex-row items-center gap-2">
            Searching <Loader2 className="animate-spin" />
          </span>
        ) : (
          "Search in this area"
        )}
      </Button>
    </div>
  );
}
