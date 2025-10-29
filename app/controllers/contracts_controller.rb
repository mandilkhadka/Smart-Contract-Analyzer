class ContractsController < ApplicationController
  def new
    @contract = Contract.new
  end

  def create
    @contract = Contract.new(strong_params)
  end


  private

  def strong_params
    params.require(:contract).permit(:file, :question)
  end
end
