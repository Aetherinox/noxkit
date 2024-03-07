/*!
 * noxkit <https://github.com/Aetherinox/noxkit>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var assert = require('assert');
var Noxkit = require('..');

describe('.test', function() {
  it('should return `true` if the string has front-matter:', function() {
    assert(Noxkit.test('---\nabc: xyz\n---'));
    assert(!Noxkit.test('---\nabc: xyz\n---', {delims: '~~~'}));
    assert(Noxkit.test('~~~\nabc: xyz\n~~~', {delims: '~~~'}));
    assert(!Noxkit.test('\nabc: xyz\n---'));
  });
});
