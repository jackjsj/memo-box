function instanceOf(left,right){
  while(left = left.__proto__){
    if(left === right.prototype){
      return true;
    }
  }
  return false;
}

console.log(instanceOf(/aa/g,Object))
