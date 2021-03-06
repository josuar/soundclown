json.(reblog,
:id, :reblogger_id,
:rebloggable_id, :rebloggable_type,
:notifications_count
)

reblogged_item = reblog.rebloggable

if reblog.rebloggable_type == "Track"
  json.reblogged_track do
    json.id reblogged_item.id
    json.title reblogged_item.title
    json.artist reblogged_item.artist
    json.likes_count reblogged_item.likes_count
    json.reblogs_count reblogged_item.reblogs_count
    json.comments_count reblogged_item.comments_count
    json.poster do
      json.id reblogged_item.poster.id
      json.username reblogged_item.poster.username
    end
  end
elsif reblog.rebloggable_type == "Playlist"
  json.reblogged_playlist do
    json.id reblogged_item.id
    json.title reblogged_item.title
    json.likes_count reblogged_item.likes_count
    json.reblogs_count reblogged_item.reblogs_count
    json.creator do
      json.id reblogged_item.creator.id
      json.username reblogged_item.creator.username
    end
    json.tracks do
      json.array!(reblogged_item.tracks) do |track|
        json.id track.id
        json.title track.title
        json.artist track.artist
        json.likes_count track.likes_count
        json.reblogs_count track.reblogs_count
        json.comments_count track.comments_count
        json.poster do
          json.id track.poster.id
          json.username track.poster.username
        end
      end
    end
  end
end
