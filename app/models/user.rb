class User < ApplicationRecord
    has_secure_password

    has_many :recipes
    has_many :reviews, through: :recipes
    has_many :sources, -> { distinct }, through: :recipes

    validates :username, length: { minimum: 3 }, uniqueness: true
end
