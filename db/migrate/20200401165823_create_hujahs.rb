class CreateHujahs < ActiveRecord::Migration[6.0]
  def change
    create_table :hujahs do |t|
      t.text :body, null: false

      t.timestamps
    end
  end
end
