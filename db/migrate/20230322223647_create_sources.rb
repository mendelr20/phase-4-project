class CreateSources < ActiveRecord::Migration[6.1]
  def change
    create_table :sources do |t|
      t.string :source_location

      t.timestamps
    end
  end
end
