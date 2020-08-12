let num = 0;

module.exports = {
  a: num,
  add() {
    num++;
  },
  get() {
    return num;
  },
};
