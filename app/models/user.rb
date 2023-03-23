class User < ApplicationRecord
    has_secure_password

    has_many :reviews
    has_many :recipes, through: :reviews
 
    validates :username, length: { minimum: 3 }, uniqueness: true
end
