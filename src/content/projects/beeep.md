---
title: "Beeep"
kicker: "Party · Local Mesh & AirPlay"
headline: "No servers. No accounts. Just the room."
subtitle: "A local peer-to-peer party game built to spark funny connections between international students through the funniest words of every language and culture."
cardStat: "Bonjour Mesh · Dual-Screen"
order: 3
year: "2025"
github: "https://github.com/vincenzopiconee/Beeep"
theme:
  bgLight: "#f4fce7"
  bgHoverLight: "#eaf8d5"
  bgDark: "#171f11"
  bgHoverDark: "#1e2916"
  borderLight: "rgba(116, 179, 24, 0.22)"
  borderHoverLight: "rgba(116, 179, 24, 0.48)"
  borderDark: "rgba(163, 230, 54, 0.2)"
  borderHoverDark: "rgba(163, 230, 54, 0.44)"
  spotLight: "rgba(132, 204, 22, 0.14)"
  spotDark: "rgba(163, 230, 54, 0.15)"
  bgImageMode: "grid"
lineup:
  experience: "Local P2P dual-screen party game"
  signatureTech: "Multipeer · UIWindowScene"
  dataLayer: "Bonjour TCP/UDP mesh"
frameworks: ["Swift", "SwiftUI", "MultipeerConnectivity", "UIKit", "UIWindowScene", "Bonjour"]
storyChapters:
  - title: "Instant Lobbies Over Local Wi-Fi"
    lead: "Four digits connect everyone around the table with zero cloud servers."
    body: "Group games lose energy the moment someone has to register an account or connect to a remote server. Beeep skips cloud backends completely, advertising and discovering nearby iPhones over local Wi-Fi and Bluetooth through MultipeerConnectivity and custom Bonjour service identifiers. One person hosts, shares a 4-digit PIN, and the whole room is live in seconds."
    detailTag: "MultipeerConnectivity · Bonjour"
  - title: "One TV for the Crowd, Private Screens in Hand"
    lead: "Splitting public drama from secret votes."
    body: "When the host device connects to a TV or monitor via AirPlay, HDMI, or USB-C, a dedicated ScreenManager observes UIKit window scenes and mounts a completely separate presentation hierarchy on the external display. Prompts, hilarious foreign expressions, and live vote tallies play out on the big screen while confidential submissions stay safely on each player's iPhone."
    detailTag: "UIWindowScene · AirPlay / HDMI"
  - title: "Laughing Across Languages and Cultures"
    lead: "Four fast phases shaped by international student playtesting."
    body: "Each round invites players to contribute one of the funniest slang terms, idioms, or colorful expressions from their own language and culture, pair it with a definition, drop it into wild scenario prompts, and vote anonymously for the best response. Every transition runs on a state-bound NavigationStack with reusable SwiftUI components and String Catalogs in English, Italian, and Spanish."
    detailTag: "State-Driven SwiftUI · 3 Languages"
---

When international students meet for the first time, nothing breaks the ice faster than trading the funniest, weirdest, and most untranslatable expressions from each other's languages and cultures. Beeep was created around that exact moment: turning multicultural hangouts into spontaneous laughter while teaching everyone the most entertaining words from around the world.

Under the hood, Beeep uses serverless local peer-to-peer networking over local Wi-Fi and Bluetooth paired with native UIKit external display projection. With no accounts or cloud servers in the way, the app scales smoothly from a circle of iPhones around a table to a full living-room TV showdown the moment you connect AirPlay.
