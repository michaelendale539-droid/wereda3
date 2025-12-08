// types/index.ts
export interface Document {
  id: number;
  title: string;
  category: 'Policy' | 'Report' | 'Law' | 'Guideline' | 'Educational';
  year: number;
  excerpt: string;
  fileUrl: string; // The URL to the actual PDF or document file
  fullContent?: string; // Optional field for the viewer page
}