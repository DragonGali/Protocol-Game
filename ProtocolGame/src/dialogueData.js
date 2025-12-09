import { useGameState, isUnlocked, isVisible, hasCompleted } from './Components/GameState.jsx';

export const dialogueData =  {
  // Story dialogues
  story: {
    "chapter_0" : {
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
          { type: 'SHOW', id: 'manual_icon_showcase' },
          { type: 'MARK_COMPLETED', id: 'update_manual'}
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
          { type: 'UNLOCK', id: 'mail_list'},
          { type: 'MARK_COMPLETED', id: 'update_mail'}
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
        {type: 'CORRECT_MISTAKE', id: 'mistake_1', correction: '---FOOTER---'}
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
      text: "מעולה! עכשיו כשאתה יודע מה לעשות, אני אעזוב אותך לנסות בעצמך.",
      textColor: 'var(--white)',
      emotion: 'neutral',
      name: "דניאל",
      character: "daniel",
      nameColor: "var(--blue)",
      next: "daniel_intro_21",
      onEnter: [
        {type: 'HIDE', id: 'submit-button'},
        {type: 'SHOW', id: 'submit-animation'},
        {type: 'SET_FLAG', key: 'stampedElement', value: null}
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
        { type: 'SET_FLAG', key: 'mistake_2', value: 'port' },
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
      onEnter: [
        {type: 'MARK_COMPLETED', id: 'update_manual'},
        { type: 'MARK_COMPLETED', id: 'update_mail'}
      ]
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
      answers: [30, 81, 55, 21],
      next: (state) => state.flags?.selectedAnswer === 21 ? 'maya_intro_6' : 'maya_intro_question_mistake_1',
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
        {type: 'CORRECT_MISTAKE', id: 'mistake_2', correction: 21},
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
        {type: 'SHOW', id: 'submit-animation'},
        {type: 'SET_FLAG', key: 'stampedElement', value: null}
      ],
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
        onEnter: [
          {type: 'SET_FLAG', key: 'mistake_3a', value: 'link'},
          {type: 'SET_FLAG', key: 'mistake_3b', value: 'imgLink'}
        ]
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
      waitFor: { flag: 'stampedElement' },
      onEnter: [
        {type: 'MARK_COMPLETED', id: 'update_manual'},
        { type: 'MARK_COMPLETED', id: 'update_mail'}
      ]
    },
    "liyor_intro_correct_1" : {
      text: "הפייל הזה הוא גדול מדי בשביל הפרוטוקול הזה, אתה תצטרך לבחור בפרוטוקול אחר או לשלוח את הפייל בכמה חבילות.",
      emotion: "neutral",
      name: "אני",
      character: "liyor",
      nameColor: "var(--orange)",
      next: "liyor_intro_correct_2"
    },
    "liyor_intro_correct_2" : {
      text: "אה וואלה?  לא ידעתי שיש גבול.  טוב אני אשלח פייל יותר קטן.",
      emotion: "surprised",
      name: "ליאור",
      character: "liyor",
      nameColor: "var(--green)",
      next: "liyor_intro_4",
      onEnter: [
        {type: 'CORRECT_MISTAKE', id: "mistake_3a", correction: 'Game_Beta_2024.iso (31 MB)'},
        {type: 'CORRECT_MISTAKE', id: "mistake_3b", correction: '/Monitor/pop_ups/game_beta_working.gif'},
        {type: 'SHOW', id: 'submit-button'}
      ],
      waitFor: { completed: 'submit'}
    },

    "liyor_intro_4" : {
      text: "תודה אחי, נתראה.",
      emotion: "happy",
      name: "ליאור",
      character: "liyor",
      nameColor: "var(--green)",
      next: null,
      onEnter: [
        {type: 'HIDE', id: 'submit-button'},
        {type: 'SHOW', id: 'submit-animation'}
      ]
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
  },

  "chapter_4" : {
    "dialogue_1" : {
      text: " שלום, לא נפגשנו קצת זמן. אני רואה שאתה עושה עבודה טובה.",
      nameColor: "var(--blue)",
      emotion: "happy",
      name: "דניאל",
      character: "daniel",
      next: "dialogue_2",
      onEnter: [
        {type: 'MARK_COMPLETED', id: 'read_manual_ch4'},
        {type: 'UNLOCK', id: 'network'},
        {type: 'SET_FLAG', key: 'mistake_4', value: 'network'},
        { type: 'SET_FLAG', key: 'mistake_4_code', value: 200 }
      ]
    },
    "dialogue_2" : {
      text: "התקנתי כלי חדש למוניטור העבודה שלך. תוכל להשתמש בו כאשר תפתח מכתב חדש. ",
      nameColor: "var(--blue)",
      emotion: "neutral",
      name: "דניאל",
      character: "daniel",
      next: "dialogue_3",
    },

    "dialogue_3" : {
      text: "הכנסתי לך מכתב בתיבת הדואר שתתנסה בו. תפתח אותו",
      nameColor: "var(--blue)",
      emotion: "neutral",
      name: "דניאל",
      character: "daniel",
      next: "dialogue_4",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}],
      waitFor: { completed: "opened_letter" }
    },

    "dialogue_4" : {
      text: "הכלי החדש שנשתמש בוא הוא כלי בקרת התקשורת, הוא נראה כמו סימן אנטננה. ",
      nameColor: "var(--blue)",
      emotion: "neutral",
      name: "דניאל",
      character: "daniel",
      next: "dialogue_5",
    },

    "dialogue_5" : {
      text: "תלחץ על הסימן שלו",
      nameColor: "var(--blue)",
      emotion: "neutral",
      name: "דניאל",
      character: "daniel",
      next: "dialogue_6",
      waitFor: { completed: "networkChecked"}
    },

    "dialogue_6" : {
      text: "ההודעה עברה בהצלחה, אבל זה לא יקרה ככה תמיד. ",
      nameColor: "var(--blue)",
      emotion: "neutral",
      name: "דניאל",
      character: "daniel",
      next: "dialogue_7",
    },

    "dialogue_7" : {
      text: "מעכשיו, אתה תצתרך לא רק לראות שהחבילה כתובה בלי שגיות אבל גם שהיא מחוברת.",
      nameColor: "var(--blue)",
      emotion: "neutral",
      name: "דניאל",
      character: "daniel",
      next: "dialogue_8",
    },

    "dialogue_8" : {
      text: "תשים לב להודעות שקשורות לפרוטוקול TCP, אלו משתמשים בקומוניקציות בינייהם, וחייב לבדוק אותם.",
      nameColor: "var(--blue)",
      emotion: "neutral",
      name: "דניאל",
      character: "daniel",
      next: "dialogue_exit",
      onEnter: [
        {type: 'SHOW', id: 'submit-button'}
      ],
      waitFor: { completed: 'submit'}
    },

    "dialogue_exit" : {
      text: "בהצלחה!",
      nameColor: "var(--blue)",
      emotion: "happy",
      name: "דניאל",
      character: "daniel",
      next: null,
      onEnter: [
        {type: 'HIDE', id: 'submit-button'},
        {type: 'SHOW', id: 'submit-animation'}
      ],
    }
  },

  "chapter_5" : {
    "dialogue_1" : {
      text: "...",
      nameColor: "var(--purple-pink)",
      emotion: "hiding",
      name: "מל",
      character: "mel",
      next: "dialogue_2",
      speed: 1000,
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_5', value: 'network'},
        { type: 'SET_FLAG', key: 'mistake_5_code', value: 500 }
      ]
    },
    "dialogue_2" : {
      text: "סליחה העם אמרת משהוא?",
      nameColor: "var(--orange)",
      emotion: "hiding",
      name: "אני",
      character: "mel",
      next: "dialogue_3",
    },
    "dialogue_3" : {
      text: "...",
      nameColor: "var(--purple-pink)",
      emotion: "reveal",
      name: "מל",
      character: "mel",
      next: "dialogue_4",
    },
    "dialogue_4" : {
      text: `...המכתב שלי...לא נשלח...`,
      nameColor: "var(--purple-pink)",
      emotion: "neutral",
      name: "מל",
      character: "mel",
      fontSize: "var(--font-small)",
      next: "dialogue_5",
      speed: 100
    },
    "dialogue_5" : {
      text: `מה? תדברי יותר חזק בבקשה.`,
      nameColor: "var(--orange)",
      emotion: "neutral",
      name: "אני",
      character: "mel",
      next: "dialogue_6",
    },
    "dialogue_6" : {
      text: `...`,
      nameColor: "var(--purple-pink)",
      emotion: "silent",
      name: "מל",
      character: "mel",
      next: "dialogue_7",
      speed: 1000
    },
    "dialogue_7" : {
      text: `[כנראה שאני אצטרך להסתדר בעצמי] `,
      nameColor: "var(--orange)",
      textColor: "var(--grey-1)",
      emotion: "silent",
      name: "אני",
      character: "mel",
      next: "dialogue_8",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_manual'}, { type: 'MARK_COMPLETED', id: 'update_mail'}],
      waitFor: { completed: "networkChecked"}
    },
    "dialogue_8" : {
      text: `...אה... זה לא אמור לקרות...`,
      nameColor: "var(--purple-pink)",
      emotion: "confident",
      name: "מל",
      character: "mel",
      next: "dialogue_9",
    },
    "dialogue_9" : {
      text: `זה חמש מאות. כלומר, הבקשה נשלחה כמו שצריך, אבל משהו השתבש בתוך השרת. אולי סקריפט שבור, בעיה בזיכרון, או שה-backend פשוט לא יודע איך להתמודד`,
      nameColor: "var(--purple-pink)",
      emotion: "confident",
      name: "מל",
      character: "mel",
      next: "dialogue_10",
      speed: 40,
    },
    "dialogue_10" : {
      text: `עם זה... זו לא אשמתך - השרת פשוט קרס.`,
      nameColor: "var(--purple-pink)",
      emotion: "confident",
      name: "מל",
      character: "mel",
      next: "dialogue_11",
    },
    "dialogue_11" : {
      text: `...מרשים, כמה גרוע זה נכשל.`,
      nameColor: "var(--purple-pink)",
      emotion: "neutral",
      name: "מל",
      character: "mel",
      next: "dialogue_12",
    },
    "dialogue_12" : {
      text: `וואו, את מבינה כל כך הרבה בפרוטוקולים.`,
      nameColor: "var(--orange)",
      emotion: "neutral",
      name: "אני",
      character: "mel",
      next: "dialogue_13",
    },
    "dialogue_13" : {
      text: `קצת...`,
      nameColor: "var(--purple-pink)",
      emotion: "shy",
      name: "מל",
      character: "mel",
      next: "dialogue_14",
    },
    "dialogue_14" : {
      text: `עם השרת לא מגיב עולי תוכלי להשתמש בכתובת של שרת אחר?`,
      nameColor: "var(--orange)",
      emotion: "shy",
      name: "אני",
      character: "mel",
      next: "dialogue_15",
    },
    "dialogue_15" : {
      text: `כן, אני יכולה.`,
      nameColor: "var(--purple-pink)",
      emotion: "confident",
      name: "מל",
      character: "mel",
      next: "dialogue_16",
    },
    "dialogue_16" : {
      text: `אתה יכול לסמן לי את כתובת המקור בשביל שאני אשנה אותה?`,
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_5_stamp', value: 'src-address'}
      ],
      nameColor: "var(--purple-pink)",
      emotion: "confident",
      name: "מל",
      character: "mel",
      next: "dialogue_17",
      waitFor: {flag: 'stampedElement'},
      next: (state) => state.flags?.stampedElement === 'src-address' ? 'dialogue_17' : 'dialogue_mistake_1',
    },
    "dialogue_17" : {
      text: `הנא, תיקנתי את הכתובת.`,
      onEnter: [
        {type: 'CORRECT_MISTAKE', id: "mistake_5_stamp", correction: '172.16.0.0'},
        {type: 'SHOW', id: 'submit-button'}],
      nameColor: "var(--purple-pink)",
      emotion: "shy",
      name: "מל",
      character: "mel",
      next: "dialogue_18",
      waitFor: { completed: 'submit'}
    },

    "dialogue_18" : {
      text: "...תודה.",
      nameColor: "var(--purple-pink)",
      emotion: "shy",
      name: "מל",
      character: "mel",
      next: "dialogue_19",
      speed: 100,
      fontSize: `var(--font-small)`,
      onEnter: [
        {type: 'HIDE', id: 'submit-button'},
        {type: 'SHOW', id: 'submit-animation'}
      ],
    },
    "dialogue_19" : {
      text: `מה אמרת?`,
      nameColor: "var(--orange)",
      emotion: "shy",
      name: "אני",
      character: "mel",
      next: "dialogue_exit",
    },
    "dialogue_exit" : {
      text: "...",
      name: "אני",
      nameColor: "var(--orange)",
      next: null,
      onEnter: [
        {type: 'HIDE', id: 'submit-animation'},
        {type: 'MARK_COMPLETED', id: 'chapter_5'}
      ],
      emotion: "missing",
      speed: 1000
    },
    
    "dialogue_mistake_1" : {
      text: `החלק הזה כתוב לא נכון.`,
      nameColor: "var(--orange)",
      emotion: "neutral",
      name: "אני",
      character: "mel",
      next: "dialogue_mistake_2",
    },
    "dialogue_mistake_2" : {
      text: `...לא`,
      nameColor: "var(--purple-pink)",
      emotion: "shy",
      name: "מל",
      character: "mel",
      next: "dialogue_mistake_3"
    },
    "dialogue_mistake_3" : {
      text: `[היא אפילו לא מסתכלת עליי.]`,
      nameColor: "var(--orange)",
      emotion: "shy",
      name: "אני",
      character: "mel",
      textColor: `var(--grey-1)`,
      next: "dialogue_16",
      onEnter: [{type: 'SET_FLAG', key: 'stampedElement', value: null}]
    }

  },

  "chapter_6" : {
    "dialogue_1" : {
      text: `או שלום, חמודי! בדיוק אפיתי עוגיות ואני רוצה לשלוח אותן לנכד שלי בחיפה. אתה יכול לעזור לי לשלוח אותן באינטרנט?`,
      nameColor: "var(--dry-earth)",
      character: "granny",
      emotion: "happy",
      name: "סבתא ליוויה",
      next: "dialogue_2",
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_6', value: 'letter'},
        {type: 'SET_FLAG', key: 'letter_state', value: 'crappy'}
      ]
    },
    "dialogue_2" : {
      text: `בטח! באיזה פרוטוקול את רוצה להשתמש?`,
      nameColor: "var(--orange)",
      emotion: "neutral",
      name: "אני",
      character: "granny",
      next: "dialogue_3",
    },
    "dialogue_3" : {
      text: `פרו-מה? אני רק רוצה שהן יגיעו חמות ולא פרוצות כמו בפעם הקודמת!`,
      nameColor: "var(--dry-earth)",
      character: "granny",
      emotion: "grumpy",
      name: "סבתא ליוויה",
      next: "dialogue_4"
    },
    "dialogue_4" : {
      text: `[נראה שהמדריך שלי התעדכן, עולי היא משתמשת בפרוטוקול ההוא]`,
      nameColor: "var(--orange)",
      character: "granny",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_5",
      textColor: "var(--grey-1)",
      onEnter: [
        {type: 'MARK_COMPLETED', id: 'update_manual'},
        { type: 'MARK_COMPLETED', id: 'update_mail'}
      ],
      waitFor: {completed: 'opened_letter'}
    },
    "dialogue_5" : {
      text: `["מה זה?! הכול פה לא נכון… זה נראה כמו קשקוש של ילד!]`,
      nameColor: "var(--orange)",
      character: "granny",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_6",
      textColor: "var(--grey-1)",
    },
    "dialogue_6" : {
      text: `[אני חייב לסמן הכל עם החותמת!]`,
      nameColor: "var(--orange)",
      character: "granny",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_7",
      textColor: "var(--grey-1)",
      waitFor: {flag: 'stampedElement'}
    },
    "dialogue_7" : {
      text: `סליחה, אני לא יכול לשלוח מכתב במצב כזה.`,
      nameColor: "var(--orange)",
      character: "granny",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_8",
    },
    "dialogue_8" : {
      text: `נו באמת, למה אתם הצעירים עושים מזה כזה עניין? פעם היינו שולחים מכתבים עם יונים וזה תמיד עבד!`,
      nameColor: "var(--dry-earth)",
      character: "granny",
      emotion: "grumpy",
      name: "סבתא ליוויה",
      next: "dialogue_9"
    },
    "dialogue_9" : {
      text: `[אוף! טוב, אני פשוט אכין אחד חדש]`,
      textColor: "var(--grey-1)",
      nameColor: `var(--orange)`,
      character: "granny",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_10",
    },
    "dialogue_10" : {
      text: `[אוקיי, הפרוטוקול שאני אשתמש בוא הוא HTTPS]`,
      textColor: "var(--grey-1)",
      nameColor: `var(--orange)`,
      character: "granny",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_11",
      onEnter: [
        {type: 'SET_FLAG', key: 'letter_state', value: 'new'},
        {type: 'SET_FLAG', key: 'showcaseLetterField', value: 'protocol'}
      ]
    },
    "dialogue_11" : {
      text: `[הכתובת מקור תהיה לוקאלית, באיזה אני יכול לבחור?]`,
      textColor: "var(--grey-1)",
      nameColor: `var(--orange)`,
      character: "granny",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_12",
      onEnter: [
        {type: 'MARK_COMPLETED', id: 'fixProtocol'},
        {type: 'SET_FLAG', key: 'showcaseLetterField', value: 'sourceAdress'},
        {type: 'SET_FLAG', key: 'selectedAnswer', value: null}
      ]
    },
    "dialogue_12" : {
      type: 'question',
      answers: ['300.300.300', '10.500.1.1', '255.255.255.255', '127.0.0.1'],
      next: (state) => state.flags?.selectedAnswer === '127.0.0.1' ? 'dialogue_13' : 'question-1-mistake',
      waitFor: {flag: 'selectedAnswer'}
    },
    "dialogue_13" : {
      text: `[עכשיו כתובת יעד, צריך לבחור במשהו תקין.]`,
      textColor: "var(--grey-1)",
      nameColor: `var(--orange)`,
      character: "granny",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_14",
      onEnter: [
        {type: 'MARK_COMPLETED', id: 'fixSrcAdress'},
        {type: 'SET_FLAG', key: 'showcaseLetterField', value: 'destAdress'},
        {type: 'SET_FLAG', key: 'selectedAnswer', value: null}
      ]
    },
    "dialogue_14" : {
      type: 'question',
      answers: ['172.20.112.34', '256.256.256.256', '127.0.0.1', '999.999.999.999'],
      next: (state) => state.flags?.selectedAnswer === '127.0.0.1' ? 'question-2-mistake-1' : state.flags?.selectedAnswer ===  '172.20.112.34' ? 'dialogue_15' : 'question-2-mistake-2',
      waitFor: {flag: 'selectedAnswer'}
    },
    "dialogue_15" : {
      text: `[איזה פורט צריך לבחור לפרוטוקול HTTPS?]`,
      textColor: "var(--grey-1)",
      nameColor: `var(--orange)`,
      character: "granny",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_16",
      onEnter: [
        {type: 'MARK_COMPLETED', id: 'fixDestAdress'},
        {type: 'SET_FLAG', key: 'showcaseLetterField', value: 'port'},
        {type: 'SET_FLAG', key: 'selectedAnswer', value: null}
      ]
    },
    "dialogue_16" : {
      type: 'question',
      answers: [21, 80, 443, 666],
      next: (state) => state.flags?.selectedAnswer === 80 ? 'dialogue_17' : 'question-3-mistake',
      waitFor: {flag: 'selectedAnswer'}
    },
    "dialogue_17" : {
      text: `[והכי חשוב - מה אסור לי לשכוח?]`,
      textColor: "var(--grey-1)",
      nameColor: `var(--orange)`,
      character: "granny",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_18",
      onEnter: [
        {type: 'MARK_COMPLETED', id: 'fixPort'},
        {type: 'SET_FLAG', key: 'showcaseLetterField', value: 'page'},
        {type: 'SET_FLAG', key: 'selectedAnswer', value: null}
      ]
    },
    "dialogue_18" : {
      type: 'question',
      answers: ['עוגיות', 'בדיקת אינטרנט', 'HEADER + FOOTER', 'לסגור את המכתב'],
      next: (state) => state.flags?.selectedAnswer === 'עוגיות' ? 'question-4-mistake-1' : state.flags?.selectedAnswer === 'בדיקת אינטרנט' ? 'question-4-mistake-2' : state.flags?.selectedAnswer === 'HEADER + FOOTER' ? 'dialogue_19' : 'question-4-mistake-3',
      waitFor: {flag: 'selectedAnswer'}
    },
    "dialogue_19" : {
      text: `[המכתב נראה תקין, אני אוסיף את הטקסט בפנים.]`,
      textColor: "var(--grey-1)",
      nameColor: `var(--orange)`,
      character: "granny",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_20",
      onEnter: [
        {type: 'MARK_COMPLETED', id: 'fixPage'},
        {type: 'SET_FLAG', key: 'showcaseLetterField', value: null},
        {type: 'SET_FLAG', key: 'selectedAnswer', value: null}
      ]
    },
    "dialogue_20" : {
      text: `[כל מה שנשאר זה לשלוח אותו]`,
      textColor: "var(--grey-1)",
      nameColor: `var(--orange)`,
      character: "granny",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_21",
      onEnter: [
        {type: 'SHOW', id: 'submit-button'},
        {type: 'MARK_COMPLETED', id: 'mistake_6'}
      ],
      waitFor: { completed: 'submit'}
    },
    "dialogue_21" : {
      text: `המכתב נשלח בהצלחה, אבל בבקשה בפעם הבאה תמלאי את כל הנתונים כמו שצריך.`,
      nameColor: `var(--orange)`,
      character: "granny",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_exit",
      onEnter: [
        {type: 'HIDE', id: 'submit-button'},
        {type: 'SHOW', id: 'submit-animation'}]
    },

    "dialogue_exit" : {
      text: `אוהוהו, בסדר חביב. סליחה על כל הסיבוך שייצרתי.`,
      nameColor: "var(--dry-earth)",
      character: "granny",
      emotion: "happy",
      name: "סבתא ליוויה",
      next: null,
      onEnter: [{type: 'HIDE', id: 'submit-animation'}]
    },

    "question-1-mistake" : {
      text: `[זו כתובת לא חוקית]`,
      textColor: "var(--grey-1)",
      nameColor: `var(--orange)`,
      character: "granny",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_11",
      onEnter: [{type: 'SET_FLAG', key: 'selectedAnswer', value: null}]
    },
    "question-2-mistake-1" : {
      text: `[זו הכתובת שלי... לא היעד]`,
      textColor: "var(--grey-1)",
      nameColor: `var(--orange)`,
      character: "granny",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_13",
      onEnter: [{type: 'SET_FLAG', key: 'selectedAnswer', value: null}]
    },
    "question-2-mistake-2" : {
      text: `[זו כתובת לא חוקית]`,
      textColor: "var(--grey-1)",
      nameColor: `var(--orange)`,
      character: "granny",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_13",
      onEnter: [{type: 'SET_FLAG', key: 'selectedAnswer', value: null}]
    },
    "question-3-mistake" : {
      text: `[לא, זה לא הפורט הנכון לפרוטוקול הזה.]`,
      textColor: "var(--grey-1)",
      nameColor: `var(--orange)`,
      character: "granny",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_15",
      onEnter: [{type: 'SET_FLAG', key: 'selectedAnswer', value: null}]
    },
    "question-4-mistake-1" : {
      text: `[איך זה קשור עכשיו?!]`,
      textColor: "var(--grey-1)",
      nameColor: `var(--orange)`,
      character: "granny",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_17",
      onEnter: [{type: 'SET_FLAG', key: 'selectedAnswer', value: null}]
    },
    "question-4-mistake-2" : {
      text: `[אה, נכון! אבל יש לי הרגשה שאני מפספס משהוא עוד יותר חשוב]`,
      textColor: "var(--grey-1)",
      nameColor: `var(--orange)`,
      character: "granny",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_17",
      onEnter: [{type: 'SET_FLAG', key: 'selectedAnswer', value: null}]
    },
    "question-4-mistake-3" : {
      text: `[...המכתב תמיד נסגר.]`,
      textColor: "var(--grey-1)",
      nameColor: `var(--orange)`,
      character: "granny",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_17",
      speed: 30,
      onEnter: [{type: 'SET_FLAG', key: 'selectedAnswer', value: null}]
    }
  },

  "chapter_7" : {
    "dialogue_1": {
      text: `שלום, הנא אני שוב.`,
      nameColor: "var(--blue)",
      emotion: "happy",
      name: "דניאל",
      character: "daniel",
      next: "dialogue_2",
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_7', value: 'terminal'},
        {type: 'SET_FLAG', key: 'mistake_7_command', value: 'LIST'}
      ]
    },
    "dialogue_2": {
      text: `התקנתי לך עוד כלי חדש שתצטרך להשתמש בו.`,
      nameColor: "var(--blue)",
      emotion: "neutral",
      name: "דניאל",
      character: "daniel",
      next: "dialogue_3",
    },
    "dialogue_3": {
      text: `תפתח את המכתב ששלחתי לך בשביל להתנסות בו.`,
      nameColor: "var(--blue)",
      emotion: "neutral",
      name: "דניאל",
      character: "daniel",
      next: "dialogue_4",
      onEnter: [
        {type: 'MARK_COMPLETED', id: 'update_mail'},
        {type: 'UNLOCK', id: 'terminal'}
      ],
      waitFor: { completed: "opened_letter"}
    },
    "dialogue_4": {
      text: `היום אנחנו עובדים עם פרוטוקול <span style='color:var(--red)'>POP3</span>, שמיועד למשוך הודעות דוא״ל מהשרת אל המחשב המקומי.`,
      nameColor: "var(--blue)",
      emotion: "neutral",
      name: "דניאל",
      character: "daniel",
      next: "dialogue_5",
    },
    "dialogue_5" : {
      text: `אתה רואה את האייקון החדש שנראה כמו מסך שחור? זה כלי הטרמינל שלך. לחץ עליו.`,
      nameColor: "var(--blue)",
      emotion: "neutral",
      name: "דניאל",
      character: "daniel",
      waitFor: { visible: 'using_terminal' },
      next: "dialogue_6",
    },
    "dialogue_6" : {
      text: `הכלי הזה מבצע פקודות, ומוסיף את המידע החדש למכתב, אבל רק עם הפקודות נכתבו נכון.`,
      nameColor: "var(--blue)",
      emotion: "neutral",
      name: "דניאל",
      character: "daniel",
      next: "dialogue_7"
    },

    "dialogue_7" : {
      text: `הפקודה שאני רוצה שתשתמש בה עכשיו היא: <span style='color:var(--orange)'>LIST</span>.`,
      nameColor: "var(--blue)",
      emotion: "neutral",
      name: "דניאל",
      character: "daniel",
      next: "dialogue_8",
    },

    "dialogue_8" : {
      text: `פקודת <span style='color:var(--orange)'>LIST</span> משמשת לקבלת רשימה של כל ההודעות שבתיבת הדואר. היא מחזירה לכל הודעה את מספרה ואת הגודל שלה, בלי להראות את התוכן.`,
      nameColor: "var(--blue)",
      emotion: "neutral",
      name: "דניאל",
      character: "daniel",
      next: "dialogue_9",
    },

    "dialogue_9" : {
      text: `תנסה לרשום <span style='color:var(--orange)'>LIST</span> בטרמינל בשביל להפעיל אותה`,
      nameColor: "var(--blue)",
      emotion: "neutral",
      name: "דניאל",
      character: "daniel",
      next: "dialogue_10",
      waitFor: {completed: 'mistake_7'}
    },
    "dialogue_10" : {
        text: `זה הכל אתה יכול להגיש את המכתב.`,
        nameColor: "var(--blue)",
        emotion: "happy",
        name: "דניאל",
        character: "daniel",
        next: "dialogue_11",
        onEnter: [
          {type: 'SHOW', id: 'submit-button'}
        ],
        waitFor: { completed: 'submit'}
    },
    "dialogue_11" : {
      text: `זכור, יש פרוטוקולים שדורשים פקודות ספציפיות כדי לתקשר איתם. תמיד תמצא את הפקודות האלה בעמוד המדריך של הפרוטוקול.`,
      nameColor: "var(--blue)",
      emotion: "neutral",
      name: "דניאל",
      character: "daniel",
      next: "dialogue_12",
      onEnter: [
        {type: 'HIDE', id: 'submit-button'},
        {type: 'SHOW', id: 'submit-animation'}
      ],
    },
    "dialogue_12" : {
      text: `חשוב לזכור, פרוטוקולים שונים לא משתמשים באותם פקודות.`,
      nameColor: "var(--blue)",
      emotion: "neutral",
      name: "דניאל",
      character: "daniel",
      next: "dialogue_exit",
    },
    "dialogue_exit" : {
      text: `מקווה שזה עזר לעשות סדר. תמשיך הלאה!`,
      nameColor: "var(--blue)",
      emotion: "happy",
      name: "דניאל",
      character: "daniel",
      next: null,
      onEnter: [{type: 'HIDE', id: 'submit-animation'}]
    }
  },
  "chapter_8" : {
      "dialogue_1" : {
        text: `שלום, שמעתי שסניף הדואר הזה יכול להפעיל פקודות עכשיו.`,
        nameColor: "var(--yellow)",
        emotion: "neutral",
        name: "שמעון",
        character: "shimon",
        next: "dialogue_2",
        onEnter: [
          {type: 'SET_FLAG', key: 'mistake_8', value: 'terminal'},
          {type: 'SET_FLAG', key: 'mistake_8_command', value: 'st'},
          {type: 'SET_FLAG', key: 'mistake_8_stamp', value: 'port'}
        ]
      },
      "dialogue_2" : {
        text: `אני צריך שתבצע פקודת בדיקת סטטוס המערכת.`,
        emotion: "neutral",
        name: "שמעון",
        character: "shimon",
        next: "dialogue_3",
        nameColor: "var(--yellow)",
      },
      "dialogue_3" : {
        text: `ותבדוק שאין שום שגיות...זה כבר קרה לפני.`,
        emotion: "angry",
        name: "שמעון",
        character: "shimon",
        next: "dialogue_4",
        nameColor: "var(--yellow)",
      },
      "dialogue_4" : {
        text: `כן...בטח.`,
        emotion: "angry",
        name: "אני",
        character: "shimon",
        next: "dialogue_5",
        nameColor: "var(--orange)",
      },
      "dialogue_5" : {
        text: `[הוא אמר להשתמש בפקודה... היא כנראה תהיה כתובה לי במדריך]`,
        textColor: "var(--grey-1)",
        emotion: "neutral",
        name: "אני",
        character: "shimon",
        next: "dialogue_6",
        nameColor: "var(--orange)",
        onEnter: [
          {type: 'MARK_COMPLETED', id: 'update_manual'},
        ],
        waitFor: { completed: 'read_manual_ch8' }
      },
      "dialogue_6" : {
        text: `[אוקיי, אני חושב שהבנתי...אני צריך להשתמש בפקודה הזאת...נראה שהמכתב נשלח לתיבת הדואר שלי]`,
        textColor: "var(--grey-1)",
        emotion: "neutral",
        name: "אני",
        character: "shimon",
        next: "dialogue_7",
        nameColor: "var(--orange)",
        onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}],
        waitFor: { completed: 'mistake_8'}
      },
      "dialogue_7" : {
        text: `[אוקיי, סיימתי! אבל...]`,
        textColor: "var(--grey-1)",
        emotion: "neutral",
        name: "אני",
        character: "shimon",
        nameColor: "var(--orange)",
        next: "dialogue_8",
      },
      "dialogue_8" : {
        text: `[משהוא היה לא בסדר עם תוצאת הפקודה...העם יש איזו שהיא בעיה במכתב?]`,
        textColor: "var(--grey-1)" ,
        emotion: "neutral",
        name: "אני",
        character: "shimon",
        nameColor: "var(--orange)",
        next: (state) => state.flags?.stampedElement === 'port' ? 'dialogue_9' : 'dialogue_mistake_1_1',
        waitFor: { flag: 'stampedElement' }
      },
      "dialogue_9" : {
        text: `הפורט הזה הוא שגוי.`,
        emotion: "neutral",
        name: "אני",
        character: "shimon",
        nameColor: "var(--orange)",
        next: 'dialogue_10'
      },
      "dialogue_10" : {
        text: `כן? כנראה שאחד מהעובדים שלי לא מילא את המכתב כשמבוקש, שוב.`,
        emotion: "angry",
        name: "שמעון",
        character: "shimon",
        nameColor: "var(--yellow)",
        next: 'dialogue_11'
      },
      "dialogue_11" : {
        text: `אז מה הוא אמור להיות?`,
        emotion: "curious",
        name: "שמעון",
        character: "shimon",
        nameColor: "var(--yellow)",
        next: 'dialogue_12'
      },
      "dialogue_12" : {
        type: 'question',
        answers: [12, 55, 45, 23],
        next: (state) => state.flags?.selectedAnswer === 23 ? 'dialogue_13' : 'dialogue_mistake_2',
        waitFor: {flag: 'selectedAnswer'}
      },
      "dialogue_13" : {
        text: `אני מבין...המכתב יתוקן על-ידי.`,
        emotion: "sad",
        name: "שמעון",
        character: "shimon",
        nameColor: "var(--yellow)",
        onEnter: [
          {type: 'SET_FLAG', key: 'selectedAnswer', value: null},
          {type: 'CORRECT_MISTAKE', id: "mistake_8_stamp", correction: 23},
          {type: 'SHOW', id: 'submit-button'}],
        next: 'dialogue_exit',
        waitFor: { completed: 'submit'}
      },
      "dialogue_exit" : {
        text: `תודה על העזרה.`,
        emotion: "happy",
        name: "שמעון",
        character: "shimon",
        nameColor: "var(--yellow)",
        onEnter: [{type: 'HIDE', id: 'submit-button'}, {type: 'SHOW', id: 'submit-animation'}],
        next: null
      },
      'dialogue_mistake_1_1' : {
        text: `יש שגיאה בשורה הזאתי.`,
        emotion: "neutral",
        name: "אני",
        character: "shimon",
        nameColor: "var(--orange)",
        next: 'dialogue_mistake_1_2'
      },
      'dialogue_mistake_1_2' : {
        text: `אין פה שום שגיאות, על תבזבז את הזמן שלי.`,
        emotion: "angry",
        name: "שמעון",
        character: "shimon",
        nameColor: "var(--yellow)",
        next: 'dialogue_mistake_1_3'
      },
      "dialogue_mistake_1_3" : {
        text: `...אני מצטער.`,
        emotion: "angry",
        name: "שמעון",
        character: "shimon",
        nameColor: "var(--yellow)",
        next: 'dialogue_7',
        onEnter: [{type: 'SET_FLAG', key: 'stampedElement', value: null}]
      },
      "dialogue_mistake_2" : {
        text: `[לא?! מה אני בכלל חושב, זה לא יכול להיות המספר הזה!]`,
        textColor: "var(--grey-1)" ,
        emotion: "curious",
        name: "אני",
        character: "shimon",
        nameColor: "var(--orange)",
        next: 'dialogue_11',
        onEnter: [{type: 'SET_FLAG', key: 'selectedAnswer', value: null}]
      }
  },
  "chapter_9" : {
    "dialogue_1" : {
      text: `אה, היי שוב!`,
      character: "maya",
      nameColor: "var(--yellow)",
      emotion: "happy",
      name: "מאיה",
      next: "dialogue_2",
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_9', value: 'network'},
        { type: 'SET_FLAG', key: 'mistake_9_code', value: 525 }
      ]
    },
    "dialogue_2" : {
      text: `אתה בטח עדיין מתאושש משמעון, נכון? הוא שונא לבוא לכאן`,
      character: "maya",
      emotion: "neutral",
      nameColor: "var(--yellow)",
      name: "מאיה",
      next: "dialogue_3",
    },
    "dialogue_3" : {
      text: `הוא הגיע בפעם הקודמת רק כי פישלתי במכתב.`,
      character: "maya",
      emotion: "sad",
      nameColor: "var(--yellow)",
      name: "מאיה",
      next: "dialogue_4",
    },
    "dialogue_4" : {
      text: `בכל מקרה, הבוס שלי אמר שאני חייבת לבדוק אם המכתב יגיע כמו שצריך - אתה יודע, כי אנחנו משתמשים בפרוטוקול SSL.`,
      character: "maya",
      emotion: "neutral",
      nameColor: "var(--yellow)",
      name: "מאיה",
      next: "dialogue_5",
    },
    "dialogue_5" : {
      text: `תוכל לבדוק לי את החיבור?`,
      character: "maya",
      emotion: "neutral",
      nameColor: "var(--yellow)",
      name: "מאיה",
      next: "dialogue_6",
    },
    "dialogue_6" : {
      text: `כן בטח, אני על זה.`,
      character: "maya",
      emotion: "neutral",
      nameColor: "var(--orange)",
      name: "אני",
      next: "dialogue_7",
    },
    "dialogue_7" : {
      text: `[כדאי לי לקרוא את המדריך לגבי הפרוטוקול "SSL", לפני שאני מוריד את המכתב לתיבת הדואר שלי...זה יכול לעזור.]`,
      textColor: "var(--grey-1)",
      character: "maya",
      emotion: "neutral",
      nameColor: "var(--orange)",
      name: "אני",
      next: "dialogue_8",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_manual'}],
      waitFor: { completed: 'read_manual_ch9'}
    },
    "dialogue_8" : {
      text: `[מעניין, אז יכולים להיווצר שגיאות בחיבור אפילו עם הנתונים נכונים, טוב אני אתחיל לעבור על המכתב]`,
      textColor: "var(--grey-1)",
      character: "maya",
      emotion: "neutral",
      nameColor: "var(--orange)",
      name: "אני",
      next: "dialogue_9",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}],
      waitFor: {completed: 'networkChecked'}
    },
    "dialogue_9" : {
      text: `נראה שיש בעיה, עם השרת המכתב לא נשלח.`,
      character: "maya",
      emotion: "neutral",
      nameColor: "var(--orange)",
      name: "אני",
      next: "dialogue_10",
    },
    "dialogue_10" : {
      text: `אוי לא... שוב עשיתי טעות! בטח כתבתי את הפורט לא נכון`,
      character: "maya",
      emotion: "surprised",
      nameColor: "var(--yellow)",
      name: "מאיה",
      next: "dialogue_11",
    },
    "dialogue_11" : {
      text: `זה תמיד קורה לי. אני בטוחה שיום אחד יפתרו אותי ככה`,
      character: "maya",
      emotion: "sad",
      nameColor: "var(--yellow)",
      name: "מאיה",
      next: "dialogue_12",
    },
    "dialogue_12" : {
      text: `רגע, זה ממש לא אשמתך. החיבור נכשל בגלל שגיאת <span style='color:var(--blue)'>Handshake</span> ,לא בגלל שכתבת משהו לא נכון.`,
      name: "אני",
      nameColor: "var(--orange)",
      next: "dialogue_13"
    },
    "dialogue_13" : {
      text: `כן? אז מה בעצם אני אמורה לשנות?`,
      emotion: "confused",
      nameColor: "var(--yellow)",
      name: "מאיה",
      next: "dialogue_14"
    },
    "dialogue_14" : {
      type: 'question',
      answers: ['כתובת מקור', 'כתובת יעד', 'פורט', 'פרוטוקול'],
      next: (state) => state.flags?.selectedAnswer === 'כתובת מקור' ? 'dialogue_15' : 'dialogue_mistake_1_1',
      waitFor: {flag: 'selectedAnswer'}
    },
    "dialogue_15" : {
      text: `צריך לעדכן את קובץ ההגדרות, להחליף את כתובת ה-IP לכתובת החלופית ולשמור. זה מאלץ את השרת לבצע שוב את ה-Handshake כראוי.`,
      name: 'אני',
      nameColor: 'var(--orange)',
      next: "dialogue_16"
    },
    "dialogue_16" : {
      text: `עם אתה אומר שזה יכול לעזור...יש לי עוד כתובת שאני יכולה להשתמש בה.`,
      nameColor: "var(--yellow)",
      name: "מאיה",
      emotion: "neutral",
      next: "dialogue_17"
    },
    "dialogue_17" : {
      text: `תוכל לסמן לי את כתובת המקור בשביל שאני אשנה אותה?`,
      nameColor: "var(--yellow)",
      name: "מאיה",
      emotion: "neutral",
      next: (state) => state.flags.stampedElement === 'src-address' ? "dialogue_18" : "dialogue_mistake_2_1",
      waitFor: {flag: "stampedElement"},
      onEnter: [{type: 'SET_FLAG', key: 'mistake_9_stamp', value: 'src-address'}]
    },
    "dialogue_18" : {
      text: `הנה, העם תוכל לבדוק עוד פעם את החיבור?`,
      nameColor: "var(--yellow)",
      name: "מאיה",
      emotion: "neutral",
      onEnter: [
        {type: 'CORRECT_MISTAKE', id: 'mistake_9_stamp', correction: '192.168.12.45'},
        {type: 'SET_FLAG', key: 'mistake_9_code', value: 200},
        {type: 'CLEAR_COMPLETED', id: 'networkChecked'}
      ],
      waitFor: {completed: 'networkChecked'},
      next: "dialogue_19"
    },
    "dialogue_19" : {
      text: `[נראה שהכתובת החדשה עבדה]`,
      name: 'אני',
      nameColor: 'var(--orange)',
      textColor: 'var(--grey-1)',
      next: "dialogue_20",
      onEnter: [{type: 'SHOW', id: 'submit-button'}],
      waitFor: {completed: 'submit'}
    },
    "dialogue_20" : {
      text: `המכתב נשלח כמו שצריך.`,
      name: 'אני',
      nameColor: 'var(--orange)',
      onEnter: [{type: 'HIDE', id: 'submit-button'}, {type: 'SHOW', id: 'submit-animation'}],
      next: "dialogue_exit"
    },
    "dialogue_exit" : {
      text: `וואו! זה באמת עבד, תודה רבה!`,
      emotion: "happy",
      name: "מאיה",
      nameColor: "var(--yellow)",
      next: null
    },
    "dialogue_mistake_1_1" : {
      text: `צריך לשנות את החלק הזה`,
      nameColor: "var(--yellow)",
      name: 'אני',
      nameColor: 'var(--orange)',
      next: "dialogue_mistake_1_2",
      onEnter:[{type: 'SET_FLAG', key: 'selectedAnswer', value: null}]
    },
    "dialogue_mistake_1_2" : {
      text: `למה?`,
      nameColor: "var(--yellow)",
      name: "מאיה",
      emotion: "confused",
      next: "dialogue_mistake_1_3"
    },
    "dialogue_mistake_1_3" : {
      text: `אממ....את יכולה לשאולי אותי שוב?`,
      emotion: "angry",
      name: 'אני',
      nameColor: 'var(--orange)',
      next: "dialogue_13"
    },
    "dialogue_mistake_2_1" : {
      text: `אני חושבת שסימנתה משהוא אחר...`,
      emotion: "angry",
      name: "מאיה",
      nameColor: 'var(--yellow)',
      next: "dialogue_mistake_2_2"
    },
    "dialogue_mistake_2_2" : {
      text: `אה! סליחה אני אנסה שוב`,
      emotion: "angry",
      name: "אני",
      nameColor: 'var(--orange)',
      next: "dialogue_17",
      onEnter: [{type: 'SET_FLAG', key: 'stampedElement', value: null}]
    }
  },

  "chapter_10" : {
    "dialogue_1" : {
      text: `היי... אמ... אני צריכה לשלוח הודעה פרטית דרך הפרוטוקול SSH.`,
      character: "mel",
      name: "מל",
      emotion: "shy",
      nameColor: "var(--purple-pink)",
      next: "dialogue_2",
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_10', value: 'terminal'},
        {type: `SET_FLAG`, key: 'mistake_10_command', value: 'ssh mel@10.0.0.1'}]
    },
    "dialogue_2" : {
      text: `...בבקשה רק...אל תקרא את המכתב`,
      emotion: "neutral",
      name: "מל",
      nameColor: "var(--purple-pink)",
      speed: 120,
      next: "dialogue_3"
    },
    "dialogue_3" : {
      text: `[זה רק הופר אותי ליותר מעוניין]`,
      name: "אני",
      nameColor: "var(--orange)",
      textColor: "var(--grey-1)",
      next: "dialogue_4"
    },
    "dialogue_4" : {
      text: `[טוב בוא נקרא מה כתוב במדריך שלי]`,
      name: "אני",
      nameColor: "var(--orange)",
      textColor: "var(--grey-1)",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_manual'}],
      waitFor: {completed: 'read_manual_ch10'},
      next: "dialogue_5"
    },
    "dialogue_5" : {
      text: `[נראה שאני אצטרך להתחבר דרך פקודה בשביל לשלוח את המכתב]`,
      name: "אני",
      nameColor: "var(--orange)",
      textColor: "var(--grey-1)",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}],
      waitFor: {visible: 'using_terminal'},
      next: "dialogue_6"
    },
    "dialogue_6" : {
      text: `אתה צריך להתחבר בשביל לבצע את השליחה, הנה הקוד שלי.`,
      name: "מל",
      nameColor: "var(--purple-pink)",
      emotion: "confident",
      next: "dialogue_7"
    },
    "dialogue_7" : {
      text: `שם המשתמש שלי הוא “mel”, והכתובת שלי היא: “10.0.0.1”.`,
      name: "מל",
      nameColor: "var(--purple-pink)",
      next: "dialogue_8",
      waitFor: {completed: 'mistake_10'}
    },
    "dialogue_8" : {
      text: `זה הכל, אתה יכול לשלוח את המכתב עכשיו.`,
      emotion: "shy",
      name: "מל",
      nameColor: "var(--purple-pink)",
      onEnter: [{type: 'SHOW', id: 'submit-button'}],
      next: (state) => state.flags.letter_state ? 'dialogue_special_1' : 'dialogue_9',
      waitFor: { completedAny: [{completed : 'submit'}, {flag: 'letter_state'}] }
    },
    "dialogue_9" : {
      text: `תודה`,
      emotion: "shy",
      name: "מל",
      next: "dialogue_10",
      nameColor: "var(--purple-pink)",
      onEnter: [{type: 'SHOW', id: 'submit-animation'}, {type: 'HIDE', id: 'submit-button'}]
    },
    "dialogue_10" : {
      text: `אין בעד מ-`,
      emotion: 'missing',
      name: "אני",
      nameColor: "var(--orange)",
      next: "dialogue_11"
    },
    "dialogue_11" : {
      text: `[אולי בפעם הבאה]`,
      emotion: "missing",
      name: "אני",
      nameColor: "var(--orange)",
      textColor: "var(--grey-1)",
      next: "dialogue_exit"
    },
    "dialogue_exit" : {
      text: `[מזה? היא שחכה משהוא פה?]`,
      emotion: "missing",
      name: "אני",
      nameColor: "var(--orange)",
      textColor: "var(--grey-1)" // Maybe show the item
    },
    "dialogue_special_1" : {
      text: `...`,
      speed: 1000,
      name: "מל",
      nameColor: "var(--purple-pink)",
      emotion: "emberassed",
      next: "dialogue_9",
      waitFor: {completed: 'submit'}
    },
  },
  "chapter_11" : {
    "dialogue_1" : {
      text: `היי, אחי! מה קורה? תנחש למה באתי היום?`,
      character: "liyor",
      name: "ליאור",
      nameColor: "var(--green)",
      emotion: "happy",
      next: "dialogue_2",
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_11', value: 'network'},
        {type: 'SET_FLAG', key: 'mistake_11_code', value: '100'}
      ]
    },
    "dialogue_2" : {
      text: `בשביל לשלוח מכתב?`,
      character: "liyor",
      name: "אני",
      nameColor: "var(--orange)",
      emotion: "happy",
      next: "dialogue_3"
    },
    "dialogue_3" : {
      text: `בשביל לשחק <span style='color:var(--green)'>VineCraft</span>, ברור!`,
      character: "liyor",
      name: "ליאור",
      nameColor: "var(--green)",
      emotion: "neutral",
      next: "dialogue_4"
    },
    "dialogue_4" : {
      text: `אתה מתכוון Minecraft, נכון?`,
      character: "liyor",
      name: "אני",
      nameColor: "var(--orange)",
      next: "dialogue_5"
    },
    "dialogue_5" : {
      text: `ששש! שלא ישמעו האנשים של זכויות היוצרים.`,
      character: "liyor",
      name: "ליאור",
      nameColor: "var(--green)",
      emotion: "happy",
      next: "dialogue_6"
    },
    "dialogue_6" : {
      text: `בכל מקרה, אני צריך לשלוח קצת מידע לאתר של VineCraft כדי שאוכל לשחק.`,
      character: "liyor",
      name: "ליאור",
      nameColor: "var(--green)",
      emotion: "neutral",
      next: "dialogue_7"
    },
    "dialogue_7" : {
      text: `בסדר, אני רק צריך לבדוק מידע על הפרוטוקול שאתה משתמש בוא.`,
      character: "liyor",
      name: "אני",
      nameColor: "var(--orange)",
      next: "dialogue_8",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_manual'}],
      waitFor: { completed: 'read_manual_ch11'}
    },
    "dialogue_8" : {
      text: `[פרוקול שיכול להחליף כתובת יעד בשם...נשמע ממש שימושי לאתר]`,
      name: "אני",
      nameColor: "var(--orange)",
      textColor: "var(--grey-1)",
      next: "dialogue_9"
    },
    "dialogue_9" : {
      text: `בסדר, תעביר אותו עליי.`,
      name: "אני",
      nameColor: "var(--orange)",
      next: "dialogue_10",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}],
      waitFor: {completed: 'networkChecked'}
    },
    "dialogue_10" : {
      text: `[זה מוזר...זאת לא שגיאה מהצד של השרת...]`,
      name: "אני",
      nameColor: "var(--orange)",
      textColor: "var(--grey-1)",
      next: "dialogue_11"
    },
    "dialogue_11" : {
      text: `[אני צריך לסמן משהוא עם החותמש אבל מה בדיוק?...]`,
      name: "אני",
      nameColor: "var(--orange)",
      textColor: "var(--grey-1)",
      next: (state) => state.flags.stampedElement === 'dest-address' ? "dialogue_12" : 'dialogue_mistake_1_1',
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_11_stamp', value: 'dest-address'},
        {type: 'SET_FLAG', key: 'stampedElement', value: null}
      ],
      waitFor: {flag: 'stampedElement'}
    },
    "dialogue_12" : {
      text: `לירון, אתה בטוח שזאת הכתובת הנכונה?`,
      name: "אני",
      nameColor: "var(--orange)",
      next: "dialogue_13"
    },
    "dialogue_13" : {
      text: `אה...אני לא זוכר יותר, כל מה שאני יודע זה שם האתר.`,
      character: "liyor",
      name: "ליאור",
      nameColor: "var(--green)",
      emotion: "surprised",
      next: "dialogue_14",
    },
    "dialogue_14" : {
      text : `זה טוב שבחרתה ב DNS אז, אתה לא צריך לזכור את הכתובת של השרת רק את שם ה DOMAIN שלו.`,
      name: "אני",
      nameColor: "var(--orange)",
      next: "dialogue_15"
    },
    "dialogue_15" : {
      text: `תכניס את שם האתר, והפרוטוקול ימצא את הכתובת בשבילך.`,
      name: "אני",
      nameColor: "var(--orange)",
      next: "dialogue_16"
    },
    "dialogue_16" : {
      text: `נשמע פשוט.`,
      character: "liyor",
      name: "ליאור",
      nameColor: "var(--green)",
      emotion: "neutral",
      next: "dialogue_17",
      onEnter: [
        {type: 'CORRECT_MISTAKE', id: 'mistake_11_stamp', correction: 'vinecraft.com'},
        {type: 'SET_FLAG', key: 'mistake_11_code', value: 200},
        {type: 'SHOW', id: 'submit-button'}
      ]
    },
    "dialogue_17" : {
      text: `תודה על העזרה, אה ו-`,
      emotion: "happy",
      character: "liyor",
      name: "ליאור",
      nameColor: "var(--green)",
      onEnter: [
        {type: 'SHOW', id: 'submit-animation'},
        {type: 'HIDE', id: 'submit-button'}
      ],
      next: "dialogue_18"
    },
    "dialogue_18" : {
      text: `ראיתי בחורה בחוץ עם אוזניות, היא ברחה ישר אחרי ששאלתי למה שהיא מקשיבה, מה הקטע שלה? `,
      emotion: "neutral",
      character: "liyor",
      name: "ליאור",
      nameColor: "var(--green)",
      next: 'dialogue_19'
    },
    "dialogue_19" : {
      text: "[אנחנו באימת גרים בעולם קטן]",
      name: "אני",
      nameColor: "var(--orange)",
      textColor: "var(--grey-1)",
      next: "dialogue_20"
    },
    "dialogue_20" : {
      text: `פעם הבאה שתראה אותה, תגיד לה שהיא שכחה את התיק שלה פה.`,
      name: "אני",
      nameColor: "var(--orange)",
      next: "dialogue_exit"
    },
    "dialogue_exit" : {
      text: `כן, אתה יכול לסמוך עליי, אחי.`,
      emotion: "happy",
      character: "liyor",
      name: "ליאור",
      nameColor: "var(--green)",
    },
    "dialogue_mistake_1_1" : {
      text: `[מה לגבי החלק הזה? לא! אני מפספס משהוא פה, כדאי לי לקרוא את המדריך שלי שוב.]`,
      name: "אני",
      nameColor: "var(--orange)",
      textColor: "var(--grey-1)",
      next: "dialogue_11"
    }
  },
  "chapter_12" : {
    "dialogue_1" : {
      text: `שלום חמודי, בדיוק אפיתי עגלה חדשה של עוגיות ואני רוצה לשלוח אותן לכל הנכדים שלי.`,
      character: "granny",
      nameColor: "var(--dry-earth)",
      emotion: "happy",
      name: "סבתא ליוויה",
      next: "dialogue_2",
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_12', value: 'terminal'},
        {type: 'SET_FLAG', key: 'mistake_12_command', value: 'ipconfig /renew'}
      ]
    },
    "dialogue_2" : {
      text: `אבל לכתוב כל כתובת בנפרד זה כזה כאב ראש. אתה יכול למצוא דרך לטפל בזה בשבילי?`,
      nameColor: "var(--dry-earth)",
      emotion: "neutral",
      name: "סבתא ליוויה",
      next: "dialogue_3",
    },
    "dialogue_3" : {
      text: `כן, אני אבדוק מה אפשר לעשות.`,
      name: "אני",
      nameColor: "var(--orange)",
      next: "dialogue_4"
    },
    "dialogue_4" : {
      text: `[פרוטוקול שיכול לשלוח את אותה הודעה להרבה אנשים בבת אחת? העם דבר כזה קיים?]`,
      name: "אני",
      nameColor: "var(--orange)",
      textColor: 'var(--grey-1)',
      next: "dialogue_5"
    },
    "dialogue_5" : {
      text: `[אה! נראה שהמדריך שלי עודכן עכשיו. אולי הוא יעזור לי]`,
      name: "אני",
      nameColor: "var(--orange)",
      textColor: 'var(--grey-1)',
      next: "dialogue_6",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_manual'}],
      waitFor: {completed: 'read_manual_ch12'}
    },
    "dialogue_6" : {
      text: `[זה באמת מה שאני צריך! אבל אני אצתרך להריץ פקודה בשביל לתפעל אותו]`,
      name: "אני",
      nameColor: "var(--orange)",
      textColor: 'var(--grey-1)',
      next: "dialogue_7"
    },
    "dialogue_7" : {
      text: `יש לי רעיון מה לעשות, את יכולה לשלוח לי את המכתב`,
      name: "אני",
      nameColor: "var(--orange)",
      next: "dialogue_8"
    },
    "dialogue_8" : {
      text: `כן, אין צורך לזרז אותי, יש לי הרבה זמן`,
      nameColor: "var(--dry-earth)",
      emotion: "neutral",
      name: "סבתא ליוויה",
      next: "dialogue_9",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}],
      waitFor: {completed: 'mistake_12'}
    },
    "dialogue_9" : {
      text: `[צריך לעשות עוד משהוא]`,
      nameColor: "var(--orange)",
      emotion: "neutral",
      textColor: 'var(--grey-1)',
      name: "אני",
      next: "dialogue_10",
      waitFor: {completed: 'networkChecked'}
    },
    "dialogue_10" : {
      text: `[כן...אני חושב שזה הכל, מעניין לי כמה נכדים יקבלו עוגיות בסוף.]`,
      nameColor: "var(--orange)",
      emotion: "neutral",
      textColor: 'var(--grey-1)',
      name: "אני",
      next: "dialogue_11",
      onEnter: [{type: 'SHOW', id: 'submit-button'}],
      waitFor: {completed: 'submit'}
    },
    "dialogue_11" : {
      text: `זהו, המכתב יגיע לכל האנשים ברשת המקומית`,
      nameColor: "var(--orange)",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_exit",
      onEnter: [{type: 'HIDE', id: 'submit-button'}, {type: 'SHOW', id: 'submit-animation'}],
    },
    "dialogue_exit" : {
      text: `תודה רבה, יקירי! עכשיו כל אחד יקבל עוגיות חמות ישר מהתנור.`,
      emotion: "happy",
      nameColor: "var(--dry-earth)",
      name: "סבתא ליוויה",
      next: null
    }
    
  },
  "chapter_13" : {
    "dialogue_1" : {
      text: `שלום. העובדת שלי, מאיה, ביקשה ממני לוודא שהמכתב הזה תקין.`,
      name: "שמעון",
      nameColor: 'var(--yellow)',
      emotion: "neutral",
      next: "dialogue_2",
      character: "shimon",
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_13', value: 'terminal'},
        {type: 'SET_FLAG', key: 'mistake_13_command', value: 'snmpget -v2c -c public 10.0.0.1 sysStatus.0'}
      ]
    },
    "dialogue_2" : {
      text: `אם אני אהיה כנה? כל פעם שהיא שולחת משהו, יש בעיות, אז החלטתי לבדוק בעצמי.`,
      emotion: "angry",
      name: "שמעון",
      nameColor: 'var(--yellow)',
      next: "dialogue_3"
    },
    "dialogue_3" : {
      text: `המכתב הזה משתמש בפרוטוקול <span style='color:var(--red)'>SNMP</span>. אני צריך שתריץ את הפקודה הנכונה ותבדוק שבכל תקין.`,
      name: "שמעון",
      nameColor: 'var(--yellow)',
      emotion: "neutral",
      next: "dialogue_4"
    },
    "dialogue_4" : {
      text: `כן,בגלל שאני חדש פה, אני צריך לקרוא על הפרוטוקול שאתה מדבר עליו.`,
      name: "אני",
      nameColor: 'var(--orange)',
      next: "dialogue_5"
    },
    "dialogue_5" : {
      text: `טוב, אבל אין לי את כל היום.`,
      emotion: "angry",
      name: "שמעון",
      nameColor: 'var(--yellow)',
      next: "dialogue_6"
    },
    "dialogue_6" : {
      text: `[בסדר, מיסטר רציני...]`,
      name: "אני",
      nameColor: 'var(--orange)',
      textColor: "var(--grey-1)",
      emotion: "neutral",
      next: "dialogue_7",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_manual'}],
      waitFor: {completed: 'read_manual_ch13'}
    },
    "dialogue_7" : {
      text: `[זאתי פקודה ממש ארוכה, כדאי לי להיזהר עם הניקוד]`,
      name: "אני",
      nameColor: 'var(--orange)',
      textColor: "var(--grey-1)",
      next: "dialogue_8"
    },
    "dialogue_8" : {
      text: `סיימתה?, שלחתי לך את המכתב.`,
      name: "שמעון",
      nameColor: 'var(--yellow)',
      next: "dialogue_9",
    },
    "dialogue_9" : {
      text: `[טוב, לעבודה]`,
      name: "אני",
      nameColor: 'var(--orange)',
      textColor: "var(--grey-1)",
      next: "dialogue_10",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}],
      waitFor: {completed: 'mistake_13'}
    }
  },
}
    
}




export default dialogueData;