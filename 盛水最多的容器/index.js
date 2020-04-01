const array = [1, 8, 6, 2, 5, 4, 8, 3, 7];
function getMaxArea(arr) {
  let maxArea = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const area = arr[j] * [j - 1];
      if (area > maxArea) {
        maxArea = area;
      }
    }
  }
  return maxArea;
}

console.log(getMaxArea(array));
