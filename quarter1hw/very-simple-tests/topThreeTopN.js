"use strict";
/*
    This function is supposed to look through an input array of numbers,
    and return the highest three values. However, as written, it contains
    a bug.

    Write a test that identifies the bug, then fix the bug and verify it has been
    fixed by witnessing your tests pass.
*/
function topThreeOrderBug(input) {

    var high = Number.NEGATIVE_INFINITY;
    var mid = Number.NEGATIVE_INFINITY;
    var low = Number.NEGATIVE_INFINITY;

    for (var i = 0; i < input.length; i++ ) {

        if(input[i] >= high) {
            low = mid;
            mid = high;   // **** assignment logic
            high = input[i];
        }
        if (input[i] > mid && input[i] < high){
          low = mid;
          mid = input[i];
        }
        if (input[i] < mid && input[i] > low){
          low = input[i];
        }
    }
      return [high, mid, low];
  }


/* Export this function to a test file and write tests for it! */
module.exports = {
  topThreeOrderBug: topThreeOrderBug
}
