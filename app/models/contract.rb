class Contract < ApplicationRecord
  has_one_attached :file
  
  # Validate file presence
  validates :file, presence: true
  
  # Validate file type and size
  validate :file_type_validation
  validate :file_size_validation
  
  private
  
  def file_type_validation
    return unless file.attached?
    
    allowed_types = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
    unless allowed_types.include?(file.content_type)
      errors.add(:file, 'must be a PDF or image file (JPEG/PNG)')
    end
  end
  
  def file_size_validation
    return unless file.attached?
    
    # Limit file size to 10MB
    max_size = 10.megabytes
    if file.byte_size > max_size
      errors.add(:file, "must be less than #{max_size / 1.megabyte}MB")
    end
  end
end
