module GuestsHelper
  def current_guest?(guest)
    guest.id == cookies.signed[:guest_id]
  end
end
