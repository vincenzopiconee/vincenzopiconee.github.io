---
title: "Biteary"
kicker: "Travel · Quick Look & Markup"
headline: "Every dish you traveled for, kept sharp."
subtitle: "A native iOS culinary journal with Quick Look PDF guides and in-place photo Markup."
cardStat: "A4 PDFKit · Live Markup"
order: 2
year: "2025–2026"
github: "https://github.com/vincenzopiconee/Biteary"
theme:
  bgLight: "#fff6ec"
  bgHoverLight: "#ffeedc"
  bgDark: "#211811"
  bgHoverDark: "#2a1f16"
  borderLight: "rgba(240, 134, 42, 0.18)"
  borderHoverLight: "rgba(240, 134, 42, 0.42)"
  borderDark: "rgba(255, 168, 88, 0.2)"
  borderHoverDark: "rgba(255, 168, 88, 0.42)"
  spotLight: "rgba(249, 134, 38, 0.12)"
  spotDark: "rgba(255, 168, 88, 0.15)"
  bgImageMode: "doodle"
lineup:
  experience: "Culinary journal & PDF export"
  signatureTech: "QuickLook · PDFKit · ImageIO"
  dataLayer: "SwiftData + Markup write-back"
frameworks: ["Swift", "SwiftUI", "QuickLook", "PDFKit", "ImageIO", "Swift Testing", "UIKit", "SwiftData", "CryptoKit"]
storyChapters:
  - title: "Out of the Camera Roll, Into Trip Folders"
    lead: "Memories deserve more context than a timestamp."
    body: "Travel food photos usually get lost between boarding passes and street snapshots. Biteary gathers every dish into color-themed trip folders with date ranges, automatic cover previews, restaurant details, locale-aware prices, star ratings, and tasting notes, all searchable in real time through diacritic-insensitive SwiftData predicates."
    detailTag: "SwiftData · #Predicate"
  - title: "From Local Journal to Printable Trip Guide"
    lead: "One tap turns a trip folder into a paginated A4 PDF."
    body: "When a trip ends, friends always ask where you ate. Biteary renders any folder into a clean, multi-page A4 Culinary Guide styled with the folder's color theme, complete with trip spend totals, average ratings, photos, and notes. It then opens directly in Apple's native Quick Look sheet for zooming, AirDrop, printing, or saving to Files."
    detailTag: "ImageRenderer · PDFKit · .quickLookPreview"
  - title: "In-Place Photo Markup That Persists"
    lead: "Circle a favorite dish or jot a note right over the photo."
    body: "By bridging QLPreviewController into SwiftUI with update-contents editing enabled, tapping any dish photo opens iOS's native Markup toolbar. Sketches, highlights, and callouts are captured on save and written straight back into SwiftData, with no duplicate exports or broken workflow."
    detailTag: "QLPreviewController · UIKit Bridge"
  - title: "Fast Grids, Accessibility & Verified Output"
    lead: "Built to stay smooth as photo libraries grow."
    body: "Full-resolution camera JPEGs can stall scrolling grids if decoded naively. Biteary downsamples thumbnails to exact display pixel dimensions through ImageIO backed by a SHA-256 keyed NSCache. Custom VoiceOver adjustable actions make 5-star ratings effortless to swipe, Light/Dark/Tinted icons adapt to iOS 18, and a Swift Testing suite verifies PDF generation and downsampling bounds automatically."
    detailTag: "ImageIO · VoiceOver · Swift Testing"
---

The best part of visiting a new city is rarely a checklist landmark. It's a tucked-away trattoria or a pastry shop you stumbled into on a rainy afternoon. Yet months later, the photo is buried in your library and the name of the place is gone.

Biteary was crafted to feel like an effortless native iOS notebook for those moments. Everything stays local-first on your device in SwiftData, while modern Apple frameworks turn simple entries into something you can annotate directly with iOS Markup and share as a crisp A4 Quick Look guide.
