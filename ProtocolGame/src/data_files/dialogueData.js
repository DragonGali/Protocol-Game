import { useGameState, isUnlocked, isVisible, hasCompleted } from '../Components/GameState.jsx';

export const dialogueData =  {
  // Story dialogues
  story: {
    "chapter_0" : {
        "dialogue_1": {
          text: "היום זה היום הראשון שלי במרכז הדואר האלקטרוני",
          next: "dialogue_2",
          name: "אני"
        },
        "dialogue_2": {
          text: "אני לא ממש יודע למה לצפות, אבל אני אעשה כמיטב יכולתי.",
          next: null, // End of story
          onEnter: [{action: "MARK_COMPLETED", id:"story_complete"}],
          name: "אני"
        }
    }
  },

  // Character dialogues
  characters: {
    "chapter_1" : {
      "dialogue_1": {
        text: "שלום וברוך הבא לסניף הדואר הפרוטוקולי.",
        next: "dialogue_2",
        emotion: "happy",
        character: "daniel",
        onEnter: [
          {type: 'SET_FLAG', key: 'mistake_1_1', value: 'footer'}
        ]
    },
      "dialogue_2": {
        text: "קוראים לי דניאל, ואני יהיה האוזר שלך היום, אני אלמד אותך בכל מה שאתה צריך בשביל להתחיל לעבוד פה.",
        next: "dialogue_3",
        emotion: "neutral",
      },
      "dialogue_3": {
        text: "גם לי נעים מאוד להכיר.",
        next: "dialogue_4",
        name: "אני",
      },
      "dialogue_4": {
        text: "פה אנחנו מקבלים הודעות ארוזות — ממש כמו חבילות. אבל לא כל הודעה מגיעה במצב תקין. המטרה שלנו היא למצוא את הטעויות, ולתקן אותן לפני השליחה.",
        next: "dialogue_5",
      },
      "dialogue_5": {
        text: "כל הודעה חייבת לעמוד במבנה של הפרוטוקול שלה. בלי זה? היא פשוט לא תעבור.",
        next: "dialogue_6",
      },
      "dialogue_6": {
        text: "[נשמע פשוט... בינתיים.]",
        next: "dialogue_7",
        name: "אני",
      },
      "dialogue_7": {
        text: "רואה את הסמל הזה בצד העליון? זה המדריך שלך.",
        next: "dialogue_8",
        onEnter: [
          { type: 'SHOW', id: 'manual_icon' },
          { type: 'SHOW', id: 'manual_icon_showcase' },
          { type: 'MARK_COMPLETED', id: 'update_manual'}
        ]
      },
      "dialogue_8": {
        text: "כל פעם שאתה נתקל במשהוא חדש או פשוט רוצה לרענן ידע קודם, תרגיש חופשי לקרוא את המדריך",
        next: "dialogue_9",
        onEnter: [
          { type: 'HIDE', id: 'manual_icon_showcase' }  // Remove showcase
        ]
      },
      "dialogue_9": {
        text: "תלחץ עליו ותקרא את ההקדמה, אפשר למצוא את הפרק דרך חיפוש הנושאים החדשים",
        next: "dialogue_10",
        onEnter: [
          { type: 'UNLOCK', id: 'manual'}
        ],
        waitFor: { completed: 'read_manual_ch1' }
      },
      "dialogue_10": {
        text: "טוב, עכשיו כשאתה מכיר את הבסיס - בוא ננסה למיין הודעה.",
        next: "dialogue_11",
      },
      "dialogue_11": {
        text: "זה המסך שלך. כאן תטפל בכל ההודעות.",
        next: "dialogue_12",
          onEnter: [
          { type: 'UNLOCK', id: 'monitor'},
          { type: 'SHOW', id: 'monitor_showcase'}
        ],
    },
    "dialogue_12": {
        text: "שלחתי לך עכשיו את האפליקציה לטיפול בדואר זה הסמל הקטן של תיבת הדואר, בצד שמאל. נסה ללחוץ עליו..",
        next: "dialogue_13",
        onEnter: [
          { type: 'HIDE', id: 'monitor_showcase'},
          { type: 'UNLOCK', id: 'mail_list'},
          { type: 'MARK_COMPLETED', id: 'update_mail'}
        ],
        waitFor : { completed: 'clicked_mail_icon'}
    },
    "dialogue_13": {
      text: "תבחר בדואר הראשון ברשימה.",
      next: "dialogue_14",
      waitFor: {completed: 'opened_letter'}
    },
    "dialogue_14":{
      text: "ככה נראית חבילה, בחלק הקדמי רשום כתובת המקור ושל היעד, הפורט ו הפרוטוקול של ההודעה.",
      next: "dialogue_15",
    },
    "dialogue_15":{
      text: "אני כבר מילאתי את כל הפרטים אבל השארתי טעות אחת בתוך המכתב, העבודה שלך תהיה לפענח איפה הטעות הזאת.",
      next: "dialogue_16",
    },
    "dialogue_16" : {
      text: "שלחתי לך את הכלי הראשון שלך, החותמת.",
      next: "dialogue_17",
      onEnter: [
        {type: 'UNLOCK', id: 'stamp'},
        {type: 'SET_FLAG', key: 'aquired_item', value: 'stamp'}
      ]
    },
    "dialogue_17":{
      text: "בשביל לסמן טעות, צריך להשתמש בחותמת ולהעביר אותה על השורה הלא נכונה. נסה לעשות את זה.",
      next: (state) => state.flags?.stampedElement === 'footer' ? 'dialogue_18' : 'dialogue_mistake_1_1',
      onEnter: [{type: 'SET_FLAG', key: 'aquired_item', value: null}],
      waitFor: {flag: 'stampedElement'}
    },
    "dialogue_18":{
      text: "אני חושב שבהודעה הזות חסרה סיומת.",
      next: "dialogue_19",
      name: "אני",
    },
    "dialogue_19":{
      text: "נכון מאוד! כל ההודעות,צריכות להסתיים עם <span style='color:var(--red)'>FOOTER</span>. כל הכבוד, עבודה טובה.",
      emotion: "happy",
      next: "dialogue_20",
      onEnter: [
        {type: 'CORRECT_MISTAKE', id: 'mistake_1_1', correction: '---FOOTER---'}
      ]
    },

    "dialogue_20": {
      text: "עכשיו, כל מה שנשאר זה לשלוח את המכתב, תלחץ על הכפתור ה <span style='color:var(--green)'>ירוק</span>.",
      emotion: "neutral",
      next: "dialogue_21",
      onEnter: [
        {type: 'SHOW', id: 'submit-button'}
      ],
      waitFor: {completed: 'submit'}
    },
    "dialogue_21": {
      text: "מעולה! עכשיו כשאתה יודע מה לעשות, אני אעזוב אותך לנסות בעצמך.",
      next: "dialogue_22",
      onEnter: [
        {type: 'HIDE', id: 'submit-button'},
        {type: 'SHOW', id: 'submit-animation'},
        {type: 'SET_FLAG', key: 'stampedElement', value: null}
      ]
    },
    "dialogue_22": {
      text: "אם תיתקל בקושי, תוכל ללחוץ על סמל העזרה, בשביל לקבל רמז.",
      next: "dialogue_23",
      onEnter: [
        {type: 'UNLOCK', id: 'help-icon'},
        {type: 'SHOW', id: 'help-icon-showcase'},
        {type: 'HIDE', id: 'submit-animation'}
      ]
    },
    "dialogue_23": {
      text: "בהצלחה!",
      emotion: 'happy',
      next: null,
      onEnter: [
        {type: 'MARK_COMPLETED', id: 'chapter_1'},
        {type: 'HIDE', id: 'help-icon-showcase'}
      ]
    },

    "dialogue_mistake_1_1": {
      text: "זה החלק הבעייתי...?",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_mistake_1_2",
      character: "daniel",
      nameColor: "var(--orange)",
    },

    "dialogue_mistake_1_2": {
      text: "לא לצערי, עולי כדאי לך לקרוא את הנוסח שוב.",
      emotion: "sad",
      onEnter: [
        {type: 'SET_FLAG', key: "stampedElement", value: null}
      ],
      next: (state) => state.flags?.stampedElement === 'footer' ? 'dialogue_17' : 'dialogue_mistake_1_1',
      waitFor: {flag: 'stampedElement'}
    }
    
  },

  "chapter_2" : {
    "dialogue_1": {
      text: "היי! שמעתי שזה סניף דואר טוב.",
      emotion: "happy",
      character: "maya",
      next: "dialogue_2",
      onEnter: [
        { type: 'SET_FLAG', key: 'mistake_2', value: 'port' },
      ]
    },
    "dialogue_2": {
      text: "הבוס שלי ביקש שאשלח כמה קבצים, אבל המערכת המאובטחת שאנחנו בדרך כלל משתמשים בה מתנהגת מוזר כל הבוקר.",
      emotion: "neutral",
      next: "dialogue_3"
    },
    "dialogue_3": {
      text: "נאלצתי לעבור ל-FTP כדי להשלים את העבודה, העם תוכל לבדוק שהכל תקין?",
      next: "dialogue_4"
    },
    "dialogue_4": {
      text: '["FTP-מה...? רגע — לא להילחץ. פשוט צריך להסתכל במדריך שלי."]',
      name: "אני",
      character: "maya",
      next: "dialogue_5",
      onEnter: [
        {type: 'MARK_COMPLETED', id: 'update_manual'},
      ],
      waitFor: {completed: 'read_manual_ch2'}
    },
    "dialogue_5": {
      text: "אני מוכן לעבור על המכתב, תשלחי אותו עליי",
      name: "אני",
      next: "dialogue_6"
    },
    "dialogue_6" : {
      text: "הנא, בבקשה.",
      emotion: 'happy',
      next: (state) => state.flags?.stampedElement === 'port' ? 'dialogue_correct_1' : 'dialogue_mistake_1_1',
      waitFor: { flag: 'stampedElement' },
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}]
    },
    "dialogue_correct_1": {
      text: "נראה שהפורט שציינת בהודעה לא מתאים לפרוטוקול FTP.",
      name: "אני",
      next: "dialogue_correct_2"
    },

    "dialogue_correct_2": {
      text: "אה, נכון! אז מה הוא צריך להיות?",
      emotion: "surprised",
      next: "dialogue_question_1"
    },

    "dialogue_question_1": {
      type: "question",
      answers: [30, 81, 55, 21],
      next: (state) => state.flags?.selectedAnswer === 21 ? 'dialogue_7' : 'dialogue_question_mistake_1_1',
      waitFor: { flag: 'selectedAnswer' }
    },

    "dialogue_7": {
      text: "תודה, אני כבר אתקן את השורה הזאת.",
      emotion: "happy",
      next: "dialogue_8",
      onEnter: [
        {type: 'CORRECT_MISTAKE', id: 'mistake_2', correction: 21},
        {type: 'SHOW', id: 'submit-button'}
      ],
      waitFor: { completed: 'submit'}
    },

    "dialogue_8": {
      text: "תודה רבה, אני בטוח אחזור שוב :)",
      emotion: "happy",
      onEnter: [
        {type: 'HIDE', id: 'submit-button'},
        {type: 'SHOW', id: 'submit-animation'},
        {type: 'SET_FLAG', key: 'stampedElement', value: null}
      ],
      next: null
    },
    "dialogue_mistake_1_1": {
      text: "השורה הזאתי שגויה",
      name: "אני",
      next: "dialogue_mistake_1_2",
    },

    "dialogue_mistake_1_2": {
      text: "מה בדיוק? הכל נראה תקין",
      emotion: "angry",
      name: "מאיה",
      next: "dialogue_mistake_1_3"
    },

    "dialogue_mistake_1_3": {
      text: "אה...לא משנה...",
      name: "אני",
      next: (state) => state.flags?.stampedElement === 'port' ? 'dialogue_6' : 'dialogue_mistake_1_1',
      waitFor: { flag: 'stampedElement' },
      onEnter: [
        {type: 'SET_FLAG', key: "stampedElement", value: null}
      ],
    },

    "dialogue_question_mistake_1_1": {
        text: "[לא?! מה אני בכלל חושב, זה לא יכול להיות המספר הזה!]",
        emotion: "surprised",
        name: "אני",
        next: "dialogue_correct_2",
        onEnter: [
          {type: 'SET_FLAG', key: 'selectedAnswer', value: null}
        ]
    }
  },

  "chapter_3" : {
    "dialogue_1": {
        text: "אהלן, באתי לשלוח את המשחק החדש לבן דוד שלי. אמרו לי שאתם שולחים מיילים וכאלה, כבר בחרתי אה...פרוטוקול, מספר המזל שלי.",
        emotion: "happy",
        character: "liyor",
        next: "dialogue_2",
        onEnter: [
          {type: 'SET_FLAG', key: 'mistake_3a', value: 'link'},
          {type: 'SET_FLAG', key: 'mistake_3b', value: 'imgLink'}
        ]
    },
    "dialogue_2": {
      text: "בסדר, אני רק צריך לבדוק שהכל תקין.",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_3"
    },
    "dialogue_3": {
      text: "[נשמע שהוא לא מבין הרבה בפרוטוקולים, כדאי לי לקרוא על הפרוטוקול שהוא משתמש.]",
      name: "אני",
      next: (state) => state.flags?.stampedElement === 'link' ? 'dialogue_correct_1' : 'dialogue_mistake_1_1',
      waitFor: { flag: 'stampedElement' },
      onEnter: [
        {type: 'MARK_COMPLETED', id: 'update_manual'},
        { type: 'MARK_COMPLETED', id: 'update_mail'}
      ]
    },
    "dialogue_correct_1" : {
      text: "הפייל הזה הוא גדול מדי בשביל הפרוטוקול הזה, אתה תצטרך לבחור בפרוטוקול אחר או לשלוח את הפייל בכמה חבילות.",
      name: "אני",
      next: "dialogue_correct_2"
    },
    "dialogue_correct_2" : {
      text: "אה וואלה?  לא ידעתי שיש גבול.  טוב אני אשלח פייל יותר קטן.",
      emotion: "surprised",
      next: "dialogue_4",
      onEnter: [
        {type: 'CORRECT_MISTAKE', id: "mistake_3a", correction: 'Game_Beta_2024.iso (31 MB)'},
        {type: 'CORRECT_MISTAKE', id: "mistake_3b", correction: '/Monitor/pop_ups/game_beta_working.gif'},
        {type: 'SHOW', id: 'submit-button'}
      ],
      waitFor: { completed: 'submit'}
    },

    "dialogue_4" : {
      text: "תודה אחי, נתראה.",
      emotion: "happy",
      next: null,
      onEnter: [
        {type: 'HIDE', id: 'submit-button'},
        {type: 'SHOW', id: 'submit-animation'}
      ]
    },

    "dialogue_mistake_1_1" : {
      text: "השורה הזאתי לא נכונה",
      emotion: "neutral",
      name: "אני",
      next: "dialogue_mistake_1_2"
    },

    "dialogue_mistake_1_2" : {
      text: "הממ... אתה לא משחק איתי, נכון?",
      emotion: "angry",
      next: "dialogue_mistake_1_3"
    },

    "dialogue_mistake_1_3" : {
      text: "אה...לא משנה",
      name: "אני",
      next: "dialogue_3",
      onEnter: [
        {type: 'SET_FLAG', key: 'stampedElement', value: null}
      ]
    }
  },

  "chapter_4" : {
    "dialogue_1" : {
      text: " שלום, לא נפגשנו קצת זמן. אני רואה שאתה עושה עבודה טובה.",
      emotion: "happy",
      character: "daniel",
      next: "dialogue_2",
      onEnter: [
        {type: 'MARK_COMPLETED', id: 'read_manual_ch4'},
        {type: 'SET_FLAG', key: 'mistake_4', value: 'network'},
        { type: 'SET_FLAG', key: 'mistake_4_code', value: 200 }
      ]
    },
    "dialogue_2" : {
      text: "התקנתי כלי חדש למוניטור העבודה שלך. תוכל להשתמש בו כאשר תפתח מכתב חדש. ",
      emotion: "neutral",
      next: "dialogue_3",
    },

    "dialogue_3" : {
      text: "הכנסתי לך מכתב בתיבת הדואר שתתנסה בו. תפתח אותו",
      next: "dialogue_4",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}],
      waitFor: { completed: "opened_letter" }
    },

    "dialogue_4" : {
      text: "הכלי החדש שנשתמש בוא הוא כלי בקרת התקשורת, הוא נראה כמו סימן אנטננה. ",
      next: "dialogue_5",
      onEnter: [
        {type: 'SET_FLAG', key: 'aquired_item', value: 'network'},
        {type: 'UNLOCK', id: 'network'},
      ]
    },

    "dialogue_5" : {
      text: "תלחץ על הסימן שלו",
      next: "dialogue_6",
      onEnter: [{type: 'SET_FLAG', key: 'aquired_item', value: null}],
      waitFor: { completed: "networkChecked"}
    },

    "dialogue_6" : {
      text: "ההודעה עברה בהצלחה, אבל זה לא יקרה ככה תמיד. ",
      next: "dialogue_7",
    },

    "dialogue_7" : {
      text: "מעכשיו, אתה תצתרך לא רק לראות שהחבילה כתובה בלי שגיות אבל גם שהיא מחוברת.",
      next: "dialogue_8",
    },

    "dialogue_8" : {
      text: "תשים לב להודעות שקשורות לפרוטוקול TCP, אלו משתמשים בקומוניקציות בינייהם, וחייב לבדוק אותם.",
      next: "dialogue_exit",
      onEnter: [
        {type: 'SHOW', id: 'submit-button'}
      ],
      waitFor: { completed: 'submit'}
    },

    "dialogue_exit" : {
      text: "בהצלחה!",
      emotion: "happy",
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
      emotion: "hiding",
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
      name: "אני",
      next: "dialogue_3",
    },
    "dialogue_3" : {
      text: "...",
      emotion: "reveal",
      name: "מל",
      next: "dialogue_4",
    },
    "dialogue_4" : {
      text: `...המכתב שלי...לא נשלח...`,
      emotion: "neutral",
      fontSize: "var(--font-small)",
      next: "dialogue_5",
      speed: 100
    },
    "dialogue_5" : {
      text: `מה? תדברי יותר חזק בבקשה.`,
      name: "אני",
      next: "dialogue_6",
    },
    "dialogue_6" : {
      text: `...`,
      emotion: "silent",
      next: "dialogue_7",
      speed: 1000
    },
    "dialogue_7" : {
      text: `[כנראה שאני אצטרך להסתדר בעצמי]`,
      name: "אני",
      next: "dialogue_8",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_manual'}, { type: 'MARK_COMPLETED', id: 'update_mail'}],
      waitFor: { completed: "networkChecked"}
    },
    "dialogue_8" : {
      text: `...אה... זה לא אמור לקרות...`,
      emotion: "confident",
      next: "dialogue_9",
    },
    "dialogue_9" : {
      text: `זה חמש מאות. כלומר, הבקשה נשלחה כמו שצריך, אבל משהו השתבש בתוך השרת. אולי סקריפט שבור, בעיה בזיכרון, או שה-backend פשוט לא יודע איך להתמודד`,
      next: "dialogue_10",
      speed: 40,
    },
    "dialogue_10" : {
      text: `עם זה... זו לא אשמתך - השרת פשוט קרס.`,
      next: "dialogue_11",
    },
    "dialogue_11" : {
      text: `...מרשים, כמה גרוע זה נכשל.`,
      emotion: "neutral",
      next: "dialogue_12",
    },
    "dialogue_12" : {
      text: `וואו, את מבינה כל כך הרבה בפרוטוקולים.`,
      name: "אני",
      next: "dialogue_13",
    },
    "dialogue_13" : {
      text: `קצת...`,
      emotion: "shy",
      next: "dialogue_14",
    },
    "dialogue_14" : {
      text: `עם השרת לא מגיב עולי תוכלי להשתמש בכתובת של שרת אחר?`,
      name: "אני",
      next: "dialogue_15",
    },
    "dialogue_15" : {
      text: `כן, אני יכולה.`,
      emotion: "confident",
      next: "dialogue_16",
    },
    "dialogue_16" : {
      text: `אתה יכול לסמן לי את כתובת המקור בשביל שאני אשנה אותה?`,
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_5_stamp', value: 'src-address'}
      ],
      next: "dialogue_17",
      waitFor: {flag: 'stampedElement'},
      next: (state) => state.flags?.stampedElement === 'src-address' ? 'dialogue_17' : 'dialogue_mistake_1_1',
    },
    "dialogue_17" : {
      text: `הנא, תיקנתי את הכתובת.`,
      onEnter: [
        {type: 'CORRECT_MISTAKE', id: "mistake_5_stamp", correction: '172.16.0.0'},
        {type: 'SHOW', id: 'submit-button'}],
      emotion: "shy",
      next: "dialogue_18",
      waitFor: { completed: 'submit'}
    },

    "dialogue_18" : {
      text: "...תודה.",
      emotion: "shy",
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
      emotion: "shy",
      name: "אני",
      next: "dialogue_exit",
    },
    "dialogue_exit" : {
      text: "...",
      name: "אני",
      next: null,
      onEnter: [
        {type: 'HIDE', id: 'submit-animation'},
        {type: 'MARK_COMPLETED', id: 'chapter_5'}
      ],
      emotion: "missing",
      speed: 1000
    },
    
    "dialogue_mistake_1_1" : {
      text: `החלק הזה כתוב לא נכון.`,
      emotion: "neutral",
      name: "אני",
      next: "dialogue_mistake_1_2",
    },
    "dialogue_mistake_1_2" : {
      text: `...לא`,
      emotion: "shy",
      next: "dialogue_mistake_1_3"
    },
    "dialogue_mistake_1_3" : {
      text: `[היא אפילו לא מסתכלת עליי.]`,
      name: "אני",
      next: "dialogue_16",
      onEnter: [{type: 'SET_FLAG', key: 'stampedElement', value: null}]
    }

  },

  "chapter_6" : {
    "dialogue_1" : {
      text: `או שלום, חמודי! בדיוק אפיתי עוגיות ואני רוצה לשלוח אותן לנכד שלי בחיפה. אתה יכול לעזור לי לשלוח אותן באינטרנט?`,
      character: "granny",
      emotion: "happy",
      next: "dialogue_2",
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_6', value: 'letter'},
        {type: 'SET_FLAG', key: 'letter_state', value: 'crappy'}
      ]
    },
    "dialogue_2" : {
      text: `בטח! באיזה פרוטוקול את רוצה להשתמש?`,
      emotion: "neutral",
      name: "אני",
      next: "dialogue_3",
    },
    "dialogue_3" : {
      text: `פרו-מה? אני רק רוצה שהן יגיעו חמות ולא פרוצות כמו בפעם הקודמת!`,      character: "granny",
      emotion: "grumpy",
      next: "dialogue_4"
    },
    "dialogue_4" : {
      text: `[נראה שהמדריך שלי התעדכן, עולי היא משתמשת בפרוטוקול ההוא]`,
      name: "אני",
      next: "dialogue_5",
      onEnter: [
        {type: 'MARK_COMPLETED', id: 'update_manual'},
        { type: 'MARK_COMPLETED', id: 'update_mail'}
      ],
      waitFor: {completed: 'opened_letter'}
    },
    "dialogue_5" : {
      text: `["מה זה?! הכול פה לא נכון… זה נראה כמו קשקוש של ילד!]`,
      name: "אני",
      next: "dialogue_6",
    },
    "dialogue_6" : {
      text: `[אני חייב לסמן הכל עם החותמת!]`,
      name: "אני",
      next: "dialogue_7",
      waitFor: {flag: 'stampedElement'}
    },
    "dialogue_7" : {
      text: `סליחה, אני לא יכול לשלוח מכתב במצב כזה.`,
      name: "אני",
      next: "dialogue_8",
    },
    "dialogue_8" : {
      text: `נו באמת, למה אתם הצעירים עושים מזה כזה עניין? פעם היינו שולחים מכתבים עם יונים וזה תמיד עבד!`,
      emotion: "grumpy",
      next: "dialogue_9"
    },
    "dialogue_9" : {
      text: `[אוף! טוב, אני פשוט אכין אחד חדש]`,
      emotion: "neutral",
      name: "אני",
      next: "dialogue_10",
    },
    "dialogue_10" : {
      text: `[אוקיי, הפרוטוקול שאני אשתמש בוא הוא HTTPS]`,
      name: "אני",
      next: "dialogue_11",
      onEnter: [
        {type: 'SET_FLAG', key: 'letter_state', value: 'new'},
        {type: 'SET_FLAG', key: 'showcaseLetterField', value: 'protocol'}
      ]
    },
    "dialogue_11" : {
      text: `[הכתובת מקור תהיה לוקאלית, באיזה אני יכול לבחור?]`,
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
      name: "אני",
      next: "dialogue_exit",
      onEnter: [
        {type: 'HIDE', id: 'submit-button'},
        {type: 'SHOW', id: 'submit-animation'}]
    },

    "dialogue_exit" : {
      text: `אוהוהו, בסדר חביב. סליחה על כל הסיבוך שייצרתי.`,
      emotion: "happy",
      next: null,
      onEnter: [{type: 'HIDE', id: 'submit-animation'}]
    },

    "question-1-mistake" : {
      text: `[זו כתובת לא חוקית]`,
      emotion: "neutral",
      name: "אני",
      next: "dialogue_11",
      onEnter: [{type: 'SET_FLAG', key: 'selectedAnswer', value: null}]
    },
    "question-2-mistake-1" : {
      text: `[זו הכתובת שלי... לא היעד]`,
      name: "אני",
      next: "dialogue_13",
      onEnter: [{type: 'SET_FLAG', key: 'selectedAnswer', value: null}]
    },
    "question-2-mistake-2" : {
      text: `[זו כתובת לא חוקית]`,
      name: "אני",
      next: "dialogue_13",
      onEnter: [{type: 'SET_FLAG', key: 'selectedAnswer', value: null}]
    },
    "question-3-mistake" : {
      text: `[לא, זה לא הפורט הנכון לפרוטוקול הזה.]`,
      name: "אני",
      next: "dialogue_15",
      onEnter: [{type: 'SET_FLAG', key: 'selectedAnswer', value: null}]
    },
    "question-4-mistake-1" : {
      text: `[איך זה קשור עכשיו?!]`,
      name: "אני",
      next: "dialogue_17",
      onEnter: [{type: 'SET_FLAG', key: 'selectedAnswer', value: null}]
    },
    "question-4-mistake-2" : {
      text: `[אה, נכון! אבל יש לי הרגשה שאני מפספס משהוא עוד יותר חשוב]`,
      name: "אני",
      next: "dialogue_17",
      onEnter: [{type: 'SET_FLAG', key: 'selectedAnswer', value: null}]
    },
    "question-4-mistake-3" : {
      text: `[...המכתב תמיד נסגר.]`,
      name: "אני",
      next: "dialogue_17",
      speed: 30,
      onEnter: [{type: 'SET_FLAG', key: 'selectedAnswer', value: null}]
    }
  },

  "chapter_7" : {
    "dialogue_1": {
      text: `שלום, הנא אני שוב.`,
      emotion: "happy",
      character: "daniel",
      next: "dialogue_2",
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_7_1', value: 'terminal'},
        {type: 'SET_FLAG', key: 'mistake_7_1_command', value: 'LIST'}
      ]
    },
    "dialogue_2": {
      text: `התקנתי לך עוד כלי חדש שתצטרך להשתמש בו.`,
      emotion: "neutral",
      name: "דניאל",
      next: "dialogue_3",
    },
    "dialogue_3": {
      text: `תפתח את המכתב ששלחתי לך בשביל להתנסות בו.`,
      next: "dialogue_4",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}],
      waitFor: { completed: "opened_letter"}
    },
    "dialogue_4": {
      text: `היום אנחנו עובדים עם פרוטוקול <span style='color:var(--red)'>POP3</span>, שמיועד למשוך הודעות דוא״ל מהשרת אל המחשב המקומי.`,
      next: "dialogue_5",
    },
    "dialogue_5" : {
      text: `אתה רואה את האייקון החדש שנראה כמו מסך שחור? זה כלי הטרמינל שלך. לחץ עליו.`,
      character: "daniel",
      next: "dialogue_6",
      onEnter: [
        {type: 'SET_FLAG', key: 'aquired_item', value: 'terminal'},
        {type: 'UNLOCK', id: 'terminal'}
      ],
      waitFor: { visible: 'using_terminal' },
    },
    "dialogue_6" : {
      text: `הכלי הזה מבצע פקודות, ומוסיף את המידע החדש למכתב, אבל רק עם הפקודות נכתבו נכון.`,
      next: "dialogue_7",
      onEnter: [{type: 'SET_FLAG', key: 'aquired_item', value: null}]
    },

    "dialogue_7" : {
      text: `הפקודה שאני רוצה שתשתמש בה עכשיו היא: <span style='color:var(--orange)'>LIST</span>.`,
      next: "dialogue_8",
    },

    "dialogue_8" : {
      text: `פקודת <span style='color:var(--orange)'>LIST</span> משמשת לקבלת רשימה של כל ההודעות שבתיבת הדואר. היא מחזירה לכל הודעה את מספרה ואת הגודל שלה, בלי להראות את התוכן.`,
      next: "dialogue_9",
    },

    "dialogue_9" : {
      text: `תנסה לרשום <span style='color:var(--orange)'>LIST</span> בטרמינל בשביל להפעיל אותה`,
      next: "dialogue_10",
      waitFor: {completed: 'mistake_7_1'}
    },
    "dialogue_10" : {
        text: `זה הכל אתה יכול להגיש את המכתב.`,
        emotion: "happy",
        next: "dialogue_11",
        onEnter: [
          {type: 'SHOW', id: 'submit-button'}
        ],
        waitFor: { completed: 'submit'}
    },
    "dialogue_11" : {
      text: `זכור, יש פרוטוקולים שדורשים פקודות ספציפיות כדי לתקשר איתם. תמיד תמצא את הפקודות האלה בעמוד המדריך של הפרוטוקול.`,
      next: "dialogue_12",
      onEnter: [
        {type: 'HIDE', id: 'submit-button'},
        {type: 'SHOW', id: 'submit-animation'}
      ],
    },
    "dialogue_12" : {
      text: `חשוב לזכור, פרוטוקולים שונים לא משתמשים באותם פקודות.`,
      next: "dialogue_exit",
    },
    "dialogue_exit" : {
      text: `מקווה שזה עזר לעשות סדר. תמשיך הלאה!`,
      emotion: "happy",
      next: null,
      onEnter: [{type: 'HIDE', id: 'submit-animation'}]
    }
  },
  "chapter_8" : {
      "dialogue_1" : {
        text: `שלום, שמעתי שסניף הדואר הזה יכול להפעיל פקודות עכשיו.`,
        emotion: "neutral",
        character: "shimon",
        next: "dialogue_2",
        onEnter: [
          {type: 'SET_FLAG', key: 'mistake_8_1', value: 'terminal'},
          {type: 'SET_FLAG', key: 'mistake_8_1_command', value: 'st'},
          {type: 'SET_FLAG', key: 'mistake_8_1_stamp', value: 'port'}
        ]
      },
      "dialogue_2" : {
        text: `אני צריך שתבצע פקודת בדיקת סטטוס המערכת.`,
        next: "dialogue_3",
      },
      "dialogue_3" : {
        text: `ותבדוק שאין שום שגיות...זה כבר קרה לפני.`,
        emotion: "angry",
        next: "dialogue_4",
      },
      "dialogue_4" : {
        text: `כן...בטח.`,
        name: "אני",
        next: "dialogue_5",
      },
      "dialogue_5" : {
        text: `[הוא אמר להשתמש בפקודה... היא כנראה תהיה כתובה לי במדריך]`,
        emotion: "neutral",
        name: "אני",
        next: "dialogue_6",
        onEnter: [
          {type: 'MARK_COMPLETED', id: 'update_manual'},
        ],
        waitFor: { completed: 'read_manual_ch8' }
      },
      "dialogue_6" : {
        text: `[אוקיי, אני חושב שהבנתי...אני צריך להשתמש בפקודה הזאת...נראה שהמכתב נשלח לתיבת הדואר שלי]`,
        name: "אני",
        next: "dialogue_7",
        onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}],
        waitFor: { completed: 'mistake_8_1'}
      },
      "dialogue_7" : {
        text: `[אוקיי, סיימתי! אבל...]`,
        name: "אני",
        next: "dialogue_8",
        emotion: "neutral"
      },
      "dialogue_8" : {
        text: `[משהוא היה לא בסדר עם תוצאת הפקודה...העם יש איזו שהיא בעיה במכתב?]`,
        name: "אני",
        next: (state) => state.flags?.stampedElement === 'port' ? 'dialogue_9' : 'dialogue_mistake_1_1',
        waitFor: { flag: 'stampedElement' }
      },
      "dialogue_9" : {
        text: `הפורט הזה הוא שגוי.`,
        name: "אני",
        next: 'dialogue_10'
      },
      "dialogue_10" : {
        text: `כן? כנראה שאחד מהעובדים שלי לא מילא את המכתב כשמבוקש, שוב.`,
        emotion: "angry",
        next: 'dialogue_11'
      },
      "dialogue_11" : {
        text: `אז מה הוא אמור להיות?`,
        emotion: "curious",
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
        onEnter: [
          {type: 'SET_FLAG', key: 'selectedAnswer', value: null},
          {type: 'CORRECT_MISTAKE', id: "mistake_8_1_stamp", correction: 23},
          {type: 'SHOW', id: 'submit-button'}],
        next: 'dialogue_exit',
        waitFor: { completed: 'submit'}
      },
      "dialogue_exit" : {
        text: `תודה על העזרה.`,
        emotion: "happy",
        onEnter: [{type: 'HIDE', id: 'submit-button'}, {type: 'SHOW', id: 'submit-animation'}],
        next: null
      },
      'dialogue_mistake_1_1' : {
        text: `יש שגיאה בשורה הזאתי.`,
        emotion: "neutral",
        name: "אני",
        next: 'dialogue_mistake_1_2'
      },
      'dialogue_mistake_1_2' : {
        text: `אין פה שום שגיאות, על תבזבז את הזמן שלי.`,
        emotion: "angry",
        next: 'dialogue_mistake_1_3'
      },
      "dialogue_mistake_1_3" : {
        text: `...אני מצטער.`,
        next: 'dialogue_7',
        onEnter: [{type: 'SET_FLAG', key: 'stampedElement', value: null}]
      },
      "dialogue_mistake_2" : {
        text: `[לא?! מה אני בכלל חושב, זה לא יכול להיות המספר הזה!]`,
        next: 'dialogue_11',
        onEnter: [{type: 'SET_FLAG', key: 'selectedAnswer', value: null}]
      }
  },
  "chapter_9" : {
    "dialogue_1" : {
      text: `אה, היי שוב!`,
      character: "maya",
      emotion: "happy",
      next: "dialogue_2",
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_9', value: 'network'},
        { type: 'SET_FLAG', key: 'mistake_9_code', value: 525 }
      ]
    },
    "dialogue_2" : {
      text: `אתה בטח עדיין מתאושש משמעון, נכון? הוא שונא לבוא לכאן`,      emotion: "neutral",
      next: "dialogue_3",
    },
    "dialogue_3" : {
      text: `הוא הגיע בפעם הקודמת רק כי פישלתי במכתב.`,
      emotion: "sad",
      next: "dialogue_4",
    },
    "dialogue_4" : {
      text: `בכל מקרה, הבוס שלי אמר שאני חייבת לבדוק אם המכתב יגיע כמו שצריך - אתה יודע, כי אנחנו משתמשים בפרוטוקול SSL.`,
      emotion: "neutral",
      next: "dialogue_5",
    },
    "dialogue_5" : {
      text: `תוכל לבדוק לי את החיבור?`,
      next: "dialogue_6",
    },
    "dialogue_6" : {
      text: `כן בטח, אני על זה.`,
      name: "אני",
      next: "dialogue_7",
    },
    "dialogue_7" : {
      text: `[כדאי לי לקרוא את המדריך לגבי הפרוטוקול "SSL", לפני שאני מוריד את המכתב לתיבת הדואר שלי...זה יכול לעזור.]`,
      name: "אני",
      next: "dialogue_8",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_manual'}],
      waitFor: { completed: 'read_manual_ch9'}
    },
    "dialogue_8" : {
      text: `[מעניין, אז יכולים להיווצר שגיאות בחיבור אפילו עם הנתונים נכונים, טוב אני אתחיל לעבור על המכתב]`,
      name: "אני",
      next: "dialogue_9",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}],
      waitFor: {completed: 'networkChecked'}
    },
    "dialogue_9" : {
      text: `נראה שיש בעיה, עם השרת המכתב לא נשלח.`,
      name: "אני",
      next: "dialogue_10",
    },
    "dialogue_10" : {
      text: `אוי לא... שוב עשיתי טעות! בטח כתבתי את הפורט לא נכון`,
      emotion: "surprised",
      next: "dialogue_11",
    },
    "dialogue_11" : {
      text: `זה תמיד קורה לי. אני בטוחה שיום אחד יפתרו אותי ככה`,
      emotion: "sad",
      next: "dialogue_12",
    },
    "dialogue_12" : {
      text: `רגע, זה ממש לא אשמתך. החיבור נכשל בגלל שגיאת <span style='color:var(--blue)'>Handshake</span> ,לא בגלל שכתבת משהו לא נכון.`,
      name: "אני",
      next: "dialogue_13"
    },
    "dialogue_13" : {
      text: `כן? אז מה בעצם אני אמורה לשנות?`,
      emotion: "confused",
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
      next: "dialogue_16"
    },
    "dialogue_16" : {
      text: `עם אתה אומר שזה יכול לעזור...יש לי עוד כתובת שאני יכולה להשתמש בה.`,
      emotion: "neutral",
      next: "dialogue_17"
    },
    "dialogue_17" : {
      text: `תוכל לסמן לי את כתובת המקור בשביל שאני אשנה אותה?`,
      next: (state) => state.flags.stampedElement === 'src-address' ? "dialogue_18" : "dialogue_mistake_2_1",
      waitFor: {flag: "stampedElement"},
      onEnter: [{type: 'SET_FLAG', key: 'mistake_9_stamp', value: 'src-address'}]
    },
    "dialogue_18" : {
      text: `הנה, העם תוכל לבדוק עוד פעם את החיבור?`,
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
      next: "dialogue_20",
      onEnter: [{type: 'SHOW', id: 'submit-button'}],
      waitFor: {completed: 'submit'}
    },
    "dialogue_20" : {
      text: `המכתב נשלח כמו שצריך.`,
      onEnter: [{type: 'HIDE', id: 'submit-button'}, {type: 'SHOW', id: 'submit-animation'}],
      next: "dialogue_exit"
    },
    "dialogue_exit" : {
      text: `וואו! זה באמת עבד, תודה רבה!`,
      emotion: "happy",
      next: null
    },
    "dialogue_mistake_1_1" : {
      text: `צריך לשנות את החלק הזה`,
      name: 'אני',
      next: "dialogue_mistake_1_2",
      onEnter:[{type: 'SET_FLAG', key: 'selectedAnswer', value: null}]
    },
    "dialogue_mistake_1_2" : {
      text: `למה?`,
      emotion: "confused",
      next: "dialogue_mistake_1_3"
    },
    "dialogue_mistake_1_3" : {
      text: `אממ....את יכולה לשאולי אותי שוב?`,
      emotion: "angry",
      name: 'אני',
      next: "dialogue_13"
    },
    "dialogue_mistake_2_1" : {
      text: `אני חושבת שסימנתה משהוא אחר...`,
      emotion: "angry",
      next: "dialogue_mistake_2_2"
    },
    "dialogue_mistake_2_2" : {
      text: `אה! סליחה אני אנסה שוב`,
      name: "אני",
      next: "dialogue_17",
      onEnter: [{type: 'SET_FLAG', key: 'stampedElement', value: null}]
    }
  },

  "chapter_10" : {
    "dialogue_1" : {
      text: `היי... אמ... אני צריכה לשלוח הודעה פרטית דרך הפרוטוקול SSH.`,
      character: "mel",
      emotion: "shy",
      next: "dialogue_2",
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_10_1', value: 'terminal'},
        {type: `SET_FLAG`, key: 'mistake_10_1_command', value: 'ssh mel@10.0.0.1'}
      ],
      globalWait: {id: 'shy_letter', from: 'dialogue_8', to: 'dialogue_9', condition: {flag: 'letter_state'}, destination: "dialogue_special_1"}
    },
    "dialogue_2" : {
      text: `...בבקשה רק...אל תקרא את המכתב`,
      emotion: "neutral",
      speed: 120,
      next: "dialogue_3"
    },
    "dialogue_3" : {
      text: `[זה רק הופר אותי ליותר מעוניין]`,
      name: "אני",
      next: "dialogue_4"
    },
    "dialogue_4" : {
      text: `[טוב בוא נקרא מה כתוב במדריך שלי]`,
      name: "אני",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_manual'}],
      waitFor: {completed: 'read_manual_ch10'},
      next: "dialogue_5"
    },
    "dialogue_5" : {
      text: `[נראה שאני אצטרך להתחבר דרך פקודה בשביל לשלוח את המכתב]`,
      name: "אני",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}],
      waitFor: {visible: 'using_terminal'},
      next: "dialogue_6"
    },
    "dialogue_6" : {
      text: `אתה צריך להתחבר בשביל לבצע את השליחה, הנה הקוד שלי.`,
      emotion: "confident",
      next: "dialogue_7"
    },
    "dialogue_7" : {
      text: `שם המשתמש שלי הוא “mel”, והכתובת שלי היא: “10.0.0.1”.`,
      next: "dialogue_8",
      waitFor: {completed: 'mistake_10_1'}
    },
    "dialogue_8" : {
      text: `זה הכל, אתה יכול לשלוח את המכתב עכשיו.`,
      emotion: "shy",
      onEnter: [{type: 'SHOW', id: 'submit-button'}],
      next: 'dialogue_9',
      waitFor: {completed : 'submit'},
    },
    "dialogue_9" : {
      text: `תודה`,
      emotion: "shy",
      next: "dialogue_10",
      nameColor: "var(--purple-pink)",
      onEnter: [{type: 'SHOW', id: 'submit-animation'}, {type: 'HIDE', id: 'submit-button'}]
    },
    "dialogue_10" : {
      text: `אין בעד מ-`,
      emotion: 'missing',
      name: "אני",
      next: "dialogue_11"
    },
    "dialogue_11" : {
      text: `[אולי בפעם הבאה]`,
      emotion: "missing",
      name: "אני",
      next: "dialogue_exit",
    },
    "dialogue_exit" : {
      text: `[מזה? היא שחכה משהוא פה?]`,
      name: "אני",
      textColor: "var(--grey-1)",
      onEnter: [{type: 'SET_FLAG', key: 'aquired_item', value: 'mel_bag'}]
    },
    "dialogue_special_1" : {//make this one of the events that can trigger anywhere
      text: `...`,
      speed: 1000,
      emotion: "emberassed",
      next: "dialogue_9",
      waitFor: {completed: 'submit'}
    },
  },
  "chapter_11" : {
    "dialogue_1" : {
      text: `היי, אחי! מה קורה? תנחש למה באתי היום?`,
      character: "liyor",
      emotion: "happy",
      next: "dialogue_2",
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_11', value: 'network'},
        {type: 'SET_FLAG', key: 'mistake_11_code', value: '100'}
      ]
    },
    "dialogue_2" : {
      text: `בשביל לשלוח מכתב?`,
      name: "אני",
      next: "dialogue_3",
      onEnter: [{type: 'SET_FLAG', key: 'aquired-item', value: null}]
    },
    "dialogue_3" : {
      text: `בשביל לשחק <span style='color:var(--green)'>VineCraft</span>, ברור!`,
      emotion: "neutral",
      next: "dialogue_4"
    },
    "dialogue_4" : {
      text: `אתה מתכוון Minecraft, נכון?`,
      character: "liyor",
      name: "אני",
      next: "dialogue_5"
    },
    "dialogue_5" : {
      text: `ששש! שלא ישמעו האנשים של זכויות היוצרים.`,
      emotion: "happy",
      next: "dialogue_6"
    },
    "dialogue_6" : {
      text: `בכל מקרה, אני צריך לשלוח קצת מידע לאתר של VineCraft כדי שאוכל לשחק.`,
      emotion: "neutral",
      next: "dialogue_7"
    },
    "dialogue_7" : {
      text: `בסדר, אני רק צריך לבדוק מידע על הפרוטוקול שאתה משתמש בוא.`,
      name: "אני",
      next: "dialogue_8",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_manual'}],
      waitFor: { completed: 'read_manual_ch11'}
    },
    "dialogue_8" : {
      text: `[פרוקול שיכול להחליף כתובת יעד בשם...נשמע ממש שימושי לאתר]`,
      name: "אני",
      next: "dialogue_9"
    },
    "dialogue_9" : {
      text: `בסדר, תעביר אותו עליי.`,
      name: "אני",
      next: "dialogue_10",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}],
      waitFor: {completed: 'networkChecked'}
    },
    "dialogue_10" : {
      text: `[זה מוזר...זאת לא שגיאה מהצד של השרת...]`,
      name: "אני",
      next: "dialogue_11"
    },
    "dialogue_11" : {
      text: `[אני צריך לסמן משהוא עם החותמש אבל מה בדיוק?...]`,
      name: "אני",
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
      next: "dialogue_13"
    },
    "dialogue_13" : {
      text: `אה...אני לא זוכר יותר, כל מה שאני יודע זה שם האתר.`,
      emotion: "surprised",
      next: "dialogue_14",
    },
    "dialogue_14" : {
      text : `זה טוב שבחרתה ב DNS אז, אתה לא צריך לזכור את הכתובת של השרת רק את שם ה DOMAIN שלו.`,
      name: "אני",
      next: "dialogue_15"
    },
    "dialogue_15" : {
      text: `תכניס את שם האתר, והפרוטוקול ימצא את הכתובת בשבילך.`,
      name: "אני",
      next: "dialogue_16"
    },
    "dialogue_16" : {
      text: `נשמע פשוט.`,
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
      onEnter: [
        {type: 'SHOW', id: 'submit-animation'},
        {type: 'HIDE', id: 'submit-button'}
      ],
      next: "dialogue_18"
    },
    "dialogue_18" : {
      text: `ראיתי בחורה בחוץ עם אוזניות, היא ברחה ישר אחרי ששאלתי למה שהיא מקשיבה, מה הקטע שלה? `,
      emotion: "neutral",
      next: 'dialogue_19'
    },
    "dialogue_19" : {
      text: "[אנחנו באימת גרים בעולם קטן]",
      name: "אני",
      next: "dialogue_20"
    },
    "dialogue_20" : {
      text: `פעם הבאה שתראה אותה, תגיד לה שהיא שכחה את התיק שלה פה.`,
      name: "אני",
      next: "dialogue_exit"
    },
    "dialogue_exit" : {
      text: `כן, אתה יכול לסמוך עליי, אחי.`,
      emotion: "happy",
      nameColor: "var(--green)",
    },
    "dialogue_mistake_1_1" : {
      text: `[מה לגבי החלק הזה? לא! אני מפספס משהוא פה, כדאי לי לקרוא את המדריך שלי שוב.]`,
      name: "אני",
      next: "dialogue_11"
    }
  },
  "chapter_12" : {
    "dialogue_1" : {
      text: `שלום חמודי, בדיוק אפיתי עגלה חדשה של עוגיות ואני רוצה לשלוח אותן לכל הנכדים שלי.`,
      character: "granny",
      emotion: "happy",
      next: "dialogue_2",
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_12_1', value: 'terminal'},
        {type: 'SET_FLAG', key: 'mistake_12_1_command', value: 'ipconfig /renew'}
      ]
    },
    "dialogue_2" : {
      text: `אבל לכתוב כל כתובת בנפרד זה כזה כאב ראש. אתה יכול למצוא דרך לטפל בזה בשבילי?`,
      emotion: "neutral",
      next: "dialogue_3",
    },
    "dialogue_3" : {
      text: `כן, אני אבדוק מה אפשר לעשות.`,
      name: "אני",
      next: "dialogue_4"
    },
    "dialogue_4" : {
      text: `[פרוטוקול שיכול לשלוח את אותה הודעה להרבה אנשים בבת אחת? העם דבר כזה קיים?]`,
      name: "אני",
      next: "dialogue_5"
    },
    "dialogue_5" : {
      text: `[אה! נראה שהמדריך שלי עודכן עכשיו. אולי הוא יעזור לי]`,
      name: "אני",
      next: "dialogue_6",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_manual'}],
      waitFor: {completed: 'read_manual_ch12'}
    },
    "dialogue_6" : {
      text: `[זה באמת מה שאני צריך! אבל אני אצתרך להריץ פקודה בשביל לתפעל אותו]`,
      name: "אני",
      next: "dialogue_7"
    },
    "dialogue_7" : {
      text: `יש לי רעיון מה לעשות, את יכולה לשלוח לי את המכתב`,
      name: "אני",
      next: "dialogue_8"
    },
    "dialogue_8" : {
      text: `כן, אין צורך לזרז אותי, יש לי הרבה זמן`,
      next: "dialogue_9",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}],
      waitFor: {completed: 'mistake_12_1'}
    },
    "dialogue_9" : {
      text: `[צריך לעשות עוד משהוא]`,
      name: "אני",
      next: "dialogue_10",
      waitFor: {completed: 'networkChecked'}
    },
    "dialogue_10" : {
      text: `[כן...אני חושב שזה הכל, מעניין לי כמה נכדים יקבלו עוגיות בסוף.]`,
      name: "אני",
      next: "dialogue_11",
      onEnter: [{type: 'SHOW', id: 'submit-button'}],
      waitFor: {completed: 'submit'}
    },
    "dialogue_11" : {
      text: `זהו, המכתב יגיע לכל האנשים ברשת המקומית`,
      name: "אני",
      next: "dialogue_exit",
      onEnter: [{type: 'HIDE', id: 'submit-button'}, {type: 'SHOW', id: 'submit-animation'}],
    },
    "dialogue_exit" : {
      text: `תודה רבה, יקירי! עכשיו כל אחד יקבל עוגיות חמות ישר מהתנור.`,
      emotion: "happy",
      next: null
    }
    
  },
  "chapter_13" : {
    "dialogue_1" : {
      text: `שלום. העובדת שלי, מאיה, ביקשה ממני לוודא שהמכתב הזה תקין.`,
      emotion: "neutral",
      next: "dialogue_2",
      character: "shimon",
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_1_13', value: 'terminal'},
        {type: 'SET_FLAG', key: 'mistake_1_13_command', value: 'snmpget'}
      ]
    },
    "dialogue_2" : {
      text: `אם אני אהיה כנה? כל פעם שהיא שולחת משהו, יש בעיות, אז החלטתי לבדוק בעצמי.`,
      emotion: "angry",
      next: "dialogue_3"
    },
    "dialogue_3" : {
      text: `המכתב הזה משתמש בפרוטוקול <span style='color:var(--red)'>SNMP</span>. אני צריך שתריץ את הפקודה הנכונה ותבדוק שבכל תקין.`,
      emotion: "neutral",
      next: "dialogue_4"
    },
    "dialogue_4" : {
      text: `כן,בגלל שאני חדש פה, אני צריך לקרוא על הפרוטוקול שאתה מדבר עליו.`,
      name: "אני",
      next: "dialogue_5"
    },
    "dialogue_5" : {
      text: `טוב, אבל אין לי את כל היום.`,
      emotion: "angry",
      next: "dialogue_6"
    },
    "dialogue_6" : {
      text: `[בסדר, מיסטר רציני...]`,
      name: "אני",
      emotion: "neutral",
      next: "dialogue_7",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_manual'}],
      waitFor: {completed: 'read_manual_ch13'}
    },
    "dialogue_7" : {
      text: `[יש הרבה פקודות לפרוטוקול הזה, אבל היחידה שאני יכול להשתמש בוא במערכת הזאתי מסומנת בכחול]`,
      name: "אני",
      next: "dialogue_8"
    },
    "dialogue_8" : {
      text: `סיימתה?, שלחתי לך את המכתב.`,
      next: "dialogue_9",
    },
    "dialogue_9" : {
      text: `[טוב, לעבודה]`,
      name: "אני",
      next: "dialogue_10",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}],
      waitFor: {completed: 'mistake_1_13'}
    },
    "dialogue_10" : {
      text: `[שמעון ביקש ממני לבדוק שהכל תקין, בואו נראה עם יש פה עוד בעיות]`,
      name: "אני",
      next: (state) => state.flags.stampedElement ? 'dialogue_special_1' : 'dialogue_11',
      onEnter: [{type: 'SET_FLAG', key: 'stampedElement', value: null}],
      waitFor: {completedAny: [{completed: 'networkChecked'}, {flag: 'stampedElement'}]}
    },
    "dialogue_11" : {
      text: `[הכל מסודר כמו שצריך. נראה שמאיה באמת השקיעה כדי לוודא שאין טעויות.]`,
      name: "אני",
      next: "dialogue_12"
    },
    "dialogue_12" : {
      text: `נו, מצאתה משהוא?`,
      next: 'dialogue_13'
    },
    "dialogue_13" : {
      text: `הכל תקין, אין טעויות בשום מקום.`,
      name: "אני",
      next: 'dialogue_14'
    },
    'dialogue_14' : {
      text: `אה... אז היא באמת מילאה אותו כמו שצריך?`,
      emotion: "curious",
      next: 'dialogue_15'
    },
    'dialogue_15' : {
      text: `אולי הייתי קשוח מדיי עלייה...`,
      emotion: "sad",
      next: 'dialogue_16',
      onEnter: [{type: 'SHOW', id: 'submit-button'}],
      waitFor: {completed: 'submit'}
    },
    'dialogue_16' : {
      text: `...תודה`,
      next: null,
      onEnter: [{type: 'HIDE', id: 'submit-button'}, {type: 'SHOW', id: 'submit-animation'}],
    },
    "dialogue_special_1" : {
      text: `השורה הזאתי שגויה.`,
      name: "אני",
      next: "dialogue_special_2"
    },
    "dialogue_special_2" : {
      text: ` כמו שציפיתי...נו, מה בדיוק שגוי בשורה?`,
      emotion: "happy",
      next: "dialogue_special_3",
    },
    "dialogue_special_3" : {
      text: `אה... סליחה טעות שלי, השורה הזאתי בסדר גמור.`,
      name: "אני",
      next: "dialogue_special_4"
    },
    "dialogue_special_4" : {
      text: `[על מה אני חושב בכלל?! אני אביא צרות למאיה בגלל זה]`,
      name: "אני",
      emotion: "sad",
      next: "dialogue_10"
    }
  },
  "chapter_14" : {
    "dialogue_1" : {
      text: `היי, שכחת את התיק שלך פה בפעם הקודמת.`,
      name: "אני",
      emotion: "shy",
      character: "mel",
      next: "dialogue_2",
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_14_1', value: 'terminal'},
        {type: 'SET_FLAG', key: 'mistake_14_1_command', value: 'terminal monitor'},
        {type: 'SET_FLAG', key: 'mistake_14_stamp', value: 'header'}
      ],
      globalWait: {id: 'personal_photo', from: 'dialogue_16', to: 'dialogue_21', condition: {flag: 'link_state'}, destination: 'dialogue_special_1'}
    },
    "dialogue_2" : {
      text: `אה.. אני יודעת. משהוא בחוץ אמר לי... תודה ששמרת עליו.`,
      next: 'dialogue_3',
      globalWait: {id: 'early_stamp', from: 'dialogue_16', to: 'dialogue_21', condition: {flag: 'stampedElement'}, destination: 'early_stamp_1'}
    },
    "dialogue_3" : {
      text: `כיוון שכבר הגעתי... רציתי לשלוח את זה, אבל... זה מכתב מיוחד. חייבים לוודא שהמערכת תקינה לפני ששולחים אותו, אחרת הוא לא יגיע ליעד.`,
      emotion: 'neutral',
      next: 'dialogue_4',
    },
    "dialogue_4" : {
      text: `[מכתב מיוחד...נשמע מעניין]`,
      name: "אני",
      next: "dialogue_5",
    },
    "dialogue_5" : {
      text: `[אוקיי, בואו נקרא עליו]`,
      name: "אני",
      next: "dialogue_6",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_manual'}],
      waitFor: {completed: 'read_manual_ch14'}
    },
    "dialogue_6" : {
      text: `[אוקיי...זה היה הרבה מידע]`,
      name: "אני",
      next: "dialogue_7",
    },
    "dialogue_7" : {
      text: `[אין לי מושג מה לעשות...]`,
      name: "אני",
      next: "dialogue_8",
    },
    "dialogue_8" : {
      text: `מל... אני יכול להשתמש בעזרה שלך?`,
      name: "אני",
      next: "dialogue_9",
    },
    "dialogue_9" : {
      text: `מה?! אתה רוצה את העזרה שלי?`,
      emotion: "surprised",
      next: "dialogue_10"
    },
    "dialogue_10" : {
      text: `אבל אני...`,
      emotion: "shy",
      next: "dialogue_11"
    },
    "dialogue_11" : {
      text: `מל, יש לך כישרון ממש גדול, ואני עדיין חדש בתחום הזה, עם אני צריך ללמוד ממשהו זה ממך.`,
      name: "אני",
      next: "dialogue_12"
    },
    "dialogue_12" : {
      text: `אה... טוב... אני מניחה שאוכל להסביר.`,
      emotion: "confident",
      next: "dialogue_13"
    },
    "dialogue_13" : {
      text: `קודם כל, צריך לבדוק את הודעות הלוג של המערכת. בשביל זה משתמשים ברכיב Terminal Monitor.`,
      next: "dialogue_14"
    },
    "dialogue_14" : {
      text: `הוא מציג בזמן אמת הודעות מהמערכת, כדי שנדע אם משהו השתבש.`,
      emotion: "confident",
      next: "dialogue_15"
    },
    "dialogue_15" : {
      text: `צריך להיות רשום איפה שהוא אצליך, איך מריצים את פקודת Terminal monitor`,
      emotion: "confident",
      next: "dialogue_16"
    },
    "dialogue_16" : {
      text: `אני לא זוכרת איך מקלידים את הפקודה, אז אתה תצתרך לעשות את זה בעצמך.`,
      emotion: "shy",
      next: "dialogue_17",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}]
    },
    "dialogue_17" : {
      text: `[אוקיי...אני מחפש פקודת Terminal monitor כדי להדפיס הודעות מערכת.]`,
      name: "אני",
      emotion: "shy",
      next: "dialogue_18",
      waitFor: {completed: 'mistake_14_1'}
    },
    "dialogue_18" : {
      text: `טוב... אני רואה את ההודעות. לא נראה שיש פה בעיות.`,
      name: "אני",
      emotion: "shy",
      next: "dialogue_19"
    },
    "dialogue_19" : {
      text: `זה לא מספיק, לפעמים ההודעות האלו לא חושפות הכול. צריך לבדוק לעומק מה קורה עם החבילות עצמן.`,
      emotion: "confident",
      next: "dialogue_20"
    },
    "dialogue_20" : {
      text: `אנחנו מחפשים פקודה שתיתן נו ראות שגיעות בתעבורה, היא מתחילה במילה <span style='color:var(--blue)'>debug</span>`,
      emotion: "confident",
      next: "dialogue_21",
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_14_2_command', value: 'debug ip packet'},
        {type: 'SET_FLAG', key: 'mistake_14_2', value: 'terminal'}
      ],
      waitFor: {completed: 'mistake_14_2'}
    },
    "dialogue_21" : {
      text: `הממ... נראה שיש חבילה עם שדה חסר.`,
      name: "אני",
      emotion: "confident",
      next: (state) => state.completed['mistake_14_stamp'] ? "dialogue_alt_1" : "dialogue_22" 
    },
    "dialogue_22" : {
      text: `זה כנראה בתוך המכתב עצמו, תנסה למצוא את השגיאה.`,
      next: (state) => state.flags['stampedElement'] === 'header' ? "dialogue_23" : "dialogue_mistake_1_1",
      emotion: "confident",
      waitFor: {flag: 'stampedElement'}
    },
    "dialogue_23" : {
      text: `אני רואה מה חסר פו עכשיו, אין HEADER במכתב הזה.`,
      name: "אני",
      emotion: "confident",
      next: "dialogue_24"
    },
    "dialogue_24" : {
      text: `כן, אני אתקן את זה.`,
      next: "dialogue_25",
      emotion: "confident",
      onEnter: [
        {type: 'CORRECT_MISTAKE', id: 'mistake_14_stamp', correction: '------HEADER------'},
        {type: 'SHOW', id: 'submit-button'}
      ],
      waitFor: {completed: 'submit'}
    },
    "dialogue_25" : {
      text: ' וואו, הצלחנו לפתור את זה ביחד, את עזרת לי ממש, תודה.',
      name: "אני",
      onEnter: [{type: 'HIDE', id: 'submit-button'}, {type: 'SHOW', id: 'submit-animation'}],
      next: "dialogue_26"
    },
    "dialogue_26" : {
      text: `ב-בשמחה...`,
      emotion: "happy",
      next: null
    },
    "dialogue_special_1" : {
      text: `...`,
      emotion: "emberassed",
      next: (state) =>  state.prevDialogue,
      onEnter: [{type: 'SET_FLAG', key: 'link_state', value: null}]
    },
    "dialogue_mistake_1_1" : {
      text: `אני חושבת שסימנתה משהוא אחר...`,
      emotion: "shy",
      next: "dialogue_mistake_1_2"
    },
    "dialogue_mistake_1_2" : {
      text: `אה! סליחה אני אנסה שוב`,
      name: "אני",
      next: "dialogue_22",
      onEnter: [{type: 'SET_FLAG', key: 'stampedElement', value: null}]
    },
    "early_stamp_1" : {
      text: `[יש לי הרגשה שמשהוא לא נכון בשורה הזאתי...]`,
      name: "אני",
      next: (state) => state.flags['stampedElement'] === 'header' ? 'early_stamp_2' : "early_stamp_mistake_1_1",
      noPrev: true
    },
    "early_stamp_2" : {
      text: `מצאתי שבמכתב הזה חסר HEADER`,
      name: "אני",
      next: "early_stamp_3",
      noPrev: true
    },
    "early_stamp_3" : {
      text: `אה...באימת? אפילו לא סיימנו להריץ את כל הפקודות וכבר מצאתה את הטעות.`,
      emotion: "surprised",
      next: "early_stamp_4",
      noPrev: true
    },
    "early_stamp_4" : {
      text: `אני אתקן את הטעות אחר כך, בואו נחזור למה שעשינו`,
      emotion: "neutral",
      next: (state) => state.prevDialogue,
      noPrev: true
    },
    "early_stamp_mistake_1_1" : {
      text: `יש שגיאה בשורה הזאתי`,
      name: "אני",
      next: "early_stamp_mistake_1_2",
      noPrev: true
    },
    "early_stamp_mistake_1_2" : {
      text: `כן? מצאתה משהוא?`,
      emotion: "surprised",
      next: "early_stamp_mistake_1_3",
      noPrev: true
    },
    "early_stamp_mistake_1_3" : {
      text: 'אממ...לא את צודקת כדאי לנו לסיים להריץ את הפקודות בהתחלה.',
      name: "אני",
      emotion: "neutral",
      onEnter: [{type: 'SET_FLAG', key: 'stampedElement', value: null}],
      next: (state) => state.prevDialogue,
      globalWait: {id: 'early_stamp', from: 'dialogue_16', to: 'dialogue_21', condition: {flag: 'stampedElement'}, destination: 'early_stamp_1'},
      noPrev: true
    }
  },
  "chapter_15" : {
    "dialogue_1" : {
      text: `שלום, תודה שעזרתה לי בפעם שעברה.`,
      character: "maya",
      emotion: "happy",
      next: "dialogue_2",
      onEnter: [{type: 'SET_FLAG', key: 'mistake_15_1', value: 'terminal'},
                {type: 'SET_FLAG', key: 'mistake_15_1_command', value: 'traceroute'}
      ]
    },
    "dialogue_2" : {
      text: `יש לי תקשורת איטית עם שרת מסוים. הוא עדיין מגיב, אבל הכל מרגיש איטי.`,
      emotion: "neutral",
      next: "dialogue_3"
    },
    "dialogue_3" : {
      text: `הבוס שלי בקש ממני להשתמש בפקודת איתור בעיות, אבל...`,
      next: "dialogue_4"
    },
    "dialogue_4" : {
      text: `אני לא בטוחה באיזו פקודת להשתמש.`,
      emotion: "sad",
      next: "dialogue_5"
    },
    "dialogue_5" : {
      text: `איזה סוג של איתור את צריכה לעשות?`,
      name: "אני",
      next: "dialogue_6",
      emotion: "neutral"
    },
    "dialogue_6" : {
      text: `הממ...הייתי רוצה להבין מאיפה התחילה התקלה, באיזה שלב החבילה התחילה להאט. `,
      emotion: "confused",
      next: "dialogue_7"
    },
    "dialogue_7" : {
      text: `[אוקיי, פקודה שעוזרת למצוא את המקור של התקלה...כדאי לי לבדוק במדריך]`,
      name: "אני",
      next: "dialogue_8",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_manual'}],
      waitFor: {completed: 'read_manual_ch15'}
    },
    "dialogue_8" : {
      text: `קראתי את המדריך, ויש 4 פקודות אפשריות.`,
      name: "אני",
      next: "dialogue_9"
    },
    "dialogue_9" : {
      text: `מצויין! ובאיזו אנחנו נשתמש?`,
      emotion: "happy",
      next: "dialogue_10"
    },
    "dialogue_10" : {
      type: "question",
      answers: ["Ping","Traceroute","Show Interface","Clear Counters"],
      next: (state) => state.flags.selectedAnswer === 'Traceroute' ? "dialogue_11" : "dialogue_mistake_1_1",
      waitFor: {flag: 'selectedAnswer'},
      onEnter: [{type: 'SET_FLAG', key: 'selectedAnswer', value: null}]
    },
    "dialogue_11" : {
      text: `אה! אני מכירה את הפקודה הזאתי. היא יכולה להדפיס את כל המסלול שעברה החבילה, זה יהיה שימושי.`,
      emotion: "neutral",
      next: "dialogue_12"
    },
    "dialogue_12" : {
      text: `בשביל להריץ אותה צריך לרשום:\n "<span style="color: var(--blue)">[כתובת יעד IP]</span> traceroute" בתוך הורמינל.`,
      next: "dialogue_13",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}],
      waitFor: {completed: 'mistake_15_1'}
    },
    "dialogue_13" : {
      text: `כן אני רואה את הבעיה.`,
      name: "אני",
      next: "dialogue_14",
      emotion: "confused",
    },
    "dialogue_14" : {
      text: `[טוב שיניתי "משהוא" בוא נראה עם המכתב נשלח]`,
      name: "אני",
      next: "dialogue_15",
      emotion: "neutral",
      onEnter: [
        {type: 'SHOW', id: 'submit-button'}
      ],
      waitFor: {completed: 'submit'}
    },
    "dialogue_15" : {
      text: `תודה! אני חושבת שזה הפעם האחרונה שניפגש, בזכותך אני עושה הרבה יותר פחות בעיות, אני מעוד מעריכה את זה.`,
      emotion: "happy",
      onEnter: [{type: 'HIDE', id: 'submit-button'}, {type: 'SHOW', id: 'submit-animation'}],
      next: null
    },
    "dialogue_mistake_1_1" : {
      text: `[לא! אני לא רוצה להיראות טיפשי שוב. צריכה להיות פה תשובה אחרת.]`,
      name: "אני",
      next: "dialogue_9",
      emotion: "confused",
    }
  },
  "chapter_16" : {
    "dialogue_1" : {
      text: `היי, התגעגעת עליי?`,
      character: "liyor",
      emotion: "happy",
      next: "dialogue_2",
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_16', value: 'network'},
        {type: 'SET_FLAG', key: 'mistake_16_code', value: '103'},
        {type: 'SET_FLAG', key: 'mistake_16_1', value: 'terminal'},
        {type: 'SET_FLAG', key: 'mistake_16_1_command', value: 'ip helper-adress 172.20.45.9'}
      ],
      globalWait: {id: 'stamp_mistake', from: 'dialogue_5', to: 'dialogue_12', condition: {flag: 'stampedElement'}, destination: 'dialogue_mistake_1_1'}
    },
    "dialogue_2" : {
      text: `תגיד, קניתי ראוטר חדש בשביל הסניף הזה, אבל נראה שאין אינטרנט. המחשב פה כאילו מנסה להתחבר... אבל כלום. אתה יכול לבדוק לי את זה?`,
      emotion: "neutral",
      next: "dialogue_3",
    },
    "dialogue_3" : {
      text: `כן בטח, נשמע פשוט.`,
      name: "אני",
      next: "dialogue_4"
    },
    "dialogue_4" : {
      text: `[מוזר...המדריך שלי לא התעדכן]`,
      name: "אני",
      next: "dialogue_5"
    },
    "dialogue_5" : {
      text: `[טוב, אני לפחות יכול לבדוק את החיבור]`,
      name: "אני",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}],
      next: "dialogue_6",
      emotion: "neutral",
      waitFor: {completed: 'networkChecked'}
    },
    "dialogue_6" : {
      text: `כן, כמו שאני רואה החבילה לא מגיעה לשרת.`,
      name: "אני",
      emotion: "neutral",
      next: "dialogue_7"
    },
    "dialogue_7" : {
      text: `זה מוזר נכון? אני כל הזמן מקבל את ההודעה הזאת: “לא ניתן להעביר את בקשת ה-DHCP לשרת המרוחק מכיוון שהפקודה ip helper-address לא מוגדרת בנתב.”`,
      emotion: "surprised",
      next: "dialogue_8"
    },
    "dialogue_8" : {
      text: `טוב, אין לי מושג מה זה אומר.`,
      emotion: "happy",
      next: "dialogue_9"
    },
    "dialogue_9" : {
      text: `[אני יכול לומר את אותו הדבר]`,
      name: "אני",
      emotion: "happy",
      next: "dialogue_10"
    },
    "dialogue_10" : {
      text: `[אה! המדריך שלי התעדכן, סוף סוף מידע חדש.]`,
      name: "אני",
      emotion: "neutral",
      next: "dialogue_11",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_manual'}],
      waitFor: {completed: 'read_manual_ch16'}
    },
    "dialogue_11" : {
      text: `[כדאי לי להריץ את הפקודה בשביל לראות איזה בעיה נוצרת]`,
      name: "אני",
      emotion: "neutral",
      next: "dialogue_12",
      waitFor: {completed: 'mistake_16_1'}
    },
    "dialogue_12" : {
      text: `[הפקודה רצה... אבל זה לא השרת הנכון]`,
      name: "אני",
      emotion: "neutral",
      next: "dialogue_13"
    },
    "dialogue_13" : {
      text: `[אני צריך לסמן משהוא...אבל מה?]`,
      name: "אני",
      next: (state) => state.flags.stampedElement === 'dest-address' ? "dialogue_14" : 'dialogue_mistake_1_1',
      waitFor: {flag: 'stampedElement'}
    },
    "dialogue_14" : {
      text: `הפקודה עצמה עבדה, אבל היא שלחה את בקשת ה-DHCP לכתובת שלא מפעילה שרת DHCP. שגיאה 103 אומרת שהנתב העביר את הבקשה – אבל לא קיבל תשובה חזרה. לכן צריך לשנות את כתובת היעד לשרת DHCP האמיתי.`,
      name: "אני",
      next: "dialogue_15"
    },
    "dialogue_15" : {
      text: `מה?! עוד פעם!`,
      emotion: "surprised",
      next: "dialogue_16"
    },
    "dialogue_16" : {
      text: `אני אנסה לסים לב בפעם הבאה`,
      emotion: "happy",
      next: "dialogue_17",
      onEnter: [
        {type: 'CORRECT_MISTAKE', id: 'mistake_16_1', correction: 'ip helper-address'},
        {type : 'CORRECT_MISTAKE', id: 'mistake_16', correction: 200},
        {type: 'SHOW', id: 'submit-button'}
      ],
      waitFor: {completed: 'submit'}
    },
    "dialogue_17" : {
      text: `מגניב, זה עובד עכשיו! תודה.`,
      name: "אני",
      onEnter: [
        {type: 'SHOW', id: 'submit-animation'},
        {type: 'HIDE', id: 'submit-button'}
      ],
      next: "dialogue_18",
      emotion: "happy",
    },
    "dialogue_18" : {
      text: `אני מקווה שעוד מתי שהוא ניפגש`,
      next: null
    },
    "dialogue_mistake_1_1" : {
      text: `השורה הזאתי שגויה`,
      name: "אני",
      next: "dialogue_mistake_1_2",
      noPrev: true,
    },
    "dialogue_mistake_1_2" : {
      text: `על מה אתה מדבר?`,
      emotion: "angry",
      next: "dialogue_mistake_1_3",
      noPrev: true
    },
    "dialogue_mistake_1_3" : {
      text: `אה... סליחה טעות שלי, השורה הזאתי בסדר גמור.`,
      name: "אני",
      next: (state) => state.prevDialogue,
      onEnter: [{type: 'SET_FLAG', key: 'stampedElement', value: null}],
      noPrev: true
    }
  },
  "chapter_17" : {
    "dialogue_1" : {
      text: `או, שלום חמוד שלי! תמיד כיף לראות אותך.`,
      emotion: "happy",
      character: "granny",
      next: "dialogue_2",
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_17', value: 'network'},
        {type: 'SET_FLAG', key: 'mistake_17_code', value: '302'},
        {type: 'SET_FLAG', key: 'mistake_17_1', value: 'terminal'},
        {type: 'SET_FLAG', key: 'mistake_17_1_command', value: 'ip directed broadcast'},
        {type: 'SET_FLAG', key: 'mistake_17_2', value: 'terminal'},
        {type: 'SET_FLAG', key: 'mistake_17_2_command', value: 'no ip directed broadcast'}
      ],
      globalWait: {id: 'stamp mistake', from: 'dialogue_5', to: 'dialogue_15', condition: {flag: 'stampedElement'}, destination: 'dialogue_mistake_1_1'}
    },
    "dialogue_2" : {
      text: `הרגע אפיתי עגלה חדשה של העוגיות המפתיעות המיוחדות שלי! הן מיועדות לנכדים שלי בשכונה הרחוקה ההיא.`,
      emotion: "neutral",
      next: "dialogue_3"
    },
    "dialogue_3" : {
      text: `חכם מצידי, לא? אבל משום מה, אף אחד לא קיבל כלום. אתה יכול לבדוק מה השתבש?`,
      next: "dialogue_4"
    },
    "dialogue_4" : {
      text: `[זה כבר הפעם השלישית היום...היא כנראה ממש אוהבת לאפות עוגיות]`,
      name: 'אני',
      next: "dialogue_5"
    },
    "dialogue_5" : {
      text:  `טוב, בוא נראה איך אני אוכל לעזור.`,
      name: 'אני',
      next: "dialogue_6",
      emotion: "neutral",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}],
      waitFor: {completed: 'networkChecked'}
    },
    "dialogue_6" : {
      text: `[עוד שגיאה שאני לא מקיר...אה! קיבלתי אינפורמציה חדשה במדריך]`,
      name: "אני",
      next: "dialogue_7",
      emotion: "neutral",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_manual'}],
      waitFor: {completed: 'read_manual_ch17'}
    },
    "dialogue_7" : {
      text: `[נראה שהייתה שגיאה בגלל שפעולת ה -Broadcast לא נעשתה, כדאי לי להפעיל אותה. ]`,
      name: "אני",
      next: "dialogue_8",
      emotion: "neutral",
      waitFor: {completed: 'mistake_17_1'}
    },
    "dialogue_8" : {
      text: `הנא, המכתב נשלח לכל האנשים בכתובת היעד.`,
      name: "אני",
      emotion: "neutral",
      next: "dialogue_9",
    },
    "dialogue_9" : {
      text: `אה, נפלא! אתה פשוט מציל חיים. אני כבר יכולה לדמיין את הקטנים שלי פותחים את החבילות. זה משמח אותי לדעת שכולם קיבלו טעימה!`,
      emotion: "happy",
      next: "dialogue_10"
    },
    "dialogue_10" : {
      text: `אה! נזכרתי...`,
      emotion: "sad",
      next: "dialogue_11"
    },
    "dialogue_11" : {
      text: `...אוי ואבוי. נראה שקצת נסחפתי. העוגיות האלה... הן מאוד מיוחדות. שמתי בהן אגוזים הפעם, ו... אוי לא, אורי הקטן אלרגי לאגוזים!`,
      emotion: "sad",
      next: "dialogue_12"
    },
    "dialogue_12" : {
      text: `אני לא יכולה להרשות לעצמי שאני אשלח לכולם בטעות שוב. תוכל, אממ... לבטל את זה עכשיו? ליתר ביטחון?`,
      emotion: "sad",
      next: "dialogue_13"
    },
    "dialogue_13" : {
      text: `[צריך לבטל את השליחה, איך אני אמור לעשות את זה?]`,
      name: "אני",
      emotion: "sad",
      next: "dialogue_14",
      waitFor: {completed: 'mistake_17_2'}
    },
    "dialogue_14" :{
      text: `הנה, זה בוצע. המכתב לא יישלח לשום אחד.`,
      name: "אני",
      emotion: "sad",
      next: "dialogue_15"
    },
    "dialogue_15" : {
      text: `תודה, העם תוכל לסמן לי את האוגייה שאני אשלח אחרת?`,
      emotion: "happy",
      next: (state) => state.flags.stampedElement === 'link' ? "dialogue_16" : "dialogue_mistake_2_1",
      onEnter: [{type: 'SET_FLAG', key: 'mistake_17_3_1', value: 'link'},
                {type: 'SET_FLAG', key: 'mistake_17_3_2', value: 'imgLink'}
      ],
      waitFor: {flag: 'stampedElement'},
    },
    "dialogue_16" : {
      text: `הנא! אף אחד לא אלרגי לשוקולד, נכון?`,
      next: "dialogue_17",
      onEnter: [
        {type: 'CORRECT_MISTAKE', id: 'mistake_17_3_1', correction: 'Chocklate Cookies.png'},
        {type: 'CORRECT_MISTAKE', id: 'mistake_17_3_2', correction: './Monitor/pop_ups/cookie.gif'},
        {type: 'SHOW', id: 'submit-button'}],
      waitFor: {completed: 'submit'}
    },
    "dialogue_17" : {
      text: `תודה רבה, אתה באמת ילד חביב, מקווה שניפגש עוד שוב`,
      emotion: "happy",
      onEnter: [{type: 'HIDE', id: 'submit-button'}, {type: 'SHOW', id: 'submit-animation'}],
      next: null
    },
    "dialogue_mistake_1_1" : {
      text: `השורה הזאתי שגויה`,
      name: "אני",
      next: "dialogue_mistake_1_2",
      noPrev: true,
    },
    "dialogue_mistake_1_2" : {
      text: `על מה אתה מדבר?`,
      emotion: "grumpy",
      noPrev: true,
      next: "dialogue_mistake_1_3"
    },
    "dialogue_mistake_1_3" : {
      text: `אה... סליחה טעות שלי, השורה הזאתי בסדר גמור.`,
      name: "אני",
      next: (state) => state.prevDialogue,
      onEnter: [{type: 'SET_FLAG', key: 'stampedElement', value: null}]
    },
    "dialogue_mistake_2_1" : {
      text: `ילד...זאת לא עוגיה`,
      emotion: "grumpy",
      next: "dialogue_mistake_2_2"
    },
    "dialogue_mistake_2_2" : {
      text: `אה! סליחה אני אנסה שוב`,
      name: "אני",
      next: "dialogue_15",
      onEnter: [{type: 'SET_FLAG', key: 'stampedElement', value: null}]
    }
  },
  "chapter_18" : {
    "dialogue_1" : {
      text: `בוקר טוב, אני צריך לשלוח הודעה למשרד מרוחק ברשת. הבעיה שהמחשב שלי לא מצליח להגיע אליו ואין תגובת ARP.`,
      character: "shimon",
      emotion: "neutral",
      next: "dialogue_2",
      onEnter: [{type: 'SET_FLAG', key: 'mistake_18_1', value: 'terminal'},
                {type: 'SET_FLAG', key: 'mistake_18_1_command', value: 'ip proxy-arp'}
      ],
      globalWait: {id: 'stamp_mistake_18', from: 'dialogue_4', to: 'dialogue_5', condition: {flag: 'stampedElement'}, destination: 'dialogue_mistake_1_1'}
    },
    "dialogue_2" : {
      text: `נטפל בזה עם Proxy ARP. תריץ את הפקודה ותסדר את זה.`,
      next: "dialogue_3",
    },
    "dialogue_3" : {
      text: `אל תדאג יש לי כבר הרבה ניסיון עם להריץ פקודות.`,
      name: "אני",
      next: "dialogue_4",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_manual'}],
      waitFor: {completed: 'read_manual_ch18'}
    },
    "dialogue_4" : {
      text: `[טוב, בואו נתחיל]`,
      name: "אני",
      next: "dialogue_5",
      emotion: "neutral",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}],
      waitFor: {completed: 'mistake_18_1'}
    },
    "dialogue_5" : {
      text: `טוב, זה מה שרציתי לראות. יעיל, מסודר, בלי שטויות.`,
      emotion: "happy",
      next: "dialogue_6",
      onEnter: [{type: 'SHOW', id: 'submit-button'}],
      waitFor: {completed: 'submit'}
    },
    "dialogue_6" : {
      text: `...`,
      emotion: "sad",
      next: "dialogue_7",
      onEnter: [{type: 'HIDE', id: 'submit-button'}, {type: 'SHOW', id: 'submit-animation'}],
    },
    "dialogue_7" : {
      text: ` מאיה אמרה לי שאתה זה שעזר לה להשתפר בפרוטוקולים. כשהיא תעתה, אתה הסברת לה מה צריך לעשות.`,
      next: "dialogue_8"
    },
    "dialogue_8" : {
      text: `תודה לך`,
      emotion: "happy",
      next: null
    },
    "dialogue_mistake_1_1" : {
      text: `השורה הזאתי שגויה`,
      name: "אני",
      next: "dialogue_mistake_1_2",
      noPrev: true,
    },
    "dialogue_mistake_1_2" : {
      text: `מה? העם משהוא קרה?`,
      emotion: "angry",
      noPrev: true,
      next: "dialogue_mistake_1_3"
    },
    "dialogue_mistake_1_3" : {
      text: `אה... סליחה טעות שלי, השורה הזאתי בסדר גמור.`,
      name: "אני",
      next: (state) => state.prevDialogue,
      onEnter: [{type: 'SET_FLAG', key: 'stampedElement', value: null}],
      noPrev: true
    }
  },
  "chapter_19" : {
    "dialogue_1" : {
      text: `שלום, יום עמוס היה היום, כן?`,
      character: "daniel",
      emotion: "happy",
      next: "dialogue_2",
      onEnter: [
        {type: 'SET_FLAG', key: 'mistake_19', value: 'network'},
        {type: 'SET_FLAG', key: 'mistake_19_code', value: '5'},
        {type: 'SET_FLAG', key: 'mistake_19_1', value: 'terminal'},
        {type: 'SET_FLAG', key: 'mistake_19_1_command', value: 'ip redirects'},
        {type: 'SET_FLAG', key: 'mistake_19_2', value: 'port'},
        {type: 'SET_FLAG', key: 'mistake_19_3', value: 'header'}
      ],
      globalWait: {id: 'stamping something', from: 'dialogue_4', to: 'dialogue_6', destination: 'dialogue_found_1_1', condition: {flag: 'stampedElement'}}
    },
    "dialogue_2" : {
      text: `כל הכבוד עד כאן, עשית עבודה מצוינת. אבל עכשיו מגיעה המשימה האמיתית`,
      emotion: "neutral",
      next: "dialogue_3",
      globalWait: {id: 'network check', from: 'dialogue_4', to: 'dialogue_6', destination: 'dialogue_6', condition: {completed: 'networkChecked'}}
    },
    "dialogue_3" : {
      text: `הכנתי מכתב מסובך במיוחד עם שלוש טעויות שונות תצטרך להשתמש בכל הכלים שלמדת לתקן את הכל.`,
      next: "dialogue_4"
    },
    "dialogue_4" : {
      text: `בהצלחה!`,
      emotion: "happy",
      next: "dialogue_exit",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_mail'}],
      waitFor: {completed: 'submit'}
    },
    "dialogue_found_1_1" : {
      next: (state) => state.flags.stampedElement === 'port' ? "dialogue_found_1_2" : state.flags.stampedElement === 'header' ? "dialogue_found_2_1" : "dialogue_mistake_2_1",
      noPrev: true,
      text: `מצאתי משהוא`,
      emotion: "neutral"
    },
    "dialogue_found_1_2" : {
      text: ` הפורט הזה לא מתאים ל HTTP.`,
      name: "אני",
      noPrev: true,
      next: "dialogue_found_1_3"
    },
    "dialogue_found_1_3" : {
      text: `אם כן, איזה פורט מתאים ל-פרוטוקול HTTP`,
      next: "dialogue_found_1_4",
      noPrev: true
    },
    "dialogue_found_1_4" : {
      type: 'question',
      noPrev: true,
      answers: [110, 67, 34, 80],
      next: (state) => state.flags.selectedAnswer === 80 ? 'dialogue_found_1_5' : 'dialogue_mistake_1_1',
      waitFor: {flag: 'selectedAnswer'}
    },
    "dialogue_found_1_5" : {
      text: 'נכון, מאוד!',
      emotion: "happy",
      noPrev: true,
      next: "dialogue_5",
      onEnter: [{type: 'CORRECT_MISTAKE', id: 'mistake_19_2', correction: 80}]
    },
    "dialogue_found_2_1" : {
      text: `חסר HEADER במכתב הזה.`,
      name: "אני",
      next: "dialogue_found_2_2",
      noPrev: true
    },
    "dialogue_found_2_2" : {
      text: `זה נכון, אני אתקן את זה`,
      emotion: "happy",
      next: "dialogue_5",
      noPrev: true,
      onEnter: [{type: 'CORRECT_MISTAKE', id: 'mistake_19_3', correction: '------HEADER------'}]
    },
    "dialogue_5" : {
      text: (state) => `נשאר למצוא עוד ${!state.completed.has('mistake_19_1') + !state.completed.has('mistake_19_2') + !state.completed.has('mistake_19_3')} שגיאות`,
      emotion: "neutral",
      next: "dialogue_7",
      waitFor: {completedAll: [{completed:'mistake_19_1'}, {completed: 'mistake_19_2'}, {completed: 'mistake_19_3'}]},
      onEnter: [{type: 'SET_FLAG', key: 'stampedElement', value: null}],
      globalWait: {id: 'stamping something', from: 'dialogue_5', to: 'dialogue_6', destination: 'dialogue_found_1_1', condition: {flag: 'stampedElement'}},
    },
    "dialogue_6" : {//for checking the network(I didn't name this with "found", cause I needed to use globalWit here)
      text: `אה, נראה שמצאתה שגיאת תקשורת. שלחתי לך מידע במדריך שתוכל לפתור אותה.`,
      emotion: "neutral",
      onEnter: [{type: 'MARK_COMPLETED', id: 'update_manual'}],
      next: "nothing",
      waitFor: {completed: 'nothing'}, //heh,
      noPrev: true,
      globalWait: {id: 'terminal_command_entered', from: 'dialogue_6', to: 'dialogue_8', destination: 'dialogue_5', condition: {completed: 'mistake_19_1'}}
    },
    "dialogue_7" : {
      text: `מצויין מצאתה את כל השגיאות, אתה יכול לשלוח את המכתב עכשיו.`,
      emotion: "happy",
      next: "dialogue_8",
      onEnter: [{type: 'SHOW', id: 'submit-button'}],
      waitFor: {completed: 'submit'}
    },
    "dialogue_8" : {
      text: `זה הכל להיום, תודה שאבדתה במשרד הדואר הפרוטוקולים.`,
      emotion: "neutral",
      next: "dialogue_9",
      onEnter: [
        {type: 'HIDE', id: 'submit-button'},
        {type: 'SHOW', id: 'submit-animation'}
      ]
    },
    "dialogue_9" : {
      text: `עם תרצה לבוא לעבוד פה שוב תוכל לעשות את זה דרך מסך הבית.`,
      next: "dialogue_10"
    },
    "dialogue_10" : {
      text: `נתראה!`,
      emotion: "happy",
      next: null
    },
    //for selcting the wrong port in the question
    "dialogue_mistake_1_1" : {
      text: "לא, זאת היא טעות",
      emotion: "sad",
      next: "dialogue_mistake_1_2"
    },
    "dialogue_mistake_1_2" : {
      text: "אתה יכול להשתמש במדריך שלך בשביל לחפס אינפורמצייה על פרוטוקולים קודמים.",
      emotion: "neutral",
      next: "dialogue_found_1_3"
    },
    //for stamping a wrong line
    "dialogue_mistake_2_1" : {
      text: `השורה הזאתי שגויה`,
      name: "אני",
      next: "dialogue_mistake_2_2",
      noPrev: true
    },
    "dialogue_mistake_2_2" : {
      text: `נסה שוב`,
      emotion: "sad",
      noPrev: true,
      next: (state) => state.prevDialogue
    }
  }
 }  
}




export default dialogueData;