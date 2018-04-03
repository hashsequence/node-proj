
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
  this.m_size = 0;
}

RedBlackBST.prototype.size = function(node){
  if (node === null) {
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

RedBlackBST.prototype.isEmpty() = function() {
  return root === null;
}

RedBlackBST.prototype.sizeOfTree = function() {
  return this.function(m_root);
}

/*BST Search*/

RedBlackBST.prototype.get = function(key)
{
  if (key) {
    this.m_root.getHelper(key);
  }
}

RedBlackBST.prototype.getHelper = function(node, key) {
  while (node !== null) {
    if (key < node.m_key) {
      node = node.m_left;
    } else if (node > node.m_key) {
      node = nodem_.right;
    } else {
      return node.m_value
    }
  }
  return null;
}

RedBlackBST.prototype.contains(key) {
  return this.get(key);
}
/***insertion***/
