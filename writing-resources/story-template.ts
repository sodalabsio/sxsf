import { Story } from '../types';

// Template for creating a new story
export const thisStory: Story = {
  id: '{{id}}', // Unique identifier for the story
  title: '{{title}}', // Title of the story
  date: '{{date}}', // Publication date in YYYY-MM-DD format
  slug: '{{slug}}', // URL-friendly version of the title (e.g. title-with-dashes, lowercase)
  excerpt: '{{excerpt}}', // Hook sentence for the story, no spoilers!!
  imageUrl: 'assets/{{slug}}.png', // Path to the story's image
  content: `{{content}}`, // The full story content in Markdown format
  references: [   // Array of up to 5 references to academic papers or reputable news articles that support the science in the story
    {
      id: 1,
      title: "{{reference_title_1}}",
      url: "{{reference_url_1}}",
      description: "{{reference_description_1}}"    // A brief description of the reference and how it relates to the story
    },
    // Add more references as needed following the same structure (up to 5)
    {
      id: {{reference_id_n}},
      title: "{{reference_title_n}}",
      url: "{{reference_url_n}}",
      description: "{{reference_description_n}}"
    }
  ]
};
