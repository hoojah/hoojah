class AddVoteCountsToHujah < ActiveRecord::Migration[6.0]
  def change
    add_column :hujahs, :agree_count, :integer, default: 0
    add_column :hujahs, :neutral_count, :integer, default: 0
    add_column :hujahs, :disagree_count, :integer, default: 0
  end
end
