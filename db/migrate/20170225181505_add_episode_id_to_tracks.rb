class AddEpisodeIdToTracks < ActiveRecord::Migration[5.0]
  def change
    add_column :tracks, :episode_id, :integer
  end
end
