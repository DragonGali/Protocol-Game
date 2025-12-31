export const terminalData = {
    chapter_7_1 : {
        line_1 : "+OK 2 messages on the server:",
        line_2 : "1 1200 bytes",
        line_3 : "2 2500 bytes"
    },
    chapter_8_1 : {
        line_1: `System Status: All systems operational.`,
        line_2: `Uptime: 3 days, 4 hours, 12 minutes.`,
        line_3: `CPU Load: 15%`,
        line_4: `Memory Usage: 48%`,
        line_5: `<span style="color:var(--red)">⚠ Port 13: Connection timeout - unable to reach destination</span>`
    },
    chapter_10_1 : {
        line_1: `Connecting to 10.0.0.1...`,
        line_2: `Connection established.`,
        line_3: `Authenticating user 'mel'...`,
        line_4: `Authentication successful`,
        line_5: `Secure session active.`,
        line_6: `Decrypting letter...`
    },
    chapter_12_1 : {
        line_1: `[DHCP Discover] ‏משדר לרשת: 255.255.255.255`,
        line_2: `[DHCP Offer] ‏השרת 192.168.0.1 מציע כתובת IP: 192.168.0.105`,
        line_3: `[DHCP Request] ‏מבקש את הכתובת 192.168.0.105 מהשרת 192.168.0.1`,
        line_4: `[DHCP ACK] ‏השרת אישר. כתובת ה-IP הוקצתה: 192.168.0.105`,
        line_5: `<span style='color:var(--red)'>⚠ הערה: יש להריץ בדיקת רשת כדי לאשר ACK.‏</span>`
    },
    chapter_13_1 : {
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
    },
    chapter_15_1 : {
        line_1: `traceroute to 192.168.30.10 (192.168.30.10), 30 hops max, 60 byte packets`,
        line_2: ` 1  192.168.0.1        1.012 ms   0.932 ms   0.889 ms`,
        line_3: ` 2  192.168.1.1        2.245 ms   2.013 ms   2.091 ms`,
        line_4: ` 3  10.0.5.1           3.723 ms   3.651 ms   3.691 ms`,
        line_5: ` 4  *                 *          *         `,
        line_6: ` 5  10.0.8.1           7.564 ms   7.423 ms   7.610 ms`,
        line_7: ` 6  10.0.12.4          8.891 ms   8.779 ms   8.935 ms`,
        line_8: ` 7  192.168.30.10      9.221 ms   9.187 ms   9.140 ms`
    },
    chapter_16_1 : {
        line_1: `Router(config-if)# ip helper-address 10.0.0.5`,
        line_2: `Router(config-if)# end`,
        line_3: `Router# write memory`,
        line_4: `Building configuration...`,
        line_5: `[OK]`,
        line_6: ``,
        line_7: `<span style='color:var(--red)'>*Mar 01 10:42:17.184: DHCPD: Relay forwarding DHCPDISCOVER from 0.0.0.0 (Gi0/1) to 10.0.0.5</span>`,
        line_8: `<span style='color:var(--red)'>*Mar 01 10:42:20.192: DHCPD: No DHCPOFFER received from 10.0.0.5</span>`,
        line_9: `<span style='color:var(--red)'>*Mar 01 10:42:20.193: DHCPD: Relay timeout on interface GigabitEthernet0/1</span>`,
        line_10: `<span style='color:var(--red)'>*Mar 01 10:42:20.193: DHCPD: Error <span style='color:var(--white)'>103</span></span>`
    },
    chapter_17_1 : {
        line_1: `Router(config-if)# ip directed-broadcast`,
        line_2: `% IP directed broadcast enabled on interface GigabitEthernet0/1`,
    }
}

export default terminalData;