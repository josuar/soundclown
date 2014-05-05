Soundclown.Models.Track = Backbone.Model.extend({
  urlRoot: "/api/tracks",

  parse: function(jsonResp) {
    if (jsonResp["poster"]) {
      jsonResp["poster"] = Soundclown.users.add(jsonResp["poster"])
    }

    return jsonResp;
  }

});
