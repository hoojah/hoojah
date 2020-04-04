puts "\n============================================="
puts " 🌱  Seed dummy data"
puts "============================================="


# ---------
#  Hoojahs
# ---------

print "\nSeeding hoojahs..."

### 1
Hujah.create(
  body: "We all should sleep during daytime and work at nighttime for productivity reasons.",
  agree_count: rand(0-100),
  neutral_count: rand(0-100),
  disagree_count: rand(0-100)
)
### 2
Hujah.create(
  body: "Because we are nocturnal.",
  agree_count: rand(0-100),
  neutral_count: rand(0-100),
  disagree_count: rand(0-100),
  parent_id: 1
)
### 3
Hujah.create(
  body: "The sky is blue.",
  agree_count: rand(0-100),
  neutral_count: rand(0-100),
  disagree_count: rand(0-100)
)
### 4
Hujah.create(
  body: "We need to absorb energy from the sun, because we are all from Krypton.",
  agree_count: rand(0-100),
  neutral_count: rand(0-100),
  disagree_count: rand(0-100),
  parent_id: 1
)
### 5
Hujah.create(
  body: "Going outside the house during the current COVID-19 outbreak is dangerous.",
  agree_count: rand(0-100),
  neutral_count: rand(0-100),
  disagree_count: rand(0-100)
)
### 6
Hujah.create(
  body: "Malay ethnic music is dying.",
  agree_count: rand(0-100),
  neutral_count: rand(0-100),
  disagree_count: rand(0-100)
)
### 7
Hujah.create(
  body: "Refined sugar is bad for our health.",
  agree_count: rand(0-100),
  neutral_count: rand(0-100),
  disagree_count: rand(0-100)
)
### 8
Hujah.create(
  body: "Democracy is dead in Malaysia.",
  agree_count: rand(0-100),
  neutral_count: rand(0-100),
  disagree_count: rand(0-100)
)
### 9
Hujah.create(
  body: "No it's not. It has just evolved.",
  agree_count: rand(0-100),
  neutral_count: rand(0-100),
  disagree_count: rand(0-100),
  parent_id: 6
)
### 10
Hujah.create(
  body: "If you are referring to the recent power move by the YDPA, it was done in accordance to the law. Malaysia uses a parliamentary democracy with a federal constitutional monarch. It's still working fine.",
  agree_count: rand(0-100),
  neutral_count: rand(0-100),
  disagree_count: rand(0-100),
  parent_id: 8
)
### 11
Hujah.create(
  body: "There's a reason why this is happening. People move on to new trends. If it's not in anymore, it's not in. It might make a comeback in the future, but then again, it will fall out of trend again.",
  agree_count: rand(0-100),
  neutral_count: rand(0-100),
  disagree_count: rand(0-100),
  parent_id: 6
)
### 12
Hujah.create(
  body: "It was never alive in the first place.",
  agree_count: rand(0-100),
  neutral_count: rand(0-100),
  disagree_count: rand(0-100),
  parent_id: 8
)
### 13
Hujah.create(
  body: "Tuhan jadikan waktu siang untuk manusia mencari rezeki, dan waktu malam untuk manusia berehat.",
  agree_count: rand(0-100),
  neutral_count: rand(0-100),
  disagree_count: rand(0-100),
  parent_id: 1
)
### 14
Hujah.create(
  body: "Setuju. Tak banyak komposer buat lagu etnik Melayu dah sekarang.",
  agree_count: rand(0-100),
  neutral_count: rand(0-100),
  disagree_count: rand(0-100),
  parent_id: 6
)
### 15
Hujah.create(
  body: "Batman is not a real super hero.",
  agree_count: rand(0-100),
  neutral_count: rand(0-100),
  disagree_count: rand(0-100)
)
### 16
Hujah.create(
  body: "No man-made system is perfect. Running a democracy system in a multi-racial society like in Malaysia is very challenging, but it's still very much alive.",
  agree_count: rand(0-100),
  neutral_count: rand(0-100),
  disagree_count: rand(0-100),
  parent_id: 8
)
### 17
Hujah.create(
  body: "We should teach science & mathematics in English as early as in primary school.",
  agree_count: rand(0-100),
  neutral_count: rand(0-100),
  disagree_count: rand(0-100)
)

print " done! 👍🏻\n"

puts "\nSeeding complete! 👍🏻 ✨\n\n"
