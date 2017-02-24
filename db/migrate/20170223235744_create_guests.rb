class CreateGuests < ActiveRecord::Migration[5.0]
  def change
    create_table :guests do |t|
      t.string :name, { null: false, limit: 50 }
      t.integer :episode_id 
        
      t.timestamps
    end
  end
end
