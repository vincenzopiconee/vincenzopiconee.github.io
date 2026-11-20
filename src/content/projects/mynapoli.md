---
title: "MyNapoli"
kicker: "Mobility · 3D MapKit & GTFS"
headline: "Naples transit, mapped in three dimensions."
subtitle: "Exploring buses, metro lines, and historic funiculars with real municipal open data."
cardStat: "120+ Lines · 2,400+ Stops"
order: 4
year: "2024–2025"
github: "https://github.com/vincenzopiconee/MyNapoli"
theme:
  bgLight: "#edf5ff"
  bgHoverLight: "#e1efff"
  bgDark: "#111b28"
  bgHoverDark: "#162436"
  borderLight: "rgba(0, 122, 255, 0.18)"
  borderHoverLight: "rgba(0, 122, 255, 0.42)"
  borderDark: "rgba(56, 152, 255, 0.2)"
  borderHoverDark: "rgba(56, 152, 255, 0.44)"
  spotLight: "rgba(0, 122, 255, 0.11)"
  spotDark: "rgba(56, 152, 255, 0.16)"
  bgImageMode: "none"
lineup:
  experience: "3D urban transit explorer"
  signatureTech: "GTFS Parser · 3D MapKit"
  dataLayer: "2,400+ local SwiftData stops"
frameworks: ["Swift", "SwiftUI", "MapKit", "CoreLocation", "Swift Concurrency", "GTFS", "SwiftData"]
storyChapters:
  - title: "Real Municipal Open Data, Parsed On-Device"
    lead: "Turning raw transit feeds into instant offline lookup."
    body: "Naples moves across buses, metro lines, and four iconic hilltop funiculars. On first launch, MyNapoli ingests real ANM static GTFS datasets covering over 120 routes and 2,428 georeferenced stops through a custom Swift parser and stores them with unique constraints in SwiftData, so browsing lines works instantly even underground in a metro station."
    detailTag: "Custom GTFS Parser · SwiftData"
  - title: "Seeing the City With Realistic Elevation"
    lead: "A hilly city makes more sense in 3D."
    body: "Flat transit maps hide how dramatically Naples climbs from the bay to Vomero. Built on SwiftUI's modern MapKit APIs, MyNapoli renders a realistic-elevation hybrid 3D map with compass controls, user location tracking, and floating stop detail cards that surface exact coordinates as you explore."
    detailTag: "3D Hybrid MapKit · CoreLocation"
  - title: "Fast Filtering & Asynchronous Place Search"
    lead: "Find a stop or neighborhood without breaking flow."
    body: "Natural-language destination search runs asynchronously over MKLocalSearch using Swift Concurrency, while segmented controls and live .searchable bars filter buses, subways, and funiculars smoothly across iOS 18's Tab architecture, complete with Light, Dark, and Tinted app icons."
    detailTag: "Swift Concurrency · iOS 18 Tab API"
---

Moving through Naples means connecting very different layers of transit: coastal buses, deep metro stations, and century-old funiculars climbing steep volcanic hills.

MyNapoli brings those pieces together into a calm, native iOS companion. By parsing official GTFS open data directly into local SwiftData storage and pairing it with realistic 3D MapKit views, the city's transit network feels immediate, visual, and effortless to explore.
