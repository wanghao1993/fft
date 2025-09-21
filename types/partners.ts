export interface Partner {
  id: string;
  name: string;
  image: string;
  url: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PartnerFormData {
  name: string;
  image: string;
  url: string;
}

export interface CreatePartnerData {
  name: string;
  image: string;
  url: string;
}

export interface UpdatePartnerData {
  name?: string;
  image?: string;
  url?: string;
}
