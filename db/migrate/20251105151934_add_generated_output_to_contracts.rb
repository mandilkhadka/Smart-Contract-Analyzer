class AddGeneratedOutputToContracts < ActiveRecord::Migration[7.1]
  def change
    add_column :contracts, :generated_output, :text
  end
end
