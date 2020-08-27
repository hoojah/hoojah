FactoryBot.define do
  factory :vote do
    association :user
    association :hujah

    trait :agree do
      vote { [1] }
    end

    trait :neutral do
      vote { [2] }
    end

    trait :disagree do
      vote { [3] }
    end
  end
end
