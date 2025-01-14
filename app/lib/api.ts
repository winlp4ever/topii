import { Edge_, GraphData, Node_ } from '../types/graph';
import { mockGraphData } from '../mocks/handlers';
import * as d3 from 'd3';

interface SimulationNode extends Node_, d3.SimulationNodeDatum {}

export function computeForceLayoutPositions(nodes: Node_[], edges: Edge_[]): Node_[] {
  const simulationNodes: SimulationNode[] = nodes.map(node => ({ ...node }));

  const edgesCopy = edges.map(edge => ({ ...edge }));
  // Create a simulation with nodes
  const simulation = d3.forceSimulation<SimulationNode>(simulationNodes)
    .force('link', d3.forceLink(edgesCopy).id((d) => (d as SimulationNode).id).distance(500))
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(0, 0)) // Center the graph at (0, 0)
    .force('collision', d3.forceCollide().radius(50));

  // Run the simulation for a fixed number of iterations
  simulation.tick(300);

  // Stop the simulation
  simulation.stop();
  console.log('simulation nodes', simulationNodes);
  // Return nodes with updated positions
  return simulationNodes.map(node => ({
    ...node,
    x: node.x,
    y: node.y
  }));
}

export async function fetchGraph(nodeId: string): Promise<GraphData> {
  console.log('fetching graph data');
  if (process.env.NODE_ENV === 'development') {
    console.log('using mock data');
    return mockGraphData;
  }

  const response = await fetch(`/api/graph/${nodeId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch graph data');
  }
  return response.json();
}