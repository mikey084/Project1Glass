"use strict";
// These two functions are compare functions, used by Array.sort()
// See these docs for more reference on compare functions:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

// The objects should be sorted by numberOne in ascending order (low to high)
function sortByNumberAsc(first, second) {
	return first - second;
}

// The objects should be sorted by numberOne in descending order (high to low)
function sortByNumberDesc(first, second) {
  return second - first;
}

// EXAMPLE OF USING THESE:
var arr = [5, 6, 1, 8, 9, 50, 2];
arr.sort(sortByNumberDesc);

// Now arr is in descending order:
console.log(arr);

// Sort it the other way
arr.sort(sortByNumberAsc);

// Now arr is in ascending order;
console.log(arr);

/* Export these functions and Write tests for each one using mocha/chai.
 *
 * First, test the function directly, for example sortByNumber(5, 10) should return -5.
 * Then, test the function using the function with Array.sort.
 * for example :
 *	 var a = [3,2,1];
 *   a.sort(sortByNumberAsc);
 *   expect(a[0]).to.equal(1);
 *   expect(a[1]).to.equal(2);
 *   expect(a[2]).to.equal(3);
 */


 module.exports = {
	 sortByNumberAsc : sortByNumberAsc,
	 sortByNumberDesc : sortByNumberDesc
 }
