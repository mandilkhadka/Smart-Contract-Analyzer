module Api
  module V1
    class ContractsController < ActionController::API
      include ActionController::MimeResponds
      include Rails.application.routes.url_helpers
      
      rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
      rescue_from StandardError, with: :handle_error
      
      def default_url_options
        { host: request.host_with_port }
      end
      def show
        @contract = Contract.find(params[:id])
        
        # Check if analysis is complete
        if @contract.generated_output.blank?
        render json: {
          id: @contract.id,
          question: @contract.question,
          file_url: @contract.file.attached? ? rails_blob_path(@contract.file, only_path: false, host: request.host_with_port) : nil,
          file_name: @contract.file.attached? ? @contract.file.filename.to_s : nil,
          status: 'processing',
          analysis: nil
        }
          return
        end
        
        begin
          analysis = JSON.parse(@contract.generated_output)
        rescue
          analysis = {}
        end

        critical = analysis["critical_risks"] || []
        moderate = analysis["moderate_risks"] || []
        low = analysis["low_risks"] || []
        summary = analysis["summary"] || "No summary available."

        risk_score = calculate_risk_score(critical, moderate, low)
        risk_color = risk_color_class(risk_score)

        render json: {
          id: @contract.id,
          question: @contract.question,
          file_url: @contract.file.attached? ? rails_blob_path(@contract.file, only_path: false, host: request.host_with_port) : nil,
          file_name: @contract.file.attached? ? @contract.file.filename.to_s : nil,
          status: 'completed',
          analysis: {
            critical_risks: critical,
            moderate_risks: moderate,
            low_risks: low,
            summary: summary,
            risk_score: risk_score,
            risk_color: risk_color
          },
          created_at: @contract.created_at,
          updated_at: @contract.updated_at
        }
      end

      def create
        @contract = Contract.new(strong_params)
        
        if @contract.save
          process_file_async(@contract)
          render json: {
            id: @contract.id,
            status: 'processing',
            message: 'Contract is being analyzed'
          }, status: :created
        else
          render json: {
            errors: @contract.errors.full_messages
          }, status: :unprocessable_entity
        end
      end

      def export
        @contract = Contract.find(params[:id])
        
        begin
          analysis = JSON.parse(@contract.generated_output)
        rescue
          analysis = {}
        end

        pdf_data = PdfGenerator.new(@contract, analysis).generate
        
        send_data pdf_data,
          filename: "contract_analysis_#{@contract.id}.pdf",
          type: 'application/pdf',
          disposition: 'attachment'
      end

      private

      def strong_params
        params.require(:contract).permit(:file, :question)
      end

      def process_file_async(contract)
        # Process synchronously for now, can be moved to background job later
        process_file(contract)
        contract.update(generated_output: @response.content)
      end

      def process_file(contract)
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

        # Extract text from PDF if needed
        file_url = contract.file.url
        extracted_text = PdfExtractor.new(contract.file).extract if contract.file.attached?
        question_text = contract.question || "Analyze this contract and provide a risk assessment."

        @ruby_llm_chat = RubyLLM.chat(model: "gemini-2.5-flash")
        @ruby_llm_chat.with_instructions(prompt)
        
        if extracted_text.present?
          @response = @ruby_llm_chat.ask("#{question_text}\n\nContract text:\n#{extracted_text}")
        else
          @response = @ruby_llm_chat.ask(question_text, with: file_url)
        end
      end

      def calculate_risk_score(critical, moderate, low)
        score = 100 - (critical.size * 20 + moderate.size * 10 + low.size * 3)
        score.clamp(0, 100)
      end

      def risk_color_class(score)
        case score
        when 0..50 then "critical"
        when 51..80 then "moderate"
        else "low"
        end
      end

      def record_not_found
        render json: { error: 'Record not found' }, status: :not_found
      end

      def handle_error(exception)
        Rails.logger.error exception.message
        Rails.logger.error exception.backtrace.join("\n")
        render json: { error: exception.message }, status: :internal_server_error
      end
    end
  end
end
