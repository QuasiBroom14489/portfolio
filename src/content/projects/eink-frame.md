---
title: E-ink note frame
role: Embedded gift build
tagline: Notes from a phone to paper
oneLiner: "An ESP32 e-paper frame that shows notes sent over Telegram in a pixel-art speech bubble, with a live web mirror."
tier: also
order: 7
status: Gift build
dates: Sep 2026
icon: eink
accent: "#e5e7eb"
hero: { value: "~1,470", label: "lines of handwritten firmware, including a panel driver the library didn't have" }
stats: []
problem: "A gift that needed to feel handmade but update itself: notes arrive from a phone and appear on paper-like e-ink."
built:
  - "**Firmware for an ESP32-S3 e-paper panel** with 11 bot commands, a schedule engine and dithered photos."
  - "**A hand-written UC8276C panel driver**, because the standard e-paper library had none."
  - "**A live web mirror** built on a custom PNG encoder, served from Vercel Functions."
how: []
stack: [C++, Arduino / PlatformIO, ESP32-S3, Python, Pillow, TypeScript, Vercel]
capabilities: [embedded]
proof: []
links: []
visibility: "Personal gift — the tech is shown, never the messages."
---
