export interface News {
  uuid: string;
  fixTop: boolean;
  id?: any;
  source: string;
  title: string;
  link: string;
  summary: string;
  tags?: any;
  category: string;
  language: string;
  publishedAt: number;
  createdAt: string;
  updatedAt: string;
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
