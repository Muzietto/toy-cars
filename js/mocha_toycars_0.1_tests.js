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

  it('use frames of reference to represent car positions and headings', function() {
    var testFrame = TC.frame(V.make_vect(2,4), V.make_vect(2,3));
    expect(V.xcor_vect(testFrame.origin)).to.be.equal(2);
    expect(V.ycor_vect(testFrame.heading)).to.be.equal(3);
  });

  describe('create new frames of reference depending on current frame and next move', function () {
    it ('refusing invalid moves', function() {
      expect(function() { TC.step('F', TC.frame(V.make_vect(2,4), V.make_vect(2,5)))}).to.not.throw;
      expect(function() { TC.step('R', TC.frame(V.make_vect(2,4), V.make_vect(2,5)))}).to.not.throw;
      expect(function() { TC.step('L', TC.frame(V.make_vect(2,4), V.make_vect(2,5)))}).to.not.throw;
      expect(function() { TC.step('XXX', TC.frame(V.make_vect(2,4), V.make_vect(2,5)))}).to.throw;
    })

    it('starting from an upwards heading', function() {
    var startFrame = TC.frame(V.make_vect(2,4), V.make_vect(2,5));
    var moveFrontFrame = TC.step('F', startFrame);
    expect(V.xcor_vect(moveFrontFrame.origin)).to.be.equal(2);
    expect(V.ycor_vect(moveFrontFrame.origin)).to.be.equal(5);
    expect(V.xcor_vect(moveFrontFrame.heading)).to.be.equal(2);
    expect(V.ycor_vect(moveFrontFrame.heading)).to.be.equal(6);

    var moveRightFrame = TC.step('R', startFrame);
    expect(V.xcor_vect(moveRightFrame.origin)).to.be.equal(2);
    expect(V.ycor_vect(moveRightFrame.origin)).to.be.equal(4);
    expect(V.xcor_vect(moveRightFrame.heading)).to.be.equal(3);
    expect(V.ycor_vect(moveRightFrame.heading)).to.be.equal(4);

    var moveLeftFrame = TC.step('L', startFrame);
    expect(V.xcor_vect(moveLeftFrame.origin)).to.be.equal(2);
    expect(V.ycor_vect(moveLeftFrame.origin)).to.be.equal(4);
    expect(V.xcor_vect(moveLeftFrame.heading)).to.be.equal(1);
    expect(V.ycor_vect(moveLeftFrame.heading)).to.be.equal(4);
    });

    it('starting from a downwards heading', function() {
    var startFrame = TC.frame(V.make_vect(2,4), V.make_vect(2,3));
    var moveFrontFrame = TC.step('F', startFrame);
    expect(V.xcor_vect(moveFrontFrame.origin)).to.be.equal(2);
    expect(V.ycor_vect(moveFrontFrame.origin)).to.be.equal(3);
    expect(V.xcor_vect(moveFrontFrame.heading)).to.be.equal(2);
    expect(V.ycor_vect(moveFrontFrame.heading)).to.be.equal(2);

    var moveRightFrame = TC.step('R', startFrame);
    expect(V.xcor_vect(moveRightFrame.origin)).to.be.equal(2);
    expect(V.ycor_vect(moveRightFrame.origin)).to.be.equal(4);
    expect(V.xcor_vect(moveRightFrame.heading)).to.be.equal(1);
    expect(V.ycor_vect(moveRightFrame.heading)).to.be.equal(4);

    var moveLeftFrame = TC.step('L', startFrame);
    expect(V.xcor_vect(moveLeftFrame.origin)).to.be.equal(2);
    expect(V.ycor_vect(moveLeftFrame.origin)).to.be.equal(4);
    expect(V.xcor_vect(moveLeftFrame.heading)).to.be.equal(3);
    expect(V.ycor_vect(moveLeftFrame.heading)).to.be.equal(4);
    });

    it('starting from a right-facing heading, and so on...', function() {
    var startFrame = TC.frame(V.make_vect(2,4), V.make_vect(3,4));
    var moveFrontFrame = TC.step('F', startFrame);
    expect(V.xcor_vect(moveFrontFrame.origin)).to.be.equal(3);
    expect(V.ycor_vect(moveFrontFrame.origin)).to.be.equal(4);
    expect(V.xcor_vect(moveFrontFrame.heading)).to.be.equal(4);
    expect(V.ycor_vect(moveFrontFrame.heading)).to.be.equal(4);

    var moveRightFrame = TC.step('R', startFrame);
    expect(V.xcor_vect(moveRightFrame.origin)).to.be.equal(2);
    expect(V.ycor_vect(moveRightFrame.origin)).to.be.equal(4);
    expect(V.xcor_vect(moveRightFrame.heading)).to.be.equal(2);
    expect(V.ycor_vect(moveRightFrame.heading)).to.be.equal(3);

    var moveLeftFrame = TC.step('L', startFrame);
    expect(V.xcor_vect(moveLeftFrame.origin)).to.be.equal(2);
    expect(V.ycor_vect(moveLeftFrame.origin)).to.be.equal(4);
    expect(V.xcor_vect(moveLeftFrame.heading)).to.be.equal(2);
    expect(V.ycor_vect(moveLeftFrame.heading)).to.be.equal(5);
    });
  });

  describe('run inside tracks', function () {
    it('that allow to verify car positions', function() {
      var testTrack = TC.track(15);
      var okFrame = TC.frame(V.make_vect(2,4), V.make_vect(2,3));
      expect(testTrack.in_track(okFrame)).to.be.ok;
      var koFrame = TC.frame(V.make_vect(22,4), V.make_vect(2,3));
      expect(testTrack.in_track(koFrame)).to.be.not.ok;
    });
    it('and forbid moves that would bring the car outside', function() {
      var testTrack = TC.track(15);
      var frameAboutToCrash = TC.frame(V.make_vect(15,4), V.make_vect(16,4));
      var stepForward = TC.step('F', frameAboutToCrash, testTrack);
      expect(V.xcor_vect(stepForward.origin)).to.be.equal(V.xcor_vect(frameAboutToCrash.origin));
      expect(V.ycor_vect(stepForward.origin)).to.be.equal(V.ycor_vect(frameAboutToCrash.origin));
      expect(V.xcor_vect(stepForward.heading)).to.be.equal(V.xcor_vect(frameAboutToCrash.heading));
      expect(V.ycor_vect(stepForward.heading)).to.be.equal(V.ycor_vect(frameAboutToCrash.heading));
    });
  });

  it('prepare lists of frames that describe a trajectory', function() {
    var sss = '5,6:FFRLF';
    var raceData = TC.preprocess(sss);
    var trajectory = TC.trajectory(raceData);
    expect(L.size(trajectory)).to.be.equal(6);

    var frameOne = L.first(trajectory);
    expect(V.xcor_vect(frameOne.origin)).to.be.equal(5);
    expect(V.ycor_vect(frameOne.origin)).to.be.equal(6);
    expect(V.xcor_vect(frameOne.heading)).to.be.equal(5);
    expect(V.ycor_vect(frameOne.heading)).to.be.equal(7);

    var frameTwo = L.second(trajectory);
    expect(V.xcor_vect(frameTwo.origin)).to.be.equal(5);
    expect(V.ycor_vect(frameTwo.origin)).to.be.equal(7);
    expect(V.xcor_vect(frameTwo.heading)).to.be.equal(5);
    expect(V.ycor_vect(frameTwo.heading)).to.be.equal(8);

    var frameThree = L.third(trajectory);
    expect(V.xcor_vect(frameThree.origin)).to.be.equal(5);
    expect(V.ycor_vect(frameThree.origin)).to.be.equal(8);
    expect(V.xcor_vect(frameThree.heading)).to.be.equal(5);
    expect(V.ycor_vect(frameThree.heading)).to.be.equal(9);

    var frameFour = L.fourth(trajectory);
    expect(V.xcor_vect(frameFour.origin)).to.be.equal(5);
    expect(V.ycor_vect(frameFour.origin)).to.be.equal(8);
    expect(V.xcor_vect(frameFour.heading)).to.be.equal(6);
    expect(V.ycor_vect(frameFour.heading)).to.be.equal(8);

    var frameFive = L.fifth(trajectory);
    expect(V.xcor_vect(frameFive.origin)).to.be.equal(5);
    expect(V.ycor_vect(frameFive.origin)).to.be.equal(8);
    expect(V.xcor_vect(frameFive.heading)).to.be.equal(5);
    expect(V.ycor_vect(frameFive.heading)).to.be.equal(9);

    var frameSix = L.fifth(L.tail(trajectory));
    expect(V.xcor_vect(frameSix.origin)).to.be.equal(5);
    expect(V.ycor_vect(frameSix.origin)).to.be.equal(9);
    expect(V.xcor_vect(frameSix.heading)).to.be.equal(5);
    expect(V.ycor_vect(frameSix.heading)).to.be.equal(10);
  });

  it('satisfies all given test case trajectories', function() {
    expect(lastPosition('5,5:RFLFRFLF')).to.be.equal('(7,7)');
    expect(lastPosition('6,6:FFLFFLFFLFF')).to.be.equal('(6,6)');
    expect(lastPosition('5,5:FLFLFFRFFF')).to.be.equal('(1,4)');
  });
  
  function lastPosition(raceData) {
    var lastPosition = L.last(TC.trajectory(TC.preprocess(raceData))).origin;
    return '(' + V.xcor_vect(lastPosition) + ',' + V.ycor_vect(lastPosition) + ')';
  }
});