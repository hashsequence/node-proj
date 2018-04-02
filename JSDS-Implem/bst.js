
const RED = true;
const BLACK = false;

function RedBlackBST(key){
  this.m_root = null;
  this.m_size = 0;
}

function Node(key,value,color) {
  this.m_key = key;
  this.m_value = value;
  this.m_color = color;
  this.m_left = null;
  this.m_right = null;
  this.m_size = 0;
}

Node.prototype.size = function(size){
  if (node === null) {
    return 0;
  }
  return this.m_size;
}

RedBlackBST.prototype.isRed = function(node) {
  if (node.m_color === null) {
    return false;
  } else {
    return node.m_color === RED;
  }
}


/*BST Search*/
RedBlackBST.prototype.size = function() {
  return this.m_size;
}

RedBlackBST.get = function(key)
{
  if (key) {
    this.root.get(key);
  }
}

Node.prototype.get = function(key) {
  var node = this;
  while (node !== null) {
    if (key < this.m_key) {
      node = x.m_left;
    } else if (key > this,key) {
      node = x.m_right;
    } else {
      return node.m_value
    }
  }
  return null;
}

RedBlackBST.contains = function(key) {
  return this.root.get(key) !== null;
}
