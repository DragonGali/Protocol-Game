import { useGameState, isUnlocked, isVisible, hasCompleted } from './Components/GameState.jsx';

export const dialogueData =  {
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
    "chapter_1" : {
      "daniel_intro_1": {
        text: "שלום וברוך הבא לסניף הדואר הפרוטוקולי.",
        next: "daniel_intro_2",
        emotion: "happy",
        name: "דניאל",
        nameColor: "var(--blue)",
        character: "daniel",
        onEnter: [
          {type: 'SET_FLAG', key: 'mistake_1', value: 'footer'}
        ]
    },
      "daniel_intro_2": {
        text: "קוראים לי דניאל, ואני יהיה האוזר שלך היום, אני אלמד אותך בכל מה שאתה צריך בשביל להתחיל לעבוד פה.",
        next: "daniel_intro_3",
        emotion: "neutral",
        name: "דניאל",
        nameColor: "var(--blue)",
        character: "daniel"
      },
      "daniel_intro_3": {
        text: "גם לי נעים מאוד להכיר.",
        next: "daniel_intro_4",
        emotion: "neutral",
        name: "אני",
        nameColor: "var(--orange)",
        character: "daniel"
      },
      "daniel_intro_4": {
        text: "פה אנחנו מקבלים הודעות ארוזות — ממש כמו חבילות. אבל לא כל הודעה מגיעה במצב תקין. המטרה שלנו היא למצוא את הטעויות, ולתקן אותן לפני השליחה.",
        next: "daniel_intro_5",
        emotion: "neutral",
        name: "דניאל",
        nameColor: "var(--blue)",
        character: "daniel"
      },
      "daniel_intro_5": {
        text: "כל הודעה חייבת לעמוד במבנה של הפרוטוקול שלה. בלי זה? היא פשוט לא תעבור.",
        next: "daniel_intro_6",
        emotion: "neutral",
        name: "דניאל",
        nameColor: "var(--blue)",
        character: "daniel"
      },
      "daniel_intro_6": {
        text: "[נשמע פשוט... בינתיים.]",
        next: "daniel_intro_7",
        emotion: "neutral",
        name: "אני",
        nameColor: "var(--orange)",
        character: "daniel",
        textColor: "var(--grey-1)",
      },
      "daniel_intro_7": {
        text: "רואה את הסמל הזה בצד העליון? זה המדריך שלך.",
        next: "daniel_intro_8",
        character: "daniel",
        emotion: "neutral",
        name: "דניאל",
        nameColor: "var(--blue)",
        onEnter: [
          { type: 'SHOW', id: 'manual_icon' },
          { type: 'SHOW', id: 'manual_icon_showcase' }
        ]
      },
      "daniel_intro_8": {
        text: "כל פעם שאתה נתקל במשהוא חדש או פשוט רוצה לרענן ידע קודם, תרגיש חופשי לקרוא את המדריך",
        next: "daniel_intro_9",
        character: "daniel",
        emotion: "neutral",
        name: "דניאל",
        nameColor: "var(--blue)",
        onEnter: [
          { type: 'HIDE', id: 'manual_icon_showcase' }  // Remove showcase
        ]
      },
      "daniel_intro_9": {
        text: "תלחץ עליו ותקרא את ההקדמה, אפשר למצוא את הפרק דרך חיפוש הנושאים החדשים",
        textColor: "var(--white)",
        emotion: "neutral",
        name: "דניאל",
        next: "daniel_intro_10",
        nameColor: "var(--blue)",
        character: "daniel",
        onEnter: [
          { type: 'UNLOCK', id: 'manual'}
        ],
        waitFor: { completed: 'read_manual_ch1' }
      },
      "daniel_intro_10": {
        text: "טוב, עכשיו כשאתה מכיר את הבסיס - בוא ננסה למיין הודעה.",
        textColor: "var(--white)",
        emotion: "neutral",
        next: "daniel_intro_11",
        name: "דניאל",
        character: "daniel",
        nameColor: "var(--blue)",
      },
      "daniel_intro_11": {
        text: "זה המסך שלך. כאן תטפל בכל ההודעות.",
        textColor: "var(--white)",
        emotion: "neutral",
        next: "daniel_intro_12",
        name: "דניאל",
        character: "daniel",
        nameColor: "var(--blue)",
          onEnter: [
          { type: 'UNLOCK', id: 'monitor'},
          { type: 'SHOW', id: 'monitor_showcase'}
        ],
    },
    "daniel_intro_12": {
        text: "שלחתי לך עכשיו את האפליקציה לטיפול בדואר זה הסמל הקטן של תיבת הדואר, בצד שמאל. נסה ללחוץ עליו..",
        textColor: "var(--white)",
        emotion: "neutral",
        next: "daniel_intro_13",
        condition: "mailListOpened",
        name: "דניאל",
        character: "daniel",
        nameColor: "var(--blue)",
        onEnter: [
          { type: 'HIDE', id: 'monitor_showcase'},
          { type: 'UNLOCK', id: 'mail_list'}
        ],
        waitFor : { completed: 'clicked_mail_icon'}
    },
    "daniel_intro_13": {
      text: "תבחר בדואר הראשון ברשימה.",
      textColor: "var(--white)",
      emotion: "neutral",
      next: "daniel_intro_14",
      name: "דניאל",
      character: "daniel",
      nameColor: "var(--blue)",
      waitFor: {completed: 'opened_letter'}
    },
    "daniel_intro_14":{
      text: "ככה נראית חבילה, בחלק הקדמי רשום כתובת המקור ושל היעד, הפורט ו הפרוטוקול של ההודעה.",
      textColor: "var(--white)",
      emotion: "neutral",
      next: "daniel_intro_15",
      name: "דניאל",
      character: "daniel",
      nameColor: "var(--blue)",
      onEnter: [
        {type: 'UNLOCK', id: 'stamp'}
      ]
    },
    "daniel_intro_15":{
      text: "אני כבר מילאתי את כל הפרטים אבל השארתי טעות אחת בתוך המכתב, העבודה שלך תהיה לפענח איפה הטעות הזאת.",
      textColor: "var(--white)",
      emotion: "neutral",
      next: "daniel_intro_16",
      name: "דניאל",
      character: "daniel",
      nameColor: "var(--blue)",
    },
    "daniel_intro_16":{
      text: "בשביל לסמן טעות, צריך להשתמש בחותמת ולהעביר אותה על השורה הלא נכונה. נסה לעשות את זה.",
      textColor: "var(--white)",
      emotion: "neutral",
      next: (state) => state.flags?.stampedElement === 'footer' ? 'daniel_intro_17' : 'daniel_intro_mistake_1',
      name: "דניאל",
      character: "daniel",
      nameColor: "var(--blue)",
      waitFor: {flag: 'stampedElement'}
    },
    "daniel_intro_17":{
      text: "אני חושב שבהודעה הזות חסרה סיומת.",
      textColor: "var(--white)",
      emotion: "neutral",
      next: "daniel_intro_18",
      name: "אני",
      character: "daniel",
      nameColor: "var(--orange)",
      next: "daniel_intro_18"
    },

    "daniel_intro_18":{
      text: "נכון מאוד! כל ההודעות,צריכות להסתיים עם <span style='color:var(--red)'>FOOTER</span>. כל הכבוד, עבודה טובה.",
      textColor: "var(--white)",
      emotion: "happy",
      next: "daniel_intro_19",
      name: "דניאל",
      character: "daniel",
      nameColor: "var(--blue)",
      onEnter: [
        {type: 'MARK_COMPLETED', id: 'mistake_1'}
      ]
    },

    "daniel_intro_19": {
      text: "עכשיו, כל מה שנשאר זה לשלוח את המכתב, תלחץ על הכפתור ה <span style='color:var(--green)'>ירוק</span>.",
      textColor: 'var(--white)',
      emotion: "neutral",
      next: "daniel_intor_20",
      name: "דניאל",
      character: "daniel",
      nameColor: "var(--blue)",
      next: "daniel_intro_20",
      onEnter: [
        {type: 'SHOW', id: 'submit-button'}
      ],
      waitFor: {completed: 'submit'}
    },
    "daniel_intro_20": {
      text: "דניאל: מעולה! עכשיו כשאתה יודע מה לעשות, אני אעזוב אותך לנסות בעצמך.",
      textColor: 'var(--white)',
      emotion: 'neutral',
      name: "דניאל",
      character: "daniel",
      nameColor: "var(--blue)",
      next: "daniel_intro_21",
      onEnter: [
        {type: 'HIDE', id: 'submit-button'},
        {type: 'SHOW', id: 'submit-animation'}
      ]
    },
    "daniel_intro_21": {
      text: "אם תיתקל בקושי, תוכל ללחוץ על סמל העזרה, בשביל לקבל רמז.",
      textColor: 'var(--white)',
      emotion: 'neutral',
      name: "דניאל",
      character: "daniel",
      nameColor: "var(--blue)",
      next: "daniel_intro_22",
      onEnter: [
        {type: 'UNLOCK', id: 'help-icon'},
        {type: 'SHOW', id: 'help-icon-showcase'},
        {type: 'HIDE', id: 'submit-animation'}
      ]
    },
    "daniel_intro_22": {
      text: "בהצלחה!",
      textColor: 'var(--white)',
      emotion: 'happy',
      name: "דניאל",
      character: "daniel",
      nameColor: "var(--blue)",
      next: null,
      onEnter: [
        {type: 'MARK_COMPLETED', id: 'chapter_1'},
        {type: 'HIDE', id: 'help-icon-showcase'}
      ]
    },

    "daniel_intro_mistake_1": {
      text: "זה החלק הבעייתי...?",
      textColor: "var(--white)",
      emotion: "neutral",
      name: "אני",
      next: "daniel_intro_mistake_2",
      character: "daniel",
      nameColor: "var(--orange)",
    },

    "daniel_intro_mistake_2": {
      text: "לא לצערי, עולי כדאי לך לקרוא את הנוסח שוב.",
      textColor: "var(--white)",
      emotion: "sad",
      name: "דניאל",
      character: "daniel",
      nameColor: "var(--blue)",
      onEnter: [
        {type: 'SET_FLAG', key: "stampedElement", value: null}
      ],
      next: (state) => state.flags?.stampedElement === 'footer' ? 'daniel_intro_17' : 'daniel_intro_mistake_1',
      waitFor: {flag: 'stampedElement'}
    }
    
  },

  "chapter_2" : {
    "maya_intro_1": {
      text: "היי! שמעתי שזה סניף דואר טוב.",
      textColor: "var(--white)",
      emotion: "happy",
      name: "מאיה",
      character: "maya",
      nameColor: "var(--yellow)",
      next: "maya_intro_2",
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_2', value: 22}
      ]
    },
    "maya_intro_2": {
      text: "הבוס שלי ביקש שאשלח כמה קבצים, אבל המערכת המאובטחת שאנחנו בדרך כלל משתמשים בה מתנהגת מוזר כל הבוקר.",
      textColor: "var(--white)",
      emotion: "neutral",
      name: "מאיה",
      character: "maya",
      nameColor: "var(--yellow)",
      next: "maya_intro_3"
    },
    "maya_intro_3": {
      text: "נאלצתי לעבור ל-FTP כדי להשלים את העבודה, העם תוכל לבדוק שהכל תקין?",
      textColor: "var(--white)",
      emotion: "neutral",
      name: "מאיה",
      character: "maya",
      nameColor: "var(--yellow)",
      next: "maya_intro_4"
    },
    "maya_intro_4": {
      text: '["FTP-מה...? רגע — לא להילחץ. פשוט צריך להסתכל במדריך שלי."]',
      textColor: "var(--grey-1)",
      emotion: "neutral",
      name: "אני",
      character: "maya",
      nameColor: "var(--orange)",
      next: "maya_intro_5",
    },
    "maya_intro_5": {
      text: "בטח אני כבר אסתכל.",
      textColor: "var(--white)",
      emotion: "neutral",
      name: "אני",
      character: "maya",
      nameColor: "var(--orange)",
      next: (state) => state.flags?.stampedElement === 'port' ? 'maya_intro_correct_1' : 'maya_intro_mistake_1',
      waitFor: { flag: 'stampedElement' }
    },
    "maya_intro_correct_1": {
      text: "נראה שהפורט שציינת בהודעה לא מתאים לפרוטוקול FTP.",
      textColor: "var(--white)",
      emotion: "neutral",
      name: "אני",
      character: "maya",
      nameColor: "var(--orange)",
      next: "maya_intro_correct_2"
    },

    "maya_intro_correct_2": {
      text: "אה, נכון! אז מה הוא צריך להיות?",
      textColor: "var(--white)",
      emotion: "surprised",
      name: "מאיה",
      character: "maya",
      nameColor: "var(--yellow)",
      next: "maya_intro_question_1"
    },

    "maya_intro_question_1": {
      type: "question",
      answers: [30, 81, 55, 22],
      next: (state) => state.flags?.selectedAnswer === 22 ? 'maya_intro_6' : 'maya_intro_question_mistake_1',
      waitFor: { flag: 'selectedAnswer' }
    },

    "maya_intro_6": {
      text: "תודה, אני כבר אתקן את השורה הזאת.",
      textColor: "var(--white)",
      emotion: "happy",
      name: "מאיה",
      character: "maya",
      nameColor: "var(--yellow)",
      next: "maya_intro_7",
      onEnter: [
        {type: 'MARK_COMPLETED', id: 'mistake_2'},
        {type: 'SHOW', id: 'submit-button'}
      ],
      waitFor: { completed: 'submit'}
    },

    "maya_intro_7": {
      text: "תודה רבה, אני בטוח אחזור שוב :)",
      textColor: "var(--white)",
      emotion: "happy",
      name: "מאיה",
      character: "maya",
      nameColor: "var(--yellow)",
      onEnter: [
        {type: 'HIDE', id: 'submit-button'},
        {type: 'SHOW', id: 'submit-animation'}
      ],
      next: 'maya_intro_exit'
    },

    "maya_intro_exit": {
      text: "",
      emotion: "neutral",
      name: "מאיה",
      character: "maya",
      nameColor: "var(--yellow)",
      onEnter: [
        {type: 'HIDE', id: 'submit-animation'},
        {type: 'MARK_COMPLETED', id: 'chapter_2'}
      ],
      waitFor: {},
      next: null
    },

    "maya_intro_mistake_1": {
      text: "השורה הזאתי שגויה",
      textColor: "var(--white)",
      emotion: "neutral",
      name: "אני",
      next: "maya_intro_mistake_2",
      character: "maya",
      nameColor: "var(--orange)",
    },

    "maya_intro_mistake_2": {
      text: "מה בדיוק? הכל נראה תקין",
      textColor: "var(--white)",
      emotion: "angry",
      name: "מאיה",
      character: "maya",
      nameColor: "var(--yellow)",
      next: "maya_intro_mistake_3"
    },

    "maya_intro_mistake_3": {
      text: "אה...לא משנה...",
      textColor: "var(--white)",
      emotion: "angry",
      name: "אני",
      character: "maya",
      nameColor: "var(--orange)",
      next: (state) => state.flags?.stampedElement === 'port' ? 'maya_intro_6' : 'maya_intro_mistake_1',
      waitFor: { flag: 'stampedElement' },
      onEnter: [
        {type: 'SET_FLAG', key: "stampedElement", value: null}
      ],
    },

    "maya_intro_question_mistake_1": {
        text: "[לא?! מה אני בכלל חושב, זה לא יכול להיות המספר הזה!]",
        textColor: "var(--grey-1)",
        emotion: "surprised",
        name: "אני",
        character: "maya",
        nameColor: "var(--orange)",
        next: "maya_intro_correct_2",
        onEnter: [
          {type: 'SET_FLAG', key: 'selectedAnswer', value: null}
        ]
    }
  },

  "chapter_3" : {
    "liyor_intro_1": {
        text: "אהלן, באתי לשלוח את המשחק החדש לבן דוד שלי. אמרו לי שאתם שולחים מיילים וכאלה, כבר בחרתי אה...פרוטוקול, מספר המזל שלי.",
        textColor: "var(--white)",
        emotion: "happy",
        name: "ליאור",
        character: "liyor",
        nameColor: "var(--green)",
        next: "liyor_intro_2",
        onEnter: [{type: 'SET_FLAG', key: 'mistake_3', value: 'link'}]
    },
    "liyor_intro_2": {
      text: "בסדר, אני רק צריך לבדוק שהכל תקין.",
      textColor: "var(--white)",
      emotion: "neutral",
      name: "אני",
      character: "liyor",
      nameColor: "var(--orange)",
      next: "liyor_intro_3"
    },
    "liyor_intro_3": {
      text: "[נשמע שהוא לא מבין הרבה בפרוטוקולים, כדאי לי לקרוא על הפרוטוקול שהוא משתמש.]",
      textColor: "var(--grey-1)",
      emotion: "neutral",
      name: "אני",
      character: "liyor",
      nameColor: "var(--orange)",
      next: (state) => state.flags?.stampedElement === 'link' ? 'liyor_intro_correct_1' : 'liyor_intro_mistake_1',
      waitFor: { flag: 'stampedElement' }
    },
    "liyor_intro_correct_1" : {
      text: "הפייל הזה הוא גדול מדי בשביל הפרוטוקול הזה, אתה תצטרך לבחור בפרוטוקול אחר או לשלוח את הפייל בכמה חבילות.",
      textColor: "var(--white)",
      emotion: "neutral",
      name: "אני",
      character: "liyor",
      nameColor: "var(--orange)",
      onEnter: [
        {type: 'MARK_COMPLETED', id: 'mistake_3'},
      ],
      next: "liyor_intro_correct_2"
    },
    "liyor_intro_correct_2" : {
      text: "אה וואלה?  לא ידעתי שיש גבול.  טוב אני אשלח פייל יותר קטן.",
      textColor: "var(--white)",
      emotion: "surprised",
      name: "ליאור",
      character: "liyor",
      nameColor: "var(--green)",
      next: "liyor_intro_correct_3"
    },

    "liyor_intro_mistake_1" : {
      text: "השורה הזאתי לא נכונה",
      textColor: "var(--white)",
      nameColor: "var(--orange)",
      emotion: "neutral",
      name: "אני",
      character: "liyor",
      next: "liyor_intro_mistake_2"
    },

    "liyor_intro_mistake_2" : {
      text: "הממ... אתה לא משחק איתי, נכון?",
      textColor: "var(--white)",
      nameColor: "var(--green)",
      emotion: "angry",
      name: "ליאור",
      character: "liyor",
      next: "liyor_intro_mistake_3"
    },

    "liyor_intro_mistake_3" : {
      text: "אה...לא משנה",
      textColor: "var(--white)",
      nameColor: "var(--orange)",
      emotion: "angry",
      name: "אני",
      character: "liyor",
      next: "liyor_intro_3",
      onEnter: [
        {type: 'SET_FLAG', key: 'stampedElement', value: null}
      ]
    }
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