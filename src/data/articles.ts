export interface Article {
  title: string;
  content: string;
  source: string;
}

export const articles: Article[] = [
  {
    title: "New AI Breakthrough in Medical Research",
    content: "Scientists have developed a new artificial intelligence system that can predict potential drug interactions with unprecedented accuracy. The system, developed by researchers at Stanford University, uses machine learning to analyze millions of chemical compounds and their effects on human cells.\n\nThis breakthrough could significantly reduce the time and cost of drug development, potentially bringing new treatments to market faster. The AI model has already identified several promising candidates for further research, including potential treatments for rare genetic disorders.",
    source: "Tech Daily News"
  },
  {
    title: "Space Tourism Takes Off",
    content: "The first commercial space tourism flights are set to begin next month, marking a new era in space travel. Several private companies have received approval to launch passenger flights to the edge of space, offering civilians the chance to experience weightlessness and see Earth from orbit.\n\nPassengers will undergo three days of training before their flight, which will last approximately 90 minutes. The spacecraft will reach an altitude of 100 kilometers, where passengers will experience about four minutes of weightlessness before returning to Earth.",
    source: "Space Explorer Weekly"
  },
  {
    title: "Renewable Energy Milestone",
    content: "Global renewable energy production has reached a historic milestone, with solar and wind power now accounting for over 50% of new electricity generation capacity worldwide. This shift marks a significant step toward reducing carbon emissions and combating climate change.\n\nExperts predict that renewable energy will continue to grow rapidly, with some countries aiming to generate 100% of their electricity from clean sources within the next decade. The falling costs of solar panels and wind turbines have made these technologies increasingly competitive with traditional fossil fuel power plants.",
    source: "Green Energy Today"
  }
]; 