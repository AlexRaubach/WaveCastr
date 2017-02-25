FactoryGirl.define do
  factory :user do
    name "ollieshmollie"
    email "oliver@gmail.com"
    password "password"
  end

  factory :episode do
    name "My test podcast"
    description "My first one!" 
    sharable_link "test"
  end

  factory :guest do
    name "Alex"
  end

end
