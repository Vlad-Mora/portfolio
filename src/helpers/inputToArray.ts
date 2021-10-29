export function inputToArray(string: string, toNumber: boolean): any[] {
  let array = string.includes(",") ? string.split(",") : [string];
  if (toNumber) {
    const numberArray = array.map(Number);
    return numberArray;
  }
  return array;
}
