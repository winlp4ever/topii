import { http, HttpResponse  } from 'msw';
import { GraphData } from '../types/graph';

const mockGraphData: GraphData = {
  nodes: [
    { id: '1', name: 'Node 1' },
    { id: '2', name: 'Node 2' },
  ],
  edges: [
    { id: 'e12', source: '1', target: '2' },
  ],
};

export const handlers = [
  http.get('/api/graph/:nodeId', () => {
    return HttpResponse.json(mockGraphData);
  }),
];