import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';

export default Ember.Component.extend({
  tagName: 'a',
  attributeBindings: ['href', 'target', 'title', 'rel', 'tabindex'],
  classNameBindings: ['className', 'activeClassName'],

  // You can either pass in the following attributes directly,
  // or you can pass them in nested inside the "params" hash.
  params: {},

  // HTML attributes -- href is defined below.
  rel: Ember.computed.alias('params.rel'),
  title: Ember.computed.alias('params.title'),
  target: Ember.computed.alias('params.target'),
  tabindex: Ember.computed.alias('params.tabindex'),
  className: Ember.computed.alias('params.className'),

  // Ember link-to style attributes
  route: Ember.computed.alias('params.route'),
  model: Ember.computed.alias('params.model'),
  action: Ember.computed.alias('params.action'),
  queryParams: Ember.computed.alias('params.queryParams'),

  // By default, dynamic links on active routes will have class "active", but
  // you can reopen this and set it to blank if you don't like that behavior.
  defaultActiveClass: 'active',

  // You can set an explicit activeClass like in link-to, as well, which can
  // also be passed in via the params hash.
  activeClass: Ember.computed.alias('params.activeClass'),
  activeWhen: Ember.computed.alias('params.activeWhen'),
  activeClassName: Ember.computed('isActive', 'activeClass', 'defaultActiveClass', function() {
    if (this.get('isActive') && this.get('activeClass') !== false) {
      return this.get('activeClass') || this.get('defaultActiveClass');
    }
  }),

  models: Ember.computed('model', function() {
    if (this.get('model') instanceof Array) {
      return this.get('model');
    } else if (this.get('model')) {
      return [this.get('model')];
    } else {
      return [];
    }
  }),

  // These are the arguments to be passed to `transitionToRoute`. They consist
  // of a route name and then an optional model with optional query params.
  routeArguments: Ember.computed('route', 'models', 'queryParams', function() {
    var args = [this.get('route')].concat(this.get('models'));

    if (this.get('queryParams')) {
      args.push({ queryParams: this.get('queryParams') });
    }

    return args;
  }),

  // The href attribute of the link takes one of three forms.
  // If we have a literal href passed in, always defer to it.
  // If we have route parameters, try to construct the route's URL.
  // If we have an action, just '#' should do.
  href: Ember.computed('routeArguments', 'action', 'params.href', function() {
    if (this.get('params.href')) {
      return this.get('params.href');
    } else if (this.get('route')) {
      return this.get('_router').generate(...this.get('routeArguments'));
    } else {
      return '#';
    }
  }),

  // returning true from this method causes the default click behavior
  // to apply. For ctrl-clicks and for basic literal hrefs, we should
  // return true to preserve normal behavior. For actions and route
  // transitions, we should return false because Ember will handle it.
  click: function(event) {
    if (event.metaKey || event.ctrlKey) {
      return true;
    } else if (this.get('action')) {
      this.performAction();
      return false;
    } else if (this.get('route')) {
      this.transitionRoute();
      return false;
    } else {
      return true;
    }
    // TODO: consider returning true if target="_blank",
    // even if there is an action or route?
  },

  // bubble the action to wherever the link was added
  performAction: function() {
    var target = this.get('targetObject') || this.get('_targetObject');
    if (target) {
      target.send(this.get('action'));
    }
  },

  _route: Ember.computed(function() {
    return getOwner(this).lookup('route:application');
  }),

  _router: Ember.computed.alias('_route.router'),

  // have the application route transition to the location
  // specified by the parameters
  transitionRoute: function() {
    this.get('_route').transitionTo(...this.get('routeArguments'));
  },

  isActive: Ember.computed('_router.currentState', 'activeWhen', function() {
    if (this.get('activeWhen') !== undefined) {
      return this.get('activeWhen');
    } else if (this.get('route') && this.get('_router.currentState')) {
      return this.get('_router').isActive(...this.get('routeArguments'));
    } else {
      return false;
    }
  })
});
