export interface NormSummary {
  slug: string;
  title: string;
  kind: string;
  number: string | null;
  year: number | null;
  vigenciaCorte: string | null;
}

export interface NormArticle {
  ordinal: number;
  label: string;
  text: string;
}

export interface NormArticlesPage {
  norm: { slug: string; title: string; vigenciaCorte: string | null };
  items: NormArticle[];
  nextCursor: number | null;
}
