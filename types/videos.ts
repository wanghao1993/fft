export interface Video {
  uuid: string;
  source: string;
  title: string;
  videoId: string;
  thumbnail: string;
  link: string;
  channel: string;
  language: string;
  tags?: any;
  category: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  time: string;
}

export interface Meta {
  page: number;
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
