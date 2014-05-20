Soundclown.Views.UserPlaylists = Backbone.CompositeView.extend({
  template: JST["users/playlists"],

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