export interface PodcastResource {
  id: string;
  platform: string;
  title: string;
  url: string;
  language: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePodcastResource {
  platform: string;
  title: string;
  url: string;
  language: string;
  description?: string;
}
