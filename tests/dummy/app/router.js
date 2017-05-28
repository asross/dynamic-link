import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.resource("photos", function() {
    this.resource("photo", { path: "/:photo_id" }, function() {
      this.route("comments");
      this.route("comment", { path: "/comments/:comment_id" });
    });
  });
});

export default Router;
