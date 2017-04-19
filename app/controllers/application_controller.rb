class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  def assign_guest_cookies(guest)
    cookies.signed['guest_id'] = guest.id
    cookies.signed['is_host'] = guest.is_host
  end

  def after_sign_in_path_for(_resource)
    user_path(current_user)
  end

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end

  protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    end
end
