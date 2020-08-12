/**
 * @param {number} capacity
 */
var LFUCache = function(capacity) {
  this.store = {};
  this.keys = []; // 用来存储key值
  this.capacity = capacity;
};

/**
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function(key) {
  if (key in this.store) {
    let index = this.keys.findIndex((value, index) => value[0] === key);
    // keys中的这个Key和前面的key互换位置
    this.keys[index][1]++;
    while (index > 0 && this.keys[index][1] >= this.keys[index - 1][1]) {
      let temp = this.keys[index];
      this.keys[index] = this.keys[index - 1];
      this.keys[index - 1] = temp;
      index--;
    }
    return this.store[key];
  } else {
    return -1;
  }
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function(key, value) {
  if (this.capacity === 0) return;
  // 这里要判断key是否存在
  if (this.get(key) === -1) {
    if (this.keys.length === this.capacity) {
      const lastKey = this.keys.pop();
      delete this.store[lastKey[0]];
    }
    this.keys.push([key, 0]); // 第一个值是key,第二个值是访问次数
  }
  this.store[key] = value;
  this.get(key);
};

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const a = new LFUCache(3);
a.put(2, 2);
a.put(1, 1);
console.log(a.get(2));
console.log(a.get(1));
console.log(a.get(2));
a.put(3, 3);
a.put(4, 4);
console.log(a.get(3));
console.log(a.get(2));
console.log(a.get(1));
console.log(a.get(4));
console.log(a.store);
