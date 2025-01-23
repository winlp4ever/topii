import React from 'react';
import { BaseEdge, getBezierPath, type EdgeProps } from '@xyflow/react';

const DashedEdge: React.FC<EdgeProps> = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <BaseEdge
      path={edgePath}
      markerEnd={markerEnd}
      style={{ strokeDasharray: '2,5', ...style }}
    />
  );
};

export default DashedEdge;