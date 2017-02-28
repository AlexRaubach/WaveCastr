module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :guest

    def connect
      self.guest = Guest.find_by(id: cookies.signed[:guest_id])
    end
  end
end
