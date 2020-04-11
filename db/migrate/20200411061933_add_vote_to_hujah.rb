class AddVoteToHujah < ActiveRecord::Migration[6.0]
  def change
    add_column :hujahs, :vote, :integer, default: nil
  end
end
