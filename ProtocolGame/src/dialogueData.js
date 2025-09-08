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
      textColor: "var(--white)",
      emotion: "happy",
      nextDialogue: "daniel_intro_2",
      events: [],
      name: "דניאל",
      nameColor: "var(--blue)",
      autoAdvance: false,
      canAdvance: () => true
    },
    "daniel_intro_2": {
      text: "קוראים לי דניאל, ואני יהיה האוזר שלך היום,  אני אלמד אותך בכל מה שאתה צריך בשביל להתחיל לעבוד פה.",
      textColor: "var(--white)",
      emotion: "neutral",
      nextDialogue: "daniel_intro_3",
      events: [],
      name: "דניאל",
      nameColor: "var(--blue)",
      autoAdvance: false,
      canAdvance: () => true
    },
    "daniel_intro_3": {
      text: "גם לי נעים מאוד להכיר.",
      textColor: "var(--white)",
      emotion: "neutral",
      nextDialogue: "daniel_intro_4",
      events: [],
      name: "אני",
      nameColor: "var(--orange)",
      autoAdvance: false,
      canAdvance: () => true
    },
    "daniel_intro_4": {
      text: "פה אנחנו מקבלים הודעות ארוזות — ממש כמו חבילות. אבל לא כל הודעה מגיעה במצב תקין. המטרה שלנו היא למצוא את הטעויות, ולתקן אותן לפני השליחה.",
      textColor: "var(--white)",
      emotion: "neutral",
      nextDialogue: "daniel_intro_5",
      events: [],
      name: "דניאל",
      nameColor: "var(--blue)",
      autoAdvance: false,
      canAdvance: () => true
    },
    "daniel_intro_5": {
      text: "כל הודעה חייבת לעמוד במבנה של הפרוטוקול שלה.בלי זה? היא פשוט לא תעבור.",
      textColor: "var(--white)",
      emotion: "neutral",
      nextDialogue: "daniel_intro_6",
      events: [],
      name: "דניאל",
      nameColor: "var(--blue)",
      autoAdvance: false,
      canAdvance: () => true
    },
    "daniel_intro_6": {
      text: "[נשמע פשוט... בינתיים.]",
      textColor: "var(--grey-1)",
      emotion: "neutral",
      nextDialogue: null,
      events: [],
      name: "אני",
      nameColor: "var(--orange)",
      autoAdvance: false,
      canAdvance: () => false
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