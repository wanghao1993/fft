export interface Interview {
  id: string;
  title: string;
  cover: string;
  url: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewFormData {
  title: string;
  cover: string;
  url: string;
  language: string;
}

export interface CreateInterviewData {
  title: string;
  cover: string;
  url: string;
  language: string;
}

export interface UpdateInterviewData {
  title?: string;
  cover?: string;
  url?: string;
  language?: string;
}
