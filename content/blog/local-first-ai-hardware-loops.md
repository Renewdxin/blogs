---
title: "Local-first AI hardware loops, latency budgets, and fallback states"
description: >-
  Notes on designing on-device AI products around a latency budget — and the
  fallback states that decide whether they feel reliable.
date: 2026-04-09T18:03:28Z
kind: research
tags: ["local-first", "hardware", "latency"]
draft: false
---

When AI runs on a device in someone's hand, the constraint that dominates
everything is **time**. Not model quality, not feature count — the felt latency
of the loop between intent and response. This is a running set of research notes
on designing for that.

## Start from a latency budget

Pick the number the experience must hit, then spend it deliberately:

1. **Capture** — sensor / input acquisition.
2. **Local inference** — the fast path that should cover the common case.
3. **Escalation** — a cloud round trip, only when the local path isn't enough.
4. **Render** — the response the person actually perceives.

If the budget can't be met locally, that's a design signal, not a bug to paper
over.

## Fallback states are the product

A local-first system is really defined by how it behaves when something isn't
available: model cold, network gone, confidence low. Good fallback states are
**explicit, fast, and honest** — a confident degraded answer beats a perfect one
that never arrives.

## Open questions

- How to budget memory surfaces without starving the fast path.
- Where to draw the local/cloud routing line as on-device models improve.
- Measuring "felt" latency rather than wall-clock latency.
