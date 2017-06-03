import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("photos", { resetNamespace: true }, function() {
    this.route("photo", { path: "/:photo_id", resetNamespace: true }, function() {
      this.route("comments");
      this.route("comment", { path: "/comments/:comment_id" });
    });
  });
});

export default Router;
