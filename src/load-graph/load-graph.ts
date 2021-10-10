import * as fs from 'fs';
import * as readline from 'readline';
import { Graph, Color } from '../types/Graph';

const mapCharColor: { [char: string]: Color } = {
  G: Color.GREEN,
  R: Color.RED,
  X: Color.COLORLESS
};

const loadGraph = async (path: string) => {
  const fileStream = fs.createReadStream(path);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const lines: string[] = [];

  for await (const line of rl) lines.push(line);

  const graph: Graph = { points: [], adjacencyMatrix: {} };

  const [source, target, smplifiedTraincolor] = lines[0].split(' ');
  const trainColor = mapCharColor[smplifiedTraincolor];

  const nPoins = parseInt(lines[1]);

  for (let i = 0; i < nPoins; i++) {
    const index = i + 2;
    const [tag, simplifiedColor] = lines[index].split(' ');
    const color = mapCharColor[simplifiedColor];
    graph.points.push({ tag, color });
  }

  const nEdges = parseInt(lines[nPoins + 2]);

  for (let i = 0; i < nEdges; i++) {
    const index = i + nPoins + 3;
    const [tagA, tagB] = lines[index].split(' ');
    if (graph.adjacencyMatrix[tagA]) graph.adjacencyMatrix[tagA].push(tagB);
    else graph.adjacencyMatrix[tagA] = [tagB];
    if (graph.adjacencyMatrix[tagB]) graph.adjacencyMatrix[tagB].push(tagA);
    else graph.adjacencyMatrix[tagB] = [tagA];
  }

  return { graph, source, target, trainColor };
};

export default loadGraph;
