import { Collection } from './types';

// Predefined collections of stories based on tags
export const collections: Collection[] = [
  {
    id: 'editors-choice',
    title: "Editor's Choice",
    description: "Our editor's selection of the best stories of SXSF.",
    tags: ['editors-choice']
  },
  {
    id: 'quantum',
    title: "Quantum Realms",
    description: "Stories that delve into the fascinating world of quantum mechanics and its implications.",
    tags: ['quantum-physics', 'quantum-biology', 'quantum-computing', 'quantum-technology', 'quantum-chemistry']
  },
  // {
  //   id: 'ecology-environment',
  //   title: "Ecology & Environment",
  //   description: "Stories about our planet's ecosystems and environmental challenges.",
  //   tags: ['ecology', 'environment']
  // },
  {
    id: 'artificial-intelligence',
    title: "Artificial Intelligence",
    description: "Explorations of AI and its potential impact on humanity's future.",
    tags: ['artificial-intelligence', 'ai']
  }
];

// Function to get all available collections
export const getAllCollections = (): Collection[] => {
  return collections;
};

// Function to get a collection by ID
export const getCollectionById = (id: string): Collection | undefined => {
  return collections.find(collection => collection.id === id);
};
