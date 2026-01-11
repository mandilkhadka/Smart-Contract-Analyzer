require 'pdf-reader'

class PdfExtractor
  def initialize(file_blob)
    @file_blob = file_blob
  end

  def extract
    return nil unless @file_blob.attached?
    return nil unless pdf_file?

    text_content = ""
    
    begin
      io = @file_blob.download
      reader = PDF::Reader.new(io)
      
      reader.pages.each do |page|
        text_content += page.text + "\n\n"
      end
      
      text_content.strip
    rescue => e
      Rails.logger.error "PDF extraction error: #{e.message}"
      nil
    ensure
      io&.close if io.respond_to?(:close)
    end
  end

  private

  def pdf_file?
    return false unless @file_blob.attached?
    content_type = @file_blob.content_type
    content_type == 'application/pdf' || @file_blob.filename.to_s.downcase.end_with?('.pdf')
  end
end
