// dialogueData.js

export const dialogueData = {
  // Story dialogues
  story: {
    "story_1": {
      text: "היום זה היום הראשון שלי במרכז הדואר האלקטרוני",
      nextDialogue: "story_2",
      events: [],
      autoAdvance: false
    },
    "story_2": {
      text: "אני לא ממש יודע למה לצפות, אבל אני אעשה כמיטב יכולתי.",
      nextDialogue: null, // End of story
      events: ["story_complete"],
      autoAdvance: false
    }
  },

  // Character dialogues (examples for now)
  characters: {
    "daniel_intro_1": {
      text: "שלום וברוך הבא לסניף הדואר הפרוטוקולי.",
      emotion: "happy",
      nextDialogue: "daniel_intro_2",
      events: [],
      talker: "דניאל",
      autoAdvance: false
    },
    "daniel_intro_2": {
      text: "קוראים לי דניאל, ואני יהיה האוזר שלך היום,  אני אלמד אותך בכל מה שאתה צריך בשביל להתחיל לעבוד פה.",
      emotion: "neutral",
      nextDialogue: null,
      events: [],
      talker: "דניאל",
      autoAdvance: false
    }
  }
};

// Events that can be triggered
export const gameEvents = {
  "story_complete": {
    action: "NAVIGATE_TO_GAME"
  },
  "show_mailing_icon": {
    action: "ENABLE_MAILING_ICON"
  },
  "unlock_stamp_tool": {
    action: "UNLOCK_TOOL",
    payload: "stamp"
  }
};

// Emotions for character animations
export const emotions = {
  "worried": {
    gif: "/characters/worried.gif",
    animation: "fidget"
  },
  "hopeful": {
    gif: "/characters/hopeful.gif", 
    animation: "bounce"
  },
  "happy": {
    gif: "/characters/happy.gif",
    animation: "smile"
  },
  "confused": {
    gif: "/characters/confused.gif",
    animation: "scratch_head"
  }
};

export default dialogueData;