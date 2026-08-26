// Units A through P definition for CIT 151
const cit151Units = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];

// Infographic numbers 01 through 09 for CIT 144
const cit144Units = ['01', '02', '03', '04', '05', '06', '07', '08', '09'];

document.addEventListener('DOMContentLoaded', () => {
  renderCIT151Units();
  renderCIT144Units();
});

function renderCIT151Units() {
  const container = document.getElementById('list-cit151');
  if (!container) return;

  container.innerHTML = cit151Units.map(unit => {
    const filename = `Unit ${unit} - HTML.png`;
    const filepath = `image/${filename}`;
    const title = `Unit ${unit} - HTML`;

    return `
      <div class="thumb-card">
        <img src="${filepath}" alt="${title} Infographic" class="thumb-img"
             onerror="this.src='https://via.placeholder.com/240x140?text=Unit+${unit}+Preview'"
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

function renderCIT144Units() {
  const container = document.getElementById('list-cit144');
  if (!container) return;

  container.innerHTML = cit144Units.map(num => {
    const filename = `infographic-${num}.png`;
    const filepath = `image/${filename}`;
    const title = `Infographic ${num}`;

    return `
      <div class="thumb-card">
        <img src="${filepath}" alt="${title}" class="thumb-img"
             onerror="this.src='https://via.placeholder.com/240x140?text=Infographic+${num}'"
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
