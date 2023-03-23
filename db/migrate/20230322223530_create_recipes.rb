class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :meal_course
      t.text :instructions
      t.string :notes
      t.integer :minutes_to_complete
      t.timestamps
    end
  end
end
