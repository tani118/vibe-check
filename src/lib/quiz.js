export const quizQuestions = [
  {
    id: 1,
    question: "How are you feeling about your day so far?",
    options: [
      { text: "Amazing! Everything's going perfectly", points: 5 },
      { text: "Pretty good, mostly positive", points: 3 },
      { text: "It's okay, nothing special", points: 0 },
      { text: "Not great, having some issues", points: -3 },
      { text: "Terrible, worst day ever", points: -5 }
    ]
  },
  {
    id: 2,
    question: "How would you describe your energy level?",
    options: [
      { text: "Super energetic and ready for anything", points: 5 },
      { text: "Good energy, feeling motivated", points: 3 },
      { text: "Average, could go either way", points: 0 },
      { text: "Low energy, feeling sluggish", points: -3 },
      { text: "Completely drained and exhausted", points: -5 }
    ]
  },
  {
    id: 3,
    question: "How do you feel about your relationships today?",
    options: [
      { text: "Connected and loved by everyone", points: 4 },
      { text: "Good vibes with most people", points: 2 },
      { text: "Normal interactions, nothing special", points: 0 },
      { text: "Some tension or misunderstandings", points: -2 },
      { text: "Feeling isolated or in conflict", points: -4 }
    ]
  },
  {
    id: 4,
    question: "What's your outlook on the future right now?",
    options: [
      { text: "Extremely optimistic and excited", points: 5 },
      { text: "Generally positive about what's coming", points: 3 },
      { text: "Neutral, taking things as they come", points: 0 },
      { text: "A bit worried about upcoming challenges", points: -3 },
      { text: "Very anxious or pessimistic", points: -5 }
    ]
  },
  {
    id: 5,
    question: "How creative or inspired do you feel?",
    options: [
      { text: "Bursting with creative ideas", points: 4 },
      { text: "Pretty inspired and imaginative", points: 2 },
      { text: "Average creativity level", points: 0 },
      { text: "Feeling a bit blocked or uninspired", points: -2 },
      { text: "Completely creatively stuck", points: -4 }
    ]
  },
  {
    id: 6,
    question: "How comfortable are you in your own skin today?",
    options: [
      { text: "Completely confident and self-assured", points: 5 },
      { text: "Feeling pretty good about myself", points: 3 },
      { text: "Normal self-confidence", points: 0 },
      { text: "A bit insecure or self-doubting", points: -3 },
      { text: "Very uncomfortable with myself", points: -5 }
    ]
  },
  {
    id: 7,
    question: "How much do you want to socialize right now?",
    options: [
      { text: "Want to party and meet everyone", points: 4 },
      { text: "Would enjoy some good company", points: 2 },
      { text: "Take it or leave it", points: 0 },
      { text: "Prefer to keep interactions minimal", points: -2 },
      { text: "Want to avoid people completely", points: -4 }
    ]
  },
  {
    id: 8,
    question: "How do you feel about taking on new challenges?",
    options: [
      { text: "Bring it on! Ready for anything", points: 5 },
      { text: "Generally up for new experiences", points: 3 },
      { text: "Depends on the challenge", points: 0 },
      { text: "Prefer to stick to familiar things", points: -3 },
      { text: "Want to avoid any challenges", points: -5 }
    ]
  },
  {
    id: 9,
    question: "What's your stress level like today?",
    options: [
      { text: "Completely relaxed and zen", points: 5 },
      { text: "Pretty calm with minor stress", points: 3 },
      { text: "Normal stress levels", points: 0 },
      { text: "Feeling quite stressed", points: -3 },
      { text: "Extremely overwhelmed", points: -5 }
    ]
  },
  {
    id: 10,
    question: "How grateful do you feel for your life right now?",
    options: [
      { text: "Incredibly grateful for everything", points: 5 },
      { text: "Pretty appreciative of what I have", points: 3 },
      { text: "Normal level of gratitude", points: 0 },
      { text: "Not feeling very thankful today", points: -3 },
      { text: "Feeling ungrateful or resentful", points: -5 }
    ]
  }
]

export const getVibeFromScore = (totalScore) => {
  if (totalScore >= 35) return { vibe: "Absolutely Radiant", emoji: "✨", color: "bg-yellow-400" }
  if (totalScore >= 25) return { vibe: "Super Positive", emoji: "😄", color: "bg-green-400" }
  if (totalScore >= 15) return { vibe: "Pretty Good", emoji: "😊", color: "bg-blue-400" }
  if (totalScore >= 5) return { vibe: "Decent", emoji: "🙂", color: "bg-teal" }
  if (totalScore >= -5) return { vibe: "Neutral", emoji: "😐", color: "bg-gray-400" }
  if (totalScore >= -15) return { vibe: "Meh", emoji: "😕", color: "bg-orange-400" }
  if (totalScore >= -25) return { vibe: "Not Great", emoji: "😞", color: "bg-red-400" }
  if (totalScore >= -35) return { vibe: "Pretty Low", emoji: "😢", color: "bg-purple-400" }
  return { vibe: "Rock Bottom", emoji: "😭", color: "bg-black" }
}
