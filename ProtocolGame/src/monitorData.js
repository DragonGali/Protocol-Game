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
        sourceAddress: "192.168.3.5",
        destinationAddress: "172.20.45.9",
        port: 80,
        link: "cookies.gif",
        imgLink: "./Monitor/pop_ups/cookies.gif"
    }
}

export default monitorData