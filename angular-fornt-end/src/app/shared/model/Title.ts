export interface Tile {
  id: number;
  color: string;
  cols: number;
  rows: number;
  text: string;
  selected: boolean;
  merged: boolean;
  url?: string;
}
