// 虚拟DOM类
class VDom {
  constructor(tag, key, props, children = []) {
    this.tag = tag;
    this.key = key;
    this.props = props;
    this.children = children;
  }

  // 渲染
  render(container) {
    container.appendChild(this.create());
  }

  // 将VDOM转成真实的DOM
  create() {
    // 根据标签生成元素
    const elem = document.createElement(this.tag);
    this.elem = elem;
    updateProps(this);
    // 如果元素有子节点，则依次添加子节点
    this.children.forEach((child) => {
      // 判断child的类型
      if (child instanceof VDom) {
        // 说明是元素节点
        elem.appendChild(child.create());
      } else {
        // 说明是文本节点
        elem.appendChild(document.createTextNode(child));
      }
    });
    return elem;
  }
}

const li1 = new VDom('li', 'li', {}, ['1']);

const ol = new VDom(
  'ol',
  'ol',
  {
    id: 'ol',
    style: {
      color: 'red',
    },
  },
  new Array(5)
    .fill()
    .map(
      (item, index) => new VDom('li', '' + index, {}, [`第${index + 1}条记录`])
    )
);
const ol2 = new VDom(
  'ol',
  'ol',
  {
    id: 'ol',
    style: {
      color: 'blue',
    },
  },
  new Array(5)
    .fill()
    .map(
      (item, index) => new VDom('li', '' + index, {}, [`第${index + 1}条记录`])
    )
);

ol.render(app);
setTimeout(() => {
  patch(ol, ol2);
}, 2000);

// 新老节点的属性对比
function updateProps(newDom, oldProps = {}) {
  const elem = newDom.elem;
  const newProps = newDom.props;
  // 有三种情况
  Object.keys(oldProps).forEach((propName) => {
    const propVal = oldProps[propName];
    // 1. 老的有，新的没有， 则删除属性
    if (!newProps[propName]) {
      elem.removeAttribute(propName);
    }
  });
  Object.keys(newProps).forEach((propName) => {
    const propVal = newProps[propName];
    // 2. 老的有，新的也有，则修改属性
    // 3. 老的没有，新的有 ，则添加属性
    if (propName !== 'style') {
      elem.setAttribute(propName, propVal);
    }
  });

  // 处理style
  const newStyleObj = newProps.style || {};
  const oldStyleObj = oldProps.style || {};
  Object.keys(oldStyleObj).forEach((item) => {
    if (!newStyleObj[item]) {
      elem.style[item] = '';
    }
  });
  Object.keys(newStyleObj).forEach((item) => {
    elem.style[item] = newStyleObj[item];
  });
}

function isSameNode(oldDom, newDom) {
  return oldDom.key === newDom.key && oldDom.tag === newDom.tag;
}
// diff方法
function diff(oldNodes, newNodes) {
  // 两个数组都分别有头尾两个指针
  let oldStartIndex = 0;
  let oldEndIndex = oldNodes.length - 1;
  let newStartIndex = 0;
  let newEndIndex = newNodes.length - 1;
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    // 头头对比
    let oldStart = oldNodes[oldStartIndex];
    let newStart = newNodes[newStartIndex];
    if(isSameNode(oldStart,newStart)){
      // 如果相同，则直接替换
      oldDom.elem.replaceWith(newDom.create());
    }
  }
}

function patch(oldDom, newDom) {
  // 如果新旧节点的tag不相同，则直接替换
  if (oldDom.tag !== newDom.tag) {
    oldDom.elem.replaceWith(newDom.create());
  } else {
    // 如果新旧节点的tag相同，则先更新属性
    newDom.elem = oldDom.elem;
    updateProps(newDom, oldDom.props);
    // 然后后对比子节点
  }
}
