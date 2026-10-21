# CADD with Dr NAM — Plain English Writing Guide

This guide applies to **every case and every module**, including the original COX-2 teaching content copied into the beta. The original production repository is not edited.

## Audience
Students who are new to chemistry and computer-aided drug discovery. Many use English as a second language. Assume no prior knowledge of technical words.

## Writing rules
1. Start from familiar ideas: atom → molecule → compound → protein → medicine → target → method.
2. Use short, direct sentences. Prefer one idea per sentence.
3. Use common words first, then introduce the scientific term: “how oily a molecule is (cLogP)”.
4. Explain each new term at first use, with one simple example.
5. Use **Why? → What? → How? → Try it → What did we learn?** for every activity.
6. Use active, friendly instructions: “Choose two compounds.” “Look at the numbers.” “Explain why.”
7. Keep questions short and provide clear feedback that explains the answer.
8. Do not simplify away important scientific distinctions: a computer prediction is not a laboratory result; a filter is not proof of drug activity or safety.
9. Label teaching examples as **PRACTICE DATA** or **SIMULATED**. Clearly distinguish real structures, published measurements, calculated properties, mock scores and predictions.
10. Prefer “may”, “might” and “suggests” when discussing uncertain results.
11. Keep the same meaning, assessment objectives, and data provenance when rewriting existing modules.
12. Avoid dense paragraphs, unexplained abbreviations, idioms, and advanced academic words when simple alternatives exist.

## Shared introductory pathway
- What is an atom?
- What is a molecule?
- What is a compound?
- How do medicines interact with proteins?
- What is a drug target?
- Why do scientists use computers to choose molecules?
- Virtual screening → docking → ADMET → network pharmacology → molecular dynamics.
- Homology modelling and machine learning are optional extensions when appropriate.

## Content review checklist
- Can a new student understand the first screen?
- Is each scientific term explained before it is used?
- Does each activity teach a single clear decision?
- Are the data labels truthful and visible?
- Does feedback explain *why*, not only “correct” or “wrong”?
- Does the module avoid claiming that screening, docking or simulation proves efficacy?
- Is the text easy to read on a phone?

## Development workflow
Revise copied COX-2 material in the beta feature branch, section by section. Keep the original public site untouched. Preview each module before merging.
