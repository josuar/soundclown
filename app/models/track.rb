class Track < ActiveRecord::Base


  has_many :comments

  has_many :playlists, through: :playlist_tracks, source: :playlist
  has_many :reblogs, as: :rebloggable, dependent: :destroy
  has_many :likes, as: :likeable, dependent: :destroy

  has_many :rebloggers, through: :reblogs, source: :tracks
  has_many :likers, through: :likes, source: :likes

  has_many(
    :playlist_tracks,
    class_name: "PlaylistTrack",
    foreign_key: :track_id,
    primary_key: :id
  )

  belongs_to(
    :poster,
    class_name: "User",
    foreign_key: :poster_id,
    primary_key: :id,
    inverse_of: :tracks
  )

  validates :title, :artist, :poster, presence: true

end
