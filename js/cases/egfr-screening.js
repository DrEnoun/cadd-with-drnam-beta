import { h } from '../ui.js';

// All numbers are fictional classroom examples, not EGFR assay results.
const compounds = [
  { id:'A', mw:310, logp:2.4, tpsa:74, evidence:'Not tested', label:'Balanced properties' },
  { id:'B', mw:565, logp:6.1, tpsa:42, evidence:'Not tested', label:'High lipophilicity and mass' },
  { id:'C', mw:390, logp:3.2, tpsa:96, evidence:'Not tested', label:'Plausible follow-up candidate' },
  { id:'D', mw:275, logp:1.1, tpsa:145, evidence:'Not tested', label:'High polar surface area' }
];
const questions = [
  { q:'Why do scientists use virtual screening?', options:['Show that a drug works in people','Choose compounds to study next','Prove that a compound binds to a protein'], correct:1, why:'Virtual screening helps us choose what to test next. It cannot prove that a compound works.' },
  { q:'A compound passes all three rules. What does this mean?', options:['It can block EGFR','It is safe for people','It meets the three rules we used'], correct:2, why:'Passing the rules is a useful first step. It does not tell us if the compound works or is safe.' }
];
export function renderEgfrScreening(app) {
  document.title = 'EGFR Virtual Screening | CADD with Dr. NAM Beta';
  let selected = new Set(), answered = new Map();
  const criteria = { mw:500, logp:5, tpsa:140 };
  const intro = h('section',{class:'glass stack'},
    h('p',{class:'eyebrow'},'EGFR · Case 002 · Module 1'),
    h('h1',{},'Virtual Screening: Choose Your Compounds'),
    h('p',{class:'lead'},'You are part of a team looking for possible new drugs. Look at four compounds. Choose which ones you want to study next.'),
    h('p',{},h('strong',{},'PRACTICE DATA — '),'These compounds and numbers are made up for learning. We do not know if these compounds work against EGFR or are safe to use.'),
    h('p',{class:'muted'},'What you will learn: how to make a first choice using compound properties, and why more tests are still needed.'));
  const results = h('div',{role:'status','aria-live':'polite',style:'margin-top:12px'});
  const count = h('strong',{});
  const rows = compounds.map(c => {
    const pass = c.mw<=criteria.mw && c.logp<=criteria.logp && c.tpsa<=criteria.tpsa;
    const checkbox = h('input',{type:'checkbox','aria-label':'Choose compound '+c.id,onchange:e=>{if(e.target.checked)selected.add(c.id);else selected.delete(c.id);update();}});
    return h('tr',{},h('td',{},checkbox),h('td',{},'Candidate '+c.id),h('td',{},String(c.mw)),h('td',{},String(c.logp)),h('td',{},String(c.tpsa)),h('td',{},pass?'Yes':'No'));
  });
  const explanation=h('textarea',{rows:'3',placeholder:'Why did you choose these compounds? Use the numbers in the table. What do we still not know?','aria-label':'Why you chose these compounds',style:'width:100%;max-width:100%;padding:12px'});
  const review=h('div',{role:'status','aria-live':'polite'});
  function update(){
    count.textContent='Chosen: '+selected.size+' of '+compounds.length;
    results.textContent='';
    if(!selected.size){results.textContent='Tick one or more compounds to make your list.';return;}
    const flags=[...selected].filter(id=>{const c=compounds.find(x=>x.id===id);return c.mw>500||c.logp>5||c.tpsa>140;});
    results.append(h('p',{},flags.length?'Some compounds on your list do not pass the rules: '+flags.join(', ')+'. Why did you choose them?':'All compounds on your list pass these three rules. We still do not know if they can block EGFR.'));
  }
  const table=h('div',{class:'tblwrap'},h('table',{class:'tbl'},h('thead',{},h('tr',{},['Select','Candidate','MW (g/mol)','cLogP','TPSA (Å²)','Passes rules?'].map(t=>h('th',{},t)))),h('tbody',{},...rows)));
  const exercise=h('section',{class:'glass stack',style:'margin-top:20px'},
    h('h2',{},'Step 1 · Look at the compound properties'),
    h('p',{},'For this activity, use three simple rules: MW must be 500 or less, cLogP must be 5 or less, and TPSA must be 140 or less. MW tells us how heavy a molecule is. cLogP tells us how much it prefers oil over water. TPSA tells us about the polar part of a molecule. These rules help us practise. They cannot tell us if a compound will work as a drug.'),
    table,count,results,
    h('h2',{},'Step 2 · Explain your choice'),
    h('p',{},'Which compounds would you study next? Why? What other tests would you need?'),
    explanation,
    h('button',{class:'btn-start btn-start--small',type:'button',onclick:()=>{
      const words=explanation.value.trim().split(/\s+/).filter(Boolean);
      review.textContent=(!selected.size||words.length<12)?'Choose at least one compound. Then explain your choice in 12 words or more.':'Good. Now check which compounds pass the rules. Remember: we need real EGFR test results before we can say a compound may work.';
    }},'Check my answer'),review);
  const quiz=h('section',{class:'glass stack',style:'margin-top:20px'},h('h2',{},'Step 3 · Quick quiz'));
  questions.forEach((q,i)=>{
    const result=h('p',{role:'status','aria-live':'polite'});
    const field=h('fieldset',{},h('legend',{},(i+1)+'. '+q.q),...q.options.map((o,j)=>h('label',{style:'display:block;margin:8px 0'},h('input',{type:'radio',name:'egfr-q'+i,value:String(j),onchange:()=>{answered.set(i,j);result.textContent=(j===q.correct?'Correct. ':'Not quite. ')+q.why;}}),' '+o)));
    quiz.append(field,result);
  });
  quiz.append(h('p',{class:'muted'},'This is practice only. Your answers will not change your COX-2 learning record.'),h('a',{href:'#/cases',class:'go'},'← Back to Case Library'));
  app.append(intro,exercise,quiz);
  update();
}
