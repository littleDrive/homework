"use strict";

var rankTest = require('ava');

rankTest('foo', function (t) {
  t.pass();
});
rankTest('bar', function _callee(t) {
  var bar;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          bar = Promise.resolve('bar');
          _context.t0 = t;
          _context.next = 4;
          return regeneratorRuntime.awrap(bar);

        case 4:
          _context.t1 = _context.sent;

          _context.t0.is.call(_context.t0, _context.t1, 'bar');

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});