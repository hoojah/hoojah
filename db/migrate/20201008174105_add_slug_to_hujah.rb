class AddSlugToHujah < ActiveRecord::Migration[6.0]
  def change
    add_column :hujahs, :slug, :string
    add_index :hujahs, :slug, unique: true
  end
end
