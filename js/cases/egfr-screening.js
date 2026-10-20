import { h } from '../ui.js';

// All numbers are fictional classroom examples, not EGFR assay results.
const compounds = [
  { id:'A', mw:310, logp:2.4, tpsa:74, evidence:'No target assay', label:'Balanced properties' },
  { id:'B', mw:565, logp:6.1, tpsa:42, evidence:'No target assay', label:'High lipophilicity and mass' },
  { id:'C', mw:390, logp:3.2, tpsa:96, evidence:'No target assay', label:'Plausible follow-up candidate' },
  { id:'D', mw:275, logp:1.1, tpsa:145, evidence:'No target assay', label:'High polar surface area' }
];
const questions = [
  { q:'What is the main purpose of early virtual screening?', options:['Prove clinical efficacy','Prioritise compounds for further testing','Confirm binding experimentally'], correct:1, why:'Virtual screening prioritises hypotheses; it does not experimentally establish activity.' },
  { q:'A compound passes a descriptor filter. What can you conclude?', options:['It is an EGFR inhibitor','It is safe in humans','It meets the chosen preliminary property criteria'], correct:2, why:'Property filters are heuristics, not evidence of target engagement, safety or efficacy.' }
];
export function renderEgfrScreening(app) {
  document.title = 'EGFR Virtual Screening | CADD with Dr. NAM Beta';
  let selected = new Set(), answered = new Map();
  const criteria = { mw:500, logp:5, tpsa:140 };
  const intro = h('section',{class:'glass stack'},
    h('p',{class:'eyebrow'},'EGFR · Case 002 · Module 1'),
    h('h1',{},'Virtual Screening: Build your shortlist'),
    h('p',{class:'lead'},'Act as a drug discovery team. Apply transparent preliminary filters, compare four hypothetical candidates, and explain which molecules deserve follow-up.'),
    h('p',{},h('strong',{},'SIMULATED TEACHING DATA — '),'Candidate identifiers and molecular descriptors are fictional. No EGFR activity, binding affinity, ADMET performance or clinical efficacy has been measured or predicted here.'),
    h('p',{class:'muted'},'Learning objective: distinguish early property-based triage from target-based screening and experimental validation.'));
  const results = h('div',{role:'status','aria-live':'polite',style:'margin-top:12px'});
  const count = h('strong',{});
  const rows = compounds.map(c => {
    const pass = c.mw<=criteria.mw && c.logp<=criteria.logp && c.tpsa<=criteria.tpsa;
    const checkbox = h('input',{type:'checkbox','aria-label':'Shortlist candidate '+c.id,onchange:e=>{if(e.target.checked)selected.add(c.id);else selected.delete(c.id);update();}});
    return h('tr',{},h('td',{},checkbox),h('td',{},'Candidate '+c.id),h('td',{},String(c.mw)),h('td',{},String(c.logp)),h('td',{},String(c.tpsa)),h('td',{},pass?'Pass':'Flag'));
  });
  const explanation=h('textarea',{rows:'3',placeholder:'Explain your shortlist using the descriptor values, and name at least one limitation.','aria-label':'Your scientific justification',style:'width:100%;max-width:100%;padding:12px'});
  const review=h('div',{role:'status','aria-live':'polite'});
  function update(){
    count.textContent='Selected: '+selected.size+' of '+compounds.length;
    results.textContent='';
    if(!selected.size){results.textContent='Select one or more candidates to inspect your shortlist.';return;}
    const flags=[...selected].filter(id=>{const c=compounds.find(x=>x.id===id);return c.mw>500||c.logp>5||c.tpsa>140;});
    results.append(h('p',{},flags.length?'Your shortlist includes flagged candidates: '+flags.join(', ')+'. Explain why you would retain them.':'Your shortlist meets these three example thresholds. This is not evidence of EGFR inhibition.'));
  }
  const table=h('div',{class:'tblwrap'},h('table',{class:'tbl'},h('thead',{},h('tr',{},['Select','Candidate','MW (g/mol)','cLogP','TPSA (Å²)','Rule'].map(t=>h('th',{},t)))),h('tbody',{},...rows)));
  const exercise=h('section',{class:'glass stack',style:'margin-top:20px'},
    h('h2',{},'Step 1 · Apply preliminary property filters'),
    h('p',{},'Illustrative classroom thresholds: molecular weight ≤ 500 g/mol, cLogP ≤ 5, TPSA ≤ 140 Å². These are simplified heuristics, not universal drug-likeness or EGFR rules.'),
    table,count,results,
    h('h2',{},'Step 2 · Defend your decision'),
    h('p',{},'Which candidates should progress to target-specific screening? What additional evidence would you need?'),
    explanation,
    h('button',{class:'btn-start btn-start--small',type:'button',onclick:()=>{
      const words=explanation.value.trim().split(/\s+/).filter(Boolean);
      review.textContent=(!selected.size||words.length<12)?'Select at least one candidate and write a justification of at least 12 words.':'Reflection recorded in this page for review. Compare your choice with the descriptor flags, then seek validated EGFR bioactivity data, appropriate controls and target-specific evidence.';
    }},'Check my justification'),review);
  const quiz=h('section',{class:'glass stack',style:'margin-top:20px'},h('h2',{},'Step 3 · Knowledge check'));
  questions.forEach((q,i)=>{
    const result=h('p',{role:'status','aria-live':'polite'});
    const field=h('fieldset',{},h('legend',{},(i+1)+'. '+q.q),...q.options.map((o,j)=>h('label',{style:'display:block;margin:8px 0'},h('input',{type:'radio',name:'egfr-q'+i,value:String(j),onchange:()=>{answered.set(i,j);result.textContent=(j===q.correct?'Correct. ':'Not quite. ')+q.why;}}),' '+o)));
    quiz.append(field,result);
  });
  quiz.append(h('p',{class:'muted'},'Practice feedback only. This activity does not contribute to the existing COX-2 assessment record.'),h('a',{href:'#/cases',class:'go'},'← Back to Case Library'));
  app.append(intro,exercise,quiz);
  update();
}
