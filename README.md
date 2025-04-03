# Sci-Fi Science Stories

A React application that hosts weekly AI-generated sci-fi stories based on scientific breakthroughs. The site is designed to engage teachers, students, and science enthusiasts by presenting cutting-edge science in an accessible and entertaining format.

## Features

- Clean, elegant design optimized for reading
- Highlights the latest story on the homepage
- Card-based navigation for browsing all stories
- "Read Next" feature to encourage exploration of other stories
- About page explaining the purpose and AI-generated nature of the content
- Responsive design for all device sizes

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sci-fi-science-stories.git
cd sci-fi-science-stories
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Adding New Stories

To add a new story to the site:

1. Create a new markdown file in the `src/data/stories` directory (you'll need to create this directory)
2. Format your markdown file following the structure of the example story
3. Add the story metadata to the `stories` array in `src/data/stories/index.ts` (you'll need to create this file)
4. Update the `getAllStories` function in `src/utils/storyUtils.ts` to import and include your new story

### Story Format

Each story should include:

- The main story text in markdown format
- References to scientific papers that support the science in the story
- An AI-generated lead image (store in `public/images`)

## Deployment

The app is configured for easy deployment to GitHub Pages:

1. Update the `homepage` field in `package.json` to match your GitHub Pages URL:
```json
"homepage": "https://yourusername.github.io/sci-fi-science-stories"
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
# or
yarn deploy
```

## Built With

- [React](https://reactjs.org/) - UI library
- [React Router](https://reactrouter.com/) - Navigation
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering
- [date-fns](https://date-fns.org/) - Date formatting
- [Vite](https://vitejs.dev/) - Build tool

## License

This project is licensed under the MIT License - see the LICENSE file for details.
