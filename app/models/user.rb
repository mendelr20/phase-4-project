class User < ApplicationRecord
    has_secure_password
    
    has_many :reviews, dependent: :delete_all
    has_many :ratings, dependent: :delete_all
    has_many :recipes, through: :reviews

    validates :username, presence: true,  length: { minimum: 3 }, uniqueness: true
end
