export const monitorData = {
    "chapter_1" : {
        customerName: "דניאל",
        protocol: "TCP",
        sourceAddress: "10.0.0.1",
        destinationAddress: "192.168.0.23",
        port: "22",
        text: "שלום, וברוך הבא למרכז הדואר הפרוטוקולי. מצורפת כאן הודעה בסיסית לדוגמה. היא כוללת כותרת, גוף... ואת השאר אני אשאיר לך לגלות בעצמך. תעיין, ואם משהו נראה לך חריג – תרגיש חופשי להשתמש בחותמת. אני בטוח שתסתדר מצוין.",
        link: "example_template.msg",
        imgLink: "./Monitor/pop_ups/letterStructure.png",
        header: true,
        footer: "------"
    },
    "chapter_2": {
        customerName: "מאיה",
        protocol: "FTP",
        sourceAddress: "10.0.0.2",
        destinationAddress: "192.168.0.24",
        port: "110",
        text: "<div style='direction: rtl; border-collapse: collapse;'><p style='text-decoration: underline; display: inline-block; padding-bottom: 2px; margin-bottom: 5px;'>תקציב רבעוני</p><table style='width: 100%; border-spacing: 0;'><thead><tr><th style='text-align: right; padding: 2px;'>מוצרים</th><th style='text-align: left; padding: 2px;'>הוצאות</th></tr></thead><tbody><tr><td style='text-align: right; padding: 2px;'>פיתוח תוכנה</td><td style='text-align: left; padding: 2px;'>₪510,000</td></tr><tr><td style='text-align: right; padding: 2px;'>שיווק (כולל גורילה מתנפחת)</td><td style='text-align: left; padding: 2px;'>₪298,500</td></tr><tr><td style='text-align: right; padding: 2px;'>תשתיות וסרט בידוד</td><td style='text-align: left; padding: 2px;'>₪240,000</td></tr><tr><td style='text-align: right; padding: 2px;'>שיעורי יוגה (שבוטלו)</td><td style='text-align: left; padding: 2px;'>₪149,000</td></tr></tbody></table></div>",
        header: true,
        footer: true,
        link: null
    },
    "chapter_3": {
        customerName : "ליאור",
        protocol : "TFTP",
        sourceAddress : "192.168.1.5",
        destinationAddress : "172.20.45.9",
        port : "69",
        text : "מה המצב, הכנתי גרסה חדשה של המשחק שלי. תעביר את הקובץ הזה לבן דוד שלי — הוא מת על דברים כאלה.",
        link: "Game_Beta_2024.iso (2.1GB)",
        imgLink: "./Monitor/pop_ups/game_beta_corrupt.png"
    },
    'chapter_4' : {
        customerName: "דניאל",
        protocol: "TCP",
        sourceAddress: "10.0.0.1",
        destinationAddress: "192.168.0.23",
        port: "22",
        text: `"איכות היא לא פעולה - היא הרגל."`,
        link: null
    },
    'chapter_5' : {
        customerName: "מל",
        protocol: "TFTP",
        sourceAddress: "192.168.1.5",
        destinationAddress: "172.20.45.9",
        port: "80",
        text: "אני לא יכולה לחכות להופעה של ניאון אקו הלילה... כבר הכנתי את הפוסטר הזה - עבדתי עליו הרבה זמן.",
        link: "Requesting connection (12mb)",
        imgLink: "./Monitor/pop_ups/requestingConnection.png"
    },
    'chapter_6' : {
        customerName: "סבתא",
        protocol: "HTTPS",
        sourceAddress: "127.0.0.1",
        destinationAddress: "172.20.45.9",
        port: 80,
        link: "cookie.gif",
        imgLink: "./Monitor/pop_ups/cookie.gif",
        text: 'שולחת לך את האוגיות שהכנתי הבוקר.'
    },
    'chapter_7' : {
        customerName: "דניאל",
        protocol: 'POP3',
        sourceAddress: '10.0.0.1',
        destinationAddress: '192.168.0.23',
        port: 13,
        text: '<span style="direction:rtl;display:block;text-align:right">פקודה: <span style="color:var(--red)">LIST</span><br>נמצאו שני הודעות חדשות בתיבה:<br><br><span style="font-size:var(--font-small);color:var(--grey-3)">1 1200 בייט – "מבצע ענק! קנה 1 קבל 3"<br>2 2500 בייט – "הודעה אישית מדניאל: אל תמחק את זה"</span></span>',
        link: null,
        commandWaitingText: "[מחכה לפקודה]..."
    },
    'chapter_8' : {
        customerName: "שמעון",
        protocol: '<span style="font-size:0.85em">TELNET</span>',
        mailProtocol: 'TELNET',
        sourceAddress: '10.0.0.1',
        destinationAddress: '192.168.0.23',
        port: 13,
        text: '<span style="direction:rtl;display:block;text-align:left">פקודה: <span style="color:var(--red)">st</span><br><br>System Status: All systems operational<br>Uptime: 3 days, 4 hours, 12 minutes<br>CPU Load: 15%<br>Memory Usage: 48%<br><span style="color:var(--red)">Port 13: Connection timeout - unable to reach destination</span></span>',
        link: null,
        commandWaitingText: "[מחכה לפקודה]..."
    },
    'chapter_9' : {
        customerName: "מאיה",
        protocol: 'SSL',
        sourceAddress: '198.51.100.10',
        destinationAddress: `203.0.113.25`,
        port: 443,
        text: `<span style='font-size:var(--font-title-large)'>גרף שבועי:</span>`,
        link: "Money Graph.png[50 kb]",
        imgLink: "./Monitor/pop_ups/moneyGraph.png"
    },
    'chapter_10' : {
        customerName: "מל",
        protocol: "SSH",
        sourceAddress: "10.0.0.1",
        destinationAddress: "172.20.45.9",
        port: 22,
        text: '<span style="direction:rtl; color:var(--black); font-size:var(--font-title-large)">פרק 12 – "הרוח והאש":</span><br><span style="color:var(--grey-3);font-size:var(--font-regular)"> ווילסון הביט עמוק לתוך עיניו של מקסוול. הרוח שרקה סביבם, אבל הלב שלו פעם חזק יותר מכל סופה.\'אל תעזוב אותי שוב,\'לחש, קולו רועד בין תקווה לייאוש.מקסוול חייך חיוך קטן...</span></span>',
        link: null,
        commandWaitingText: "<span style='color:var(--grey-3)'>NDYWGDY^&@*OODUB^*&f687GCVEGCYG^*&G&E*(G7(*G&H*&E(GCYUSHByG*&VCT756fgyxzfUGG&C^(*&CGF^GYCF^gc8GF^GcvysghcbG^F&ICGYVDS%C^T&GYCF^&SCGYVuVC^SI&GCF^CGFCUSCF^*&G^*&F^&G^FUVCSYTVEGCYG^*&G&E*(G7(*G&H*&E(GCYUSHByG*&VCT756fgyCJCFVCFCSYVGcftyugvgf6gyfCF^&SCYFF^*T&F^YTCYVCS^YV568gyc7f6ghHAXGVTAIXUGC%&S^TUIv</span>"
    },
    'chapter_11' : {
        customerName: 'ליאור',
        protocol: 'DNS',
        sourceAddress: "10.0.0.1",
        destinationAddress: "256.100.42.900",
        port: 53,
        text: `בני, אתה משחק עכשיו? תסתכל איזו חרב מגניבה יצרתי:`,
        link: 'screenshot.png [12mb]',
        imgLink: './Monitor/pop_ups/vineCraft.png'
    },
    'chapter_12' : {
        customerName: 'סבתא',
        protocol: 'DHCP',
        sourceAddress: '192.168.0.105',
        destinationAddress: '255.255.255.255',
        port: 67,
        text: `עוגיות טריות מהתנור בדרך לכל הנכדים!`,
        commandWaitingText: `מחכה לפקודה...`,
        link: 'Cookies.png',
        imgLink: './Monitor/pop_ups/cookie.gif'
    },
    'chapter_13' : {
        customerName: 'שמעון',
        protocol: 'SNMP',
        sourceAddress: '10.0.0.1',
        destinationAddress: '192.168.0.23',
        port: 161,
        commandWaitingText: ``,
        text: `<span style='color:var(--grey-3);direction:rtl;text-align:right;display:block'>שם ההתקן: Switch-23<br>סטטוס: פעיל (UP)<br>ממשקים: 12 פעילים, 0 לא פעילים עומס מעבד 15%: <br> תעבורת רשת: 220MB נשלח, 180MB התקבל <br> גרסת קונפיגורציה: עדכנית, אין שינויים בהמתנה</span>`
    },
    'chapter_14' : {
        customerName: 'מל',
        protocol: 'TELNET',
        protocolFontSize: 'var(--font-title-large)',
        sourceAddress: '192.168.1.5',
        destinationAddress: '172.20.45.9',
        port: 13,
        text: `אתמול פגשתי משהוא ממש נחמד, קוראים  לו לירון. הוא אהב את קבוצת הרוק שאני מקשיבה עליה, ועזר להחזיר לי את התיק שלי...הנא תמונה שלקחתי. `,
        link: 'אני ולירון.png',
        imgLink: '/Monitor/pop_ups/melAndLiron.png',
        header: "------",
    },
    "chapter_15" : {
        text: `שלום שמעון, מקווה שהכול בסדר. רציתי לשתף כמה רעיונות לטעמי קפה שיכולים להתאים למכונת הקפה שלנו, למקרה שאנחנו מתכננים להזמין מלאי חדש או לנסות משהו שונה.<br><br>אשמח לבדוק גם מחירים או מותגים אם תרצה.`,
        customerName: "מאיה",
        protocol: "FTP",
        sourceAddress: "198.51.100.10",
        destinationAddress: "203.0.113.25",
        port: 110,
        link: "Coffee.gif [30 mgb]",
        imgLink: "/Monitor/pop_ups/coffee.gif"
    },
    "chapter_16" : {
        text: `רק רציתי להגיד תודה לסבתא ליביה על העוגיות! אני לא יודע מה היא שמה בפנים, אבל אני נשבע שאכלתי חמש בלי לשים לב. אם היא שואלת – תגידו שהן היו “טעימות בצורה סבירה”... אני לא רוצה שהיא תחשוב שהתלהבתי או משהו.`,
        customerName: 'ליאור',
        protocol: 'DHCP',
        sourceAddress: `10.0.0.1`,
        destinationAddress: `172.20.45.9`,
        port: 67,
        link: 'cookie selfie.png',
        imgLink: './Monitor/pop_ups/cookieSelfie.png'
    },
    "chapter_17" : {
        text: `שלום יקירים,<br> אפיתי עוגיות חדשות עם אגוזים ורציתי לשלוח אותן לכולם בשכונה הרחוקה. מקווה שהן יגיעו בשלום, ושתגידו לי איך יצא!<br> תיהנו, סבתא ליביה.`,
        customerName: 'סבתא ליביה',
        protocol: 'DHCP',
        sourceAddress: `198.51.100.10`,
        destinationAddress: `203.0.113.25`,
        port : 110,
        link: 'Nut Cookies.png',
        imgLink: './Monitor/pop_ups/nutCookies.png'
    },
    "chapter_18" : {
        text: `מאיה,שמעתי שאת מתקדמת יפה עם הפרוטוקולים. תמשיכי ללמוד ולשאול שאלות – זה מה שהופך טכנאי לטוב באמת. תודה על העבודה שאת עושה. <br><br> ואני אשמח להקשיב לרעיונות שלך מול הקפה הזה זמצאת.`,
        customerName: "שמעון",
        protocol: "DHCP",
        sourceAddress: "192.168.20.10",
        destinationAddress: "192.168.50.10",
        port: 67,
        link: null
    },
    "chapter_19" : {
        text: `שלום שחקן, רציתי לומר לך שהעבודה שלך עד עכשיו מרשימה מאוד.<br><br>בגלל שזאתי ההודעה האחרונה להיום יש לי משהוא מיוחד בשבילך:`,
        customerName: "דניאל",
        protocol: "HTTP",
        sourceAddress: "192.168.20.10",
        destinationAddress: "192.168.50.10",
        port: 67,
        header: "------",
        link: 'gift.svg [32 mgb]',
        imgLink: './Monitor/pop_ups/hat.png'
    }
}

export default monitorData