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
        {type: 'MARK_COMPLETED', id: 'update_manual'}
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
        {type: 'MARK_COMPLETED', id: 'update_manual'}
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
      next: "liyor_intro_exit",
      onEnter: [
        {type: 'HIDE', id: 'submit-button'},
        {type: 'SHOW', id: 'submit-animation'}
      ]
    },

    "liyor_intro_exit" : {
      text: "",
      emotion: "happy",
      name: "ליאור",
      character: "liyor",
      nameColor: "var(--green)",
      next: null,
      onEnter: [
        {type: 'HIDE', id: 'submit-animation'},
        {type: 'MARK_COMPLETED', id: 'chapter_3'}
      ],
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
      waitFor: { completed: "opened_letter" }
    },

    "dialogue_4" : {
      text: "הכלי החדש שנשתמש בוא הוא כלי בקשרת התקשורת, הוא נראה כמו סימן אנטננה. ",
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
      text: "תשים לב להודעות שכשורות לפרוטוקול TCP, אלו משתמשים בקומוניקציות בינייהם, וחייב לבדוק אותם.",
      nameColor: "var(--blue)",
      emotion: "neutral",
      name: "דניאל",
      character: "daniel",
      next: "dialogue_9",
      onEnter: [
        {type: 'SHOW', id: 'submit-button'}
      ],
      waitFor: { completed: 'submit'}
    },

    "dialogue_9" : {
      text: "בהצלחה!",
      nameColor: "var(--blue)",
      emotion: "happy",
      name: "דניאל",
      character: "daniel",
      next: "dialogue_exit",
      onEnter: [
        {type: 'HIDE', id: 'submit-button'},
        {type: 'SHOW', id: 'submit-animation'}
      ],
    },

    "dialogue_exit" : {
      text: "",
      next: null,
      onEnter: [
        {type: 'HIDE', id: 'submit-animation'},
        {type: 'MARK_COMPLETED', id: 'chapter_4'}
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
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_manual'}],
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
      next: "dialogue_2"
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
      emotion: "neutral",
      name: "סבתא ליוויה",
      next: "dialogue_2"
    },
  }
}
    
}




export default dialogueData;