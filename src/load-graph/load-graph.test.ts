import { Color } from '../types/Graph';
import loadGraph from './load-graph';

test('load-graph_test-4', async () => {
  const { graph, source, target, trainColor } = await loadGraph(
    './data/test-4.txt'
  );

  expect(source).toBe('A');
  expect(target).toBe('H');
  expect(trainColor).toBe(Color.RED);
  expect(graph.points.length).toBe(8);
  expect(Object.entries(graph.adjacencyMatrix).length).toBe(8);
});
