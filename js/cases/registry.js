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
    status: 'planned',
    summary: 'Explore descriptors, ADMET, validated ML workflows, similarity search, docking interpretation and evidence-based ranking.',
    href: null,
    manifest: 'cases/egfr-002/manifest.json',
    modules: ['descriptors', 'admet', 'ml', 'similarity', 'docking', 'decision'],
    evidence: 'No validated EGFR dataset or model is bundled yet.'
  }
]);
export const caseById = id => cases.find(item => item.id === id) ?? null;
