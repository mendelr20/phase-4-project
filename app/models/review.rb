class Review < ApplicationRecord
    
    belongs_to :user
    belongs_to :recipe
    
    validates :review_text, presence: true, length: { minimum: 4 }
end
  