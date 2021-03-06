Soundclown.Views.UserFollowees = Backbone.CompositeView.extend({
  template: JST["users/followees"],

  initialize: function(options) {
    this.user = options.model
    this.listenTo(this.user.followees(), "add", this.addFollowee);
    this.listenTo(this.user.followees(), "remove", this.removeFollowee);
    this.user.followees().each(this.addFollowee.bind(this));

    var miniNav = new Soundclown.Views.MiniNav({
      user: this.user
    });
    this.addSubview(".mini-nav", miniNav);
  },

	addFollowee: function(followee) {
		var followees = new Soundclown.Views.Followees({
      user: this.user,
			model: followee
		});

    this.addSubview(".follows-index", followees);
    followees.render();
	},

	removeFollowee: function(followee) {
    var followees = _(this.subviews()[".followers-index"]).find(function(subview) {
      return subview.model == followee;
    });

    this.removeSubview(".follows-index", followees);
	},

  render: function() {
    var renderedContent = this.template({
      user: this.user
    });
    this.$el.html(renderedContent);
    this.renderSubviews();
    return this;
  }

});