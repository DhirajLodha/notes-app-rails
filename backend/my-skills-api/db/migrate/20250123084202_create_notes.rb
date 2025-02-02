class CreateNotes < ActiveRecord::Migration[8.0]
  def change
    create_table :notes do |t|
      t.string :title, null: false
      t.string :description, null: false

      t.timestamps
    end
  end
end
