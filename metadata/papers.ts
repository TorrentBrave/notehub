export interface Paper {
  title: string
  year?: number
  venue?: string
  link?: string
  doi?: string
  notes?: string
  embed?: boolean
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
  {
    title: 'Partial Multi-View Clustering via Meta-Learning and Contrastive Feature Alignment',
    year: 2024,
    venue: 'arXiv preprint',
    link: 'https://arxiv.org/pdf/2411.09758',
    notes: 'ArXiv: 2411.09758',
    // show embedded PDF viewer in the homepage
    // set embed true so the frontend will render an inline, scrollable viewer
    // Beware: some PDF hosts may block embedding.
    // If embedding fails, the link still opens the PDF in a new tab.
    // Consumers can edit this field to false to disable embedding.
    // eslint-disable-next-line
    // @ts-ignore
    embed: true,
  },
]

export default papers
