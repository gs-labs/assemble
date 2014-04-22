
  /**
 * Assemble
 *
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Upstage.
 * Licensed under the MIT License (MIT).
 */

var expect = require('chai').expect;
var _ = require('lodash');

var assemble = require('../');

describe('async helpers', function() {

  it('should render from a string with an async helper', function (done) {

    var source = 'Render string {{asyncFoo foo}}.';
    var expected = 'Render string with context.';
    assemble(source, {
      name: 'async-test-1',
      metadata: {
        foo: 'with context',
        helpers: ['test/fixtures/helpers/**/*.js']
      }
    }).build(function (err, results) {
      if (err) {
        console.log('Error:', err);
      }
      expect(_.keys(results.pages).length).to.eql(1);
      expect(results.pages[_.keys(results.pages)[0]].content).to.eql(expected);
      done();
    });
  });

  it('should render from a string with a long running async helper', function (done) {
    var source = 'Timeout: {{timeout 1.5}}';
    var expected = 'Timeout: Finished in 1.5 seconds.';
    assemble(source, {
      name: 'async-test-2',
      metadata: {
        helpers: ['test/fixtures/helpers/**/*.js']
      }
    }).build(function (err, results) {
      if (err) {
        console.log('Error', err);
      }
      expect(results.pages[_.keys(results.pages)[0]].content).to.eql(expected);
      done();
    });
  });

  it('should render from a template file with an async helper', function (done) {
    var source = 'test/fixtures/templates/async/index.hbs';
    var expected = 'Render async string.\n';
    var options = {
      name: 'async-test-3',
      metadata: {
        helpers: ['test/fixtures/helpers/**/*.js']
      }
    };

    //options.metadata.pages.push(assemble.models.Component.readFile(source));

    assemble(source, options).build(function (err, results) {
      if (err) {
        console.log('Error:', err);
      }
      expect(results.pages[_.keys(results.pages)[0]].content).to.eql(expected);
      done();
    });
  });

});