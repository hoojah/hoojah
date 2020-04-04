class CreateHujahs < ActiveRecord::Migration[6.0]
  def change
    create_table :hujahs do |t|
      t.text :body, null: false
      t.integer :agree_count, default: 0
      t.integer :neutral_count, default: 0
      t.integer :disagree_count, default: 0
      t.integer :parent_id

      t.timestamps
    end
  end
end
