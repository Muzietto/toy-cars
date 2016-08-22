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
  function preprocess(instructions) {
    var raw = instructions.split(':');
    var digits = raw[0].split(',').map(function(s) { return parseInt(s, 10); });
    var moves = raw[1].split('');
    var result = { startFrame: { origin: null, heading: null }, moves: null };
    result.startFrame.origin = V.make_vect(digits[0], digits[1]);
    result.startFrame.heading = V.make_vect(digits[0], digits[1]+1);
    result.moves = L.ArrayToList(moves);
    return result;
  }
  
  function frame(origin, heading) {
    return { origin: origin, heading: heading };
  }

  return {
    preprocess: preprocess,
    frame: frame
  };
}(geieslists, geiesvectors);