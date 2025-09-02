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
    "customer1_intro": {
      text: "שלום! אני צריך לשלוח מכתב חשוב מאוד!",
      emotion: "worried",
      nextDialogue: "customer1_wait",
      events: ["show_mailing_icon"],
      autoAdvance: false
    },
    "customer1_wait": {
      text: "אתה יכול לעזור לי עם זה?",
      emotion: "hopeful",
      nextDialogue: null,
      events: [],
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