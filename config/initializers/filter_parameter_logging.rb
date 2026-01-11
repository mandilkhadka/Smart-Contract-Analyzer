# Be sure to restart your server when you modify this file.

# Configure parameters to be partially matched (e.g. passw matches password) and filtered from the log file.
# Use this to limit dissemination of sensitive information.
# See the ActiveSupport::ParameterFilter documentation for supported notations and behaviors.
Rails.application.config.filter_parameters += [
  :passw, :secret, :token, :_key, :crypt, :salt, :certificate, :otp, :ssn,
  :api_key, :apikey, :api_key_id, :gemini_api_key, :cloudinary_url
]

# Filter sensitive environment variables from logs
Rails.application.config.filter_parameters += [
  /GEMINI_API_KEY/i,
  /CLOUDINARY_URL/i,
  /DATABASE_PASSWORD/i,
  /RAILS_MASTER_KEY/i,
  /SECRET_KEY_BASE/i
]
