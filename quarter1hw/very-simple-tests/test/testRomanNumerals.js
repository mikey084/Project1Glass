"use strict";
var expect = require('chai').expect;
var romanNumerals = require('../romanNumerals');
// var romanNumerals = require('/romanNumerals');

describe("testRNSingleDigit", function(){
  it('should convert single digit roman to their integer equivalent', function(){
    expect(romanNumerals.convertRomanNumeral('i')).to.equal(1);
    expect(romanNumerals.convertRomanNumeral('v')).to.equal(5);
    expect(romanNumerals.convertRomanNumeral('x')).to.equal(10);
    expect(romanNumerals.convertRomanNumeral('l')).to.equal(50);
    expect(romanNumerals.convertRomanNumeral('c')).to.equal(100);

  });

  it('should convert double digit roman to their integer equivalent', function(){
    expect(romanNumerals.convertRomanNumeral('iv')).to.equal(4);
    expect(romanNumerals.convertRomanNumeral('ix')).to.equal(9);
    expect(romanNumerals.convertRomanNumeral('il')).to.equal(49);
    expect(romanNumerals.convertRomanNumeral('ic')).to.equal(99);
   expect(romanNumerals.convertRomanNumeral('ci')).to.equal(101);

  });
  });
