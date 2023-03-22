class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :meal_course, :instructions, :notes, :minutes_to_complete, :user_id, :source

  belongs_to :user
  belongs_to :source
  has_many :reviews
end
