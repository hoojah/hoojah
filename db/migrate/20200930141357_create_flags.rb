class CreateFlags < ActiveRecord::Migration[6.0]
  def change
    create_table :flags do |t|
      t.references :user, null: false, foreign_key: true
      t.references :hujah, null: false, foreign_key: true
      t.integer :subject

      t.timestamps
    end
  end
end
