/***************
1) listen carefuly
-notice unique information
2) draw examples
3)brute force
4) optimize
5) walk through the algorithm
6)implement
7) test
****************/


/*******************************************************
isUnique: implement an algorithm to determine if a string has isUnique
characters. What if you cannot use additional data structures?

brainstorming:
how would you determine uniqueness?
I can implement a simple hashtable
characters in the string and count each character then check if the count exceeds 1

sort the array then iterate, if the current val is equal to previous val then
the string is not unique

********************************************************/
function quickSortStr(s) {
  //console.log(s.split(""));
  //console.log(s.split("").join(""));
//  console.log(quickSort(s.split(""),0,s.length-1));
  return quickSort(s.split(""),0,s.length-1).join("");//.toString().replace(/\,/gi, "");
}

function quickSort(s, l, h) {
  if (l < h) {
   var pi = partition(s,l,h);
  //  console.log(pi);
    return quickSort(quickSort(s, l, pi - 1), pi + 1, h);
  }
  return s;
}
/* This function takes last element as pivot, places
   the pivot element at its correct position in sorted
    array, and places all smaller (smaller than pivot)
   to left of pivot and all greater elements to right
   of pivot */
function partition(s, l, h) {
//  (Element to be placed at right position)
  var pivot = s[h];
  var i = (l - 1);

  for (var j = l; j <= h - 1; j++) {
    var t;
    if(s[j] <= pivot) {
      i++; //increment index of smaller elements
       t = s[i];
      s[i] = s[j];
      s[j] = t;
    }
  }
  t = s[i+1];
  s[i+1] = s[h];
  s[h] = t;
  return i + 1;
}

function isUniqueHelper(s) {
  for (var i = 1; i < s.length; i++) {
    if (s[i] === s[i-1])
    {
      return false;
    }
  }
  return true;
}
function isUnique(s) {
  return isUniqueHelper(quickSortStr(s));
}

/************************************
Check Permutation: Given two strings, write a method to decide if one is a permutation of another
*****************************/

function isAnagram(s1,s2) {
  var map = {};
  if (s1.length !== s2.length) {
    return false;
  }

  for (var i = 0; i < s1.length; i++) {
    if (map[s1[i]] !== undefined && map[s1[i]] > 0){
      map[s1[i]]++;
    } else {
      map[s1[i]] = 1;
    }
  }
  for (var i = 0; i < s2.length; i++) {
    if (map[s2[i]] !== undefined && map[s2[i]] > 0){
      map[s2[i]]--;
    }
  }
  var acc = 0;
  for (var key in map) {
    acc += map[key];
  }

  return acc === 0;
}

/****************************************
Palindrome Permutation: Given a string, write a function
 to check if its a permutation of a palindrome.


****************************************/
function isPermPalindrome(s) {
  var map = {};
  var odd = 0
  for (var i = 0; i < s.length; i++) {
    if(map[s[i]] !== undefined || map[s[i]] > 0)
    {
      map[s[i]]++;
    }
    else{
      map[s[i]] = 1;
    }
  }

  for (var key in map) {
      //console.log(key + ': ' + map[key]);
    if (map[key] % 2 === 1) {
      odd++;
    }
  }
  return (odd === 1 || odd === 0);
}
/**************************************************
edit distance

insert ex: cat -> cant
remove ex: cat - > ct
replace ex : cat -> current

what can we do?
we have s1 and s2 with lengths m and n respectively
we can check all substrings
of s1 and s2

cases :
if first string is empty then the min edits is n inserts
if second string is empty then the min edits is m inserts

if the last character of the substrings is equal then
the edit distance is the same for the editdistance between
the two substrings without the character

otherwise the last characters of the substrings are not the same so
we have 1 and then consider the possibilities of insert, deletion and substitution.

if it was an isnert

_ _ _ _ a
_ _ _ * b

if it was a deletion

_ _ _ * a
_ _ _ _ b

if it was a replacement

_ _ _ * a
_ _ _ * b







***************************************************/

function min(x, y) {
  return x > y ? y : x;
}


function Matrix (rows, columns)  {
    this.rows = rows;
    this.cols = columns;
    this.arr = new Array(this.rows);
    for (var i=0; i < this.rows; i++) {
        this.arr[i]=new Array(this.cols);
    }
}


function editDistance(s1,s2, m, n) {
  var m = s1.length;
  var n = s2.length;
  dp = new Matrix(m + 1, n + 1);
  for (var i = 0; i <= m; i++) {
    for (var j = 0; j <= n; j++) {
      if (i === 0) {
        dp.arr[i][j] = j;
      } else if (j === 0) {
        dp.arr[i][j] = i;
      }
      else {
        dp.arr[i][j] = min(dp.arr[i][j-1] + 1, min(dp.arr[i-1][j] + 1, (((s1[i-1] === s2[j-1]) << 31 >> 31) & 0 | (~(s1[i-1] === s2[j-1]) << 31 >> 31) & 1) + dp.arr[i-1][j-1]));
      }
    }
  }
    //console.log(dp.arr);
  return dp.arr[m][n];

}

/******************************
oneAway : return true if two strings are only one edit away, false otherwise

********************************/
function oneAway (s1, s2) {
  var diff = s1.length - s2.length;
  var count = 0;
  if (diff !== 1 && diff !== -1 && diff !== 0) {
    return false;
  }

  var i = 0;
  var j = 0;

  while ( i < s1.length && j < s2.length) {

    if(s1[i] !== s2[j]){
      if (s1.length > s2.length) {
        i++;
      } else if (s1.length < s2.length) {
        j++;
      } else {
        i++;
        j++;
      }
      count++;
    } else {
      i++;
      j++;
    }

  }
  if (i <s1.length || j < s2.length) {
    count++;
  }
  return (count === 1);
}
function test1() {
  var s = 'dancemyfriendsandrejoice';
  console.log(s);
  console.log(quickSortStr(s));
  var arr = [11,5,3,1,2,9,7];
  console.log(arr);
  console.log(quickSort(arr, 0, arr.length-1));
  console.log('isUnique: dancemyfriendsandrejoice: ',isUnique('dancemyfriendsandrejoice'));
  console.log('isUnique: dance: ',isUnique('dance'));
  console.log('isAnagram: coopy ypoco: ',isAnagram('coopy','ypoco'));
  console.log('isAnagram: coopy yplco: ',isAnagram('coopy','yplco'));
  console.log('isPermPalindrome: case: one odd count character: taco  cat', isPermPalindrome('taco  cat'));
  console.log('isPermPalindrome: case: all characters are repeated: ttaacacatt', isPermPalindrome('ttaacacatt'));
  console.log('isPermPalindrome: case: should fail: taczccat', isPermPalindrome('taczccat'));
  console.log('edit distance between kitten and knittiing: ', editDistance('kitten','knitting'));
  console.log('edit distance between dog and bog: ', editDistance('dog','bog'));
  console.log('edit distance between bail and bale: ', editDistance('bail','bale'));
  console.log('edit distance between <empty string> and kllll: ', editDistance('','kllll'));
  console.log('edit distance between dvfswdv and <empty string: ', editDistance('dvfswdv',''));
  console.log('edit distance between dog and dog: ', editDistance('dog','dog'));
  console.log('is dag one away from dog', oneAway('dag', 'dog'));
  console.log('is doog one away from dog',oneAway('doog', 'dog'));
  console.log('is dag one away from daag',oneAway('dag', 'daag'));
  console.log('is <empty string> one away from d',oneAway('', 'd'));
  console.log('is d one away from <empty string>',oneAway('d', ''));
  console.log('is <empty string> one away from <empty string>', oneAway('', ''));
  console.log('is daa one away from ada', oneAway('daa', 'ada'));
}

function main() {
test1();
}
main();
