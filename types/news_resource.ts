export interface NewsResource {
  id: string;
  name: string;
  description: string;
  url: string;
  language: string;
  createdAt: string;
  category: "quick_news" | "hot_news";
  updatedAt: string;
}

export interface CreateNewsResource {
  description?: string;
  url: string;
  language: string;
  name: string;
  category: "quick_news" | "hot_news";
}
