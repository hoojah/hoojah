

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

#1
rudzainy = User.create!(
  full_name: "Rudzainy Rahman",
  email: "hello@rudzainy.com",
  username: "rudzainy",
  password: PASSWORD,
  password_confirmation: PASSWORD,
  photo: "https://res.cloudinary.com/hoojah/image/upload/v1586917414/fkmfd5lfkqdpdfvvh0x3.png"
)

#2
hoojah = User.create!(
  full_name: "Hoojah",
  email: "hello@hoojah.my",
  username: "hoojah",
  password: PASSWORD,
  password_confirmation: PASSWORD,
  photo: "https://res.cloudinary.com/hoojah/image/upload/v1586917414/xecjnelhwisrdo4k8bcl.png"
)

#3
kurus = User.create!(
  full_name: "Tom Kurus",
  email: "tom@kurus.com",
  username: "TomKurus",
  password: PASSWORD,
  password_confirmation: PASSWORD,
  photo: "https://res.cloudinary.com/hoojah/image/upload/v1586917414/tom_kurus_zpqm7u.png"
)

#4
hacks = User.create!(
  full_name: "Tom Hacks",
  email: "tom@hacks.com",
  username: "tomhacks",
  password: PASSWORD,
  password_confirmation: PASSWORD,
  photo: "https://res.cloudinary.com/hoojah/image/upload/v1586917414/tom_hacks_sqrexr.png"
)

#5
party = User.create!(
  full_name: "Tom Party",
  email: "tom@party.com",
  username: "tomparty",
  password: PASSWORD,
  password_confirmation: PASSWORD,
  photo: "https://res.cloudinary.com/hoojah/image/upload/v1586917414/tom_party_wxfii5.png"
)

#6
netherlands = User.create!(
  full_name: "Tom Netherlands",
  email: "tom@netherlands.com",
  username: "TomNetherlands1996",
  password: PASSWORD,
  password_confirmation: PASSWORD,
  photo: "https://res.cloudinary.com/hoojah/image/upload/v1586917414/tom_netherlands_qbszsg.png"
)


# ---------
#  Hoojahs
# ---------

print "\nSeeding hoojahs..."

#1
hoojah1 = hoojah.hujahs.create!(
  body: "Hoojah is a healthier alternative to other mainstream social media platforms for Malaysians to have thoughtful discussions online."
)


kurus.votes.create!(vote: [1], hujah_id: 1)
hoojah1.update(agree_count: hoojah1.agree_count + 1)
#2
hoojah2 = kurus.hujahs.create!(
  body: "Boy this is a bold one. I think the term healthier needs to be further clarified. However, I'm going to roll on the assumption that it means healthier discussion environment, where people present their hoojah based on the the premise of whether they agree 👍🏻 or disagree 👎🏻 or is on the fence ⚖️ about the hoojah that they're responding to. So yes, I agree that it is a healthier alternative, on the basis of it seems that a response is always based on one of the three vote options.",
  parent_id: 1,
  vote: 1
)
kurus.votes.create!(vote: [1], hujah_id: 2)
hoojah2.update(agree_count: hoojah2.agree_count + 1)


netherlands.votes.create!(vote: [3], hujah_id: 1)
hoojah1.update(disagree_count: hoojah1.disagree_count + 1)
#3
hoojah3 = netherlands.hujahs.create!(
  body: "Hmmm seems like there's not many people here. How can it be healthier if there's not many discussions to engage in???",
  parent_id: 1,
  vote: 3
)
netherlands.votes.create!(vote: [1], hujah_id: 3)
hoojah3.update(agree_count: hoojah3.agree_count + 1)


party.votes.create!(vote: [2], hujah_id: 1)
hoojah1.update(neutral_count: hoojah1.neutral_count + 1)
#4
hoojah4 = party.hujahs.create!(
  body: "Looks promising, but still too bare. Yeah I'mma just sit and wait till this thing picks up some traction, then maybe I'mma change my vote, yeah?",
  parent_id: 1,
  vote: 2
)
party.votes.create!(vote: [1], hujah_id: 4)
hoojah4.update(agree_count: hoojah4.agree_count + 1)


hacks.votes.create!(vote: [1], hujah_id: 1)
hoojah1.update(agree_count: hoojah1.agree_count + 1)
#5
hoojah5 = hacks.hujahs.create!(
  body: "I saw that this site requires people to key in their phone number when signing up. I hope that's for verification purpose. That can certainly filter out trollers etc.",
  parent_id: 1,
  vote: 2
)
hacks.votes.create!(vote: [1], hujah_id: 5)
hoojah5.update(agree_count: hoojah5.agree_count + 1)


hacks.votes.create!(vote: [1], hujah_id: 3)
hoojah3.update(agree_count: hoojah3.agree_count + 1)
#6
hoojah6 = hacks.hujahs.create!(
  body: "Chicken and egg story then 🐣",
  parent_id: 3,
  vote: 1
)
hacks.votes.create!(vote: [1], hujah_id: 6)
hoojah6.update(agree_count: hoojah6.agree_count + 1)


netherlands.votes.create!(vote: [1], hujah_id: 5)
hoojah5.update(agree_count: hoojah5.agree_count + 1)
#7
hoojah7 = netherlands.hujahs.create!(
  body: "hmmmm if that's true, that would be great. we can expect less noises then. but but still there's nothing stopping someone from replying hahaha or lolz or 💩",
  parent_id: 5,
  vote: 2
)
netherlands.votes.create!(vote: [1], hujah_id: 2)
hoojah2.update(agree_count: hoojah2.agree_count + 1)


party.votes.create!(vote: [1], hujah_id: 7)
hoojah7.update(agree_count: hoojah7.agree_count + 1)
#8
hoojah8 = party.hujahs.create!(
  body: "That so true man! Yeah then this site should have some sort of flagging feature, yeah?",
  parent_id: 7,
  vote: 1
)


#9
hoojah9 = party.hujahs.create!(
  body: "But yeah man, people should not be stopped from posting 💩 or whatever they want. Humans should flag this manually if they think it's not progressing the discussion further, yeah?",
  parent_id: 7,
  vote: 3
)


kurus.votes.create!(vote: [1], hujah_id: 9)


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
