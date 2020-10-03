FactoryBot.define do
  factory :notification do
    user { nil }
    body { "MyString" }
    model_type { 1 }
    read { false }
    hoojah_id { 1 }
    subject_user_id { 1 }
  end
end
