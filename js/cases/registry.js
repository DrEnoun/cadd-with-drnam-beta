// Beta Case Library: metadata and navigation only. Scientific modules remain separate.
export const cases = Object.freeze([
  {
    id: 'cox2-001',
    title: 'COX-2: Foundational CADD',
    level: 'Beginner',
    status: 'ready',
    summary: 'Follow a connected virtual screening, docking, ADME, network pharmacology and molecular dynamics storyline.',
    href: '#/screening',
    modules: ['screening', 'docking', 'adme', 'network', 'md'],
    evidence: 'See each original module for real, mock and simulated data labels.'
  },
  {
    id: 'egfr-002',
    title: 'EGFR: ADMET and Machine Learning',
    level: 'Intermediate / advanced',
    status: 'preview',
    summary: 'Start with interactive virtual screening. ADMET, docking, molecular dynamics and machine learning will be developed in later stages.',
    href: '#/egfr-screening',
    manifest: 'cases/egfr-002/manifest.json',
    modules: ['screening', 'docking', 'admet', 'network', 'md', 'decision', 'ml'],
    evidence: 'Module 1 uses explicitly simulated classroom data; no validated EGFR assay dataset or model is bundled.'
  }
]);
export const caseById = id => cases.find(item => item.id === id) ?? null;
