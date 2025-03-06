import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type Edge,
  type EdgeProps
} from '@xyflow/react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';


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
                    <PopoverContent className='p-4 bg-popover rounded-xl text-xs shadow-md border text-pink-700 bg-pink-50 border-pink-200'>
                      {data.description}
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