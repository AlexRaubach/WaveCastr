# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(name: "ollieshmollie", email: "oliverduncan@icloud.com", password: "password") 
9.times { User.create(name: Faker::Internet.user_name, email: Faker::Internet.email, password: "password") }

User.all.each do |user|
  10.times { user.episodes.create(name: Faker::Book.title, description: Faker::Lorem.sentence) }
end
