class Recipe < ApplicationRecord
    belongs_to :user
    belongs_to :source
    has_many :reviews, dependent: :delete_all

    validates :name, length: { minimum: 3 }
    validates :meal_course, presence: true
    validates :instructions, length: { minimum: 10}
    validates :source_id, presence: true
end
