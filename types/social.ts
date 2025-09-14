import { enumPlatform } from "@/config/socialIcons";

export interface Social {
  id: string;
  platform: enumPlatform;
  image: string;
  url: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SocialFormData {
  platform: enumPlatform;
  url: string;
  isActive: boolean;
}

export interface CreateSocialData {
  platform: enumPlatform;
  url: string;
  isActive?: boolean;
}

export interface UpdateSocialData {
  platform?: enumPlatform;
  url?: string;
  isActive?: boolean;
}
