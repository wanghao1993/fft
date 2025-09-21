export interface Nav {
  id: string;
  nameZh: string;
  nameEn: string;
  isVisible: boolean;
  sortOrder: number;
  url?: string;
  icon?: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  children?: Nav[];
}

export interface CreateNavData {
  nameZh: string;
  nameEn: string;
  isVisible?: boolean;
  sortOrder?: number;
  url?: string;
  icon?: string;
  parentId?: string;
}

export interface UpdateNavData {
  nameZh?: string;
  nameEn?: string;
  isVisible?: boolean;
  sortOrder?: number;
  url?: string;
  icon?: string;
  parentId?: string;
}

export interface NavFormData {
  nameZh: string;
  nameEn: string;
  isVisible: boolean;
  sortOrder: number;
  url: string;
  icon: string;
  parentId: string;
}

export interface NavSortData {
  id: string;
  sortOrder: number;
}
