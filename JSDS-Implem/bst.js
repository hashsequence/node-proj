
const RED = true;
const BLACK = false;

function RedBlackBST(key){
  this.m_root = null;
  this.m_size = 0;
}

function Node(key,value,color,size) {
  this.m_key = key;
  this.m_value = value;
  this.m_color = color;
  this.m_left = null;
  this.m_right = null;
  this.m_size = size;
}

RedBlackBST.prototype.size = function(node){
  if (node === null || node === undefined) {
    return 0;
  }
  return node.m_size;
}

RedBlackBST.prototype.isRed = function(node) {
  if (node.m_color === null) {
    return false;
  } else {
    return node.m_color === RED;
  }
}

RedBlackBST.prototype.isEmpty = function() {
  return root === null;
}

RedBlackBST.prototype.sizeOfTree = function() {
  return this.size(this.m_root);
}

/*BST Search*/

RedBlackBST.prototype.get = function(key)
{
  if (key !== null) {
    return this.getHelper(this.m_root, key);
  }
}

RedBlackBST.prototype.getHelper = function(node, key) {
  while (node !== null) {
    if (key < node.m_key) {
      node = node.m_left;
    } else if (key > node.m_key) {
      node = node.m_right;
    } else {
      return node.m_value;
    }
  }
  return null;
}

RedBlackBST.prototype.contains = function(key) {
  return this.get(key) != null;
}
/***insertion***/

RedBlackBST.prototype.put = function(key, value) {
  if (key === null || value === null || key === undefined || value === undefined) {
    return null;
    console.log('key or value is null');
  }

  this.m_root = this.putHelper(this.m_root,key,value);
  this.m_root.m_color = BLACK;
}

RedBlackBST.prototype.putHelper = function(node,key,value) {
  if (node === null) {
    return new Node(key,value,RED,1);
  }
  if (key < node.m_key) {
    node.m_left = this.putHelper(node.m_left, key,value);
  } else if (key > node.m_key) {
    node.m_right = this.putHelper(node.m_right,key,value)
  } else {
    node.m_value = value;
  }
  /*balance tree*/
  /* implement later */
  node.m_size = this.size(node.m_left) + this.size(node.m_right) + 1;
  return node;
}

/***Deletion***/


/**testing**/
var bst1 = new RedBlackBST();
console.log(bst1.m_root);
bst1.put(3,3);
bst1.put(2,2);
bst1.put(1,1);
bst1.put(5,5);
console.log('this is ' + bst1.get(2));
console.log(bst1.contains(1));
console.log(bst1.contains(2));
console.log(bst1.contains(3));
console.log(bst1.contains(4));
console.log(bst1.m_root);
console.log(bst1.sizeOfTree());
