import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";


export interface BaseContextMenuOption {
  label: string;
  onSelect: () => void;
  icon?: React.ReactNode;
}


export interface BaseContextMenuProps {
  wrappedElement: React.ReactNode;
  options: BaseContextMenuOption[];
}


/**
 * BaseContextMenu is a reusable context menu component that wraps an element
 * and provides a set of options that can be selected by the user.
 */
const BaseContextMenu = ({ wrappedElement, options }: BaseContextMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="">
        {wrappedElement}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        {options.map((option, index) => (
          <ContextMenuItem
            key={index}
            className="flex items-center space-x-2"
            onSelect={option.onSelect}
          >
            {option.icon && <span className="mr-2">{option.icon}</span>}
            <span>{option.label}</span>
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  )
}
export default BaseContextMenu;