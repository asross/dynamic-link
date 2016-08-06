import Ember from 'ember';

export default Ember.Component.extend({
  click() {
    this.set('somethingElse', !this.get('somethingElse'));
  },

  actions: {
    toggleSomething: function() {
      this.set('something', !this.get('something'));
    }
  }
});
