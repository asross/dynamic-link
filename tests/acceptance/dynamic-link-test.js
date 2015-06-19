import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App, controller;

module('Dynamic link', {
  setup: function() {
    App = startApp();
    controller = App.__container__.lookup('controller:application');
  },

  teardown: function() {
    Ember.run(App, App.destroy);
  }
});

test('vanilla dynamic link with basic parameters passed in from the controller', function(assert) {
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

test('dynamic link that uses routes', function(assert) {
  visit('/');

  controller.set('dynamicLinkParams', { route: 'thingies.index' });

  andThen(function() {
    assert.equal(find('#dynamic-link a').attr('href'), '/thingies', "href should be settable via route");
  });

  andThen(function() {
    controller.set('dynamicLinkParams', { route: 'thingies.index', queryParams: { hello: 'world' } });
  });

  andThen(function() {
    assert.equal(find('#dynamic-link a').attr('href'), '/thingies?hello=world', "query params should be settable via route params");
  });

  andThen(function() {
    controller.set('dynamicLinkParams', { route: 'thingies.show', model: 1, queryParams: { baz: 'bat' } });
  });

  andThen(function() {
    assert.equal(find('#dynamic-link a').attr('href'), '/thingies/1?baz=bat', "query params should be settable via route params");
  });

  click('#dynamic-link a');

  andThen(function() {
    assert.equal(currentRouteName(), 'thingies.show', "clicking on the link should transition routes");
    assert.equal(currentURL(), '/thingies/1', "clicking on the link should transition to the right model");
  });
});

test('dynamic link with actions', function(assert) {
  visit('/');

  controller.set('dynamicLinkParams', { action: 'toggleSomething', href: '/thingies' });

  andThen(function() {
    assert.equal(find('#dynamic-link a').attr('href'), '/thingies', "link with action should still be able to have an href");
    assert.equal(controller.get('something'), false, 'sanity check');
  });

  click('#dynamic-link a');

  andThen(function() {
    assert.equal(controller.get('something'), true, "clicking on an action link should trigger that action");
    assert.equal(currentRouteName(), "index", "clicking on an action link should not change the route");
  });
});
