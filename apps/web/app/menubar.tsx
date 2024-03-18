import { Button } from "@/components/ui/button";
import {
  Cross,
  Maximize,
  Maximize2,
  Minus,
  X,
  createLucideIcon,
} from "lucide-react";

/**
 * Represents the menu bar component for an Electron app.
 * This component is specific to Electron apps.
 */
const MenuBar = () => {
  return (
    <div className="h-full flex justify-between">
      <div></div>
      <div className="flex h-full items-center justify-center">
        <Button size="icon" variant="ghost">
          <Minus className="w-4" />
        </Button>
        <Button size="icon" variant="ghost">
          <Maximize2 className="w-4" />
        </Button>
        <Button size="icon" variant="ghost">
          <X className="w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MenuBar;
