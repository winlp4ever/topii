"use client";
import { ColorMode } from "@/app/types/color-mode";
import { ExpandableNode } from "../../../types/graph";
import { NodeTypeColorMapping } from "../../entity/color-mapping";
import React, { memo, useRef } from "react";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import NodeView from "../../entity/node-view";


// Define the GraphNode component as an arrow function with typed props
function GraphNode({ id, data, selected }: NodeProps<ExpandableNode>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isResizingRef = useRef(false);
  const hasResizedRef = useRef(false);
  const aspectRatioRef = useRef<number>(1);

  const { getNode, setNodes, screenToFlowPosition } = useReactFlow();

  const node = getNode(id);
  if (!node) return null;

  const { width, height, position } = node;

  const resizeHandles = [
    { pos: 'top-left', class: 'top-0 left-0 cursor-nwse-resize' },
    { pos: 'top-right', class: 'top-0 right-0 cursor-nesw-resize' },
    { pos: 'bottom-left', class: 'bottom-0 left-0 cursor-nesw-resize' },
    { pos: 'bottom-right', class: 'bottom-0 right-0 cursor-nwse-resize' },
  ];

  const startResize = (e: MouseEvent | TouchEvent, handle: string) => {
    e.preventDefault?.();
    isResizingRef.current = true;
    hasResizedRef.current = true; // We are now resizing manually

    const el = containerRef.current;
    if (!el) return;

    const point = 'touches' in e ? e.touches[0] : e;
    const { x: startX, y: startY } = screenToFlowPosition({ x: point.clientX, y: point.clientY });

    const startWidth = el.offsetWidth;
    const startHeight = el.offsetHeight;
    const startPos = { ...position };

    if (data.lockAspectRatio) {
      aspectRatioRef.current = startWidth / startHeight;
    }

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isResizingRef.current) return;

      const point = 'touches' in e ? e.touches[0] : e;
      const { x: currentX, y: currentY } = screenToFlowPosition({ x: point.clientX, y: point.clientY });

      const deltaX = currentX - startX;
      const deltaY = currentY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startPos.x;
      let newY = startPos.y;

      if (handle.includes('right')) newWidth = startWidth + deltaX;
      if (handle.includes('left')) {
        newWidth = startWidth - deltaX;
        newX += deltaX;
      }
      if (handle.includes('bottom')) newHeight = startHeight + deltaY;
      if (handle.includes('top')) {
        newHeight = startHeight - deltaY;
        newY += deltaY;
      }

      if (data.lockAspectRatio) {
        const ratio = aspectRatioRef.current;
        newHeight = newWidth / ratio;
      }

      const minW = data.minWidth || 50;
      const minH = data.minHeight || 50;
      const maxW = data.maxWidth || Infinity;
      const maxH = data.maxHeight || Infinity;

      newWidth = Math.max(minW, Math.min(newWidth, maxW));
      newHeight = Math.max(minH, Math.min(newHeight, maxH));

      setNodes((nds) =>
        nds.map((n) =>
          n.id === id
            ? {
                ...n,
                width: newWidth,
                height: newHeight,
                position: { x: newX, y: newY },
              }
            : n
        )
      );
    };

    const onEnd = () => {
      isResizingRef.current = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
  };

  const handleDown = (handle: string) => (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startResize(e.nativeEvent, handle);
  };


  // const isSelected = selected === true;

  const nodeViewClassName = 'relative font-handwriting drag-handle pointer-events-auto' + (hasResizedRef.current ? ' max-w-none' : ' max-w-[400px]');

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
      <Handle
        position={Position.Right}
        type="source"
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
      <NodeView
        ref={containerRef}
        style={{ width, height }}
        node={data}
        colorMode={NodeTypeColorMapping[data.type] as ColorMode}
        className={nodeViewClassName}
      >
        {selected && (
          <div className="absolute -inset-1 border border-blue-500 pointer-events-none rounded" />
        )}
      </NodeView>
      {/* Resize Handles */}
      {selected &&
        resizeHandles.map(({ pos, class: posClass }) => (
          <div
            key={pos}
            onMouseDown={handleDown(pos)}
            onTouchStart={handleDown(pos)}
            className={`absolute w-3 h-3 bg-white border border-blue-500 rounded-full ${posClass} z-10`}
            style={{
              transform: `translate(${pos.includes('right') ? '50%' : '-50%'}, ${
                pos.includes('bottom') ? '50%' : '-50%'
              })`,
            }}
          />
        ))
      }
    </>
  );
};

export default memo(GraphNode);