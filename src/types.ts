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
  description?: string;
}

export interface ApiError {
  error: string;
  details?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}