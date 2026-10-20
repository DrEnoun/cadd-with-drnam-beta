# CADD with Dr NAM — Beta Academy

Experimental sister platform for [CADD with Dr NAM](https://drenoun.github.io/cadd-with-drnam/).

## Goals
- Preserve the original COX-2 educational website.
- Introduce a reusable case-based learning framework.
- Pilot Case 002: EGFR ADMET + Machine Learning.
- Keep real, mock, and simulated data clearly distinguished.

## Status
**Bootstrap only.** The original website assets and code have not yet been replicated into this repository. This repository is not yet a working website.

## Proposed case schema
Each case has an identifier, title, scientific target, ordered modules, dataset locations, and evidence labels. See `cases/egfr-002/manifest.json`.

## Scientific safeguards
Machine-learning models require appropriate training labels, leakage-aware splitting, applicability-domain assessment, external validation when feasible, and explicit uncertainty. Docking scores do not establish binding affinity or experimental efficacy.

## Deployment
Once the original site's files have been migrated and tested, configure GitHub Pages to deploy from the main branch root. Do not enable a public beta until it functions correctly.
