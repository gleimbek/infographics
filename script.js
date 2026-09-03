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
  { title: 'Indentation in the Structure of an HTML File', filename: 'indentation.png' },
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
  { title: 'Chapter 6 - Power BI: Visualizing and Sharing Insights', filename: 'infographic-06-a.png' },
  { title: 'Chapter 7 - Build Your First Chatbot', filename: 'infographic-07.png' },
  { title: 'Chapter 8 - Telling Stories with Data', filename: 'infographic-08.png' },
  { title: 'Chapter 9 - Extending Your Toolbox', filename: 'infographic-09.png' },
];

const cit251Units = [
  { title: 'Chapter 1 - Introduction to the Internet and Web Design', filename: 'Responsive-01.png' },
  { title: 'Chapter 2 - Building a Webpage Template with HTML 5', filename: 'Responsive-02.png' },
  { title: 'Chapter 3 - Enhancing a Website with Images and Links', filename: 'Responsive-03.png' },
  { title: 'Chapter 4 - Designing Webpages with CSS', filename: 'Responsive-04.png' },
  { title: 'Chapter 5 - Responsive Design Part 1: Designing for Mobile Devices', filename: 'Responsive-05.png' },
  { title: 'Chapter 6 - Responsive Design Part 2: Designing for Tablet and Desktop Devices', filename: 'Responsive-06.png' },
  { title: 'Chapter 7 - Improving Web Design with New Page Layouts', filename: 'Responsive-07.png' },
  { title: 'Chapter 8 - Creating Tables and Forms', filename: 'Responsive-08.png' },
  { title: 'Chapter 9 - Integrating Audio and Video', filename: 'Responsive-09.png' },
  { title: 'Chapter 10 - Creating Interactivity with CSS and JavaScript', filename: 'Responsive-10.png' },
  { title: 'Chapter 11 - Publish, Promote, and Maintain a Website', filename: 'Responsive-11.png' },
  { title: 'Chapter 12 - Getting Started with Bootstrap', filename: 'Responsive-12.png' },
];



document.addEventListener('DOMContentLoaded', () => {
  renderThumbnails('list-cit151', cit151Units);
  renderThumbnails('list-cit144', cit144Units);
  renderThumbnails('list-cit251', cit251Units);
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
    alert('Automatic download failed. This often happens when the page is opened directly from the file (file://) instead of a local server. The image opened in a new tab; you can right-click and select "Save image as...".');
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
