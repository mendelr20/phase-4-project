class User < ApplicationRecord
    has_many :recipes
    has_many :reviews
    has_many :sources, -> { distinct }, through: :recipes
end
