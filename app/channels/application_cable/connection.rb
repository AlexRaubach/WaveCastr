module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :guest

    def connect
      puts "Finding guest..."
      self.guest = Guest.find_by(id: cookies.signed[:guest_id])
      p self.guest
    end
  end
end
