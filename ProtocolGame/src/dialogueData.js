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
      condition: false,
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
      condition: false,
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
      condition: false,
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
      condition: false,
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
      condition: false,
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
      condition: false,
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
      condition: false,
      name: "דניאל",
      nameColor: "var(--blue)",
      autoAdvance: false,
      canAdvance: () => true
    },
    "daniel_intro_8": {
      text: "כל פעם שאתה נתקל במשהוא חדש או פשוט רוצה לרענן ידע קודם, תרגיש חופשי לקרוא את המדריך",
      textColor: "var(--white)",
      emotion: "neutral",
      nextDialogue: "daniel_intro_9",
      events: ["SHOW_USER_MANUAL"],
      condition: false,
      name: "דניאל",
      nameColor: "var(--blue)",
      autoAdvance: false,
      canAdvance: () => true
    },
    "daniel_intro_9": {
      text: "תלחץ עליו ותקרא את ההקדמה, אפשר למצוא את הפרק דרך חיפוש הנושאים החדשים",
      textColor: "var(--white)",
      emotion: "neutral",
      nextDialogue: "daniel_intro_10",
      events: ["UNLOCK_USER_MANUAL"],
      condition: "manualRead",
      name: "דניאל",
      nameColor: "var(--blue)",
      autoAdvance: true,
      canAdvance: () => false
    },
    "daniel_intro_10": {
      text: "טוב, עכשיו כשאתה מכיר את הבסיס - בוא ננסה למיין הודעה.",
      textColor: "var(--white)",
      emotion: "neutral",
      nextDialogue: "daniel_intro_11",
      events: ["UNLOCK_USER_MANUAL"],
      condition: false,
      name: "דניאל",
      nameColor: "var(--blue)",
      autoAdvance: false,
      canAdvance: () => true
    },
    "daniel_intro_11": {
      text: "זה המסך שלך. כאן תטפל בכל ההודעות. שלחתי לך עכשיו את האפליקציה לטיפול בדואר.",
      textColor: "var(--white)",
      emotion: "neutral",
      nextDialogue: null,
      events: ["UNLOCK_USER_MANUAL"],
      condition: false,
      name: "דניאל",
      nameColor: "var(--blue)",
      autoAdvance: false,
      canAdvance: () => false
  }
}
}

// Events that can be triggered
export const gameEvents = {
  "show_user_manual": {
    action: "SHOW_USER_MANUAL",
  },

  "unlock_user_manual": {
    action: "UNLOCK_USER_MANUAL"
  },

  "finish_reading_manual": {
    action: "FINISH_READING_MANUAL"
  }

};


export default dialogueData;