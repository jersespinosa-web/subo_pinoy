const PER_PAGE = 4;
const recipes = [
  {name:'Chicken Adobo', level:'Easy', time:'45 mins', cat:'chicken', img:'chicken-adobo'},
  {name:'Pork Sinigang', level:'Medium', time:'1 hr', cat:'soup', img:'pork-sinigang'},
  {name:'Beef Caldereta', level:'Medium', time:'2 hrs', cat:'beef', img:'beef-caldereta'},
  {name:'Lumpia', level:'Easy', time:'30 mins', cat:'pork', img:'lumpia'},
  {name:'Kare-Kare', level:'Hard', time:'3 hrs', cat:'beef', img:'kare-kare'},
  {name:'Sisig', level:'Medium', time:'1 hr', cat:'pork', img:'sisig'},
  {name:'Tinola', level:'Easy', time:'40 mins', cat:'soup', img:'tinola'},
  {name:'Pinakbet', level:'Easy', time:'35 mins', cat:'veggie', img:'pinakbet'},
];

let page = 0, query = '', cat = null;
const $ = id => document.getElementById(id);

function filtered(){
  return recipes.filter(r =>
    r.name.toLowerCase().includes(query) && (!cat || r.cat === cat));
}

function render(){
  const list = filtered();
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  page = Math.min(page, pages - 1);

  $('grid').innerHTML = list.length
    ? list.slice(page*PER_PAGE, page*PER_PAGE + PER_PAGE).map(r => `
      <article class="card">
        <div class="photo" style="background-image:url('assets/${r.img}.jpg')"></div>
        <h2>${r.name}</h2>
        <div class="meta"><span>♨ ${r.level}</span><span>🕒 ${r.time}</span></div>
        <button class="go" aria-label="Open ${r.name}" data-name="${r.name}">→</button>
      </article>`).join('')
    : '<p class="empty">No recipes found.</p>';

  $('dots').innerHTML = Array.from({length: pages}, (_, i) =>
    `<button class="dot${i === page ? ' active' : ''}" data-page="${i}" aria-label="Page ${i+1}"></button>`).join('');
  $('prev').disabled = page === 0;
  $('next').disabled = page >= pages - 1;
}

$('search').addEventListener('input', e => { query = e.target.value.trim().toLowerCase(); page = 0; render(); });

$('categories').addEventListener('click', e => {
  const b = e.target.closest('.cat'); if (!b) return;
  cat = cat === b.dataset.cat ? null : b.dataset.cat;
  document.querySelectorAll('.cat').forEach(c => c.classList.toggle('active', c.dataset.cat === cat));
  page = 0; render();
});

$('prev').onclick = () => { page--; render(); };
$('next').onclick = () => { page++; render(); };
$('dots').addEventListener('click', e => {
  const d = e.target.closest('.dot'); if (d){ page = +d.dataset.page; render(); }
});

// Placeholder: replace with navigation to the recipe detail page
$('grid').addEventListener('click', e => {
  const g = e.target.closest('.go'); if (g) console.log('Open recipe:', g.dataset.name);
});

render();
