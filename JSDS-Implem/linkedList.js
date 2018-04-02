const lruCache = require('./lruCache.js');

function Node (value) {
this.value = value;
this.next = null;
this.prev = null;
}

function DoublyLinkedList() {
  this.head = null;
  this.tail = null;
  this.size = 0;
}

DoublyLinkedList.prototype.insert = function(value) {
  var node = new Node(value);
  if (this.head === null)
  {
    this.head = node;
    this.tail = node;
  } else {
    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
  }
  this.size++;

}

DoublyLinkedList.prototype.remove = function(value) {

  for (current = this.head; current !== null ; current = current.next)
  {
    if (current.value === value)
    {
      if (current === this.head && current === this.tail){
        this.head = null;
        this.tail = null;
      } else if (current === this.head) {
        this.head = this.head.next;
        this.head.prev = null;
      } else if(current === this.tail) {
        this.tail = this.tail.prev;
        this.tail.next = null;
      } else {
        current.prev.next = current.next;
        current.next.prev = current.prev;
      }
        this.size--;
    }
  }
}

DoublyLinkedList.prototype.toString = function() {
  var s = '';
    var node = this.head;
    while (node) {
        s += node.value;
        node = node.next;
        if (node) {
            s += '\n';
        }
    }
    s += `\nsize is ${this.size}\n`;
    return s;
}

DoublyLinkedList.prototype.display = function() {
  for (current = this.head; current !== null ; current = current.next)
  {
    console.log(current.value + ' ');
  }
  console.log('\n');
}

var nlist = new DoublyLinkedList();
nlist.insert(1);
nlist.insert(3);
nlist.insert(9);
nlist.insert(4);

console.log(nlist.toString());
nlist.display();

nlist.remove(4);
nlist.remove(9);
nlist.remove(1);
nlist.remove(7);
console.log(nlist.toString());
nlist.display();

console.log('\nI exported lruCache.js into linkedList.js!!\n')
var nlru = new lruCache.lru();

nlru.set(0,'a');
nlru.set(1,'b');
nlru.set(2,'c');
nlru.set(3,'d');

console.log(nlru.toString());

nlru.set(2,'z');
nlru.set(0,'t');
console.log('\n' + nlru.toString());
