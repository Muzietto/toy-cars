/*
	TOYCARS - JavaScript simulation
	Author: Marco Faustinelli (contacts@faustinelli.net)
	Web: http://faustinelli.net/
	     http://faustinelli.wordpress.com/
	Version: 0.1 - Requires Geieslists 1.1 and Geiesvectors 0.1

	The Apache 2.0 License - Copyright (c) 2016 Toycars Project
*/
var TC = function(L, V) {

  // e.g. '5,6:FFR' --> { startFrame: {origin: (5,6), heading: (5,7)}, moves: ('F','F','R')}
  function _preprocess(instructions) {
    var raw = instructions.split(':');
    var digits = raw[0].split(',').map(function(s) { return parseInt(s, 10); });
    var moves = raw[1].split('');
    var result = { startFrame: { origin: null, heading: null }, moves: null };
    result.startFrame.origin = V.make_vect(digits[0], digits[1]);
    result.startFrame.heading = V.make_vect(digits[0], digits[1]+1);
    result.moves = L.ArrayToList(moves);
    return result;
  }

  function _frame(origin, heading) {
    return { origin: origin, heading: heading };
  }

  function _step(move, frame, track) {
    track = track || _track(15);

    if (!check_no_crash(frame)) {
      return _frame(frame.origin, frame.heading);
    }

    var F = V.make_vect(1, 0);
    var R = V.make_vect(0, -1);
    var L = V.make_vect(0, 1);
    var result = {};
    var versor = V.sub_vect(frame.heading, frame.origin);
    switch(move) {
      case 'F':
        result.origin = frame.heading;
        result.heading = V.add_vect(frame.heading, V.rotate_vect(F, versor));
        break;
      case 'R':
        result.origin = frame.origin;
        result.heading = V.add_vect(frame.origin, V.rotate_vect(R, versor));
        break;
      case 'L':
        result.origin = frame.origin;
        result.heading = V.add_vect(frame.origin, V.rotate_vect(L, versor));
        break;
      default:
        throw new Error('invalid move');
    }
    return result;
    
    function check_no_crash(frame) {
      return track.in_track(frame);
    }
  }

  function _track(size) {
    return {
      in_track: function(frame) {
        return (V.xcor_vect(frame.origin) < size && V.ycor_vect(frame.origin) < size);
      }
    }
  }

  function _trajectory(raceData, track) {
    track = track || _track(15);
    var startFrame = raceData.startFrame;
    var moves = raceData.moves;

    return L.reverse(L.foldl((acc, move) => {
      var currentFrame = L.first(acc);
      return L.cons(_step(move, currentFrame, track), acc);
    }, L.List(startFrame), moves));
  }

  return {
    preprocess: _preprocess,
    frame: _frame,
    step: _step,
    track: _track,
    trajectory: _trajectory
  };
}(geieslists, geiesvectors);