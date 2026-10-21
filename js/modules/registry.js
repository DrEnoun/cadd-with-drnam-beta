// The modules. Modules 1-5 are one connected project (see data/case.json); the standalone ones can be done any time.
export const modules = [
  { id: 'screening', art: 'screening', n: 1, title: 'Virtual Screening', blurb: 'Learn how scientists choose molecules for further testing.', status: 'ready', load: () => import('./screening/index.js') },
  { id: 'docking', art: 'docking', n: 2, title: 'Molecular Docking', blurb: 'See how a small molecule may fit into a protein and learn how to check the results.', status: 'ready', load: () => import('./docking/index.js') },
  { id: 'adme', art: 'adme', n: 3, title: 'ADME Prediction', blurb: 'Learn what may happen to a compound inside the body.', status: 'ready', load: () => import('./adme/index.js') },
  { id: 'network', art: 'network', n: 4, title: 'Network Pharmacology', blurb: 'Explore how a compound may affect more than one protein.', status: 'ready', load: () => import('./network/index.js') },
  { id: 'md', art: 'md', n: 5, title: 'Molecular Dynamics', blurb: 'Follow how atoms move in a simulation and learn to read MD graphs.', status: 'ready', load: () => import('./md/index.js') },
  { id: 'homology', art: 'homology', n: null, standalone: true, title: 'Homology Modelling', blurb: 'No structure? Build a model from a related protein and check its quality. Stand-alone: it teaches the method on another protein.', status: 'ready', load: () => import('./homology/index.js') },
];
export const byId = id => modules.find(m => m.id === id);
