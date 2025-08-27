export interface Paper {
  title: string
  year?: number
  venue?: string
  link?: string
  doi?: string
  notes?: string
}

// Replace these sample entries with your actual publications.
export const papers: Paper[] = [
  {
    title: '示例论文：A Minimal Note Site',
    year: 2024,
    venue: 'Conference on Example Research',
    link: 'https://example.org/paper-1',
  },
  {
    title: '示例论文：Markdown + Vitepress Pipeline',
    year: 2023,
    venue: 'Journal of Docs',
    link: 'https://example.org/paper-2',
  },
]

export default papers
