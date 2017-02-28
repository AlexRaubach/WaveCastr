class AddStatusToGuests < ActiveRecord::Migration[5.0]
  def change
    add_column :guests, :status, :string, { default: 'waiting', limit: 10 }
  end
end
