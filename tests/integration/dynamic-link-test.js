import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App, controller;

module('Dynamic link', {
  beforeEach: function() {
    App = startApp();
    controller = App.__container__.lookup('controller:application');
  },

  afterEach: function() {
    Ember.run(App, App.destroy);
  }
});

test('vanilla dynamic link with basic parameters passed in from the controller', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal('#', find('#dynamic-link a').attr('href'), "href should default to #");
  });

  andThen(function() {
    controller.set('dynamicLinkParams', { href: '/foo', title: 'bar', className: 'baz', rel: "nofollow", tabindex: 2, target: "_blank" });
  });

  andThen(function() {
    assert.equal(find('#dynamic-link a').attr('href'), '/foo', "href should be settable through params.href");
    assert.equal(find('#dynamic-link a').attr('title'), 'bar', "title should be settable through params.title");
    assert.equal(find('#dynamic-link a').attr('rel'), 'nofollow', "rel should be settable through params.rel");
    assert.equal(find('#dynamic-link a').attr('tabindex'), 2, "tabindex should be settable through params.tabindex");
    assert.equal(find('#dynamic-link a').attr('target'), '_blank', "target should be settable through params.target");
    assert.ok(find('#dynamic-link a').hasClass('baz'), "class should be settable through params.className");
  });
});

test('dynamic link that uses routes', function(assert) {
  visit('/');

  andThen(function() {
    controller.set('dynamicLinkParams', { route: 'photos' });
  });

  andThen(function() {
    assert.equal(find('#dynamic-link a').attr('href'), '/photos', "href should be settable via route");
  });

  andThen(function() {
    controller.set('dynamicLinkParams', { route: 'photos', queryParams: { hello: 'world' } });
  });

  andThen(function() {
    assert.equal(find('#dynamic-link a').attr('href'), '/photos?hello=world', "query params should be settable via route params");
  });

  andThen(function() {
    controller.set('dynamicLinkParams', { route: 'photo', model: 1, queryParams: { baz: 'bat' } });
  });

  andThen(function() {
    assert.equal(find('#dynamic-link a').attr('href'), '/photos/1?baz=bat', "query params should be settable via route params");
  });

  click('#dynamic-link a');

  andThen(function() {
    assert.equal(currentRouteName(), 'photo.index', "clicking on the link should transition routes");
    assert.equal(currentURL(), '/photos/1', "clicking on the link should transition to the right model");
  });
});

test('dynamic link using routes with multiple dynamic segments', function(assert) {
  visit('/');

  andThen(function() {
    controller.set('dynamicLinkParams', { route: 'photo.comment', model: [1, { id: 2 }] });
  });

  andThen(function() {
    assert.equal(find('#dynamic-link a').attr('href'), '/photos/1/comments/2', "should be able to pass multiple models");
  });

  click('#dynamic-link a');

  andThen(function() {
    assert.equal(currentRouteName(), 'photo.comment', "clicking on the link should transition to a multiple dynamic segment route");
    assert.equal(currentURL(), '/photos/1/comments/2', "clicking on the link should transition to the right model");
  });
});

test('dynamic link with actions', function(assert) {
  visit('/');

  andThen(function() {
    controller.set('dynamicLinkParams', { action: 'toggleSomething', href: '/thingies' });
  });

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

test('dynamic link with activeWhen and activeClass', function(assert) {
  visit('/');

  andThen(function() {
    controller.set('dynamicLinkParams', { route: 'photos', activeWhen: true, activeClass: 'hyperactive' });
  });

  andThen(function() {
    assert.ok(find('#dynamic-link a').hasClass('hyperactive'), 'active link should have active class');
  });

  andThen(function() {
    controller.set('dynamicLinkParams', { route: 'photos', activeWhen: true, activeClass: false });
  });

  andThen(function() {
    assert.notOk(find('#dynamic-link a').hasClass('hyperactive'), 'active link with activeClass = false should not have class name');
  });
});

test('dynamic link that autocomputes isActive from route', function(assert) {
  visit('/');

  andThen(function() {
    controller.set('dynamicLinkParams', { route: 'photos' });
  });

  andThen(function() {
    assert.notOk(find('#dynamic-link a').hasClass('active'), 'inactive link should not have active class');
  });

  click('#dynamic-link a');

  andThen(function() {
    assert.equal(currentRouteName(), 'photos.index', "clicking on the link should transition to the new route");
    assert.ok(find('#dynamic-link a').hasClass('active'), 'active link should have active class');
  });

  andThen(function() {
    controller.set('dynamicLinkParams', { route: 'photo', model: 1 });
  });

  andThen(function() {
    assert.notOk(find('#dynamic-link a').hasClass('active'), 'inactive link should not have active class');
  });

  click('#dynamic-link a');

  andThen(function() {
    assert.equal(currentRouteName(), 'photo.index', "clicking on the link should transition to the new route");
    assert.ok(find('#dynamic-link a').hasClass('active'), 'active link should have active class');
  });

  andThen(function() {
    controller.set('dynamicLinkParams', { route: 'photo', model: 2 });
  });

  andThen(function() {
    assert.notOk(find('#dynamic-link a').hasClass('active'), 'inactive link should not have active class');
  });

  andThen(function() {
    controller.set('dynamicLinkParams', { route: 'photo.comment', model: [1, { id: 2 }] });
  });

  click('#dynamic-link a');

  andThen(function() {
    assert.ok(find('#dynamic-link a').hasClass('active'), 'active link should have active class');
  });

  andThen(function() {
    controller.set('dynamicLinkParams', { route: 'photo.comment', model: [1, { id: 3 }] });
  });

  andThen(function() {
    assert.notOk(find('#dynamic-link a').hasClass('active'), 'inactive link should not have active class');
  });
});

test('dynamic link that sets bubbles param', function(assert) {
  visit('/');

  andThen(function() {
    controller.set('dynamicLinkParams', { action: 'toggleSomething', href: '/thingies' });
    assert.equal(controller.get('something'), false, 'sanity check 1');
    assert.equal(controller.get('somethingElse'), false, 'sanity check 2');
  });

  click('#dynamic-link a');

  andThen(function() {
    assert.equal(controller.get('something'), true, 'click event triggers action');
    assert.equal(controller.get('somethingElse'), true, 'click event still bubbles');
  });

  andThen(function() {
    controller.set('dynamicLinkParams.bubbles', false);
  });

  click('#dynamic-link a');

  andThen(function() {
    assert.equal(controller.get('something'), false, 'sanity check 3');
    assert.equal(controller.get('somethingElse'), true, 'click event does not bubble with bubbles=false');
  });

  andThen(function() {
    controller.set('dynamicLinkParams.bubbles', true);
  });

  click('#dynamic-link a');

  andThen(function() {
    assert.equal(controller.get('something'), true, 'sanity check 4');
    assert.equal(controller.get('somethingElse'), false, 'click event bubbles with bubbles=true');
  });
});
