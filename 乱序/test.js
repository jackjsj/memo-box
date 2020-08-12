const arr = [1, 2, 3];
function shuffle(arr) {
  let i = arr.length - 1;
  while (i >= 0) {
    const randomIndex = Math.round(Math.random() * i);
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    i--;
  }
  return arr;
}

const result = {};
for (let i = 0; i < 1000000; i++) {
  const item = shuffle(arr);
  if (result[item]) {
    result[item].num += 1;
    result[item].rate = ((result[item].num / (i + 1)) * 100).toFixed(2) + "%";
  } else {
    result[item] = {
      num: 1,
      rate: ((1 / (i + 1)) * 100).toFixed(2) + "%"
    };
  }
}
console.log(result);
