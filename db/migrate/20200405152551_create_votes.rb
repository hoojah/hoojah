class CreateVotes < ActiveRecord::Migration[6.0]
  def change
    create_table :votes do |t|
      t.integer :hujah_id, null: false
      t.integer :vote, null: false, array: true

      t.timestamps
    end
  end
end
