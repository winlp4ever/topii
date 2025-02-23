import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type Edge,
  type EdgeProps
} from '@xyflow/react';


const DashedEdge: React.FC<EdgeProps<Edge<{ label: string }>>> = ({
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
              className="button-edge__label nodrag nopan absolute origin-center"
              style={{
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              }}
            >
              <span className='text-xs py-1 px-3 rounded-xl text-pink-600 text-mono bg-pink-50 shadow-md font-semibold'>{data.label}</span>
            </div>
          </EdgeLabelRenderer>
        )
      }
    </>
  );
};


export default DashedEdge;