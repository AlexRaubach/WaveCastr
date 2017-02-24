class CreateTracks < ActiveRecord::Migration[5.0]
  def change
    create_table :tracks do |t|
      t.integer :recordable_id
      t.string :recordable_type, { limit: 10 }
      t.string :s3_string

      t.timestamps
    end
  end
end
