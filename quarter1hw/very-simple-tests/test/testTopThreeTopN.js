"use strict";

var expect = require('chai').expect;
var topThreeTopN= require('../topThreeTopN');

describe("returns three largest numbers in an array highest to lowest",function(){
  var array1 = [1,2,3,4];
  it("should return [3,2,1]",function(){
    expect(topThreeTopN.topThreeOrderBug(array1)).to.deep.equal([4,3,2]);
  });

  var array2 = [333,222,444,111,555];
  it("should return [555,444,333]", function(){
    expect(topThreeTopN.topThreeOrderBug(array2)).to.deep.equal([555,444,333]);
  });
});
