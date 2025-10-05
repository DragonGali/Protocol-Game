export const dialogueData = {
  // Story dialogues
  story: {
    "story_1": {
      text: "היום זה היום הראשון שלי במרכז הדואר האלקטרוני",
      next: "story_2",
      textColor: "var(--orange)",
    },
    "story_2": {
      text: "אני לא ממש יודע למה לצפות, אבל אני אעשה כמיטב יכולתי.",
      next: null, // End of story
      onEnter: [{action: "MARK_COMPLETED", id:"story_complete"}],
      textColor: "var(--orange)",
    }
  },

  // Character dialogues
  characters: {
    "daniel_intro_1": {
      text: "שלום וברוך הבא לסניף הדואר הפרוטוקולי.",
      next: "daniel_intro_2",
      emotion: "happy",
      name: "דניאל",
      nameColor: "var(--blue)"
    },
    "daniel_intro_2": {
      text: "קוראים לי דניאל, ואני יהיה האוזר שלך היום, אני אלמד אותך בכל מה שאתה צריך בשביל להתחיל לעבוד פה.",
      next: "daniel_intro_3",
      emotion: "neutral",
      name: "דניאל",
      nameColor: "var(--blue)"
    },
    "daniel_intro_3": {
      text: "גם לי נעים מאוד להכיר.",
      next: "daniel_intro_4",
      emotion: "neutral",
      name: "אני",
      nameColor: "var(--orange)"
    },
    "daniel_intro_4": {
      text: "פה אנחנו מקבלים הודעות ארוזות — ממש כמו חבילות. אבל לא כל הודעה מגיעה במצב תקין. המטרה שלנו היא למצוא את הטעויות, ולתקן אותן לפני השליחה.",
      next: "daniel_intro_5",
      emotion: "neutral",
      name: "דניאל",
      nameColor: "var(--blue)"
    },
    "daniel_intro_5": {
      text: "כל הודעה חייבת לעמוד במבנה של הפרוטוקול שלה. בלי זה? היא פשוט לא תעבור.",
      next: "daniel_intro_6",
      emotion: "neutral",
      name: "דניאל",
      nameColor: "var(--blue)"
    },
    "daniel_intro_6": {
      text: "[נשמע פשוט... בינתיים.]",
      next: "daniel_intro_7",
      emotion: "neutral",
      name: "אני",
      nameColor: "var(--orange)"
    },
    "daniel_intro_7": {
      text: "רואה את הסמל הזה בצד העליון? זה המדריך שלך.",
      next: "daniel_intro_8",
      emotion: "neutral",
      name: "דניאל",
      nameColor: "var(--blue)",
      onEnter: [
        { type: 'SHOW', id: 'manual_icon' }
      ]
    },
    "daniel_intro_8": {
      text: "כל פעם שאתה נתקל במשהוא חדש או פשוט רוצה לרענן ידע קודם, תרגיש חופשי לקרוא את המדריך",
      next: "daniel_intro_9",
      emotion: "neutral",
      name: "דניאל",
      nameColor: "var(--blue)"
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
      events: [],
      condition: false,
      name: "דניאל",
      nameColor: "var(--blue)",
      autoAdvance: false,
      canAdvance: () => true
    },
    "daniel_intro_11": {
      text: "זה המסך שלך. כאן תטפל בכל ההודעות.",
      textColor: "var(--white)",
      emotion: "neutral",
      nextDialogue: "daniel_intro_12",
      events: ["SHOW_MONITOR"],
      condition: false,
      name: "דניאל",
      nameColor: "var(--blue)",
      autoAdvance: false,
      canAdvance: () => true
  },
  "daniel_intro_12": {
      text: "שלחתי לך עכשיו את האפליקציה לטיפול בדואר זה הסמל הקטן של תיבת הדואר, בצד שמאל. נסה ללחוץ עליו..",
      textColor: "var(--white)",
      emotion: "neutral",
      nextDialogue: "daniel_intro_13",
      events: ["UNLOCK_MONITOR", "UNLOCK_MAILING_ICON"],
      condition: "mailListOpened",
      name: "דניאל",
      nameColor: "var(--blue)",
      autoAdvance: true,
      canAdvance: () => false
  },
  "daniel_intro_13": {
    text: "תבחר בדואר הראשון ברשימה.",
    textColor: "var(--white)",
    emotion: "neutral",
    nextDialogue: null,
    events: [],
    name: "דניאל",
    nameColor: "var(--blue)",
    autoAdvance: true,
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
  },

  "show_monitor": {
    action: "SHOW_MONITOR"
  },

};


export default dialogueData;