
export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  category: Category;
  author: string;
  date: string;
  publishDate: string;
  readingTime: number;
  tags?: string[];
  featured?: boolean;
}

const API_BASE_URL = '/api';

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/articles`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export async function getArticleById(id: string): Promise<Article> {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching article with ID ${id}:`, error);
    throw error; // Re-throw to be handled by the component
  }
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/slug/${slug}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    throw error; // Re-throw to be handled by the component
  }
}

export async function getArticlesByCategorySlug(slug: string): Promise<Article[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${slug}/articles`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching articles for category ${slug}:`, error);
    return [];
  }
}
