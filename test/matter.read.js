/*!
 * noxkit <https://github.com/Aetherinox/noxkit>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var path = require('path');
var assert = require('assert');
var Noxkit = require('..');
var fixture = path.join.bind(path, __dirname, 'fixtures');

describe('.read', function() {
  it('should extract YAML front matter from files with content.', function() {
    var file = Noxkit.read(fixture('basic.txt'));

    assert(file.hasOwnProperty('path'));
    assert(file.hasOwnProperty('data', {title: 'Basic'}));
    assert.equal(file.content, 'this is content.');
  });

  it('should parse complex YAML front matter.', function() {
    var file = Noxkit.read(fixture('complex.md'));

    assert(file.hasOwnProperty('data'));
    assert.equal(file.data.root, '_gh_pages');

    assert(file.hasOwnProperty('path'));
    assert(file.hasOwnProperty('content'));
    assert(file.hasOwnProperty('orig'));
    assert(file.data.hasOwnProperty('root'));
  });

  it('should return an object when a file is empty.', function() {
    var file = Noxkit.read(fixture('empty.md'));
    assert(file.hasOwnProperty('path'));
    assert(file.hasOwnProperty('data'));
    assert(file.hasOwnProperty('content'));
    assert(file.hasOwnProperty('orig'));
  });

  it('should return an object when no front matter exists.', function() {
    var file = Noxkit.read(fixture('hasnt-matter.md'));
    assert(file.hasOwnProperty('path'));
    assert(file.hasOwnProperty('data'));
    assert(file.hasOwnProperty('content'));
    assert(file.hasOwnProperty('orig'));
  });

  it('should parse YAML files directly', function() {
    var file = Noxkit.read(fixture('all.yaml'));
    assert(file.hasOwnProperty('path'));
    assert(file.hasOwnProperty('data'));
    assert(file.hasOwnProperty('content'));
    assert(file.hasOwnProperty('orig'));
    assert.deepEqual(file.data, {
      one: 'foo',
      two: 'bar',
      three: 'baz'
    });
  });
});
