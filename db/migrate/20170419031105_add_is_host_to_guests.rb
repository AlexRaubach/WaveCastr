class AddIsHostToGuests < ActiveRecord::Migration[5.0]
  def change
    add_column :guests, :is_host, :boolean, { default: false }
  end
end
