class CreateContracts < ActiveRecord::Migration[7.1]
  def change
    create_table :contracts do |t|
      t.text :question

      t.timestamps
    end
  end
end
