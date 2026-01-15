export const manualData = {
    Chapters: {
        "chapter_1": {
            title: "מבוא - מהוא פרוטוקול?",
            category: "הדרכה",
            pages: {
                "page_1": {
                    "line_1": "פרוטוקול תקשורת הוא אוסף של חוקים. הוא קובע איך שולחים ומקבלים הודעות במערכות תקשורת.",
                    "line_2": ' אפשר לחשוב על זה כמו שיחת טלפון:<br>* מי שמתקשר אומר "הלו" </br>  * הצד השני עונה ',
                },
                "page_2": {
                    "line_1": '* רק אז מדברים<br> * ובסוף? נפרדים עם "להתראות"',
                    "line_2": "בלי הסדר הזה — אף אחד לא יבין מה קורה. גם בעולם הדיגיטלי, כל הודעה חייבת להישלח לפי פרוטוקול מסודר.",
                },
                "page_3": {
                    "line_1": "איך נראית הודעה? <br> כל הודעה מורכבת מכמה חלקים קבועים:",
                    "line_2": "* פתיחה <span style='color:var(--red)'> (header)</span> <br> מידע טכני: מי שלח, למי, באיזה פרוטוקול, ועוד.",
                    "line_3": "* מידע <span style='color:var(--red)'>(data)</span> <br> ההודעה עצמה — הקובץ, הטקסט או הנתונים."
                },
                "page_4": {
                    "line_1": "* סיומת <span style='color:var(--red)'>(Footer)</span> <br> סימן מוסכם לסיום. לפעמים כולל בדיקת תקינות <span style='color:var(--red)'>(Checksum)</span>.",
                    "line_2": "אם חסר חלק? ההודעה לא תעבור כמו שצריך."
                },
                "page_5": {
                    "line_1": "מה נלמד בהמשך?",
                    "line_2": "בכל פרק תלמד על פרוטוקול אחר.לכל אחד יש חוקים משלו - מה מותר, מה חובה, ואיפה אסור לטעות."
                }
            }
        },
        "chapter_2": {
            title: "FTP-File Transfer Protocol",
            category: "Application Layer Protocol",
            pages: {
                "page_1": {
                    "line_1" : "* פרוטוקול תקשורת משכבת ה יישום, מבוסס TCP להעברת קבצים בין מחשבים בעלי מערכות הפעלה שאינן זהות בהכרח.",
                    "line_2" : "* לפרוטוקול ה-FTP יש זמן תגובה(Latency) ארוך מאוד. הזמן שלוקח בין שליחת הבקשה למידע לבין התחלת קבלת המידע הוא ארוך מאוד ודורש תהליך כניסה (login) ארוך למדי."
                },

                "page_2": {
                    "line_1" : "* פרוטוקול זה משתמש בפורטים 20 ו- 21 של TCP מצד השרת.",
                    "line_2" : "* פרוטוקול 21 משמש ליצירת קשר ראשוני ופורט 20 משמש להעברת מידע. הצד היוזם משתמש בפורטים רנדומליים."
                }
            }
        },
        "chapter_3": {
            title: "TFTP - Trivial File Transfer Protocol",
            category: "Application Layer Protocol",
            pages: {
                "page_1" : {
                    "line_1" : `ל TFTP יש את אותה מטרה כמו FTP רק שTFTP עובד עם UDP, ולכן הקובץ שיעבור לא יהיה בהכרח אמין.אין בתהליך הזה התחברות, ולכן גם אין שום אבטחה.`,
                    "line_2" : `TFTP משתמש בפורט 69`
                },

                "page_2" : {
                    "line_1" : `בנוסף, הפרוטוקול לא מתאים להעברת קבצים גדולים  אם מנסים לשלוח קובץ גדול מדי, ההעברה תיכשל.`,
                    "line_2" : `הקבצים לא יכולים להיות בגודל של יותר מ-32 מגה בייט.`
                }
            }
        },
        "chapter_4" : {
            title: "",
            pages: {
                "page_1" : {

                }
            }
        },
        "chapter_5" : {
            title: "HTML - Hypertext Transfer Protocol",
            category: "Application Layer Protocol",
            pages: {
                "page_1" : {
                    "line_1" : `* פרוטוקול תקשורת מבוסס על <span style='color:var(--red)'>TCP</span> שנועד להעברת שפי HTML ואובייקטים שהם מכילים(כמו תמונות, סרטוני פלאש וכו’) ברשת האינטרנט.`,
                    "line_2" : `* התקשורת בין השרת ללקוח ב-HTTP נעשית באמצעות בקשות ששולח הלקוח ותשובות שמחזיר השרת.`
                },

                "page_2" : {
                    "line_1" : `תהליך הקמת קשר:`,
                    "line_2" : `* ראשית, הלקוח יוצר חיבור לכתובת ה - IP ולפורט שבו השרת נמצא, בדרך כלל פורט <span style='color:var(--red)'>80</span>.`,
                    "line_3": `* לאחר מכן נשלחת הבקשה, הכוללת את הכתובת של האובייקט המבוקש(למשל, דף HTML) ופרטים נוספים על הבקשה ועל הלקוח.`
                }
            }
        },
        "chapter_6" : {
            title: "HTTPS - Hypertext Transfer Protocol Secure",
            category: "Application Layer Protocol",
            pages: {
                "page_1" : {
                    "line_1" : `HTTPS הוא פרוטוקול זהה ל HTTP רק שתעבורת המידע באמצעות הפרוטוקול היא מוצפנת באמצעות הצפנת SSL.`,
                    "line_2" : `יתרון - תקשורת שרת - לקוח מאובטחת`,
                    "line_3" : `חיסרון - מסובך, יש לסמוך על רשת אישורים מרכזית.`
                },
                "page_2" : {
                    "line_1" : `* פרוטוקול תקשורת נפוץ במיוחד לאבטחת מידע ברשתות מחשבים, ומיושם במיוחד באינטרהט`,
                    "line_2" : `* משתמש בפורט 80.`
                }
            }
        },
        "chapter_8" : {
            title: 'Telnet',
            category: "Configuration",
            pages: {
                "page_1" : {
                    "line_1" : `פרוטוקול TELNET משמש בעיקר משתמשים המעוניינים להתחבר באמצעות שורת הפקודה למחשבים/רכיבים ברשת.`,
                    "line_2" : `השם נגזר מהמונח האנגלי - Telecommunication Network מכיוון, שהפרוטוקול פותח על מנת לדמות מחשב המחובר למחשב אחר ועובד עליו למעשה. `,
                    "line_3" : `הפורט המקובל לשימוש בתקשורת TELNET להתחברות מרחוק הוא פורט 23, מבוסס על TCP.`
                },
                "page_2" : {
                    "line_1" : `פקודה נפוצה ב-Telnet  היא: <span style='color:var(--red)'>st</span> (קיצור ל status). הפקודה הזאת  מציגה את מצב המערכת, כולל זמן פעולה, עומס מעבד ושימוש בזיכרון `
                }
            }
        },
        "chapter_9" : {
            title: `SSL - Secure Socket Layer`,
            category: "Presentation/Security Layer Protocol",
            pages: {
                "page_1" : {
                    "line_1" : `פרוטוקול תקשורת לרשתות מחשבים המאפשר תקשורת מאובטחת ומוצפנת בין שני יישומים מתקשרים.`,
                    "line_2" : `SSL מיושם בעיקר בדפדפן, ותפקידו להעביר נתונים בצורה מוצפנת, כך שרק המקבל יוכל לפענח את ההצפנה ולקרוא את הנתונים ולא אף אחד אחר.`,
                    "line_3" : "פרוטוקול HTTPS משתמש בפרוטוקול זה על מנת לאבטח את תעבורת המידע שלו."
                },
                "page_2" : {
                    "line_1" : "כדי ש-SSL יפעל, לא מספיק לפתוח חיבור TCP. אחרי שהחיבור נפתח, הלקוח והשרת מבצעים תהליך שנקרא <span style='color:var(--red)'>SSL/TLS Handshake</span> — משא ומתן שבו שני הצדדים מחליטים איך להצפין זה עם זה. במהלך התהליך הזה:",
                    "line_2" : `<span style='color:var(--red)'>1.</span> הלקוח מציג לשרת את גרסאות ה-TLS והצפנים שהוא תומך בהם.`,
                    "line_3" : `<span style='color:var(--red)'>2.</span> השרת בוחר מתוכם סט הצפנה וגרסה שמתאימים לו.`
                },
                "page_3" : {
                    "line_1" : `<span style='color:var(--red)'>3.</span> השרת שולח תעודה (Certificate). הלקוח צריך לוודא שהתעודה אמינה, לא פגה, ותואמת את שם היעד.`,
                    "line_2" : `<span style='color:var(--red)'>4.</span> שני הצדדים יוצרים מפתח הצפנה משותף ומוודאים שהם מסכימים עליו.`,
                    "line_3" : `רק אחרי שכל השלבים האלה עוברים בהצלחה, ההצפנה מופעלת.`,
                },
                "page_4" : {
                    "line_1" : `גם כשהפורט והנתונים תקינים, תהליך ה-<span style='color:var(--red)'>Handshake</span> עלול להיכשל עקב סינון רשת, חוסר התאמה בנתיב התקשורת או בדיקות אבטחה בצד השרת.`,
                "line_2" : `במקרים כאלה שינוי כתובת ה-<span style='color:var(--blue)'>מקור(source-adress)</span> עשוי להעביר את החיבור דרך נתיב תקין יותר וכך לאפשר ל-SSL להשלים את ההצפנה.`
                }
            }
        },
        "chapter_10" : {
            title: "SSH - Secure Shell",
            category: "Application Layer Protocol",
            pages: {
                "page_1" : {
                    "line_1" : `SHH הוא פרוטוקול דומה לפרוטוקול TELNET רק שהפרוטוקול עובד בצורה מאובטחת.`,
                    "line_2" : `SSH פועל מעל TCP והפורט הסטנדרטי שלו הוא 22`,
                    "line_3" : `ראשית פרוטוקול SHH דורש התחברות באמצעות שם משתמש וסיסמא. מעבר לזה התקשורת היא <span style='color:var(--red)'>מוצפנת</span>.`
                },

                "page_2" : {
                    "line_1" : `ההתחברות מתבצעת בעזרת הפקודה:`,
                    "line_2" : `<span style='color:var(--blue)'>IP-כתובת</span>@<span style='color:var(--red)'>שם-משתמש</span> ssh`,
                    "line_3" : `דוגמא: ssh user@192.168.10.10`,
                    "line_5" : `ללא ההתחברות, לא ניתן לבצע פעולות נוספות בהודעה. לאחר ההתחברות, ניתן לערוך, להצפין ולשלוח את ההודעה בצורה מאובטחת.`
                }
            }

        },
        "chapter_11" : {
            title: `DNS - Domain Name Service`,
            category: "Application Layer Protocol",
            pages: {
                "page_1" : {
                    "line_1" : `DNS הוא פרוטוקול המאפשר למפות שמות תחום (Domain Names) לכתובות נומריות IP, ובכך שהוא בעל יכולת גישה לבסיס נתונים ועל פיו למפות לפי הדרישות.`,
                    "line_2" : `מטרת הפרוטוקול היא להקל את השימוש של אנשים ברשתות התקשורת.`,
                },
                "page_2" : {
                    "line_1" : `לכל שרת יש רשומות אשר מאפשרות לו לטפל בבקשות השונות מצד המשתמש. רשומות אלה מחלקות את השרת לאזורים(Zones) וע”י כך יודע לפנות אל המיקום המבוקש.`,
                    "line_2" : `פרוטוקול DNS משתמש בפורט UDP 53.`
                }
            }
        },
        "chapter_12" : {
            title: "DHCP - Dynamic Host Configuration Protocol",
            category: "Application Layer Protocol",
            pages: {
                "page_1" : {
                    "line_1" : `DHCP הוא פרוטוקול תקשורת המשמש להקצאה דינאמית של כתובות IP למחשבים ברשת מקומית (LAN).`,
                    "line_2" : `מנהל הרשת מגדיר לשרת ה-DHCP תחום כתובות (Pool), וכל מחשב שמתחבר לרשת מוגדר לבקש כתובת IP מהשרת ברגע ההתחברות. הכתובת מוקצית לזמן מוגבל (Lease), ובסיום התקופה המחשב חייב לחדש את ההקצאה כדי להמשיך להשתמש בכתובת.`
                },
                "page_2" : {
                    "line_1" : `בנוסף לכתובת ה-IP, שרת DHCP יכול לספק גם את כתובת שרת ה-DNS וכתובת שער הגישה (Gateway), כך שהמחשב יוכל להתחיל לפעול ברשת ללא צורך בהגדרות נוספות.`,
                    "line_2" : `תהליך ההקצאה מתבצע בארבעה שלבים:`,
                    "line_3" : `<span style='color:var(--red)'>1. DHCP Discover</span> – המחשב שולח הודעת Broadcast  לרשת כדי לבדוק אם קיים שרת DHCP.`,
                },
                "page_3" : {
                    "line_1" : `<span style='color:var(--red)'>2. DHCP Offer</span> – השרת משיב בהצעה עם כתובת IP זמינה.`,
                    "line_2" : `<span style='color:var(--red)'>3. DHCP Request</span> – המחשב שולח בקשה לשרת לקבל את הכתובת שהוצעה`,
                    "line_3" : `<span style='color:var(--red)'>4. DHCP ACK</span> – השרת מאשר ומקצה למחשב את הכתובת`
                },
                "page_4" : {
                    "line_1" : `כדי לחדש או לקבל כתובת IP באופן ידני, יש להריץ בטרמינל (Windows): <span style='color:var(--blue)'>ipconfig /renew</span>.`,
                    "line_2" : `לאחר מכן יש לבדוק את החיבור כדי לוודא שהתקבל אישור (ACK) ושהמחשב מחובר לרשת.`
                },
                "page_5" : {
                    "line_1" : `DHCP משתמש בפרוטוקול UDP ועובד בפורטים 67 (שרת) ו-68 (לקוח).`,
                    "line_2" : `כאשר מחשב מבקש כתובת IP באמצעות DHCP, הוא לא יודע עדיין למי לשלוח את הבקשה. לכן, ההודעה הראשונה (DHCP Discover) נשלחת לכתובת שידור (Broadcast) – 255.255.255.255.`
                }
            }
        },
        "chapter_13" : {
            title: `SNMP - Simple Network Management Protocol`,
            category: "Application Layer Protocol",
            pages: {
                "page_1" : {
                    "line_1" : `רוטוקול SNMP משמש לניהול ובקרה מרחוק של רכיבי רשת כמו נתבים, מדפסות, שרתים ועוד. בפרוטוקול יש שני צדדים:`,
                    "line_2" : `- צד מנהל (Manager): שולח פקודות לניהול ומעקב.`,
                    "line_3" : `- צד מנוהל (Managed Device): מגיב לפקודות ומוסר מידע על המערכת.`,
                },
                "page_2" : {
                    "line_1" : `הפרוטוקול פועל על גבי UDP בשכבה הרביעית (Transport Layer) ומשתמש בפורטים 161 (שליחה) ו-162 (קבלה).`,
                    "line_2" : `באמצעותו ניתן לקבל מידע כמו:`,
                    "line_3" : `* מצב המערכת`,
                    "line_4" : `* סטטיסטיקות`,
                },
                "page_3" : {
                    "line_1" : `* קונפיגורציות`,
                    "line_2" : `* מידע על ממשקים`,
                    "line_3" : `ישנם 5 סוגי הודעות PDU שהן הודעות שנשלחות כאשר יש מצב של ניהול רכיב מרחוק עם פרוטוקול SNMP.`,
                    "line_4" : `<span style='color:var(--red)'>1. GET REQUEST</span> - המנהל שולח בקשה לרכיב המנוהל על מנת לקבל מידע.`
                },
                "page_4" : {
                    "line_1" : `<span style='color:var(--red)'>2. SET REQUEST</span> - המנהל קובע ערך מסוים ברכיב המנוהל.`,
                    "line_2" : `<span style='color:var(--red)'>3. GET NEXT REQUEST</span> - המנהל שולח בקשה לרכיב המנוהל לקבל מידע לגבי האובייקט הבא ברשימה.`,
                    "line_3" : `<span style='color:var(--red)'>4. RESPONSE</span> - תשובה שהרכיב המנוהל שולח לרכיב המנהל.`,
                    "line_4" : `<span style='color:var(--red)'>5. TRAP</span> - התראות אשר שולח הרכיב המנוהל לעבר המנהל. `
                },
                "page_5" : {
                    "line_1" : `המידע נשלח בקבצי  MIB(Management Information Base).`,
                    "line_2" : `כדי לבדוק אם רכיב מגיב, ניתן להשתמש בפקודת <span style='color:var(--red)'>GET REQUEST</span> לדוגמה:`,
                    "line_3" : ` sysStatus.0 [10.0.0.1] snmpget -v2c -c public `,
                    "line_4" : `אבל אינטרפריטתור של המערכת שלנו יבין את הפקודה עם פשוט תרשמו: <span style='color:var(--blue)'>snmpget</span>`
                }
            }
        },
       "chapter_14" : {
            title: 'פרוטוקולי שירות',
            category: "Troubleshooting",
            pages: {
                "page_1" : {
                "line_1" : `פרוטוקולי שירות הם פרוטוקולים שנועדו לסייע לטכנאים ולמנהלי רשתות לנהל, לנטר ולפתור בעיות ברשת.`,
                "line_2" : `פרוטוקולים אלו אינם מיועדים לשימוש רגיל של משתמשים, אלא מספקים כלים לזיהוי תקלות ובקרה.`,
                "line_3" : `בפרק זה נלמד כיצד לצפות בהודעות מערכת וכיצד לבדוק לעומק את התעבורה עצמה. לשם כך נשתמש ב- Terminal Monitor ובפקודות Debug.`,
                },

                "page_2" : {
                "line_1" : `<span style='font-size:var(--font-title-large)'>Terminal Monitor</span>`,
                "line_2" : `רכיבי רשת כמו נתבים ומתגים רושמים לעצמם הודעות מערכת (LOG) בעת אירועים חשובים או שגיאות.`,
                "line_3" : `הודעות אלו אינן מוצגות אוטומטית למסך.`,
                "line_4" : `באמצעות הפקודה <span style='color:var(--blue)'>terminal monitor</span> ניתן לצפות בהן בזמן אמת.`
                },

                "page_3" : {
                "line_1" : `לאחר הפעלת Terminal Monitor, הודעות מערכת יוצגו מיד כאשר מתרחש אירוע.`,
                "line_2" : `הפקודה שימושית לזיהוי תקלות כלליות, ניתוקים ואירועים חריגים.`,
                "line_3" : `כדי להפסיק את הצגת ההודעות יש להשתמש בפקודה:`,
                "line_4" : `<span style='color:var(--blue)'>no terminal monitor</span>`
                },

                "page_4" : {
                "line_1" : `<span style='font-size:var(--font-title-large)'>Debug</span>`,
                "line_2" : `לעיתים הודעות LOG אינן מציגות את מקור הבעיה.`,
                "line_3" : `פקודת Debug מאפשרת לנטר את פעולת הרשת ברמה נמוכה ומפורטת יותר.`,
                "line_4" : `באמצעות Debug ניתן לראות מה קורה בפועל בזמן אמת.`
                },

                "page_5" : {
                "line_1" : `הפעלת Debug מתבצעת באמצעות פקודה כללית ולאחריה תחום הניטור הרצוי:`,
                "line_2" : `<span style='direction:ltr; display:block'>debug &lt;restraint list&gt;</span>`,
                "line_3" : `כל restraint list מגדיר איזה חלק במערכת ינוטר.`,
                "line_4" : `יש לבחור את הרשימה המתאימה לסוג התקלה.`
                },

                "page_6" : {
                "line_1" : `<span style='font-size:var(--font-title-large);color:var(--blue)'>debug ip packet</span>`,
                "line_2" : `פקודה זו מציגה כל חבילת IP שנשלחת או מתקבלת במערכת.`,
                "line_3" : `באמצעותה ניתן לראות שגיאות בתעבורה שלא נרשמות בלוגים רגילים.`,
                "line_4" : `הפקודה שימושית כאשר המערכת נראית תקינה אך ההודעה אינה מגיעה ליעד.`
                },

                "page_7" : {
                "line_1" : `<span style='font-size:var(--font-title-large)'>דוגמאות נוספות ל- Debug</span>`,
                "line_2" : `debug ip rip — לניטור הודעות ועדכונים של פרוטוקול ניתוב RIP.`,
                "line_3" : `debug interface serial 0/1 — לניטור פעילות ושגיאות בממשק פיזי מסוים.`,
                "line_4" : `פקודות אלו משמשות לזיהוי בעיות ממוקדות יותר.`
                },

                "page_8" : {
                "line_1" : `<span style='font-size:var(--font-title-large)'>כיבוי Debug</span>`,
                "line_2" : `Debug מייצר כמות גדולה של מידע ועלול להציף את המסך.`,
                "line_3" : `כיבוי ניטור ספציפי מתבצע באמצעות: <span style='color:var(--blue);direction:ltr;display:block'>undebug &lt;restraint list&gt;</span>.`,
                "line_4" : `כיבוי כל הניטורים הפעילים: <span style='color:var(--blue)'>undebug all</span>.`
                },

                "page_9" : {
                "line_1" : `דוגמה בסיסית לשימוש ב- Debug(במחשב אמיתי):`,
                "line_2" : `<span style='direction:ltr; display:block'>rl-notz# debug ip packet</span>`,
                "line_3" : `<span style='direction:ltr; display:block'>rl-notz# undebug all</span>`,
                "line_4" : `יש להפעיל Debug רק כאשר יש צורך ברור בניטור מעמיק.`
                }

            }
        },
        "chapter_15" : {
            title: 'דרכים נוספים לאיתור בעיות',
            category: "Troubleshooting",
            pages: {
                "page_1" : {
                    "line_1" : `מלבד שימוש בפרוטוקולי השירות Terminal Monitor ו-Debug, קיימות פקודות נוספות שבעזרתן ניתן לנטר את תעבורת הרשת ואת מצב הרכיבים.`,
                    "line_2" : `פקודות אלו שימושיות במיוחד לטכנאים לצורך איתור תקלות ובדיקת ביצועים.`
                },
                "page_2" : {
                    "line_1" : `<span style='font-size:var(--font-title-large);color:var(--blue)'>Ping</span>`,
                    "line_2" : `הפקודה Ping מאפשרת לבדוק אם ניתן ליצור קשר עם יעד מסוים ברשת.`,
                    "line_3" : ` ניתן להריץ פקודות Ping ישירות מהנתב, כדי לוודא שהמכשיר שאליו רוצים להתחבר זמין ועונה.`
                },
                "page_3" : {
                    "line_1" : `<span style='font-size:var(--font-title-large);color:var(--blue)'>Traceroute</span>`,
                    "line_2" : `הפקודה Traceroute משמשת כדי לאתר את המסלול המדויק שעוברת התקשורת מהרשת שלך ועד לכתובת היעד.`,
                    "line_3" : `היא מסייעת לזהות היכן יש עיכוב או נתק בקו התקשורת.`
                },
                "page_4" : {
                    "line_1" : `<span style='font-size:var(--font-title-large);color:var(--blue)'>Show Interface</span>`,
                    "line_2" : `הפקודה show interface מאפשרת להציג סטטיסטיקות ונתונים מפורטים על כל פורט במכשיר, כגון כמות התעבורה, שגיאות, ומהירות חיבור.`,
                },
                "page_5" : {
                    "line_1" : `<span style='font-size:var(--font-title-large);color:var(--blue)'>Clear Counters</span>`,
                    "line_2" : `הפקודה clear counters מאפסת את כל הסטטיסטיקות של הממשקים (Interfaces). לאחר איפוס, ניתן להתחיל לנטר מחדש ולזהות תקלות חדשות בצורה מדויקת יותר.`
                }
            }
        },
        "chapter_16" : {
            title: "IP Helper Adress",
            category: "Configuration",
            pages: {
                "page_1" : {
                    "line_1" : `כאשר משתמש שולח בקשת DHCP, ההודעה נשלחת כ-Broadcast (BC). הודעות ברודקאסט מגיעות רק לרכיבים באותה רשת מקומית (LAN), ולכן אם אין שרת DHCP באותה רשת – הנתב יתעלם מהבקשה.`,
                    "line_2" : `כדי לשלוח את בקשת ה-DHCP לשרת מרוחק, משתמשים בפקודה: <span style='color:var(--blue)'>[כתובת יעד]</span> ip helper-address`,
                    "line_3" : `דוגמא: <span style='color:var(--blue)'>ip helper-address 192.168.1.10</span>`
                },
                "page_2" : {
                    "line_1" : `כאשר הפקודה מוגדרת:`,
                    "line_2" : `* הנתב מקבל את הודעת הברודקאסט.`,
                    "line_3" : `* הוא מעביר את הבקשה כ-Unicast לשרת ה-DHCP המרוחק.`,
                    "line_4" : `* השרת מקצה כתובת IP דינאמית ושולח אותה בחזרה לנתב.`,
                    "line_5" : `* הנתב מעביר את הכתובת למשתמש הקצה.`
                },
                "page_3" : {
                    "line_1" : `בקיצור, ip helper-address אומרת לנתב:קיבלת בקשת DHCP ב-Broadcast? העבר אותה לשרת DHCP שנמצא מחוץ לרשת המקומית.`,
                    "line_2" : `<span style='color:var(--red)'>חשוב:</span> כתובת ה-ip helper-address חייבת להיות כתובת של שרת DHCP פעיל. אם הכתובת שגויה או מצביעה על רכיב שאינו שרת DHCP – הבקשה תישלח אך לא תיענה.`
                }
            }
        },
        "chapter_17" : {
            title: "IP Directed Broadcast",
            category: "Configuration",
            pages: {
                "page_1" : {
                    "line_1" : `פקודת <span style='color:var(--blue)'>ip directed broadcast</span> מאפשרת לשלוח הודעות אל אזור ה-Broadcast של רשת מרוחקת.`,
                    "line_2" : `אם הפקודה פעילה, וכאשר תשלחו הודעה אל הכתובת האחרונה של תת-הרשת המרוחקת, הנתב יפנה אותה אל כתובת ה-Broadcast של אותה רשת.`,
                    "line_3" : `אם הפקודה אינה פעילה, בקשות מסוג Broadcast לרשת מרוחקת לא יועברו.`,
                },
                "page_2" : {
                    "line_1" : `שגיאה 302 מצביעה על כך שהנתב חסם את ההעברה ויש להפעיל את הפקודה כדי להמשיך.`,
                    "line_2" : `השירות הזה פעיל כברירת מחדל בנתבים. באמצעותו ניתן להגיע לכתובת ה-Broadcast ברשת מרוחקת.`,
                    "line_3" : `ניתן לבטל את הפקודה באמצעות: <span style='color:var(--blue)'>no ip directed-broadcast</span>.`
                }
            }
        },
        "chapter_18" : {
            title: `Proxy ARP`,
            category: "Configuration",
            pages: {
                "page_1" : {
                    "line_1" : `כאשר מכשיר ברשת רוצה לתקשר עם מכשיר שנמצא ברשת אחרת, הוא ישלח את ההודעה לנתב.`,
                    "line_2" : `הנתב יעביר את המידע לנתב של הרשת השנייה, והנתב של הרשת השנייה יעביר את המידע למכשיר המתאים.`
                },
                "page_2" : {
                    "line_1" : `לפני שההודעה נשלחת, המכשיר חייב לדעת מה כתובת ה-MAC של כתובת ה-IP שאליה הוא רוצה להגיע. בדרך כלל זה נעשה עם ARP:`,
                    "line_2" : `* המכשיר שולח בקשת ARP: "למי שייכת הכתובת הזו?"`,
                    "line_3" : `* אם הכתובת שייכת לרשת מרוחקת, אף אחד ברשת המקומית לא יענה.`
                },
                "page_3" : {
                    "line_1" : `כאן נכנס Proxy ARP:`,
                    "line_2" : `* הנתב עונה במקומה של המכשיר המרוחק.`,
                    "line_3" : `* הוא מחזיר תשובה שכתובת ה-MAC שלו (של הנתב) היא כתובת ה-MAC של ה-IP המבוקש.`,
                    "line_4" : `* כך המכשיר שולח את ההודעות ישירות לנתב, והנתב יודע איך להעביר אותן הלאה.`
                },
                "page_4" : {
                    "line_1" : `זוהי פקודת ההפעלה של Proxy ARP:`,
                    "line_2" : `<span style='color:var(--blue)'>ip proxy-arp</span>`,
                }
            }
        },
        "chapter_19" : {
            title: `ICMP Redirects`,
            category: "Configuration",
            pages: {
                "page_1" : {
                    "line_1" : `נתב Cisco ישלח הודעת ICMP Redirect כאשר הוא מזהה שמכשיר משתמש בנתיב לא אופטימלי כדי להגיע ליעד. ההודעה מאפשרת למכשיר ללמוד נתיב טוב יותר.`,
                    "line_2" : `הנתב ישלח הודעת ICMP Redirect כאשר מתקיימים שלושה תנאים:`,
                    "line_3" : `1. הפאקט נכנס ויוצא דרך אותו ממשק שהגיע.`
                },
                "page_2" : {
                    "line_1" : `2. כתובת ה-IP של המכשיר השולח וכתובת ה-next hop של הנתב נמצאות באותה תת-רשת (subnet).`,
                    "line_2" : `3. הנתב מוגדר כך שהוא יכול לשלוח ICMP Redirects (מופעל כברירת מחדל).`,
                    "line_3" : `כאשר התנאים מתקיימים, הנתב יעביר את הפאקט ליעד, אך גם ישלח הודעת ICMP Redirect למכשיר השולח, שתאמר לו:`
                },
                "page_3" : {
                    "line_1" : `"בפעם הבאה, שלח את הפאקטים ישירות ל-next hop הנכון."`,
                    "line_3" : `פקודה כדי לשלוח הודעות אלו: <span style='color:var(--blue)'>ip redirects</span>`,
                    "line_4" : `פקודה לביטול: <span style='color:var(--blue)'>no ip redirects</span>`
                }
            }
        }
}
};