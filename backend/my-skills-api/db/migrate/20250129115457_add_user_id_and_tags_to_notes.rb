class AddUserIdAndTagsToNotes < ActiveRecord::Migration[8.0]
  def change
    add_reference :notes, :user, null: false, foreign_key: true
    add_column :notes, :tags, :string
  end
end
