type Tag = {
  id: string;
  name: string;
};
export interface News {
  uuid: string;
  fixTop: boolean;
  source: string;
  title: string;
  link: string;
  content: string;
  summary: string;
  tags: Tag[];
  category: string;
  language: string;
  publishedAt: number;
  createdAt: string;
  updatedAt: string;
  fixTopExpiryAt?: string;
}

export interface CreateNews {
  fixTop: boolean;
  source: string;
  title: string;
  link: string;
  summary: string;
  tags: string;
  category: string;
  language: string;
}
export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface NewsResponse {
  data: News[];
  meta: Meta;
}
