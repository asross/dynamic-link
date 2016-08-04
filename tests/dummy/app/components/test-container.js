import Ember from 'ember';

export default Ember.Component.extend({
  click() {
    this.set('bubbles', true);
  },

  actions: {
    toggleSomething: function() {
      this.set('something', !this.get('something'));
    }
  }
});
