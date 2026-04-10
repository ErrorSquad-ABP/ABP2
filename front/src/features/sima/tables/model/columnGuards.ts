export function isIdColumn(col: string): boolean {
  return /(^id|_id$|(^idestacao$)|\bidestacao\b|_id_|id$)/i.test(col);
}

export function isDateColumn(col: string): boolean {
  return (
    /^datahora$/i.test(col) ||
    /^data$/i.test(col) ||
    /^datamedida$/i.test(col) ||
    /^inicio$/i.test(col) ||
    /^fim$/i.test(col)
  );
}
