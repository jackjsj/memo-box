const tree = {
  name: "ROOT",
  children: [
    {
      name: "CHILD1",
      children: [
        {
          name: "CHILD1-1",
          children: [
            {
              name: "CHILD1-1-1"
            },
            {
              name: "CHILD1-1-2"
            }
          ]
        },
        {
          name: "CHILD1-2"
        }
      ]
    },
    {
      name: "CHILD2",
      children: [
        {
          name: "CHILD2-1"
        },
        {
          name: "CHILD2-2"
        }
      ]
    }
  ]
};

// 定义深度遍历方法
// function dfs(tree) {
//   const results = []; // 定义遍历结果数组
//   const stack = []; // 定义栈数据结构
//   stack.push(tree); // 1.根结点入栈
//   while (stack.length) {
//     //只要栈中有节点，就一直循环
//     // 2. 处理栈顶结点
//     const node = stack.pop(); // 获取栈顶结点的同时出栈
//     results.push(node.name); // 将栈顶结点名添加到结果中
//     if (node.children) {
//       // 如果有子结点
//       stack.push(...node.children.slice().reverse());
//       // 这里slice先复制，reverse反转实现从右至左压入栈。
//     }
//   }
//   return results;
// }
function dfs(tree) {
  const results = [];
  results.push(tree.name);
  if (tree.children) {
    tree.children.forEach(child => {
      results.push(...dfs(child));
    });
  }
  return results;
}
console.log(dfs(tree));

// 广度遍历
function bfs(tree) {
  const results = []; // 定义结果数组
  const queue = []; // 定义列队数据结构
  queue.push(tree); // 1. 根结点入队
  while (queue.length) {
    // 只要队列中有结点，就一直循环
    // 2. 处理队头结点
    const node = queue.shift(); // 获取队头结点，同时出队
    results.push(node.name); //将队头名称添加到结果中
    if (node.children) {
      // 如果队头有子结点
      queue.push(...node.children); // 从右至右依次将子结点添加至队列中
    }
  }
  return results;
}
console.log(bfs(tree));
