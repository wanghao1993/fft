export interface Blog {
  title: string;
  link: string;
  summary: string;
}

export interface BlogRes {
  title: string;
  link: string;
  summary: string;
  items: Blog[];
}
