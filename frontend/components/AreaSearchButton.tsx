"use client";

import { Button } from "@/components/ui/button";

interface AreaSearchButtonProps {
  showSearchButton: boolean;
  onSearchAreaClick: () => void;
}

export default function AreaSearchButton({
  showSearchButton,
  onSearchAreaClick,
}: AreaSearchButtonProps) {
    
  if (!showSearchButton) {
      return null;
  }

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-[1000]">
      <Button
        onClick={onSearchAreaClick}
        className="bg-white text-black border border-gray-300 shadow-lg hover:bg-gray-100 rounded-full"
      >
        Search in this area
      </Button>
    </div>
  );
}