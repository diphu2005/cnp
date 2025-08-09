(function(){
const app = document.getElementById('app');

function getCases(){
  return JSON.parse(localStorage.getItem('cases') || '[]');
}

function saveCase(c){
  const cases = getCases();
  c.id = Date.now();
  cases.push(c);
  localStorage.setItem('cases', JSON.stringify(cases));
}

function renderHome(){
  app.innerHTML = `<h2>Welcome</h2>
  <p>This webpage has been created for discussion on Contract Management issues. Select a category to view discussions or submit your own case.</p>`;
}


function renderCategory(stage){
  const cases = getCases().filter(c => c.stage === stage);
  let title = stage === 'pretender' ? 'Pre-Tender' : stage === 'during' ? 'During Tender' : 'Post-Tender';
  let html = `<h2>${title} Cases</h2>`;
  if(cases.length === 0) html += "<p>No cases yet.</p>";
  cases.forEach(c => {
    html += `<div class="case"><h3>${c.title}</h3><p>${c.summary}</p></div>`;
  });
  app.innerHTML = html;
}

function renderLibrary(){
  const cases = getCases();
  let html = `<h2>Case Library</h2>`;
  if(cases.length === 0) html += "<p>No cases in library.</p>";
  cases.forEach(c => {
    html += `<div class="case"><h3>${c.title}</h3><strong>Stage:</strong> ${c.stage}<p>${c.summary}</p></div>`;
  });
  app.innerHTML = html;
}

function renderNewCase(){
  app.innerHTML = `<h2>Submit a New Case</h2>
  <form id="caseForm">
    <input type="text" name="title" placeholder="Case Title" required>
    <select name="stage" required>
      <option value="">Select Stage</option>
      <option value="pretender">Pre-Tender</option>
      <option value="during">During Tender</option>
      <option value="post">Post-Tender</option>
    </select>
    <textarea name="summary" placeholder="Case Summary" required></textarea>
    <textarea name="details" placeholder="Case Details"></textarea>
    <button type="submit">Submit</button>
  </form>`;
  document.getElementById('caseForm').addEventListener('submit', function(e){
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    saveCase(data);
    location.hash = '#/library';
  });
}

function router(){
  const hash = location.hash || '#/';
  if(hash === '#/' || hash === '') renderHome();
  else if(hash.startsWith('#/category/')) renderCategory(hash.split('/')[2]);
  else if(hash === '#/library') renderLibrary();
  else if(hash === '#/new') renderNewCase();
  else renderHome();
}

window.addEventListener('hashchange', router);
router();
})();
