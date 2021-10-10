import PriorityQueue from 'ts-priority-queue';
import { Color, Graph, Point } from '../types/Graph';

// Based on Dijkstra
export const getMinDistancePath = (
  graph: Graph,
  sourceTag: string,
  targetTag: string,
  trainColor: Color
) => {
  const n = graph.points.length;
  type ExtendedPoint = Point & { id: number };

  const mapPoints: { [tag: string]: ExtendedPoint } = graph.points.reduce(
    (acc, point, index) => {
      return { ...acc, [point.tag]: { ...point, id: index } };
    },
    {}
  );

  const getDifference = (evalPoint: ExtendedPoint) => {
    if (trainColor === Color.COLORLESS || evalPoint.color === Color.COLORLESS)
      return 1;
    return evalPoint.color === trainColor ? 1 : 0;
  };

  const sourcePoint = mapPoints[sourceTag];
  const source = sourcePoint.id;
  const target = mapPoints[targetTag].id;

  const distances = Array<number>(n);
  const path = Array<number>(n);
  const visited = Array<boolean>(n);

  for (let i = 0; i < n; i++) {
    distances[i] = Infinity;
    visited[i] = false;
    path[i] = -1;
  }

  distances[source] = 0;

  const queue = new PriorityQueue<{ distance: number; point: ExtendedPoint }>({
    comparator: ({ distance: distanceA }, { distance: distanceB }) =>
      distanceA - distanceB
  });

  queue.queue({ point: sourcePoint, distance: 0 });

  while (queue.length > 0) {
    const { point: uPoint, distance } = queue.dequeue();

    if (uPoint.id === target) break;

    if (!visited[uPoint.id]) {
      visited[uPoint.id] = true;

      for (const vTag of graph.adjacencyMatrix[uPoint.tag]) {
        const vPoint = mapPoints[vTag];
        const diff = getDifference(uPoint);
        const newDistance = distance + diff;

        if (newDistance < distances[vPoint.id]) {
          queue.queue({ distance: newDistance, point: vPoint });
          path[vPoint.id] = uPoint.id;
          distances[vPoint.id] = newDistance;
        }
      }
    }
  }

  let bestPath: string[] = [targetTag];
  let pos = target;

  while (path[pos]) {
    pos = path[pos];
    const { tag, color } = graph.points[pos];
    if (
      trainColor === Color.COLORLESS ||
      color === Color.COLORLESS ||
      color === trainColor
    )
      bestPath = [tag, ...bestPath];
  }

  bestPath = [sourceTag, ...bestPath];

  return bestPath;
};
