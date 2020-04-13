class AddColumnsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :photo, :string, default: ""
    add_column :users, :location, :string, default: ""
    add_column :users, :headline, :string, default: ""
    add_column :users, :link, :string, default: ""
  end
end
