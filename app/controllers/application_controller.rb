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
    respond_to do |format|
      format.json { render json: { error: exception.message }, status: :internal_server_error }
      format.html { render file: Rails.root.join('public', '500.html'), status: :internal_server_error }
    end
  end
end
