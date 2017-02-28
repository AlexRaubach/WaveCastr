class RemoveRecordableTypeFromTracks < ActiveRecord::Migration[5.0]
  def change
        remove_column :tracks, :recordable_type
  end
end
