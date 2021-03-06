Soundclown.Views.FollowsNew = Backbone.View.extend({
  template: JST["follows/new"],
  className: "follow-new",

  events: {
    "submit form.follow": "follow",
    "submit form.unfollow": "unfollow"
  },

  initialize: function(options) {
    this.followee = options.user
  },

  follow: function(event) {
    var view = this;
    var followee = this.followee;
    var follower = Soundclown.currentUser;
    event.preventDefault();

    var $submit = $(event.currentTarget);
    var $scope = $submit.closest("form");
    var follow = new Soundclown.Models.Follow({ followee_id: followee.id, follower_id: follower.id })
    follow.save({}, {});
    Soundclown.inFollows.add(follow);
    followee.inFollows().add(follow);
    followee.followers().add(follower);
    this.render();
  },

  unfollow: function(event) {
    var view = this;
    var followee = this.followee;
    var follower = Soundclown.currentUser;
    event.preventDefault();

    var $submit = $(event.currentTarget);
    var $scope = $submit.closest("form");
    followee.followers().remove(follower);
    var follow = Soundclown.inFollows.findWhere({ followee_id: followee.id, follower_id: follower.id });
    follow.destroy();
    this.render();
  },

  render: function() {
    var renderedContent = this.template({
      user: this.followee
    });

    this.$el.html(renderedContent);
    return this;
  }

})