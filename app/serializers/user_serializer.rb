class UserSerializer < ActiveModel::Serializer
  attributes :id, :username
  has_many :recipes
  has_many :reviews
end
