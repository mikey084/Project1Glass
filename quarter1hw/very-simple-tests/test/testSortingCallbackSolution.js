"use strict";
var expect = require('chai').expect;
var sortingCallbackSolution = require('../sortingCallbackSolution');

describe("testing ascending and descending",function(){
  it("should return first - second", function(){
    expect(sortingCallbackSolution.sortByNumberAsc(5,10)).to.equal(-5);
  });

  it("should return second - first", function(){
    expect(sortingCallbackSolution.sortByNumberDesc(5,10)).to.equal(5);
  });

  var array = [3,2,1];
  it("should return value of array[1] - array[0]", function(){
    expect(sortingCallbackSolution.sortByNumberDesc(array[0],array[1])).to.equal(-1);
  });
  it("should retrun the value of array[0] - array[1]", function(){
    expect(sortingCallbackSolution.sortByNumberAsc(array[0], array[1])).to.equal(1);

  });
});
