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


const BaseContextMenu: React.FC<BaseContextMenuProps> = ({ wrappedElement, options }) => {
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