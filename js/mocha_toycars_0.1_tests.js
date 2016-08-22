/*
	TOYCARS - JavaScript simulation
	Author: Marco Faustinelli (contacts@faustinelli.net)
	Web: http://faustinelli.net/
	     http://faustinelli.wordpress.com/
	Version: 0.1 - Requires Geieslists 1.1 and Geiesvectors 0.1

	The Apache 2.0 License - Copyright (c) 2016 Toycars Project
*/

var expect = chai.expect;

describe('toycars', function () {

  it('receive and pre-process a string containing a starting point and some moves', function() {

    var sss = '5,6:FFRLF';
    var startData = TC.preprocess(sss);
    var startingPoint = startData.startFrame.origin;
    var startingHeading = startData.startFrame.heading;
    var moves = startData.moves;

    expect(V.xcor_vect(startingPoint)).to.be.equal(5);
    expect(V.ycor_vect(startingPoint)).to.be.equal(6);
    expect(L.size(moves)).to.be.equal(5);
    expect(L.first(moves)).to.be.equal('F');
    expect(L.fourth(moves)).to.be.equal('L');
    expect(L.fifth(moves)).to.be.equal('F');
  });

  it('use frames of reference to represent positions and headings', function() {
    var testFrame = TC.frame(V.make_vect(2,4), V.make_vect(2,3));
    expect(V.xcor_vect(testFrame.origin)).to.be.equal(2);
    expect(V.ycor_vect(testFrame.heading)).to.be.equal(3);
  });

  xdescribe('create new frames depending on current frame and moves', function () {
    it('starting from an upwards heading', function() {
    var startFrame = TC.frame(V.make_vect(2,4), V.make_vect(2,5));
    var moveFrontFrame = TC.step('F', startFrame);
    expect(V.xcor_vect(moveFrontFrame.origin)).to.be.equal(2);
    expect(V.ycor_vect(moveFrontFrame.origin)).to.be.equal(5);
    expect(V.xcor_vect(moveFrontFrame.heading)).to.be.equal(2);
    expect(V.ycor_vect(moveFrontFrame.heading)).to.be.equal(6);
    
    var moveRightFrame = TC.step('R', startFrame);
    expect(V.xcor_vect(moveRightFrame.origin)).to.be.equal(2);
    expect(V.ycor_vect(moveRightFrame.origin)).to.be.equal(5);
    expect(V.xcor_vect(moveRightFrame.heading)).to.be.equal(3);
    expect(V.ycor_vect(moveRightFrame.heading)).to.be.equal(5);
    
    var moveLeftFrame = TC.step('L', startFrame);
    expect(V.xcor_vect(moveLeftFrame.origin)).to.be.equal(2);
    expect(V.ycor_vect(moveLeftFrame.origin)).to.be.equal(5);
    expect(V.xcor_vect(moveLeftFrame.heading)).to.be.equal(1);
    expect(V.ycor_vect(moveLeftFrame.heading)).to.be.equal(5);
    });

    it('starting from a rightwards heading, and so on...', function() {
    var startFrame = TC.frame(V.make_vect(2,4), V.make_vect(3,4));
    var moveFrontFrame = TC.step('F', startFrame);
    expect(V.xcor_vect(moveFrontFrame.origin)).to.be.equal(3);
    expect(V.ycor_vect(moveFrontFrame.origin)).to.be.equal(4);
    expect(V.xcor_vect(moveFrontFrame.heading)).to.be.equal(4);
    expect(V.ycor_vect(moveFrontFrame.heading)).to.be.equal(4);
    
    var moveRightFrame = TC.step('R', startFrame);
    expect(V.xcor_vect(moveRightFrame.origin)).to.be.equal(3);
    expect(V.ycor_vect(moveRightFrame.origin)).to.be.equal(4);
    expect(V.xcor_vect(moveRightFrame.heading)).to.be.equal(3);
    expect(V.ycor_vect(moveRightFrame.heading)).to.be.equal(3);
    
    var moveLeftFrame = TC.step('L', startFrame);
    expect(V.xcor_vect(moveLeftFrame.origin)).to.be.equal(3);
    expect(V.ycor_vect(moveLeftFrame.origin)).to.be.equal(4);
    expect(V.xcor_vect(moveLeftFrame.heading)).to.be.equal(3);
    expect(V.ycor_vect(moveLeftFrame.heading)).to.be.equal(5);
    });
  });
});