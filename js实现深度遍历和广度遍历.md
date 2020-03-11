### 前言

对一个树型结构的所有结点进行遍历，依据遍历顺序的不同可分为`深度遍历`（Depth First Search, DFS）和`广度遍历`（Breadth First Search, BFS），如下图所示。

> 图1：深度遍历顺序

<img src="https://i.loli.net/2020/03/11/fozJtqZSROdIVbX.png" alt="dfs.png" style="zoom: 80%;" />

> 图2：广度遍历顺序

<img src="https://i.loli.net/2020/03/11/FlRZu4ISDjNCyPo.png" alt="广度遍历.png" style="zoom:80%;" />

为了实现这两种遍历方式，我们先根据这个树型结构，定义一个对象tree，代码如下：

```js
// 定义树型结构
const tree = {
    name:'ROOT',
    children:[{
        name:'CHILD1',
		children:[{
            name:'CHILD1-1',
            children:[{
                name:'CHILD1-1-1'
            },{
                name:'CHILD1-1-2'
            }]
        },{
            name:'CHILD1-2'
        }]
    },{
        name:'CHILD2',
        children:[{
            name:'CHILD2-1'
        },{
            name:'CHILD2-2'
        }]
    }]
}
```

### 深度遍历实现方式

根据图1中的深度遍历顺序，可以看出深度遍历总是优先处理完左边的结点，再处理同级右边的结点，如当前结点有子结点，则会继续遍历子点结。我们可以使用**栈（Stack）**数据结构的**后进先出**的特性来实现这种遍历方式。步骤如下：

1. 将根结点压入栈中；
2. 处理栈顶的结点；
3. 判断栈顶结点是否有子结点，没有则栈顶结点出栈，有则获取子结点后栈顶结点出栈，然后**从右至左**依次将子结点压入栈中；
4. 重复2-3步骤，直到栈中没有任何结节。

> 注意：第3步中要**从右至左**将子结点压入栈中，因为我们要先处理左边的结点，而栈是后进先出的，所以右边的先入栈，左边的要后入栈

根据步骤，可编写代码如下：

```js
// 定义深度遍历方法
function dfs(tree){
    const results = []; // 定义遍历结果数组
    const stack = []; // 定义栈数据结构
    stack.push(tree); // 1.根结点入栈
    while(stack.length){ //只要栈中有节点，就一直循环
        // 2. 处理栈顶结点
        const node = stack.pop(); // 获取栈顶结点的同时出栈
        results.push(node.name); // 将栈顶结点名添加到结果中
        if(node.children){ // 如果有子结点
            stack.push(...node.children.slice().reverse()); 
            // 这里slice先复制，reverse反转实现从右至左压入栈。
        }
    }
    return results;
}
console.log(dfs(tree));
/**
[ 'ROOT',
  'CHILD1',
  'CHILD1-1',
  'CHILD1-1-1',
  'CHILD1-1-2',
  'CHILD1-2',
  'CHILD2',
  'CHILD2-1',
  'CHILD2-2' ]
**/
```



### 广度遍历实现方式

根据图2，可以看出广度遍历是优先将一层的结点从左至右遍历完，再从左至右遍历下层的子结点。我们可以利用**队列（Queue）**数据结构的**先进先出**特性来实现这种遍历方式。步骤如下：

1. 将根结点入队；
2. 处理队头的结点；
3. 判断队头结点是否有子节点，没有则队头直接出队，有则获取队头子节点后出队，然后将子节点按**从左至右**的顺序依次入队；
4. 重复2-3步骤，直到队列中没有任何节点。

实现代码如下：

```js
function bfs(tree){
    const results = []; // 定义结果数组
    const queue = []; // 定义列队数据结构
    queue.push(tree); // 1. 根结点入队
    while(queue.length){ // 只要队列中有结点，就一直循环
        // 2. 处理队头结点
        const node = queue.shift(); // 获取队头结点，同时出队
        results.push(node.name); //将队头名称添加到结果中
        if(node.children){ // 如果队头有子结点
            queue.push(...node.children); // 从右至右依次将子结点添加至队列中
        }
    }
    return results;
}
console.log(bfs(tree));
/**
[ 'ROOT',
  'CHILD1',
  'CHILD2',
  'CHILD1-1',
  'CHILD1-2',
  'CHILD2-1',
  'CHILD2-2',
  'CHILD1-1-1',
  'CHILD1-1-2' ]
**/
```



