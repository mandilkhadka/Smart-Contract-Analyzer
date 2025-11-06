class ContractsController < ApplicationController
  def new
    @contract = Contract.new
  end

  def create
    @contract = Contract.new(strong_params)
    if @contract.save
      process_file(@contract.file)
      @contract.update(generated_output: @response.content)
      redirect_to contract_path(@contract)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def process_file(file)
    prompt = "Give me two line sarcastic answer"
    @ruby_llm_chat = RubyLLM.chat(model: "gemini-2.5-flash")
    @ruby_llm_chat.with_instructions(prompt)
    @response = @ruby_llm_chat.ask(@contract.question, with: @contract.file.url)
  end

  def show
    @contract = Contract.find(params[:id])
  end

  private

  def strong_params
    params.require(:contract).permit(:file, :question)
  end
end
