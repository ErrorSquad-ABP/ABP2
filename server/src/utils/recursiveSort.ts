// utils/recursiveSort.ts
export function recursiveSort<T>(data: T[], key: keyof T): T[] {
  if (!data || data.length <= 1) return data;

  const middle = Math.floor(data.length / 2);
  const left = recursiveSort(data.slice(0, middle), key);
  const right = recursiveSort(data.slice(middle), key);

  return merge(left, right, key);
}

function merge<T>(left: T[], right: T[], key: keyof T): T[] {
  const result: T[] = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    const lv = left[i][key] as any;
    const rv = right[j][key] as any;

    // sempre crescente
    if (lv <= rv) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}
