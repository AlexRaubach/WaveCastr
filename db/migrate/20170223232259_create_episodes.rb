class CreateEpisodes < ActiveRecord::Migration[5.0]
  def change
    create_table :episodes do |t|
      t.string :name, { null: false }
      t.text :description
      t.string :sharable_link, { null: false, limit: 10 }
      t.integer :host_id
      
      t.timestamps
    end
  end
end
