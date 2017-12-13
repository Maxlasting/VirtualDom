function ce(type, props, ...children){
  return {type, props, children}
}

function createElement(node){
  if(typeof node === 'string'){
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  
  for(let type in node.props){
    $el[type] = node.props[type]
  }
  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el;
}

function diff(node1, node2){
  return typeof node1 !== typeof node2 || typeof node1 === 'string' && node1 !== node2 || node1.type !== node2.type
}

function updateElement($parent, newNode, oldNode, index = 0){
  if(!oldNode){
    $parent.appendChild(createElement(newNode));
    return true;
  }
  if(!newNode){
    $parent.removeChild($parent.childNodes[index]);
    return true;
  }
  if(diff(newNode, oldNode)){
    $parent.replaceChild(
      createElement(newNode),
      $parent.childNodes[index]
    );
    return true;
  }
  if(newNode.type){
    const newLen = newNode.children.length;
    const oldLen = oldNode.children.length;
    for(let i=0; i<Math.max(newLen, oldLen); i++){
      updateElement(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      )
    }
    return true;
  }
  return false;
}


const root = document.getElementById('root');

let ele = (
  ce('div', {'className': 'list'}, 
    ce('p', {}, new Date().toLocaleString(), ce('br', {}), 'xxx'),
    ce('p', {style: 'color: red'}, 'item')
  )
);

let prev = null;

function init(){
  updateElement(root, ele, prev);
  prev = ele;
  ele = (
    ce('div', {'className': 'list'}, 
      ce('p', {}, new Date().toLocaleString(), ce('br', {}), 'xxx'),
      ce('p', {style: 'color: red'}, 'item')
    )
  );
}

init();

setInterval(init, 1000);














