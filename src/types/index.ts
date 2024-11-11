export interface HotWheelsModel {
  id: string;
  name: string;
  series: string;
  year: number;
  color: string;
  tampos: string[];
  owned: boolean;
  notes?: string;
  imageUrl: string;
  collectionNumber: string;
}

export interface CollectionStats {
  total: number;
  owned: number;
  series: Record<string, number>;
}

export interface SearchResult {
  title: string;
  url: string;
}