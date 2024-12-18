'use client';

import { http, HttpResponse  } from 'msw';
import { GraphData, NodeType } from '../types/graph';

export const mockGraphData: GraphData =  {
  nodes: [
    // Documents
    {
      id: 'doc1',
      type: NodeType.Document,
      doc: {
        id: 1,
        title: 'Introduction to Animals',
        shortSummary: 'A brief overview of the animal kingdom.',
        summary: 'This document provides an introduction to the animal kingdom, covering various species and their characteristics.',
      },
    },
    {
      id: 'doc2',
      type: NodeType.Document,
      doc: {
        id: 2,
        title: 'Animal Habitats',
        shortSummary: 'An exploration of different animal habitats.',
        summary: 'This document explores the various habitats where animals live, including forests, oceans, and deserts.',
      },
    },
    // Concepts
    { id: 'concept1', type: NodeType.Concept, concept: { id: 'c1', label: 'Mammals', definition: 'Warm-blooded vertebrates with hair or fur.' } },
    { id: 'concept2', type: NodeType.Concept, concept: { id: 'c2', label: 'Birds', definition: 'Warm-blooded vertebrates with feathers and wings.' } },
    { id: 'concept3', type: NodeType.Concept, concept: { id: 'c3', label: 'Reptiles', definition: 'Cold-blooded vertebrates with scales.' } },
    { id: 'concept4', type: NodeType.Concept, concept: { id: 'c4', label: 'Fish', definition: 'Cold-blooded vertebrates living in water.' } },
    { id: 'concept5', type: NodeType.Concept, concept: { id: 'c5', label: 'Amphibians', definition: 'Cold-blooded vertebrates that live both in water and on land.' } },
    { id: 'concept6', type: NodeType.Concept, concept: { id: 'c6', label: 'Insects', definition: 'Small arthropods with six legs and a body divided into three parts.' } },
    { id: 'concept7', type: NodeType.Concept, concept: { id: 'c7', label: 'Arachnids', definition: 'Arthropods with eight legs, including spiders and scorpions.' } },
    { id: 'concept8', type: NodeType.Concept, concept: { id: 'c8', label: 'Forests', definition: 'Large areas covered chiefly with trees and undergrowth.' } },
    { id: 'concept9', type: NodeType.Concept, concept: { id: 'c9', label: 'Oceans', definition: 'Large bodies of saltwater that cover most of the Earth.' } },
    { id: 'concept10', type: NodeType.Concept, concept: { id: 'c10', label: 'Deserts', definition: 'Arid regions with little rainfall.' } },
    { id: 'concept11', type: NodeType.Concept, concept: { id: 'c11', label: 'Savannas', definition: 'Grasslands with scattered trees, found in tropical regions.' } },
    { id: 'concept12', type: NodeType.Concept, concept: { id: 'c12', label: 'Polar Regions', definition: 'Areas surrounding the Earth\'s poles, characterized by cold temperatures.' } },
    { id: 'concept13', type: NodeType.Concept, concept: { id: 'c13', label: 'Rainforests', definition: 'Dense forests with high rainfall, found in tropical regions.' } },
    { id: 'concept14', type: NodeType.Concept, concept: { id: 'c14', label: 'Coral Reefs', definition: 'Underwater ecosystems characterized by reef-building corals.' } },
    { id: 'concept15', type: NodeType.Concept, concept: { id: 'c15', label: 'Wetlands', definition: 'Areas where water covers the soil, either permanently or seasonally.' } },
    { id: 'concept16', type: NodeType.Concept, concept: { id: 'c16', label: 'Grasslands', definition: 'Large open areas of country covered with grass.' } },
    { id: 'concept17', type: NodeType.Concept, concept: { id: 'c17', label: 'Mountains', definition: 'Large landforms that rise prominently above their surroundings.' } },
    { id: 'concept18', type: NodeType.Concept, concept: { id: 'c18', label: 'Rivers', definition: 'Large natural streams of water flowing in channels to the sea, a lake, or another river.' } },
    { id: 'concept19', type: NodeType.Concept, concept: { id: 'c19', label: 'Lakes', definition: 'Large bodies of water surrounded by land.' } },
    { id: 'concept20', type: NodeType.Concept, concept: { id: 'c20', label: 'Urban Areas', definition: 'Regions characterized by high human population density and vast human-built features.' } },
  ],
  edges: [
    // Links between documents and concepts
    { id: 'edge1', source: 'doc1', target: 'concept1' },
    { id: 'edge2', source: 'doc1', target: 'concept2' },
    { id: 'edge3', source: 'doc1', target: 'concept3' },
    { id: 'edge4', source: 'doc1', target: 'concept4' },
    { id: 'edge5', source: 'doc1', target: 'concept5' },
    { id: 'edge6', source: 'doc1', target: 'concept6' },
    { id: 'edge7', source: 'doc1', target: 'concept7' },
    { id: 'edge8', source: 'doc2', target: 'concept8' },
    { id: 'edge9', source: 'doc2', target: 'concept9' },
    { id: 'edge10', source: 'doc2', target: 'concept10' },
    { id: 'edge11', source: 'doc2', target: 'concept11' },
    { id: 'edge12', source: 'doc2', target: 'concept12' },
    { id: 'edge13', source: 'doc2', target: 'concept13' },
    { id: 'edge14', source: 'doc2', target: 'concept14' },
    { id: 'edge15', source: 'doc2', target: 'concept15' },
    { id: 'edge16', source: 'doc2', target: 'concept16' },
    { id: 'edge17', source: 'doc2', target: 'concept17' },
    { id: 'edge18', source: 'doc2', target: 'concept18' },
    { id: 'edge19', source: 'doc2', target: 'concept19' },
    { id: 'edge20', source: 'doc2', target: 'concept20' },
  ],
};

export const handlers = [
  http.get('/api/graph/:nodeId', () => {
    console.log('mocking graph data');
    return HttpResponse.json(mockGraphData);
  }),
];