export interface Video {
  uuid?: string;
  id?: any;
  source: string;
  title: string;
  videoId: string;
  thumbnail: string;
  link: string;
  channel: string;
  language: string;
  tags?: any;
  category: string;
  publishedAt: number;
  createdAt: string;
  updatedAt: string;
}

export interface Meta {
  page: string;
  limit: string;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface VideoResponse {
  data: Video[];
  meta: Meta;
}
