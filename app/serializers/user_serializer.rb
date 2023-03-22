class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest

  has_many :recipes
  has_many :reviews
  has_many :sources, through: :recipes
end
