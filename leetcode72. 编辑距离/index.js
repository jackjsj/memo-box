var minDistance = function(word1, word2) {
  word1 = '#'+word1;
  word2 = '#'+word2;
  const length1 = word1.length;
  const length2 = word2.length;
  const arr = new Array(length1).fill().map(item=>new Array(length2));
  for (let i = 0; i < length1; i++) {
    for (let j = 0; j < length2; j++) {
      if (i === 0) {
        arr[i][j] = j;
      } else if (j === 0) {
        arr[i][j] = i;
      } else {
        arr[i][j] =
          1 +
          Math.min(
            arr[i - 1][j],
            arr[i][j - 1],
            arr[i - 1][j - 1] + (word1[i] === word2[j] ? -1 : 0)
          );
      }
    }
  }
  console.log(arr)
  return arr[length1-1][length2-1];
};

const result = minDistance(
  'horse',
  'ros'
);
console.log(result);
// "methylnitram"
// "hydraz"
('trinitrophenylmethylnitramine');
('dinitrophenylhydrazine');
