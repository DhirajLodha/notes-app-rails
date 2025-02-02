class Note < ApplicationRecord
  validates :title, presence: true, length: { minimum: 6, message: "Its must be 6 characters long" }
  validates :description, presence: true, length: { minimum: 10, message: "Its must be 10 characters long" }

  belongs_to :user
end
