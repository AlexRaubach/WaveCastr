module GuestsHelper
  def current_guest
    Guest.find_by(id: cookies.signed[:guest_id])
  end
end
