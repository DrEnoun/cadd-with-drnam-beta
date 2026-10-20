import { cases } from './registry.js';
import { h } from '../ui.js';

export function renderCaseLibrary(app) {
  document.title = 'Case Library | CADD with Dr. NAM Beta';
  const intro = h('section', { class: 'glass stack' },
    h('p', { class: 'eyebrow' }, 'Beta Academy · Case Library'),
    h('h1', {}, 'Choose your drug discovery case'),
    h('p', { class: 'lead' }, 'Explore scientific decisions through connected, case-based activities. Each case uses the same learning framework with different evidence and questions.'),
    h('p', { class: 'muted' }, 'Learning simulations are labelled. Model predictions, docking scores and descriptors alone do not establish drug efficacy.'));
  const cards = h('div', { class: 'mods', style: 'margin-top:20px' },
    ...cases.map(item => h('article', { class: 'mod sticker-static', style: 'padding:20px' },
      h('div', { class: 'mod__body' },
        h('span', { class: 'mod__n' }, item.level + ' · ' + (item.status === 'ready' ? 'Available' : 'Coming soon')),
        h('h3', {}, item.title),
        h('p', {}, item.summary),
        h('p', { class: 'muted', style: 'font-size:14px' }, item.evidence),
        item.status === 'ready'
          ? h('a', { class: 'go', href: item.href }, 'Start learning →')
          : h('span', { class: 'go', 'aria-disabled': 'true' }, 'In development')))));
  app.append(intro, cards, h('p', { style: 'margin-top:24px' }, h('a', { href: '#/' }, '← Return to modules')));
}
