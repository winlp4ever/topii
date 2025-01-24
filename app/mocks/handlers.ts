'use client';

import { http, HttpResponse  } from 'msw';
import { GraphData, NodeType } from '../types/graph';

export const mockGraphData: GraphData =  {
  nodes: [
    // Corpus
    {
      id: 'corpus1',
      type: NodeType.Corpus,
      corpus: {
        id: 1,
        title: 'Animals',
        synthesis: `Animals are multicellular, eukaryotic organisms that form the biological kingdom Animalia. They are characterized by their ability to move, reproduce sexually, and consume organic material. The animal kingdom is divided into various phyla, each with unique characteristics and adaptations that allow species to thrive in diverse environments. Understanding the diversity and complexity of animals is essential for conservation efforts and maintaining the balance of ecosystems on Earth.`
      }
    },
    // Documents
    {
      id: 'doc1',
      type: NodeType.Document,
      doc: {
        id: 1,
        title: 'Introduction to Animals',
        short_summary: 'A brief overview of the animal kingdom.',
        long_summary: `The animal kingdom is a vast and diverse group of living organisms that inhabit nearly every corner of the Earth. Animals are multicellular, eukaryotic organisms that form the biological kingdom Animalia. They are characterized by their ability to move, reproduce sexually, and consume organic material.

The kingdom is divided into various phyla, with the most well-known being Chordata, which includes vertebrates such as mammals, birds, reptiles, amphibians, and fish. Each class of animals exhibits unique adaptations that allow them to thrive in their respective environments.

- **Mammals** are warm-blooded and have hair or fur.
- **Birds** are known for their feathers and ability to fly.
- **Reptiles** and **amphibians** are primarily cold-blooded, with reptiles having scales and amphibians undergoing metamorphosis.
- **Fish** are adapted to aquatic life with gills and fins.
- **Insects** and **arachnids**, part of the arthropod phylum, are incredibly diverse and play crucial roles in ecosystems.

Understanding the characteristics and classifications of animals provides insight into the complexity and interdependence of life on Earth.`,
        synthesis_: `The animal kingdom is a diverse group of organisms that inhabit nearly every corner of the Earth. Animals are multicellular, eukaryotic organisms that form the biological kingdom Animalia. They are characterized by their ability to move, reproduce sexually, and consume organic material.`
      },
    },
    {
      id: 'doc2',
      type: NodeType.Document,
      doc: {
        id: 2,
        title: 'Animal Habitats',
        short_summary: 'An exploration of different animal habitats.',
        long_summary: `Animal habitats are the natural environments where species live, grow, and reproduce. These habitats range from dense forests and expansive oceans to arid deserts and icy polar regions. Each habitat offers unique conditions and resources that influence the types of animals that can thrive there.

- **Forests** provide shelter and abundant food sources for mammals, birds, and insects.
- **Oceans**, covering over 70% of the Earth's surface, are home to a vast array of marine life, from microscopic plankton to the largest whales.
- **Deserts**, with their extreme temperatures and scarce water, are inhabited by specially adapted species like reptiles and certain mammals.
- **Polar regions**, characterized by their cold climates, are home to animals such as polar bears and penguins, which have adapted to the harsh conditions.
- **Savannas** and **grasslands** support large herbivores and predators.
- **Wetlands** and **rivers** are crucial for amphibians and aquatic birds.

Understanding animal habitats is essential for conservation efforts, as it helps identify the environmental needs of species and the impact of human activities on these ecosystems.`,
        synthesis_: `Animal habitats are the natural environments where species live, grow, and reproduce. These habitats range from dense forests and expansive oceans to arid deserts and icy polar regions. Each habitat offers unique conditions and resources that influence the types of animals that can thrive there.`
      },
    },
    // Concepts
    { id: 'concept1', type: NodeType.Concept, concept: {
      id: 'c1',
      label: 'Mammals',
      definition: 'Warm-blooded vertebrates with hair or fur.',
      emoji: "🐾"
    } },
    { id: 'concept2', type: NodeType.Concept, concept: {
      id: 'c2',
      label: 'Birds',
      definition: 'Warm-blooded vertebrates with feathers and wings.',
      image_url: 'https://image.cdn2.seaart.me/temp-convert-webp/highwebp/2024-12-03/ct7a23le878c7380cta0/d4f62b0d55be6f057b8d7b60d70cabbf_low.webp',
      emoji: "🦜"
    } },
    { id: 'concept3', type: NodeType.Concept, concept: {
      id: 'c3',
      label: 'Reptiles',
      definition: 'Cold-blooded vertebrates with scales.',
      emoji: "🦎"
    } },
    { id: 'concept4', type: NodeType.Concept, concept: {
      id: 'c4',
      label: 'Fish',
      definition: 'Cold-blooded vertebrates living in water.',
      emoji: "🐟"
    } },
    { id: 'concept5', type: NodeType.Concept, concept: {
      id: 'c5',
      label: 'Amphibians',
      definition: 'Cold-blooded vertebrates that live both in water and on land.',
      emoji: "🐸"
    } },
    { id: 'concept6', type: NodeType.Concept, concept: {
      id: 'c6',
      label: 'Insects',
      definition: 'Small arthropods with six legs and a body divided into three parts.',
      emoji: "🐞"
    } },
    { id: 'concept7', type: NodeType.Concept, concept: {
      id: 'c7',
      label: 'Arachnids',
      definition: 'Arthropods with eight legs, including spiders and scorpions.',
      emoji: "🕷️"
    } },
    { id: 'concept8', type: NodeType.Concept, concept: {
      id: 'c8',
      label: 'Forests',
      definition: 'Large areas covered chiefly with trees and undergrowth.',
      emoji: "🌲"
    } },
    { id: 'concept9', type: NodeType.Concept, concept: {
      id: 'c9',
      label: 'Oceans',
      definition: 'Large bodies of saltwater that cover most of the Earth.',
      image_url: 'https://image.cdn2.seaart.me/temp-convert-webp/jpeg/static/ad61362e2d9d3e4aaf5cbe2eca05d5af/1693344149783/94853b93b972b7145198cb50b1d51f6f_low.webp',
      emoji: "🌊"
    } },
    { id: 'concept10', type: NodeType.Concept, concept: {
      id: 'c10',
      label: 'Deserts',
      definition: 'Arid regions with little rainfall.',
      image_url: 'https://image.cdn2.seaart.me/temp-convert-webp/png/2023-08-21/14943403445860357/81938d157cdfabdb64113494485f9bd332476b6e_low.webp',
      emoji: "🏜️"
    } },
    { id: 'concept11', type: NodeType.Concept, concept: {
      id: 'c11',
      label: 'Savannas',
      definition: 'Grasslands with scattered trees, found in tropical regions.',
      emoji: "🦒"
    } },
    { id: 'concept12', type: NodeType.Concept, concept: {
      id: 'c12',
      label: 'Polar Regions',
      definition: 'Areas surrounding the Earth\'s poles, characterized by cold temperatures.',
      image_url: 'https://image.cdn2.seaart.me/temp-convert-webp/highwebp/2024-11-17/csss9tle878c73feas5g/7fc7b96a81976278984bd065db06a8aa_low.webp',
      emoji: "❄️"
    } },
    { id: 'concept13', type: NodeType.Concept, concept: {
      id: 'c13',
      label: 'Rainforests',
      definition: 'Dense forests with high rainfall, found in tropical regions.',
      image_url: 'https://image.cdn2.seaart.me/temp-convert-webp/png/2024-11-28/ct3vrm5e878c73fsh5mg/5e7a77d6cb6b9cb34adac30e71f4af4cd42990d9_low.webp',
      emoji: "🌳"
    } },
    { id: 'concept14', type: NodeType.Concept, concept: {
      id: 'c14',
      label: 'Coral Reefs',
      definition: 'Underwater ecosystems characterized by reef-building corals.',
      emoji: "🐠"
    } },
    { id: 'concept15', type: NodeType.Concept, concept: {
      id: 'c15',
      label: 'Wetlands',
      definition: 'Areas where water covers the soil, either permanently or seasonally.',
      emoji: "🌿"
    } },
    { id: 'concept16', type: NodeType.Concept, concept: {
      id: 'c16',
      label: 'Grasslands',
      definition: 'Large open areas of country covered with grass.',
      emoji: "🌾"
    } },
    { id: 'concept17', type: NodeType.Concept, concept: {
      id: 'c17',
      label: 'Mountains',
      definition: 'Large landforms that rise prominently above their surroundings.',
      emoji: "⛰️"
    } },
    { id: 'concept18', type: NodeType.Concept, concept: {
      id: 'c18',
      label: 'Rivers',
      definition: 'Large natural streams of water flowing in channels to the sea, a lake, or another river.',
      image_url: 'https://image.cdn2.seaart.me/temp-convert-webp/png/2023-09-28/18426374407609349/dab08dbe16eef564c4b3c6e7be59edfdbe0c6032_low.webp',
      emoji: "🌊"
    } },
    { id: 'concept19', type: NodeType.Concept, concept: {
      id: 'c19',
      label: 'Lakes',
      definition: 'Large bodies of water surrounded by land.',
      image_url: 'https://image.cdn2.seaart.me/temp-convert-webp/png/2024-02-21/cnaq685e878c73e0kb7g/e172b82f2f4cb3595c8022896c1b7c18a86241fe_low.webp',
      emoji: "🌊"
    } },
    { id: 'concept20', type: NodeType.Concept, concept: {
      id: 'c20',
      label: 'Urban Areas',
      definition: 'Regions characterized by high human population density and vast human-built features.',
      emoji: "🏙️"
    } },
    {
      id: 'qa1',
      type: NodeType.QA,
      qa: {
        id: 'qa1',
        question: 'What are the main characteristics of mammals?',
        answer: 'Mammals are warm-blooded vertebrates with hair or fur. They give birth to live young and nurse them with milk produced by mammary glands.'
      }
    },
    {
      id: 'qa2',
      type: NodeType.QA,
      qa: {
        id: 'qa2',
        question: 'How do coral reefs form?',
        answer: 'Coral reefs are formed by colonies of tiny animals called coral polyps that secrete calcium carbonate to build a hard exoskeleton. Over time, these colonies grow and form the diverse structures we see in coral reefs.'
      }
    },
    {
      id: 'qa3',
      type: NodeType.QA,
      qa: {
        id: 'qa3',
        question: 'What adaptations do desert animals have?',
        answer: 'Desert animals have evolved various adaptations to survive in arid environments. These include the ability to store water, reduce water loss, and withstand high temperatures.'
      }
    },
    {
      id: 'qa4',
      type: NodeType.QA,
      qa: {
        id: 'qa4',
        question: 'Why are wetlands important ecosystems?',
        answer: 'Wetlands are important ecosystems that provide habitat for a wide variety of plant and animal species. They also help regulate water flow, filter pollutants, and store carbon.'
      }
    },
    {
      id: 'qa5',
      type: NodeType.QA,
      qa: {
        id: 'qa5',
        question: 'How are mountains formed?',
        answer: 'Mountains are formed through tectonic processes such as volcanic activity, folding, faulting, and erosion. These geological forces shape the Earth\'s surface and create the diverse landscapes we see today.'
      }
    },
    {
      id: 'block1',
      type: NodeType.Block,
      block: {
        id: 'block1',
        text: 'Mammals are warm-blooded vertebrates with hair or fur. They give birth to live young and nurse them with milk produced by mammary glands.'
      }
    },
    {
      id: 'block2',
      type: NodeType.Block,
      block: {
        id: 'block2',
        text: 'Birds are warm-blooded vertebrates with feathers and wings. They are known for their ability to fly and build nests for their eggs.'
      }
    },
    {
      id: 'block3',
      type: NodeType.Block,
      block: {
        id: 'block3',
        text: 'Reptiles are cold-blooded vertebrates with scales. They lay eggs on land and rely on external sources of heat to regulate their body temperature.'
      }
    },
    {
      id: 'block4',
      type: NodeType.Block,
      block: {
        id: 'block4',
        text: 'Fish are cold-blooded vertebrates that live in water. They have gills to extract oxygen from water and fins to help them swim.'
      }
    },
    {
      id: 'block5',
      type: NodeType.Block,
      block: {
        id: 'block5',
        text: 'Amphibians are cold-blooded vertebrates that live both in water and on land. They undergo metamorphosis from aquatic larvae to terrestrial adults.'
      }
    },
    {
      id: 'block6',
      type: NodeType.Block,
      block: {
        id: 'block6',
        text: 'Insects are small arthropods with six legs and a body divided into three parts. They play essential roles in pollination, decomposition, and food webs.'
      }
    },
    {
      id: 'block7',
      type: NodeType.Block,
      block: {
        id: 'block7',
        text: 'Arachnids are arthropods with eight legs, including spiders and scorpions. They are known for their silk-spinning abilities and predatory behavior.'
      }
    },
    {
      id: 'block8',
      type: NodeType.Block,
      block: {
        id: 'block8',
        text: 'Forests are large areas covered chiefly with trees and undergrowth. They provide habitat for a wide variety of plant and animal species.'
      }
    },
    {
      id: 'block9',
      type: NodeType.Block,
      block: {
        id: 'block9',
        text: 'Oceans are large bodies of saltwater that cover most of the Earth. They support a diverse range of marine life, from microscopic plankton to massive whales.'
      }
    },
    {
      id: 'block10',
      type: NodeType.Block,
      block: {
        id: 'block10',
        text: 'Deserts are arid regions with little rainfall. They are home to specially adapted plant and animal species that can survive in extreme conditions.'
      }
    }
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
    { id: 'edge21', source: 'concept1', target: 'concept5' },  // Mammals and Amphibians
    { id: 'edge22', source: 'concept2', target: 'concept8' },  // Birds and Forests
    { id: 'edge23', source: 'concept3', target: 'concept10' }, // Reptiles and Deserts
    { id: 'edge24', source: 'concept4', target: 'concept9' },  // Fish and Oceans
    { id: 'edge25', source: 'concept5', target: 'concept15' }, // Amphibians and Wetlands
    { id: 'edge26', source: 'concept6', target: 'concept13' }, // Insects and Rainforests
    { id: 'edge27', source: 'concept7', target: 'concept14' }, // Arachnids and Coral Reefs
    { id: 'edge28', source: 'concept8', target: 'concept13' }, // Forests and Rainforests
    { id: 'edge29', source: 'concept9', target: 'concept14' }, // Oceans and Coral Reefs
    { id: 'edge30', source: 'concept10', target: 'concept11' }, // Deserts and Savannas
    { id: 'edge31', source: 'concept11', target: 'concept16' }, // Savannas and Grasslands
    { id: 'edge32', source: 'concept12', target: 'concept17' }, // Polar Regions and Mountains
    { id: 'edge33', source: 'concept13', target: 'concept15' }, // Rainforests and Wetlands
    { id: 'edge34', source: 'concept14', target: 'concept18' }, // Coral Reefs and Rivers
    { id: 'edge35', source: 'concept15', target: 'concept19' }, // Wetlands and Lakes
    { id: 'edge36', source: 'concept16', target: 'concept20' }, // Grasslands and Urban Areas
    { id: 'edge37', source: 'concept17', target: 'concept18' }, // Mountains and Rivers
    { id: 'edge38', source: 'concept18', target: 'concept19' }, // Rivers and Lakes
    { id: 'edge39', source: 'concept19', target: 'concept20' }, // Lakes and Urban Areas
    { id: 'edge40', source: 'corpus1', target: 'doc1' },
    { id: 'edge41', source: 'corpus1', target: 'doc2' },
    { id: 'edge42', source: 'concept1', target: 'qa1' },
    { id: 'edge43', source: 'concept14', target: 'qa2' },
    { id: 'edge44', source: 'concept10', target: 'qa3' },
    { id: 'edge45', source: 'concept15', target: 'qa4' },
    { id: 'edge46', source: 'concept17', target: 'qa5' }
  ],
};

export const handlers = [
  http.get('/api/graph/:nodeId', () => {
    console.log('mocking graph data');
    return HttpResponse.json(mockGraphData);
  }),
];