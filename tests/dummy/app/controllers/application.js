import Ember from 'ember';

export default Ember.Controller.extend({
  dynamicLinkParams: {},
  something: false,
  actions: {
    toggleSomething: function() {
      this.set('something', !this.get('something'));
    }
  }
});
