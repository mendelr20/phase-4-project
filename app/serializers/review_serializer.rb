class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :recipe_id, :review_text
  belongs_to :user
  belongs_to :recipe
end
