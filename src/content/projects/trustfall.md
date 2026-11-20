---
title: "Trustfall"
kicker: "Cooperative · Audio & P2P"
headline: "Three senses. One shared clock."
subtitle: "An asymmetric multiplayer iOS game where communication is the only way through."
cardStat: "3 Roles · 10:00 Lockstep"
order: 1
year: "2025"
github: "https://github.com/vincenzopiconee/Trustfall"
theme:
  bgLight: "#f4f4f6"
  bgHoverLight: "#ececf0"
  bgDark: "#171719"
  bgHoverDark: "#1e1e22"
  borderLight: "rgba(29, 29, 31, 0.11)"
  borderHoverLight: "rgba(29, 29, 31, 0.28)"
  borderDark: "rgba(255, 255, 255, 0.13)"
  borderHoverDark: "rgba(255, 255, 255, 0.28)"
  spotLight: "rgba(29, 29, 31, 0.065)"
  spotDark: "rgba(255, 255, 255, 0.09)"
  bgImageMode: "none"
showcaseMeta:
  artworksTitle: "Opening Cutscene Storyboard"
  artworksSubtitle: "Hand-drawn monochrome comic frames that play in lockstep across all three iPhones before the countdown starts."
  charactersTitle: "Meet the Characters"
  charactersSubtitle: "Six illustrated campers players can choose from in the lobby before stepping into the asymmetric mission."
lineup:
  experience: "3-player asymmetric co-op"
  signatureTech: "GameKit P2P · Agora VoIP"
  dataLayer: "Lockstep Codable packets"
frameworks: ["Swift", "SwiftUI", "GameKit", "AVFoundation", "Agora RTC", "SPM"]
storyChapters:
  - title: "The Sensory Triad"
    lead: "Every player sees only a third of the truth."
    body: "Trustfall splits a mission across three linked characters: LUMO hears cryptic acoustic frequencies and sees live sound waveforms, VIBE holds the decoding manual without audio reception, and ECHO operates the physical terminal levers without being able to speak. Winning isn't about fast reflexes. It's about translating what you perceive into something your teammates can act on before three mistakes or ten minutes end the run."
    detailTag: "LUMO · VIBE · ECHO"
  - title: "Lockstep Without a Dedicated Server"
    lead: "Keeping cutscenes, timers, and inputs synchronized peer-to-peer."
    body: "Instead of relying on cloud game servers, matchmaking and gameplay run directly over Apple GameKit. Strongly typed Codable packets carry every state change across connected devices, while readiness barriers keep all three screens locked together during typewriter cutscenes and restarts. A single host broadcasts versioned timer ticks so no player drifts out of sync."
    detailTag: "GameKit · GKMatch"
  - title: "Silence Enforced in Hardware"
    lead: "Voice rules aren't just UI hints; they live in the audio pipeline."
    body: "Powered by the Agora RTC SDK and AVFoundation, push-to-talk channels enforce each character's restriction right at the audio routing layer. When ECHO plays, outgoing microphone capture is cut at the engine level while reception stays alive. Meanwhile, ambient background tracks automatically duck whenever a teammate keys the walkie-talkie, and uncompressed puzzle waveforms drive real-time amplitude meters."
    detailTag: "Agora RTC · AVFoundation"
  - title: "Brutalist Clarity Under Pressure"
    lead: "Designed to be readable when the countdown turns red."
    body: "Under a ticking ten-minute timer, decorative UI gets in the way. Trustfall pairs heavy industrial typography with stark monochrome surfaces and primary-color interactive zones that scale cleanly across iPhone and iPad, backed by Xcode String Catalog localization and a declared Apple Privacy Manifest."
    detailTag: "Adaptive SwiftUI · Privacy Manifest"
---

Most multiplayer games hand every player the same screen and ask them to compete. Trustfall started from the opposite question: what happens when three friends sit in the same mission, yet none of them has enough information, or enough senses, to solve it alone?

Designed around information asymmetry and verbal trust, the experience strips away private shortcuts. One teammate listens to alien oscillations, another deciphers symbol tables in silence, and the third pulls the levers without a voice. Every layer of the iOS stack, from GameKit synchronization barriers to real-time audio ducking and adaptive layouts, exists to make that fragile coordination feel immediate and tense.
