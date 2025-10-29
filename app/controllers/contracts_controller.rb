class ContractsController < ApplicationController
  def new
    @contract = Contract.new
  end
end
