class AddUserIdToHujahs < ActiveRecord::Migration[6.0]
  def change
    add_reference :hujahs, :user, null: false, foreign_key: true
  end
end
