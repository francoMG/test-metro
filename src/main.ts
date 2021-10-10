import { getMinDistancePath } from './algorithms/get-min-distance-path';
import loadGraph from './load-graph/load-graph';

(async () => {
  const filePath = './data/test-4.txt';
  const { graph, source, target, trainColor } = await loadGraph(filePath);
  const path = getMinDistancePath(graph, source, target, trainColor);
  console.log(`File: ${filePath}`);
  console.log(`Best path: ${path}`);
})();
