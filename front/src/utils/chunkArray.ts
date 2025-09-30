/**
 * Divide um array em blocos/chunks de tamanho fixo.
 *
 * @param arr - Array de entrada
 * @param size - Tamanho do chunk (deve ser >= 1)
 * @returns Array de chunks (cada chunk é um subarray)
 *
 * Exemplo:
 *   chunkArray([1,2,3,4,5], 2) -> [[1,2], [3,4], [5]]
 */
export function chunkArray<T>(arr: T[], size: number): T[][] {
  if (size < 1) {
    throw new Error("chunkArray: size must be >= 1");
  }

  if (arr.length === 0) {
    return [];
  }

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
