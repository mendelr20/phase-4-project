class Recipe < ApplicationRecord
    has_many :reviews, dependent: :delete_all
    has_many :users, through: :reviews
   
    validates :name, length: { minimum: 3 }
    validates :meal_course, presence: true
    validates :minutes_to_complete, numericality: { greater_than: 0 }
    validates :instructions, length: { minimum: 10}
end
