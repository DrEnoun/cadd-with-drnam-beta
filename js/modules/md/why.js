// Step 1 — Why simulate? A docked pose is one frozen picture; MD asks whether it survives when everything moves.
import { h, feedback } from '../../ui.js';
import { complexScene } from './scenes.js';
import { linePlot } from './plot.js';

export function render(host, api) {
  const D = api.data, T = D.teaching, R = D.runs;
  host.append(
    h('div', { class: 'why' }, h('strong', {}, 'Why do we do this? '), 'Docking gives us one suggested picture of a molecule in a protein pocket. But molecules do not stay still. Their atoms move. Molecular dynamics (MD) uses a computer to follow this movement over time. The record of where the atoms move is called a trajectory. We can study the trajectory to see how the molecule and protein behave in the simulation.'),
    D.fromCase ? h('div', { class: 'card sticker-static' }, h('strong', {}, 'Your project: '), `in docking you chose Compound ${D.choice}. Run 2 below is that compound. Run 1 is celecoxib, the known drug, as the control.`) : '',
    h('p', { class: 'lead' }, 'Below, you can see celecoxib in the COX-2 protein pocket. The protein structure is called 3LN1. Choose a run and move the time slider. Watch how the molecule moves in this teaching example. Compare movement that stays near the starting position with movement that goes farther away.'));
  const v = complexScene(host, D.structure, { height: 440 });
  let key = Object.keys(R)[0], frame = 0, timer = 0;
  const cv = h('canvas', { style: 'width:100%;max-width:640px;border-radius:12px;background:#fff', role: 'img', 'aria-label': 'Distance of the drug from the pocket against time' }), read = h('div', { class: 'num', style: 'font-weight:700' });
  const sl = h('input', { type: 'range', min: 0, max: D.time.length - 1, value: 0, 'aria-label': 'Simulation time', style: 'width:100%;max-width:640px', oninput: () => { frame = +sl.value; upd(); } });
  const bar = h('div', { class: 'row' }, Object.keys(R).map(k => h('button', { type: 'button', class: 'sticker', 'aria-pressed': String(k === key), 'data-k': k, onclick: () => { key = k; bar.querySelectorAll('button[data-k]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.k === k))); upd(); api.log('run', k); } }, R[k].name)));
  const play = h('button', { class: 'btn-start btn-start--small', type: 'button', onclick: () => { if (timer) { clearInterval(timer); timer = 0; play.textContent = '▶ Play'; } else { play.textContent = '❚❚ Pause'; timer = setInterval(() => { frame = (frame + 6) % D.time.length; sl.value = frame; upd(); }, 40); } } }, '▶ Play');
  const upd = () => { const r = R[key], d = r.dist[frame]; v?.setDisplacement(d, .35); read.textContent = `${R[key].name}. Time ${D.time[frame].toFixed(1)} ns. Distance of the drug from its starting place in the pocket: ${d.toFixed(1)} Å.`; linePlot(cv, [{ x: D.time, y: r.dist, label: 'Distance (Å)' }], { xlabel: 'Time (ns)', ylabel: 'Distance (Å)', ymin: 0, ymax: 16, vlines: [{ x: D.time[frame], color: '#e8590c' }] }); };
  host.append(bar, h('div', { class: 'row', style: 'margin-top:8px' }, play), sl, read, cv, h('p', { class: 'hint' }, 'Practice data: these curves were made for teaching. They are not results from a full MD study. In a real MD trajectory, the positions of all simulated atoms are recorded over time.'));
  upd();
  host.append(h('h3', { style: 'margin-top:18px' }, 'Which question needs MD?'));
  const picks = {}, list = h('div', { class: 'stack' });
  T.why.scenarios.forEach(s => list.append(h('div', { class: 'card sticker-static', 'data-s': s.id }, h('p', {}, s.text),
    h('select', { 'aria-label': s.text, onchange: e => { picks[s.id] = e.target.value; } }, h('option', { value: '' }, 'Choose an approach…'), T.why.approaches.map(a => h('option', { value: a.id }, a.text))), h('div', { class: 'fbslot' }))));
  const out = h('span', { class: 'muted' });
  const check = h('button', { class: 'btn-start btn-start--small', type: 'button', onclick: () => {
    let right = 0;
    T.why.scenarios.forEach(s => { const slot = list.querySelector(`[data-s="${s.id}"] .fbslot`); slot.innerHTML = ''; if (!picks[s.id]) { slot.append(feedback('bad', 'Choose an answer first.')); return; } const ok = picks[s.id] === s.answer; if (ok) right++; api.log(`match_${s.id}`, picks[s.id]); slot.append(feedback(ok ? 'ok' : 'bad', ok ? 'Correct' : 'Not quite', s.why)); });
    api.done({ matched: right, of: T.why.scenarios.length }); api.unlockNext(); out.textContent = `${right} of ${T.why.scenarios.length} matched.`;
  } }, 'Check my answers');
  host.append(list, h('div', { class: 'row' }, check, out), api.nav(true));
  return () => { if (timer) clearInterval(timer); v?.dispose(); };
}
