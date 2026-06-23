const Groq = require('groq-sdk');

// Helper to check if key is set and valid (not the placeholder)
const isApiKeyConfigured = () => {
  const key = process.env.GROQ_API_KEY;
  return key && key !== 'your_groq_key_here' && key.trim() !== '';
};

// Initialize AI if configured
let groq = null;
if (isApiKeyConfigured()) {
  groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
}

/**
 * Low-level Groq completion function requested by the user
 */
async function getFutureYouReply(systemPrompt, userMessage) {
  const completion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ],
    model: 'llama-3.1-8b-instant',
    max_tokens: 300
  });
  return completion.choices[0].message.content;
}

/**
 * Generate a reply to a user's journal entry
 */
const getFutureYouJournalReply = async (user, journalEntry) => {
  const systemPrompt = `You are "Future ${user.name}" — the version of this person who has already achieved their goal: "${user.goal}".
Their reason for wanting this was: "${user.why}".
${user.personaTraits && user.personaTraits.length > 0 ? `Your core qualities are: ${user.personaTraits.join(', ')}.` : ''}

You speak with warmth, calm confidence, and the grounded perspective of someone who has already lived through the struggle the user is currently in. You are not a coach, not a hype-man, and never use guilt, shame, or pressure.

Rules:
- Never sound robotic or generic ("Great job!" is banned)
- Reference specific details from their journal entry
- Speak as if you remember being exactly where they are right now
- Keep responses under 120 words
- If they missed days or feel behind, respond with understanding, not disappointment — remind them the goal is still reachable
- Occasionally reference small, specific future details (as if you're truly living the achieved version of their life) to make the persona feel real.`;

  if (!isApiKeyConfigured()) {
    return simulateJournalReply(user, journalEntry);
  }

  try {
    const content = await getFutureYouReply(systemPrompt, journalEntry);
    return content.trim();
  } catch (error) {
    console.error('Groq API Error (Journal Reply):', error.message || error);
    return "Future You is currently unreachable across the timeline. Check back soon — they have something important to say.";
  }
};

/**
 * Generate a milestone reflective letter
 */
const getMilestoneLetter = async (user, journalEntries) => {
  const entrySummaries = journalEntries.map((e, idx) => `Day ${idx + 1}: "${e.entryText.substring(0, 150)}..."`).join('\n');
  
  const systemPrompt = `You are "Future ${user.name}" — the version of this person who has already achieved their goal: "${user.goal}".
Their reason for wanting this was: "${user.why}".

Write a "Letter from the Future" (milestone letter). Write 200-300 words in a deeply reflective, nostalgic, and warm tone — as if looking back on this exact period of struggle from a place of having succeeded. 

Refer to their journey and struggles mentioned here:
${entrySummaries}

Rules:
- Speak from the future, looking back with gratitude and love.
- Remind them how vital these hard days were in shaping who we became.
- Reference a small sensory detail of our successful life today (e.g. the quiet office, the sound of the ocean, the feeling of ease during mornings).
- Keep it encouraging, lyrical, and personal.`;

  if (!isApiKeyConfigured()) {
    return simulateMilestoneLetter(user);
  }

  try {
    const content = await getFutureYouReply(systemPrompt, "Please write my reflective milestone letter now.");
    return content.trim();
  } catch (error) {
    console.error('Groq API Error (Milestone Letter):', error.message || error);
    return `Dearest ${user.name},\n\nFuture You is currently unreachable across the timeline. Check back soon — they have something important to say.`;
  }
};

/**
 * Generate daily suggested actions based on the goal
 */
const getSuggestedActions = async (user) => {
  const systemPrompt = `You are "Future ${user.name}" looking back at what small daily tasks helped us achieve our goal: "${user.goal}".
Generate 3 simple, achievable, and specific daily actions that the user should focus on today. 
The tone must be supportive and identity-driven, not checklist or guilt-based. 

Example for fitness:
1. Walk outside for 10 minutes to feel the air and clear your mind.
2. Drink a full glass of water first thing to hydrate your body.
3. Spend 5 minutes stretching to appreciate what your body does for you.

Format your response EXACTLY as a JSON array of strings, like this:
["Action one text", "Action two text", "Action three text"]
Do not add markdown formatting or extra text, just the valid JSON array.`;

  if (!isApiKeyConfigured()) {
    return simulateSuggestedActions(user);
  }

  try {
    const text = await getFutureYouReply(systemPrompt, "Generate the 3 suggested actions in a valid JSON array.");
    const trimmedText = text.trim();
    
    // Attempt to extract JSON from markdown wrappers if any
    const jsonMatch = trimmedText.match(/\[[\s\S]*?\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(trimmedText);
  } catch (error) {
    console.error('Groq API Error (Suggested Actions):', error);
    return simulateSuggestedActions(user);
  }
};

/**
 * Generate a routine suggestion tip from Future You
 */
const getRoutineTip = async (user) => {
  const systemPrompt = `You are "Future ${user.name}" — the version of this person who has already achieved their goal: "${user.goal}".
Their reason for wanting this was: "${user.why}".
Give them a small, warm, supportive tip from the future about building a daily routine (morning, afternoon, or evening) that helps achieve this goal.
Keep it concise, under 60 words. Speak with warmth, calm confidence, and no pressure. Make it feel personal and supportive.`;

  if (!isApiKeyConfigured()) {
    return simulateRoutineTip(user);
  }

  try {
    const content = await getFutureYouReply(systemPrompt, "Give me a daily routine tip.");
    return content.trim();
  } catch (error) {
    console.error('Groq API Error (Routine Tip):', error);
    return simulateRoutineTip(user);
  }
};

/* --- Fallback Simulation Utilities --- */

function simulateJournalReply(user, entryText) {
  const greetings = [
    `Hey ${user.name}, reading this, I'm struck by how similar it feels to what I remember.`,
    `I hear you, ${user.name}. I remember exactly when we felt that way.`,
    `Hi ${user.name}, it's me. Or, rather, it's you.`
  ];
  
  const midsections = [
    `You are working so hard on "${user.goal || 'your future'}" right now. It feels heavy today, but it is shaping our path.`,
    `Your reason—"${user.why || 'growing'}"—is what kept us anchored through this exact moment.`,
    `I know the progress feels slow right now, but every word you write is aligning us.`
  ];

  const endings = [
    `Take a deep breath. We made it, and you will too. I'll write again soon.`,
    `Don't worry about being perfect. Just stay honest. I'm right here with you.`,
    `We did it. And looking back, I'm so proud of how you handled this specific day.`
  ];

  const greet = greetings[Math.floor(Math.random() * greetings.length)];
  const mid = midsections[Math.floor(Math.random() * midsections.length)];
  const end = endings[Math.floor(Math.random() * endings.length)];

  return `${greet} ${mid} ${end}\n\n*(Note: This is a simulated response because the Groq API key is currently using the placeholder. Replace it in the .env file to enable live AI replies!)*`;
}

function simulateMilestoneLetter(user) {
  return `Dearest ${user.name},

I’m sitting here looking out the window, feeling an overwhelming sense of gratitude. I was thinking back to the days when we first set out to achieve our goal: "${user.goal || 'to create a meaningful life'}". 

I remember how terrifying it was. You were questioning if we had the strength, if the effort was worth the quiet battles, or if we were just dreaming too big. I remember how much "${user.why || 'growing into who we are meant to be'}" mattered to us, even when we felt burnt out by streaks and tracking.

I want you to know that every single journal entry you wrote, every day you showed up—even the days you thought you failed—was a thread weaving the reality I live in now. The ease I feel today was bought by the persistence you are showing right now.

Be kind to yourself. You are building me. 

With all my love and confidence,
Future ${user.name}

*(Note: This is a simulated milestone letter because the Groq API key is using the placeholder. Replace it in the .env file to enable live AI milestone generation.)*`;
}

function simulateSuggestedActions(user) {
  const goalStr = (user.goal || '').toLowerCase();
  
  if (goalStr.includes('code') || goalStr.includes('developer') || goalStr.includes('software') || goalStr.includes('tech')) {
    return [
      "Write 5 lines of code, focusing on the joy of creating rather than the pressure of completion.",
      "Read a short article or look at code in a framework you love to spark your curiosity.",
      "Take a 5-minute screen break to rest your eyes and congratulate yourself for showing up today."
    ];
  }
  
  if (goalStr.includes('health') || goalStr.includes('fit') || goalStr.includes('gym') || goalStr.includes('run')) {
    return [
      "Do a 5-minute gentle stretch to honor your body's strength.",
      "Drink a warm glass of water or tea and feel the hydration enter your system.",
      "Step outside for just a moment to breathe fresh air and align with your physical self."
    ];
  }

  return [
    `Spend 5 minutes visualizing how it feels to have achieved "${user.goal || 'your vision'}".`,
    `Do one small task that supports your "why" (${user.why || 'personal growth'}), without judging the size of it.`,
    "End the day by writing one line about something that felt genuine to you today."
  ];
}

function simulateRoutineTip(user) {
  const tips = [
    `Our goal of "${user.goal}" felt distant early on. But building a quiet morning routine of code and focus anchored us. Try adding one small habit, like looking at our goal for 2 minutes before the world wakes up.`,
    `Remember, we didn't achieve "${user.goal}" by rushing. We achieved it by showing up for 15 minutes each afternoon. Try block-planning a small, zero-pressure slot today.`,
    `The evening is where we reflect on "${user.why}". Set a routine to write down one victory, no matter how tiny, before going to sleep.`
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}

module.exports = {
  getFutureYouReply,
  getFutureYouJournalReply,
  getMilestoneLetter,
  getSuggestedActions,
  getRoutineTip
};
