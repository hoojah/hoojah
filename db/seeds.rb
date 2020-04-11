

# SEED_DATA = JSON.load File.read('config/seed_data.json')
PASSWORD = "1234567890"


puts "\n============================================="
puts " 🌱  Seed dummy data"
puts "============================================="


# -------
#  Users
# -------

print "\nSeeding users..."

# users = SEED_DATA["users"]

User.create(
  full_name: "Rudzainy Rahman",
  email: "hello@rudzainy.com",
  username: "rudzainy",
  password: PASSWORD,
  password_confirmation: PASSWORD
)

User.create(
  full_name: "Hoojah",
  email: "hello@hoojah.my",
  username: "hoojah",
  password: PASSWORD,
  password_confirmation: PASSWORD
)

# User.create(
#   full_name: "Tom Cruise",
#   email: "tom@cruise.com",
#   username: "TomCruise",
#   password: PASSWORD,
#   password_confirmation: PASSWORD
# )


# ---------
#  Hoojahs
# ---------

print "\nSeeding hoojahs..."

### 1
User.second.hujahs.create(
  body: "Hoojah is beneficial to Malaysians.",
  agree_count: 0,
  neutral_count: 0,
  disagree_count: 0
)
### 2
# User.third.hujahs.create(
#   body: "We all should sleep during daytime and work at nighttime for productivity reasons.",
#   agree_count: rand(0-100),
#   neutral_count: rand(0-100),
#   disagree_count: rand(0-100)
# )
# ### 3
# User.first.hujahs.create(
#   body: "Because we are nocturnal.",
#   agree_count: rand(0-100),
#   neutral_count: rand(0-100),
#   disagree_count: rand(0-100),
#   parent_id: 2
# )
# ### 4
# User.third.hujahs.create(
#   body: "The sky is blue.",
#   agree_count: rand(0-100),
#   neutral_count: rand(0-100),
#   disagree_count: rand(0-100)
# )
# ### 5
# User.first.hujahs.create(
#   body: "We need to absorb energy from the sun, because we are all from Krypton.",
#   agree_count: rand(0-100),
#   neutral_count: rand(0-100),
#   disagree_count: rand(0-100),
#   parent_id: 2
# )
# ### 6
# User.third.hujahs.create(
#   body: "Going outside the house during the current COVID-19 outbreak is dangerous.",
#   agree_count: rand(0-100),
#   neutral_count: rand(0-100),
#   disagree_count: rand(0-100)
# )
# ### 7
# User.first.hujahs.create(
#   body: "Malay ethnic music is dying.",
#   agree_count: rand(0-100),
#   neutral_count: rand(0-100),
#   disagree_count: rand(0-100)
# )
# ### 8
# User.third.hujahs.create(
#   body: "Refined sugar is bad for our health.",
#   agree_count: rand(0-100),
#   neutral_count: rand(0-100),
#   disagree_count: rand(0-100)
# )
# ### 9
# User.first.hujahs.create(
#   body: "Democracy is dead in Malaysia.",
#   agree_count: rand(0-100),
#   neutral_count: rand(0-100),
#   disagree_count: rand(0-100)
# )
# ### 10
# User.third.hujahs.create(
#   body: "No it's not. It has just evolved.",
#   agree_count: rand(0-100),
#   neutral_count: rand(0-100),
#   disagree_count: rand(0-100),
#   parent_id: 7
# )
# ### 11
# User.first.hujahs.create(
#   body: "If you are referring to the recent power move by the YDPA, it was done in accordance to the law. Malaysia uses a parliamentary democracy with a federal constitutional monarch. It's still working fine.",
#   agree_count: rand(0-100),
#   neutral_count: rand(0-100),
#   disagree_count: rand(0-100),
#   parent_id: 9
# )
# ### 12
# User.third.hujahs.create(
#   body: "There's a reason why this is happening. People move on to new trends. If it's not in anymore, it's not in. It might make a comeback in the future, but then again, it will fall out of trend again.",
#   agree_count: rand(0-100),
#   neutral_count: rand(0-100),
#   disagree_count: rand(0-100),
#   parent_id: 7
# )
# ### 13
# User.first.hujahs.create(
#   body: "It was never alive in the first place.",
#   agree_count: rand(0-100),
#   neutral_count: rand(0-100),
#   disagree_count: rand(0-100),
#   parent_id: 9
# )
# ### 14
# User.third.hujahs.create(
#   body: "Tuhan jadikan waktu siang untuk manusia mencari rezeki, dan waktu malam untuk manusia berehat.",
#   agree_count: rand(0-100),
#   neutral_count: rand(0-100),
#   disagree_count: rand(0-100),
#   parent_id: 2
# )
# ### 15
# User.first.hujahs.create(
#   body: "Setuju. Tak banyak komposer buat lagu etnik Melayu dah sekarang.",
#   agree_count: rand(0-100),
#   neutral_count: rand(0-100),
#   disagree_count: rand(0-100),
#   parent_id: 7
# )
# ### 16
# User.third.hujahs.create(
#   body: "Batman is not a real super hero.",
#   agree_count: rand(0-100),
#   neutral_count: rand(0-100),
#   disagree_count: rand(0-100)
# )
# ### 17
# User.first.hujahs.create(
#   body: "No man-made system is perfect. Running a democracy system in a multi-racial society like in Malaysia is very challenging, but it's still very much alive.",
#   agree_count: rand(0-100),
#   neutral_count: rand(0-100),
#   disagree_count: rand(0-100),
#   parent_id: 9
# )
# ### 18
# User.third.hujahs.create(
#   body: "We should teach science & mathematics in English as early as in primary school.",
#   agree_count: rand(0-100),
#   neutral_count: rand(0-100),
#   disagree_count: rand(0-100)
# )

print " done! 👍🏻\n"

puts "\nSeeding complete! 👍🏻 ✨\n\n"
