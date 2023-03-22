class SourceSerializer < ActiveModel::Serializer
  attributes :id, :source_location
  
  has_many :recipes
  has_many :users, through: :recipes
end
