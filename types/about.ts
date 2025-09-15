export interface About {
  id: string;
  module: string;
  content: string;
  sequence: number;
  language: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AboutFormData {
  module: string;
  content: string;
  language: string;
}

export interface CreateAboutData {
  module: string;
  content: string;
  language: string;
}

export interface UpdateAboutData {
  module: string;
  content: string;
  language: string;
  sequence: number;
}
