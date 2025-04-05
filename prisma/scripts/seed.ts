import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleArticles = [
  {
    originalTitle: "SpaceX Successfully Launches New Satellite",
    originalUrl: "https://example.com/spacex-launch",
    source: "Tech News",
    practiceContent: "SpaceX has successfully launched their newest satellite into orbit. The launch took place at Cape Canaveral early this morning. Engineers confirmed that all systems are functioning normally.",
    wordCount: 24,
    category: "Technology",
    tags: ["space", "technology", "spacex"],
    difficulty: 2,
  },
  {
    originalTitle: "New Study Shows Benefits of Regular Exercise",
    originalUrl: "https://example.com/exercise-study",
    source: "Health News",
    practiceContent: "A recent study has found that just 15 minutes of daily exercise can significantly improve overall health. Researchers tracked participants over six months and noted improvements in both physical and mental well-being.",
    wordCount: 32,
    category: "Health",
    tags: ["health", "exercise", "research"],
    difficulty: 1,
  },
  {
    originalTitle: "Climate Change Impact on Ocean Temperatures",
    originalUrl: "https://example.com/climate-ocean",
    source: "Environmental News",
    practiceContent: "Scientists have recorded unprecedented changes in ocean temperatures this year. The warming trend has accelerated faster than previous models predicted, raising concerns about marine ecosystems.",
    wordCount: 27,
    category: "Environment",
    tags: ["climate", "environment", "science"],
    difficulty: 3,
  },
];

async function main() {
  console.log('Start seeding...');
  
  // Clear existing data
  console.log('Clearing existing articles...');
  await prisma.article.deleteMany();
  
  // Insert new articles
  for (const article of sampleArticles) {
    const result = await prisma.article.create({
      data: article,
    });
    console.log(`Created article with id: ${result.id}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 