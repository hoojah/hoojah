FactoryBot.define do
  factory :hujah do
    association :user
    body { "This is a generic hoojah" }
    agree_count  { 0 }
    neutral_count { 0 }
    disagree_count { 0 }
    vote { 0 }

    trait :has_parent do
      after(:create) do |hujah| 
        parent_hujah = create(:hujah)
        hujah.update(parent_id: parent_hujah.id)
      end
    end

    trait :has_child do
      after(:create) do |hujah| 
        child_hujah = create(:hujah)
        child_hujah.update!(parent_id: hujah.id)
      end
    end
  end
end
