import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      select: {
        id: true,
        originalTitle: true,
        practiceContent: true,
        source: true,
        difficulty: true,
      },
    });

    // Transform the data to match the frontend Article interface
    const transformedArticles = articles.map(article => ({
      title: article.originalTitle,
      content: article.practiceContent,
      source: article.source,
      difficulty: article.difficulty,
    }));

    return NextResponse.json(transformedArticles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
} 