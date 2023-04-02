class User < ApplicationRecord
    has_secure_password
  
    has_many :reviews, dependent: :delete_all
    has_many :recipes, through: :reviews
  
    validates :username, presence: true, length: { minimum: 3 }, uniqueness: true
    validates :password, presence: true, length: { minimum: 8 }, format: { with: /\A(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[[:^alnum:]])/x, message: "must include at least one lowercase letter, one uppercase letter, one digit, and one special character" }
  end
  