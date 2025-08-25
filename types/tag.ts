export interface Tag {
  id: string;
  name: string;
  nameEn: string;
  nameZh: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TagFormData {
  name: string;
  nameEn: string;
  nameZh: string;
  isActive: boolean;
}

export type TagResponse = Tag[];

export interface CreateTagRequest {
  name: string;
  nameEn: string;
  nameZh: string;
  isActive: boolean;
}

export interface UpdateTagRequest extends Partial<CreateTagRequest> {
  id: string;
}
