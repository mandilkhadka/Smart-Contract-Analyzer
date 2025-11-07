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

  def process_file(_)
    prompt = <<~PROMPT
      You are an AI-powered contract analysis engine.

      Your task:
      Analyze the uploaded contract text and produce a detailed summary including:
      1. **Overall Risk Score (0–100)** — calculated based on the number and severity of risks.
      2. **Risk Breakdown**:
        - Critical Risks (⚠️): Clauses causing major exposure (Termination, Indemnity, Governing Law, etc.)
        - Moderate Risks (⚠): Clauses needing negotiation (Confidentiality, Payment Terms, etc.)
        - Low Risks (🟢): Standard clauses with minor impact (Liability Cap, Notices, etc.)
      3. **Clause Detection and Summaries**:
        - Termination
        - Payment
        - Confidentiality
        - Liability
        - Governing Law
        - Intellectual Property
        - Dispute Resolution

            Return valid JSON only:
      {
        "critical_risks": [],
        "moderate_risks": [],
        "low_risks": [],
        "summary": ""
      }
      Must not include any extra text, markdown, or explanation — only return valid JSON.
    PROMPT

    @ruby_llm_chat = RubyLLM.chat(model: "gemini-2.5-flash")
    @ruby_llm_chat.with_instructions(prompt)
    @response = @ruby_llm_chat.ask(@contract.question, with: @contract.file.url)
json_text = @response.content.is_a?(String) ? @response.content : @response.content.to_s
analysis = JSON.parse(json_text) rescue {}


    @critical = analysis["critical_risks"] || []
    @moderate = analysis["moderate_risks"] || []
    @low = analysis["low_risks"] || []

    @risk_score = calculate_risk_score(@critical, @moderate, @low)
    @color = risk_color(@risk_score)
    @summary = analysis["summary"]
  end

def show
  @contract = Contract.find(params[:id])

  begin
    analysis = JSON.parse(@contract.generated_output)
  rescue
    analysis = {}
  end

  @critical = analysis["critical_risks"] || []
  @moderate = analysis["moderate_risks"] || []
  @low      = analysis["low_risks"] || []
  @summary  = analysis["summary"] || "No summary available."

  @risk_score = calculate_risk_score(@critical, @moderate, @low)
  @color      = risk_color(@risk_score)
end


  private

  def strong_params
    params.require(:contract).permit(:file, :question)
  end

  def calculate_risk_score(critical, moderate, low)
    score = 100 - (critical.size * 20 + moderate.size * 10 + low.size * 3)
    score.clamp(0, 100)
  end

  def risk_color(score)
    case score
    when 0..50 then "text-red-600"
    when 51..80 then "text-yellow-500"
    else "text-green-600"
    end
  end

end
