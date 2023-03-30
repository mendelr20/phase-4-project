class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :meal_course, :instructions, :notes, :minutes_to_complete
  has_many :reviews

  def reviews
    object.reviews.map do |review|
      {
        id: review.id,
        user: {
          id: review.user.id,
          username: review.user.username
        },
        review_text: review.review_text
      }
    end
  end
end