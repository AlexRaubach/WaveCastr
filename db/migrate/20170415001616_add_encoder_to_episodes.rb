class AddEncoderToEpisodes < ActiveRecord::Migration[5.0]
  def change
    add_column :episodes, :encoder, :string, { limit: 10, default: 'mp3' }
  end
end
