export interface VideoResource {
  id: string;
  channel: string;
  language: string;
  createdAt: string;
  category: "video" | "podcast";
  updatedAt: string;
}

export interface CreateVideoResource {
  language: string;
  channel: string;
  category: "video" | "podcast";
}
