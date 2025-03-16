
/*
function formatMatrix(csvContent) {
  return csvContent
    .trim()
    .split("\n")
    .map((row) => row.split(",").join(", "))
    .join("\n");
}
*/

/**
 * @description macht aus der Matrix einf nen langen string um einfacher durchzugehen
 */
function parsePagContent(csvContent) {
  return csvContent
    .trim()
    .split("\n")
    .map((row) => row.split(",").map((cell) => cell.replace(/"/g, "").trim()));
}
