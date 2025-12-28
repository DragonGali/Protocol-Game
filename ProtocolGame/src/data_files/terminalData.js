export const terminalData = {
    chapter_7 : {
        line_1 : "+OK 2 messages on the server:",
        line_2 : "1 1200 bytes",
        line_3 : "2 2500 bytes"
    },
    chapter_8 : {
        line_1: `System Status: All systems operational.`,
        line_2: `Uptime: 3 days, 4 hours, 12 minutes.`,
        line_3: `CPU Load: 15%`,
        line_4: `Memory Usage: 48%`,
        line_5: `<span style="color:var(--red)">⚠ Port 13: Connection timeout - unable to reach destination</span>`
    },
    chapter_10 : {
        line_1: `Connecting to 10.0.0.1...`,
        line_2: `Connection established.`,
        line_3: `Authenticating user 'mel'...`,
        line_4: `Authentication successful`,
        line_5: `Secure session active.`,
        line_6: `Decrypting letter...`
    },
    chapter_12 : {
        line_1: `[DHCP Discover] ‏משדר לרשת: 255.255.255.255`,
        line_2: `[DHCP Offer] ‏השרת 192.168.0.1 מציע כתובת IP: 192.168.0.105`,
        line_3: `[DHCP Request] ‏מבקש את הכתובת 192.168.0.105 מהשרת 192.168.0.1`,
        line_4: `[DHCP ACK] ‏השרת אישר. כתובת ה-IP הוקצתה: 192.168.0.105`,
        line_5: `<span style='color:var(--red)'>⚠ הערה: יש להריץ בדיקת רשת כדי לאשר ACK.‏</span>`
    },
    chapter_13 : {
        line_1: `sysStatus.0 = up`,
    },
    chapter_14_1 : {
        line_1: `*Mar  1 00:01:04.123: %LINK-3-UPDOWN:`,
        line_2: `Interface GigabitEthernet1/0/1`,
        line_3: `changed state to up`,
        line_4: `*Mar  1 00:01:05.456: %LINEPROTO-5-`,
        line_5: `UPDOWN: Line protocol on Interface`,
        line_6: `GigabitEthernet1/0/1, changed state to down`
    },
    chapter_14_2 : {
        line_1: `[DEBUG] מעקב אחרי חבילות IP...`,
        line_2: `חבילה 1: תקינה`,
        line_3: `חבילה 2: תקינה`,
        line_4: `<span style='color:var(--red)'>חבילה 3: שגיאה — שדה HEADER חסר</span>`,
        line_5: `חבילה 4: תקינה`,
        line_6: `נדרש תיקון לפני המשך שליחה.`
        }
}

export default terminalData;