// dialogueData.js

export const dialogueData = {
  // Story dialogues
  story: {
    "story_1": {
      text: "היום זה היום הראשון שלי במרכז הדואר האלקטרוני",
      nextDialogue: "story_2",
      events: [],
      autoAdvance: false,
      canAdvance: () => true,
      textColor: "var(--orange)",
      name: null,
    },
    "story_2": {
      text: "אני לא ממש יודע למה לצפות, אבל אני אעשה כמיטב יכולתי.",
      nextDialogue: null, // End of story
      events: ["story_complete"],
      autoAdvance: false,
      canAdvance: () => true,
      textColor: "var(--orange)",
      name: null,
    }
  },

  // Character dialogues
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
      nextDialogue: "daniel_intro_7",
      events: [],
      name: "אני",
      nameColor: "var(--orange)",
      autoAdvance: false,
      canAdvance: () => true
    },
    "daniel_intro_7": {
      text: "רואה את הסמל הזה בצד העליון? זה המדריך שלך.",
      textColor: "var(--white)",
      emotion: "neutral",
      nextDialogue: "daniel_intro_8",
      events: ["SHOW_USER_MANUAL"],
      name: "דניאל",
      nameColor: "var(--blue)",
      autoAdvance: false,
      canAdvance: () => true
    },
    "daniel_intro_8": {
      text: "תלחץ עליו ותקרא את ההקדמה, אפשר למצוא את הפרק דרך חיפוש הנושאים החדשים",
      textColor: "var(--white)",
      emotion: "neutral",
      nextDialogue: null,
      events: ["UNLOCK_USER_MANUAL"],
      name: "דניאל",
      nameColor: "var(--blue)",
      autoAdvance: false,
      canAdvance: () => false
    }
  }
};

// Events that can be triggered
export const gameEvents = {
  "show_user_manual": {
    action: "SHOW_USER_MANUAL",
  },

  "unlock_user_manual": {
    action: "UNLOCK_USER_MANUAL"
  },

};


export default dialogueData;