class AddNullConstraintToEpisodesEncoder < ActiveRecord::Migration[5.0]
  def change
    change_column_null :episodes, :encoder, false, 'mp3'
  end
end
