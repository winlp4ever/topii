import { useEffect, useState } from 'react';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceX,
  forceY,
  SimulationNodeDatum,
  SimulationLinkDatum,
} from 'd3-force';
import {
  useReactFlow,
  Node,
  useNodesInitialized,
} from '@xyflow/react';

type UseForceLayoutOptions = {
  strength: number;
  distance: number;
};

type SimNodeType = SimulationNodeDatum & Node;
type SimEdgeType = SimulationLinkDatum<SimNodeType>;


function useForceLayout({
  strength = -1000,
  distance = 150,
}: UseForceLayoutOptions) {
  const nodesInitialized = useNodesInitialized();
  const { setNodes, getNodes, getEdges, fitView } = useReactFlow();
  const [layoutComputed, setLayoutComputed] = useState(false);

  useEffect(() => {
    const nodes = getNodes();
    const edges = getEdges();

    if (!nodes.length || !nodesInitialized || layoutComputed) {
      return;
    }

    const simulationNodes: SimNodeType[] = nodes.map((node) => ({
      ...node,
      x: node.position.x,
      y: node.position.y,
    }));

    const simulationLinks: SimEdgeType[] = edges.map((edge) => edge);

    const simulation = forceSimulation<SimNodeType>()
      .nodes(simulationNodes)
      .force('charge', forceManyBody().strength(strength))
      .force(
        'link',
        forceLink<SimNodeType, SimEdgeType>(simulationLinks)
          .id((d) => d.id)
          .strength(0.05)
          .distance(distance)
      )
      .force('x', forceX().x(0).strength(0.08))
      .force('y', forceY().y(0).strength(0.08))
      .stop();
      simulation.tick(300);
      // After simulation, update node positions once
      setNodes((nds) =>
        nds.map((node, i) => {
          const simNode = simulationNodes[i];
          return {
            ...node,
            position: { x: simNode.x ?? 0, y: simNode.y ?? 0 },
          };
        })
      );

      // Fit view after layout is computed
      fitView();

      // Mark layout as computed to avoid recomputation
      setLayoutComputed(true);

    return () => {
      simulation.stop();
    };
  }, [
    getNodes,
    getEdges,
    setNodes,
    strength,
    distance,
    nodesInitialized,
    layoutComputed,
    fitView,
  ]);
}

export default useForceLayout;