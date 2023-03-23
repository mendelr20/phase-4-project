class Recipe < ApplicationRecord
    has_many :reviews, dependent: :delete_all

    validates :name, length: { minimum: 3 }
    validates :meal_course, presence: true
    validates :instructions, length: { minimum: 10}
end
