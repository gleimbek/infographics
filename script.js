// Each entry is one infographic image. A chapter/unit can appear more than
// once here if it has multiple infographics — just add another object with
// the same "unit" prefix but a different filename/title.
const cit151Units = [
  { title: 'Unit A - Getting Started with HTML', filename: 'Unit A - HTML.png' },
  { title: 'Unit B - Structuring Content in a Web Document', filename: 'Unit B - HTML.png' },
  { title: 'Unit C - Getting Started with CSS', filename: 'Unit C - HTML.png' },
  { title: 'Unit D - Laying Out Elements With CSS', filename: 'Unit D - HTML.png' },
  { title: 'Unit E - Formatting Text with CSS', filename: 'Unit E - HTML.png' },
  { title: 'Unit F - Inserting and Working with Links', filename: 'Unit F - HTML.png' },
  { title: 'Unit G - Inserting and Working with Images', filename: 'Unit G - HTML.png' },
  { title: 'Unit H - Organizing Content with Lists and Tables', filename: 'Unit H - HTML.png' },
  { title: 'Unit I - Implementing Responsive Design', filename: 'Unit I - HTML.png' },
  { title: 'Unit J - Creating and Processing Web Forms', filename: 'Unit J - HTML.png' },
  { title: 'Unit K - Creating Visual Effects and Animation', filename: 'Unit K - HTML.png' },
  { title: 'Unit L - Incorporating Video and Audio', filename: 'Unit L - HTML.png' },
  { title: 'Unit M - Programming Web Pages with JavaScript', filename: 'Unit M - HTML.png' },
  { title: 'Unit N - Integrating Social Media', filename: 'Unit N - HTML.png' },
  { title: 'Unit O - Optimizing Your Website for Search Engines', filename: 'Unit O - HTML.png' },
  { title: 'Unit P - Testing and Improving Performance', filename: 'Unit P - HTML.png' },
  // Example: a SECOND infographic for Unit A — just uncomment and rename
  // the file to add it:
  // { title: 'Unit A - HTML (Part 2)', filename: 'Unit A - HTML Part 2.png' },
];

const cit144Units = [
  { title: 'Chapter 1 - What is Data Analytics?', filename: 'infographic-01.png' },
  { title: 'Chapter 2 - Getting Started with KNIME', filename: 'infographic-02.png' },
  { title: 'Chapter 3 - Transforming Data', filename: 'infographic-03.png' },
  { title: 'Chapter 4 - What is Machine Learning?', filename: 'infographic-04.png' },
  { title: 'Chapter 5 - Applying Machine Learning at Work', filename: 'infographic-05.png' },
  { title: 'Chapter 6 - Getting Started with Power BI', filename: 'infographic-06.png' },
  { title: 'Chapter 7 - Visualizing Data Effectively', filename: 'infographic-07.png' },
  { title: 'Chapter 8 - Telling Stories with Data', filename: 'infographic-08.png' },
  { title: 'Chapter 9 - Extending Your Toolbox', filename: 'infographic-09.png' },
];

document.addEventListener('DOMContentLoaded', () => {
  renderThumbnails('list-cit151', cit151Units);
  renderThumbnails('list-cit144', cit144Units);
});

// Generic renderer: works for any course, any number of infographics per chapter.
function renderThumbnails(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = items.map(({ title, filename }) => {
    const filepath = `image/${filename}`;

    return `
      <div class="thumb-card">
        <img src="${filepath}" alt="${title}" class="thumb-img"
             onerror="this.src='https://via.placeholder.com/240x140?text=Preview'"
             onclick="openImageModal('${filepath}', '${title}', '${filename}')">
        <span class="thumb-title">${title}</span>
        <div class="thumb-actions">
          <button class="btn-view" onclick="openImageModal('${filepath}', '${title}', '${filename}')">View</button>
          <button class="btn-download" onclick="downloadImage('${filepath}', '${filename}')">Download</button>
        </div>
      </div>
    `;
  }).join('');
}

/* ============ Modal Preview ============ */
function openImageModal(filepath, title, filename) {
  const modal = document.getElementById('image-modal');
  const img = document.getElementById('modal-img');
  const titleEl = document.getElementById('modal-title');
  const downloadBtn = document.getElementById('modal-download-btn');

  img.src = filepath;
  img.alt = title;
  titleEl.textContent = title;
  downloadBtn.onclick = () => downloadImage(filepath, filename);

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeImageModal() {
  const modal = document.getElementById('image-modal');
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

function closeModalOnOverlay(event) {
  if (event.target.id === 'image-modal') {
    closeImageModal();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeImageModal();
});

/* ============ Forced Download ============ */
async function downloadImage(filepath, filename) {
  try {
    const response = await fetch(filepath);
    if (!response.ok) throw new Error('Network response was not ok');
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.warn('Automatic download failed (likely running via file:// instead of a local server):', err);
    // Safe fallback: open the image in a new tab instead of navigating away
    // from the current page. Right-click > "Save image as" still works here.
    window.open(filepath, '_blank', 'noopener');
    alert('No se pudo descargar automáticamente. Esto suele pasar cuando la página se abre directamente desde el archivo (file://) en vez de un servidor local. La imagen se abrió en una pestaña nueva; puedes hacer clic derecho > "Guardar imagen como".');
  }
}

function unlockCourse(courseId, correctKey) {
  const inputElement = document.getElementById(`key-${courseId}`);
  const inputGroup = inputElement.closest('.input-group');
  const enteredKey = inputElement.value.trim();

  if (enteredKey === correctKey) {
    // Hide all other courses
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
      if (card.id !== `card-${courseId}`) {
        card.classList.add('hidden');
      }
    });

    // Update layout grid to focus mode
    const grid = document.getElementById('courses-grid');
    grid.classList.add('single-view');

    // Hide input box and reveal resources
    document.getElementById(`box-${courseId}`).classList.add('hidden');
    document.getElementById(`resources-${courseId}`).classList.remove('hidden');

    // Show reset navigation button in header
    document.getElementById('btn-reset').classList.remove('hidden');
  } else {
    inputGroup.classList.add('input-error');
    inputElement.value = '';
    inputElement.placeholder = 'Invalid Code';
    
    setTimeout(() => {
      inputGroup.classList.remove('input-error');
      inputElement.placeholder = 'Enter access code...';
    }, 2000);
  }
}

function resetView() {
  // Reveal all course cards
  const allCards = document.querySelectorAll('.card');
  allCards.forEach(card => {
    card.classList.remove('hidden');
  });

  // Re-lock every course: hide resources, show the access code input again,
  // and clear whatever was typed so no unlocked content stays visible.
  const courseIds = ['cit151', 'cit144', 'cit251'];
  courseIds.forEach(courseId => {
    const box = document.getElementById(`box-${courseId}`);
    const resources = document.getElementById(`resources-${courseId}`);
    const input = document.getElementById(`key-${courseId}`);

    if (box) box.classList.remove('hidden');
    if (resources) resources.classList.add('hidden');
    if (input) input.value = '';
  });

  // Revert grid layout
  const grid = document.getElementById('courses-grid');
  grid.classList.remove('single-view');

  // Hide reset button
  document.getElementById('btn-reset').classList.add('hidden');
}
