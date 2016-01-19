import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  attributeBindings: ['href', 'target', 'title', 'rel', 'tabindex'],
  classNameBindings: ['className'],

  // You can either pass in the following attributes directly,
  // or you can pass them in nested inside the "params" hash.
  params: {},

  // Only use the values inside `params` after the component is rendered
  // (to avoid double-rendering)
  isLoaded: false,

  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      this.set('isLoaded', true);
    });
  },

  _params: Ember.computed('isLoaded', 'params', function() {
    return this.get('isLoaded') ? this.get('params') : {};
  }),

  // HTML attributes -- href is defined below.
  rel: Ember.computed.alias('_params.rel'),
  title: Ember.computed.alias('_params.title'),
  target: Ember.computed.alias('_params.target'),
  tabindex: Ember.computed.alias('_params.tabindex'),
  className: Ember.computed.alias('_params.className'),

  // Ember link-to style attributes
  route: Ember.computed.alias('_params.route'),
  model: Ember.computed.alias('_params.model'),
  action: Ember.computed.alias('_params.action'),
  queryParams: Ember.computed.alias('_params.queryParams'),

  // These are the arguments to be passed to `transitionToRoute`. They consist
  // of a route name and then an optional model with optional query _params.
  routeArguments: Ember.computed('route', 'model', 'queryParams', function() {
    var args = [this.get('route')];

    if (this.get('model')) {
      if (this.get('model') instanceof Array) {
        args = args.concat(this.get('model'));
      } else {
        args.push(this.get('model'));
      }
    }

    if (this.get('queryParams')) {
      args.push({ queryParams: this.get('queryParams') });
    }

    return args;
  }),

  // The href attribute of the link takes one of three forms.
  // If we have a literal href passed in, always defer to it.
  // If we have route parameters, try to construct the route's URL.
  // If we have an action, just '#' should do.
  href: Ember.computed('routeArguments', 'action', '_params.href', function() {
    if (this.get('_params.href')) {
      return this.get('_params.href');
    } else if (this.get('route')) {
      var router = this.container.lookup('route:application').router;
      return router.generate.apply(router, this.get('routeArguments'));
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
    this.get('targetObject').send(this.get('action'));
  },

  // have the application route transition to the location
  // specified by the parameters
  transitionRoute: function() {
    var route = this.container.lookup('route:application');
    route.transitionTo.apply(route, this.get('routeArguments'));
  }
});
