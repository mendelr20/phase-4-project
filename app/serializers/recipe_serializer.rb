class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :meal_course, :instructions, :notes, :minutes_to_complete
  has_many :reviews
end
