import { useEffect, useRef, useMemo } from 'react';
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
  ReactFlowProps,
  ReactFlowState,
  useStore,
  Node,
  useNodesInitialized,
} from '@xyflow/react';

type UseForceLayoutOptions = {
  strength: number;
  distance: number;
};

type SimNodeType = SimulationNodeDatum & Node;
type SimEdgeType = SimulationLinkDatum<SimNodeType>;

type DragEvents = {
  start: ReactFlowProps['onNodeDragStart'];
  drag: ReactFlowProps['onNodeDrag'];
  stop: ReactFlowProps['onNodeDragStop'];
};

const elementCountSelector = (state: ReactFlowState) =>
  state.nodeLookup.size + state.edges.length;

function useForceLayout({
  strength = -1000,
  distance = 150,
}: UseForceLayoutOptions) {
  const elementCount = useStore(elementCountSelector);
  const nodesInitialized = useNodesInitialized();
  const { setNodes, getNodes, getEdges } = useReactFlow();

  // You can use these events if you want the flow to remain interactive while
  // the simulation is running. The simulation is typically responsible for setting
  // the position of nodes, but if we have a reference to the node being dragged,
  // we want to use that position instead.
  const draggingNodeRef = useRef<null | Node>(null);
  const dragEvents = useMemo<DragEvents>(
    () => ({
      start: (_event, node) => (draggingNodeRef.current = node),
      drag: (_event, node) => (draggingNodeRef.current = node),
      stop: () => (draggingNodeRef.current = null),
    }),
    []
  );

  useEffect(() => {
    const nodes = getNodes();
    const edges = getEdges();

    if (!nodes.length || !nodesInitialized) {
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
      .on('tick', () => {
        setNodes((nodes) =>
          nodes.map((node, i) => {
            if (simulationNodes[i]) {
              const { x, y } = simulationNodes[i];
              const dragging = draggingNodeRef.current?.id === node.id;

              if (dragging) {
                // Setting the fx/fy properties of a node tells the simulation to
                // "fix" the node at that position and ignore any forces that would
                // normally cause it to move.
                //
                // The node is still part of the simulation, though, and will push
                // other nodes around while the simulation runs.
                simulationNodes[i].fx = node.position.x;
                simulationNodes[i].fy = node.position.y;
              } else {
                delete simulationNodes[i].fx;
                delete simulationNodes[i].fy;
              }

              return { ...node, position: { x: x ?? 0, y: y ?? 0 } };
            }

            return node;
          })
        );
      });

    return () => {
      simulation.stop();
    };
  }, [
    elementCount,
    getNodes,
    getEdges,
    setNodes,
    strength,
    distance,
    nodesInitialized,
  ]);

  return dragEvents;
}

export default useForceLayout;