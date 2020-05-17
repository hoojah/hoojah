FactoryBot.define do
  factory :user do
    sequence :username do |n|
      "username#{n}"
    end
    sequence :email do |n|
      "user_#{n}@hoojah.com"
    end

    full_name { "FullName" }
    password { 'hoojah' }
    password_confirmation { 'hoojah' }
  end
end
