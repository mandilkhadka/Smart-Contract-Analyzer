class ContractsController < ApplicationController
  def new
    @contract = Contract.new
  end

  def create
    @contract = Contract.new(strong_params)
      if @contract.save
        if @contract.file.attached?
          process_file(@contract.file)
        else
          send_question
        end
        Contract.create
      end
  end


  private

  def strong_params
    params.require(:contract).permit(:file, :question)
  end
end
