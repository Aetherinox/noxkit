/*!
 * noxkit <https://github.com/Aetherinox/noxkit>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var assert = require('assert');
var Noxkit = require('..');

describe('.lang', function() {
  it('should detect the name of the language to parse', function() {
    assert.deepEqual(Noxkit.language('---\nfoo: bar\n---'), {
      raw: '',
      name: ''
    });
    assert.deepEqual(Noxkit.language('---js\nfoo: bar\n---'), {
      raw: 'js',
      name: 'js'
    });
    assert.deepEqual(Noxkit.language('---coffee\nfoo: bar\n---'), {
      raw: 'coffee',
      name: 'coffee'
    });
  });

  it('should work around whitespace', function() {
    assert.deepEqual(Noxkit.language('--- \nfoo: bar\n---'), {
      raw: ' ',
      name: ''
    });
    assert.deepEqual(Noxkit.language('--- js \nfoo: bar\n---'), {
      raw: ' js ',
      name: 'js'
    });
    assert.deepEqual(Noxkit.language('---  coffee \nfoo: bar\n---'), {
      raw: '  coffee ',
      name: 'coffee'
    });
  });
});
