/*!
 * noxkit <https://github.com/Aetherinox/noxkit>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var assert = require('assert');
var YAML = require('js-yaml');
var Noxkit = require('..');

describe('custom parser:', function() {
  it('should allow a custom parser to be registered:', function() {
    var actual = Noxkit.read('./test/fixtures/lang-yaml.md', {
      parser: function customParser(str, opts) {
        try {
          return YAML.safeLoad(str, opts);
        } catch (err) {
          throw new SyntaxError(err);
        }
      }
    });

    assert.equal(actual.data.title, 'YAML');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });
});
