import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Dynamic link', {
  setup: function() {
    App = startApp();
  },

  teardown: function() {
    Ember.run(App, App.destroy);
  }
});

test('vanilla dynamic link with basic parameters passed in from the controller', function(assert) {
  var controller = App.__container__.lookup('controller:application');

  visit('/');

  andThen(function() {
    assert.equal('#', find('#dynamic-link a').attr('href'), "href should default to #");
  });

  andThen(function() {
    controller.set('dynamicLinkParams', { href: '/foo', title: 'bar', className: 'baz' });
  });

  andThen(function() {
    assert.equal(find('#dynamic-link a').attr('href'), '/foo', "href should be settable through params.href");
    assert.equal(find('#dynamic-link a').attr('title'), 'bar', "title should be settable through params.title");
    assert.ok(find('#dynamic-link a').hasClass('baz'), "class should be settable through params.className");
  });
});
