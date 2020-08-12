function one() {
  function Parent(name) {
    this.name = name;
  }
  Parent.prototype.sayHello = function () {
    console.log(this.name);
  };
  function Child() {}

  Child.prototype = new Parent("Jesee");
  const c = new Child();
  c.sayHello();
  // 原型链继承： 子类原型指向父类实例
  // 引用类型的属性被所有实例共享，如果child.name是个引用类型，修改child.name对象结构，会导致其它实例的name发生改变
  // 在创建Child实例时，不能向父类传参
}

one();

function two() {
  // 子类构造函数，借用父类构建函数
  function Parent(name) {
    this.name = name;
  }
  Parent.prototype.sayHello = function () {
    console.log(this.name);
  };

  function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
  }

  const c = new Child("Jesse", 18);
  console.log(c);
  console.log(c.sayHello);
  // 经典继承，只能继承属性，不能继承父类原型上的方法
  // 引用类型的属性不会被所有实例共享。
}
two();
