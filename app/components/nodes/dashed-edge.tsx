import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type Edge,
  type EdgeProps
} from '@xyflow/react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';


const DashedEdge: React.FC<EdgeProps<Edge<{ label: string, description: string | null }>>> = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{ strokeDasharray: '5,5', ...style }}
      />
      {
        data && data.label && (
          <EdgeLabelRenderer>
            <div
              className="nodrag nopan absolute origin-center pointer-events-auto"
              style={{
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              }}
            >
              <Popover>
                <PopoverTrigger className='text-xs py-1 px-3 rounded-xl text-pink-600 text-mono bg-pink-50 shadow-md font-semibold hover:bg-pink-100'>{data.label}</PopoverTrigger>
                {
                  data.description && (
                    <PopoverContent className='p-0 bg-popover rounded-xl text-xs shadow-md border bg-stone-100 border-stone-200 w-60 h-48'>
                      <ScrollArea className='h-full p-1'>
                        <div className='px-3 py-2'>
                          {data.description}
                        </div>
                      </ScrollArea >
                    </PopoverContent>
                  )
                }
              </Popover>
            </div>
          </EdgeLabelRenderer>
        )
      }
    </>
  );
};


export default DashedEdge;