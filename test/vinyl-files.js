/*!
 * noxkit <https://github.com/Aetherinox/noxkit>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var assert = require('assert');
var File = require('vinyl');
var noxkit = require('..');

describe('vinyl files', function() {
  it('should take a vinyl file', function() {
    var file = new File({path: 'foo', contents: Buffer.from('---\none: two\n---\nbar')});

    var actual = noxkit(file);
    assert.equal(actual.path, 'foo');
    assert.deepEqual(actual.data, {one: 'two'});
    assert.deepEqual(actual.content, 'bar');
    assert.deepEqual(actual.contents, Buffer.from('---\none: two\n---\nbar'));
  });
});
