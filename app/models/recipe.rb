class Recipe < ApplicationRecord
    belongs_to :user
    belongs_to :source
    has_many :reviews, dependent: :delete_all
end
