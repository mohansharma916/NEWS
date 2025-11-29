type SearchParams = {
  // [key: string]: string | string[] | undefined;
  q?: Promise<string>;
  pathname?: Promise<string>;
  viewport?: Promise<string>;
  sortBy?: Promise<string>;
  time?: Promise<string>;
  language?: Promise<string>;
};

type Articles = {
  author: string | undefined;
  content: string | undefined;
  source:
    | {
        id: string | undefined;
        name: string | undefined;
      }
    | undefined;
  title: string | undefined;
  description: string | undefined;
  url: string | undefined;
  urlToImage: string | undefined;
  publishedAt: string | undefined;
};

type ValidateArticles = {
  data: Articles;
  isValid?: boolean;
};

type SearchHistory = {
  Search: string;
  SearchRef: React.RefObject<HTMLInputElement>;
  ContainerRef: React.RefObject<HTMLDivElement>;
  GetEmptySearch: boolean;
  handleClick: (search: string) => void;
  setSearchMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setSearch: (value: string) => void;
};

type SearchHistoryList = {
  Id: string;
  Key: string;
  Value: string;
};

type Carousel = {
  article: Article[];
  isMobile?: boolean;
};
