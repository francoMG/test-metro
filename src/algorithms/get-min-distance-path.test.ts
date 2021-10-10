import loadGraph from '../load-graph/load-graph';
import { getMinDistancePath } from './get-min-distance-path';

test('get-min-distance_PDF-Example-1', async () => {
  const { graph, source, target, trainColor } = await loadGraph(
    './data/test-1.txt'
  );
  const path = getMinDistancePath(graph, source, target, trainColor);
  expect(path.length).toBe(5);
});

test('get-min-distance_PDF-Example-2', async () => {
  const { graph, source, target, trainColor } = await loadGraph(
    './data/test-2.txt'
  );
  const path = getMinDistancePath(graph, source, target, trainColor);
  expect(path.length).toBe(6);
});

test('get-min-distance_PDF-Example-3', async () => {
  const { graph, source, target, trainColor } = await loadGraph(
    './data/test-3.txt'
  );
  const path = getMinDistancePath(graph, source, target, trainColor);
  expect(path.length).toBe(6);
});

test('get-min-distance_CUSTOM-Example-4', async () => {
  const { graph, source, target, trainColor } = await loadGraph(
    './data/test-4.txt'
  );
  const path = getMinDistancePath(graph, source, target, trainColor);

  expect(path.length).toBe(3);
  expect(path[0]).toBe('A');
  expect(path[1]).toBe('E');
  expect(path[2]).toBe('H');
});
