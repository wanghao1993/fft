export interface Podcast {
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deletedAt: string;
  platform: string;
  title: string;
  enclosure: string;
  link: string;
  language: string;
  description: string;
  cover: string;
}

export interface CreatePodcast {
  platform: string;
  title: string;
  enclosure: string;
  language: string;
  description?: string;
}

export interface GetPodcastResponse {
  data: Podcast[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}
