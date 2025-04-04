export interface Article {
  title: string;
  content: string;
  source: string;
}

export const articles: Article[] = [
  {
    title: "New AI Breakthrough in Medical Research",
    content: "Scientists have developed a new artificial intelligence system that can predict potential drug interactions with unprecedented accuracy. The system, developed by researchers at Stanford University, uses machine learning to analyze millions of chemical compounds and their effects on human cells.",
    source: "Tech Daily News"
  },
  {
    title: "Space Tourism Takes Off",
    content: "The first commercial space tourism flights are set to begin next month, marking a new era in space travel. Several private companies have received approval to launch passenger flights to the edge of space, offering civilians the chance to experience weightlessness and see Earth from orbit.",
    source: "Space Explorer Weekly"
  },
  {
    title: "Renewable Energy Milestone",
    content: "Global renewable energy production has reached a historic milestone, with solar and wind power now accounting for over 50% of new electricity generation capacity worldwide. This shift marks a significant step toward reducing carbon emissions and combating climate change.",
    source: "Green Energy Today"
  }
]; 