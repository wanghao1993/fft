export interface Article {
  id: string;
  tag?: any;
  title: string;
  content: string;
  cover?: any;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogRes {
  data: Article[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
