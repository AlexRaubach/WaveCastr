require 'rails_helper'

RSpec.describe Guest, type: :model do

  context "attributes" do
    let(:guest) { Guest.new(name: "Oliver") }
  
    it "has a name" do
      expect(guest.name).to eq "Oliver"
    end
  end
end
