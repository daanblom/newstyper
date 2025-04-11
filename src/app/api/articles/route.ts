import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      // Fetch a single article by ID
      const article = await prisma.article.findUnique({
        where: { id },
        select: {
          id: true,
          originalTitle: true,
          practiceContent: true,
          source: true,
          difficulty: true,
        },
      });

      if (!article) {
        return NextResponse.json(
          { error: 'Article not found' },
          { status: 404 }
        );
      }

      // Transform the data to match the frontend Article interface
      const transformedArticle = {
        id: article.id,
        title: article.originalTitle,
        content: article.practiceContent,
        source: article.source,
        difficulty: article.difficulty,
      };

      return NextResponse.json(transformedArticle);
    } else {
      // If no ID is provided, return a random article
      const articleCount = await prisma.article.count();
      const randomSkip = Math.floor(Math.random() * articleCount);
      
      const article = await prisma.article.findFirst({
        skip: randomSkip,
        select: {
          id: true,
          originalTitle: true,
          practiceContent: true,
          source: true,
          difficulty: true,
        },
      });

      if (!article) {
        return NextResponse.json(
          { error: 'No articles found' },
          { status: 404 }
        );
      }

      // Transform the data to match the frontend Article interface
      const transformedArticle = {
        id: article.id,
        title: article.originalTitle,
        content: article.practiceContent,
        source: article.source,
        difficulty: article.difficulty,
      };

      return NextResponse.json(transformedArticle);
    }
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
} 