/*!
 * noxkit <https://github.com/Aetherinox/noxkit>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var assert = require('assert');
var Noxkit = require('..');

describe('parse json:', function() {
  it('should parse JSON front matter.', function() {
    var actual = Noxkit.read('./test/fixtures/lang-json.md', {
      lang: 'json'
    });

    assert.equal(actual.data.title, 'JSON');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should auto-detect JSON as the language.', function() {
    var actual = Noxkit.read('./test/fixtures/autodetect-json.md');

    assert.equal(actual.data.title, 'autodetect-JSON');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });
});
