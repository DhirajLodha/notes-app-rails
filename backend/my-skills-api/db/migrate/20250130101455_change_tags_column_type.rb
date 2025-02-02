class ChangeTagsColumnType < ActiveRecord::Migration[8.0]
  def change
    remove_column :notes, :tags
    add_column :notes, :tags, :string, array: true, default: []
  end
end

