class AddColumnsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :photo, :string
    add_column :users, :location, :string
    add_column :users, :headline, :string
    add_column :users, :link, :string
  end
end
