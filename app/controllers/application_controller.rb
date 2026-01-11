class ApplicationController < ActionController::Base
  include ActionController::MimeResponds
  
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from StandardError, with: :handle_error

  private

  def record_not_found
    respond_to do |format|
      format.json { render json: { error: 'Record not found' }, status: :not_found }
      format.html { render file: Rails.root.join('public', '404.html'), status: :not_found }
    end
  end

  def handle_error(exception)
    Rails.logger.error exception.message
    Rails.logger.error exception.backtrace.join("\n")
    
    # Don't expose sensitive error details in production
    error_message = Rails.env.development? ? exception.message : "An error occurred. Please try again later."
    
    respond_to do |format|
      format.json { render json: { error: error_message }, status: :internal_server_error }
      format.html { render file: Rails.root.join('public', '500.html'), status: :internal_server_error }
    end
  end
end
