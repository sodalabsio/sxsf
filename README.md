# SXSF (Science X Sci-Fi)

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
git clone https://github.com/sodalabsio/sxsf.git
cd sxsf
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

### Story Format

Each story should include:

- The main story text in markdown format
- References to scientific papers that support the science in the story
- An AI-generated lead image

## Adding New Stories

To add a new story to the site:

1. Create a new markdown file using Agent-C (or a similar Agentic AI system)
2. Create a hero image for the story -- ideally in landscape format (e.g. Dall-E, MidJourney, Stable Diffusion)
2. Ask an AI, or manually format your markdown file following the structure in one of the existing stories to produce a .ts file in the `src/stories` directory. The file should include:
   - A unique ID number (e.g. 1, 2, 3)
   - A title
   - A date (formatted as YYYY-MM-DD)
   - A slug (e.g. "the-moon-is-a-giant-magnet")
   - An except (could be the first sentence of the story)
   - A hero image PNG (stored in `assets`)
   - The story text in markdown format
   - References to scientific papers that support the science in the story
3. Add the new story `.ts` file to `stories/`
4. Add the hero image to the `assets/` directory
5. Redeploy to GitHub Pages

## Deployment

The app is configured for easy deployment to GitHub Pages:

1. Update the `homepage` field in `package.json` to match your GitHub Pages URL:
```json
"homepage": "https://sodalabsio.github.io/sxsf"
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
