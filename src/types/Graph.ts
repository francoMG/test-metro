export enum Color {
  GREEN,
  RED,
  COLORLESS
}

export type Point = {
  color: Color;
  tag: string;
};

export type Graph = {
  points: Point[];
  adjacencyMatrix: { [tag: string]: string[] };
};
