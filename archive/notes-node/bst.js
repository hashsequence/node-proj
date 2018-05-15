/*original implementation in Java: https://algs4.cs.princeton.edu/33balanced/RedBlackBST.java.html

translated code to javascript for practice purposes*/
console.log('Loading Bst');
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
  if(node === null || node === undefined)
  {
    return false;
  }
   return node.m_color === RED;
}

RedBlackBST.prototype.isEmpty = function() {
  return this.m_root === null;
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
  console.log(`putting ${value} into BST`);
  if (key === null || value === null || key === undefined || value === undefined) {
    return null;
    console.log('key or value is null');
  }

  this.m_root = this.putHelper(this.m_root,key,value);
  this.m_root.m_color = BLACK;
}

RedBlackBST.prototype.putHelper = function(node,key,value) {
  if (node === null || node === undefined) {
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

 if (this.isRed(node.m_right) && !this.isRed(node.m_left)) {
   console.log('rotateleft');
    node = this.rotateLeft(node)
 }
 if (this.isRed(node.m_left) && this.isRed(node.m_left.m_left)) {
   console.log('rotateright');
   node = this.rotateRight(node)
 }
 if (this.isRed(node.m_left) && this.isRed(node.m_right)) {
   console.log('flipcolors');
   this.flipColors(node);
 }

  node.m_size = this.size(node.m_left) + this.size(node.m_right) + 1;
  return node;
}

/***Deletion***/
/*
  Removes smallest key and associated value
*/

RedBlackBST.prototype.deleteMin = function() {
  console.log('deleting min')
  if(this.isEmpty()) {
    console.log('tree is empty.');
    return;
  }
  if(!this.isRed(this.m_root.m_left) && !this.isRed(this.m_root.m_right)) {
    this.m_root.m_color = RED;
  }
  //console.log(this.m_root);
  this.m_root = this.deleteMinHelper(this.m_root);
  if(!this.isEmpty()) {
      this.m_root.m_color = BLACK;
    }
}
RedBlackBST.prototype.deleteMinHelper = function(node) {

//  console.log(node);

  if(node.m_left === null || node.m_left === undefined)
  {
    console.log(`deleted ${node.m_value}`);
    return null;
  }

  if(!this.isRed(node.m_left) && !this.isRed(node.m_left.m_left))
  {
    node = this.moveRedLeft(node);
  }
  node.m_left = this.deleteMinHelper(node.m_left);
  return this.balance(node);
}

/*
  Removes the largest key and associated value
*/

RedBlackBST.prototype.deleteMax = function(node) {
  console.log('deleting max');
  if(this.isEmpty()) {
    console.log('tree is empty.');
    return;
  }
  if(!this.isRed(this.m_root.m_left) && !this.isRed(this.m_root.m_right)){
    this.m_root.m_color = RED;
  }

  this.m_root = this.deleteMaxHelper(this.m_root);
//  console.log('this size: ' + this.m_size);
  //console.log('is empty?: ' + this.isEmpty());
//  console.log(this.m_root === null);
  if(!this.isEmpty()) {
    this.m_root.m_color = BLACK;
  }
}

RedBlackBST.prototype.deleteMaxHelper = function(node) {
  if(this.isRed(node.m_left))
  {
    node = this.rotateRight(node);
  }
  if(node.m_right === null || node.m_right === undefined) {
    console.log(`deleted ${node.m_value}`);
    return null;
  }
  if(!this.isRed(node.m_right) && !this.isRed(node.m_right.m_left)) {
    node = this.moveRedRight(node);

  }
  node.m_right = this.deleteMaxHelper(node.m_right);
  return this.balance(node);
}

RedBlackBST.prototype.delete = function(key) {
  if (key === null || key === undefined) {
    console.log("key does not exist\n");
  }
  if(!this.contains(key)) {
    console.log("key does not exist\n");
      return null;
  }

  if (!this.isRed(this.m_root.m_left) && !this.isRed(this.m_root.m_right)){
    this.m_root.m_color = RED;
  }

  this.m_root = this.deleteHelper(this.m_root, key);
  if(!this.isEmpty()) {
    this.m_root.m_color = BLACK;
  }
  return this.m_root;

}

RedBlackBST.prototype.deleteHelper = function(node, key) {
  if (key < node.m_key) {
    if(!this.isRed(node.m_left) && !this.isRed(node.m_left.m_left))
    {
      node = this.moveRedLeft(node);
    }
    node.m_left = this.deleteHelper(node.m_left, key);
  }
  else {
    if(this.isRed(node.m_left))  {
      node = this.rotateRight(node);
    }
    if((key == node.m_key) && (node.m_right === null || node.m_right === undefined)) {
      return null;
    }
    if(!this.isRed(node.m_right) && !this.isRed(node.m_right.m_left)) {
      node = this.moveRedRight(node);
    }
    if(key == node.m_key) {
      var x = this.min(node.m_right);
      node.m_key = x.m_key;
      node.m_value = x.m_value;
      node.m_right = this.deleteMinHelper(node.m_right);
    }
    else {
      node.m_right = this.deleteHelper(node.m_right, key);
    }
    return this.balance(node);

  }
}

/**************************
Red-Black tree helper functions
****************************/
/*
make a left-leaning tree lean to the right
*/

RedBlackBST.prototype.rotateRight = function(node) {
  var x = node.m_left;
  node.m_left = x.m_right;
  x.m_right = node;
  x.m_color = x.m_right.m_color;
  x.m_right.m_color = RED;
  x.m_size = node.m_size;
  node.m_size = this.size(node.m_left) + this.size(node.m_right) + 1;
  return x;
}
/*
make a right-leaning tree lean to the left
*/
RedBlackBST.prototype.rotateLeft = function(node) {
  var x = node.m_right;
  node.m_right = x.m_left;
  x.m_left = node;
  x.m_color  = x.m_left.m_color;
  x.m_left.m_color = RED;
  x.m_size = node.m_size;
  node.m_size = this.size(node.m_left) + this.size(node.m_right) + 1;
  return x;
}

RedBlackBST.prototype.flipColors = function(node) {
  node.m_color = !node.m_color;
  node.m_left.m_color = !node.m_left.m_color;
  node.m_right.m_color = !node.m_right.m_color;
}

RedBlackBST.prototype.moveRedLeft = function(node) {
  this.flipColors(node);
  if(this.isRed(node.m_right.m_left)) {
    node.m_right = this.rotateRight(node.m_right);
    node = this.rotateLeft(node);
    this.flipColors(node);
  }
  return node;
}

RedBlackBST.prototype.moveRedRight = function(node) {
    this.flipColors(node);
    if(this.isRed(node.m_left.m_left)) {
      node = this.rotateRight(node);
      this.flipColors(node);
    }
    return node;
}

RedBlackBST.prototype.balance = function(node) {
  if(this.isRed(node.m_right)) {
    node = this.rotateLeft(node);
  }
  if(this.isRed(node.m_left) && this.isRed(node.m_left.m_left)) {
    node = this.rotateRight(node);
  }
  if(this.isRed(node.m_left) && this.isRed(node.m_right)) {
    this.flipColors(node);
  }
  node.m_size = this.size(node.m_left) + this.size(node.m_right) + 1;
  return node;
}
/**functions to determine properties of tree**/
RedBlackBST.prototype.minOfTree = function() {
  if (this.isEmpty()) {
    console.log("there is no mininum on empty tree\n")
    return;
  }
  return this.min(this.m_root).m_key;
}

RedBlackBST.prototype.min = function(node) {
  if(node.m_left === null || node.m_left === undefined) {
    return node;
  }
  else {
    return this.min(node.m_left);
  }
}

RedBlackBST.prototype.maxOfTree = function() {
  if (this.isEmpty()) {
    console.log("there is no maximum on empty tree\n")
    return;
  }
  return this.max(this.m_root).m_key;
}

RedBlackBST.prototype.max = function(node) {
  if(node.m_right === null || node.m_right === undefined) {
    return node;
  }
  else {
    return this.max(node.m_right);
  }
}
/*iterating through tree*/
/*inorder traversal returns array with keys*/
RedBlackBST.prototype.inOrderTraversal= function() {
  var arr = [];
  this.inOrderTraversalHelper(arr, this.m_root);
  return arr;
}

RedBlackBST.prototype.inOrderTraversalHelper = function(arr, node) {
  if (node === null || node === undefined) {
    return null;
  }
  this.inOrderTraversalHelper(arr, node.m_left);
  arr.push(node.m_key);
  this.inOrderTraversalHelper(arr, node.m_right);
  return arr;
}

RedBlackBST.prototype.getObjects = function(arr) {
  var arr1 = []
  arr.forEach((key) => {arr1.push(this.get(key))});
  return arr1;
}
/**testing**/
function test() {
var bst1 = new RedBlackBST();
console.log(bst1.m_root);
bst1.put(3,3);
console.log(JSON.stringify(bst1.m_root));
bst1.put(5,5);
console.log(JSON.stringify(bst1.m_root));
bst1.put(7,7);
console.log(JSON.stringify(bst1.m_root));
bst1.put(8,8);
console.log(JSON.stringify(bst1.m_root));
bst1.put(9,9);
console.log(JSON.stringify(bst1.m_root));
bst1.put(11,11);
console.log(JSON.stringify(bst1.m_root));
bst1.put(2,2);
console.log(JSON.stringify(bst1.m_root));
bst1.put(1,1);
console.log(JSON.stringify(bst1.m_root));
console.log('this is ' + bst1.get(8));
console.log(bst1.contains(1));
console.log(bst1.contains(2));
console.log(bst1.contains(3));
console.log(bst1.contains(4));
console.log(JSON.stringify(bst1.m_root));
console.log(bst1.sizeOfTree());
bst1.deleteMax();
console.log(JSON.stringify(bst1.m_root));
bst1.deleteMax();
console.log(JSON.stringify(bst1.m_root));
bst1.deleteMax();
console.log(JSON.stringify(bst1.m_root));
bst1.deleteMax();
console.log(JSON.stringify(bst1.m_root));
bst1.deleteMax();
console.log(JSON.stringify(bst1.m_root));
bst1.deleteMax();
console.log(JSON.stringify(bst1.m_root));
bst1.deleteMax();
console.log(JSON.stringify(bst1.m_root));
bst1.deleteMax();
console.log(JSON.stringify(bst1.m_root));
bst1.put(3,3);

bst1.put(5,5);

bst1.put(7,7);

bst1.put(8,8);

bst1.put(9,9);

bst1.put(11,11);

bst1.put(2,2);

bst1.put(1,1);
console.log(JSON.stringify(bst1.m_root));
bst1.deleteMin();
console.log(JSON.stringify(bst1.m_root));
bst1.deleteMin();
console.log(JSON.stringify(bst1.m_root));
bst1.deleteMin();
console.log(JSON.stringify(bst1.m_root));
bst1.deleteMin();
console.log(JSON.stringify(bst1.m_root));
bst1.deleteMin();
console.log(JSON.stringify(bst1.m_root));
bst1.deleteMin();
console.log(JSON.stringify(bst1.m_root));
bst1.deleteMin();
console.log(JSON.stringify(bst1.m_root));
bst1.deleteMin();
console.log(JSON.stringify(bst1.m_root));
bst1.put(3,3);

bst1.put(5,5);

bst1.put(7,7);

bst1.put(1,1);

bst1.put(8,8);

bst1.put(9,222);

bst1.put(11,11);

bst1.put(2,2);
var arr = bst1.inOrderTraversal();
console.log(`this is my array of keys: ${arr}`);
var arr1 = bst1.getObjects(arr);
console.log(`this is my array of objects: ${arr1}`);
console.log(JSON.stringify(bst1.m_root));
console.log(bst1.maxOfTree());
console.log(bst1.minOfTree());
bst1.delete(12);
bst1.delete(8);
console.log(JSON.stringify(bst1.m_root));
}

module.exports = {
Bst : RedBlackBST
/**
Node : Node,
sizeOfTree : RedBlackBST.sizeOfTree,
delete : RedBlackBST.delete,
max : RedBlackBST.max,
min : RedBlackBST.min,
get : RedBlackBST.get,
contains : RedBlackBST.contains,
put : RedBlackBST.put,
deleteMax : RedBlackBST.deleteMax,
deleteMin : RedBlackBST.deleteMin,
traverse : RedBlackBST.inOrderTraversal,
getValArr : RedBlackBST.getObjects,
test : test
**/
}
