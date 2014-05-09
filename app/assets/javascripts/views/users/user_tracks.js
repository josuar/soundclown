Soundclown.Views.UserTracks = Backbone.View.extend({
  template: JST["users/tracks"],
  className: "user-tracks",

  initialize: function(options) {
    this.user = options.model
  },

  events: {

  },

  render: function() {
    var renderedContent = this.template({
      user: this.user
    });
    this.$el.html(renderedContent);
    return this;
  }

})