/*!
 * noxkit <https://github.com/Aetherinox/noxkit>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var assert = require('assert');
var Noxkit = require('..');
var extend = require('extend-shallow');
var toml = require('toml');
var defaults = {
  engines: {
    toml: toml.parse.bind(toml)
  }
};

function parse(str, options) {
  return Noxkit(str, extend({}, defaults, options));
}

describe('parse TOML:', function() {
  it('should parse toml front matter.', function() {
    var actual = parse('---\ntitle = "TOML"\ndescription = "Front matter"\ncategories = "front matter toml"\n---\n\n# This file has toml front matter!\n', {
      lang: 'toml'
    });
    assert.equal(actual.data.title, 'TOML');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should auto-detect TOML as the language.', function() {
    var actual = parse('---toml\ntitle = "autodetect-TOML"\n[props]\nuser = "jonschlinkert"\n---\nContent\n');
    assert.equal(actual.data.title, 'autodetect-TOML');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should throw on TOML syntax errors', function() {
    assert.throws(function() {
      Noxkit('---toml\n[props\nuser = "jonschlinkert"\n---\nContent\n');
    });
  });
});
