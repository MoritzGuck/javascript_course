export type Category = 'transport' | 'information' | 'space';
export type CategoryFilter = Category | 'all';
export type Era = 'prehistoric' | 'industrialization' | 'modern' | 'all';

export interface HistoricalEvent {
    id: number;
    title: string;
    year: number;
    description: string;
    category: Category;
    sourceUrl?: string;
}

export interface WikiSummary {
    title: string;
    extract: string;
    thumbnail?: string;
}

