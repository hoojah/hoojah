class CreateNotifications < ActiveRecord::Migration[6.0]
  def change
    create_table :notifications do |t|
      t.references :user, null: false, foreign_key: true
      t.string :body
      t.integer :model_type, null: false
      t.boolean :read, default: false
      t.integer :hoojah_id
      t.integer :subject_user_id

      t.timestamps
    end
  end
end
