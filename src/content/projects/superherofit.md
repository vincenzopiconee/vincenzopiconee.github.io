---
title: "SuperHeroFit"
kicker: "Health · HealthKit & 2D Compositing"
headline: "Turn daily movement into your own hero."
subtitle: "A local-first fitness companion pairing HealthKit goals with a 7-layer customizable avatar."
cardStat: "HealthKit · 7-Layer Avatar"
order: 5
year: "2024–2025"
github: "https://github.com/vincenzopiconee/SuperHeroFit"
theme:
  bgLight: "#fff1f5"
  bgHoverLight: "#ffe4ec"
  bgDark: "#241319"
  bgHoverDark: "#2e1820"
  borderLight: "rgba(232, 30, 88, 0.16)"
  borderHoverLight: "rgba(232, 30, 88, 0.4)"
  borderDark: "rgba(255, 77, 125, 0.2)"
  borderHoverDark: "rgba(255, 77, 125, 0.42)"
  spotLight: "rgba(236, 42, 95, 0.11)"
  spotDark: "rgba(255, 77, 125, 0.15)"
  bgImageMode: "none"
showcaseMeta:
  rewardsTitle: "Unlockable Hero Rewards"
  rewardsSubtitle: "Completing daily HealthKit step and distance goals earns in-app currency to unlock these eight superhero outfits and color variants in the wardrobe."
lineup:
  experience: "Gamified HealthKit tracker"
  signatureTech: "HealthKit · 7-Layer Renderer"
  dataLayer: "3 SwiftData @Model schemas"
frameworks: ["Swift", "SwiftUI", "HealthKit", "Combine", "SwiftData", "2D Compositing"]
storyChapters:
  - title: "Real Steps, Real Progress"
    lead: "Grounded directly in Apple Health."
    body: "SuperHeroFit wraps HealthKit permissions and cumulative statistical queries inside a dedicated HealthKitManager, pulling accurate daily walking and running steps and distance from midnight onward. Hitting your step or kilometer challenge builds streaks and rewards your in-app wallet automatically."
    detailTag: "HealthKit · HKStatisticsQuery"
  - title: "A Deterministic 7-Layer Avatar Engine"
    lead: "Every piece of gear sits in its exact visual plane."
    body: "Customizing your superhero shouldn't cause awkward clipping between capes, wings, and gloves. AvatarView renders cosmetics through a seven-tier Z-ordered compositing stack, separating background auras and lower capes behind the torso from upper shoulder drapes, head anatomy, masks, and foreground gloves."
    detailTag: "7-Layer 2D Compositing"
  - title: "A Self-Contained Local-First Loop"
    lead: "Instant feedback, zero external servers required."
    body: "User profiles, active challenges, shop items, and transactional wallet checks all live natively in SwiftData across three relational schemas. On first launch, the starter wardrobe seeds automatically, and every purchase or outfit change reflects across the dashboard in real time."
    detailTag: "SwiftData · Combine"
---

Most fitness apps speak exclusively in charts and ring percentages. That data is useful, yet easy to ignore on a tired evening. SuperHeroFit started with a lighter premise: give everyday walks a tangible reward you can actually see evolve.

By linking Apple Health activity straight to personal challenges and a modular 2D superhero wardrobe, every kilometer walked unlocks a new cape, aura, or mask, stored privately and locally on your iPhone.
