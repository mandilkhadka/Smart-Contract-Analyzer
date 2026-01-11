class PagesController < ActionController::Base
  def index
    render file: Rails.root.join('app', 'views', 'layouts', 'application.html.erb'), layout: false
  end
end
