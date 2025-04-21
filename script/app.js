// Helper: Get the first day of the year (which determines grid positioning)
function getFirstDayOfYear(year) {
  return new Date(year, 0, 1).getDay(); // 0 = Sunday, 1 = Monday, etc.
}

// DOM elements
const repoUrl = document.getElementById('repoUrl');
const yearSelect = document.getElementById('year');
const displayYear = document.getElementById('display-year');
const heatmap = document.getElementById('heatmap');
const monthLabels = document.getElementById('month-labels');
const contributionCount = document.getElementById('contribution-count');
const clearBtn = document.getElementById('clear');
const exampleProfileBtn = document.getElementById('exampleProfile');
const exampleScriptBtn = document.getElementById('exampleScript');
const githubIssuesBtn = document.getElementById('githubIssues');
const starBtn = document.getElementById('star');
const generateBtn = document.getElementById('generate');
const colorButtons = document.querySelectorAll('.color-button');
let selectedLevel = 4; // default highest
let isDragging = false;

// Initialize year dropdown
(function initYearSelect() {
  const thisYear = new Date().getFullYear();
  for (let y = thisYear; y >= thisYear - 5; y--) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
  }
  yearSelect.value = thisYear;
  displayYear.textContent = thisYear;
})();

// Get last day of year (needed for accurate contribution calendar)
function getLastDayOfYear(year) {
  return new Date(year, 11, 31);
}

// Calculate number of weeks to display for the specific year
function getNumberOfWeeks(year) {
  const firstDay = new Date(year, 0, 1);
  const lastDay = new Date(year, 11, 31);
  const millisecondsBetween = lastDay - firstDay;
  const daysBetween = millisecondsBetween / (1000 * 60 * 60 * 24);
  return Math.ceil((daysBetween + getFirstDayOfYear(year) + 1) / 7);
}

// Update contribution count
function updateContributionCount() {
  let count = 0;
  document.querySelectorAll('.cell').forEach(cell => {
    const level = parseInt(cell.dataset.level || '0', 10);
    count += level;
  });
  contributionCount.textContent = `${count} contributions in ${displayYear.textContent}`;
}

// Position month labels correctly based on the year
function positionMonthLabels(year) {
  monthLabels.innerHTML = '';
  
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const firstDayOffset = getFirstDayOfYear(year);
  
  months.forEach((month, index) => {
    const firstDayOfMonth = new Date(year, index, 1);
    const daysSinceJan1 = Math.floor((firstDayOfMonth - new Date(year, 0, 1)) / (24 * 60 * 60 * 1000));
    // Calculate column position taking into account the day of week offset from the start of the year
    let columnPosition = Math.floor((daysSinceJan1 + firstDayOffset) / 7);
    
    // Adjust for edge cases
    if (index === 0) columnPosition = 0;
    
    const lbl = document.createElement('div');
    lbl.classList.add('month-label');
    lbl.textContent = month;
    // Position is based on column width (11px) plus gap (2px)
    lbl.style.left = `${columnPosition * 13}px`;
    monthLabels.appendChild(lbl);
  });
}

// Build calendar grid for given year
function buildCalendar(year) {
  displayYear.textContent = year;
  heatmap.innerHTML = '';
  
  // Position month labels
  positionMonthLabels(year);
  
  const numWeeks = getNumberOfWeeks(year);
  const firstDayOffset = getFirstDayOfYear(year);
  
  // Update grid template for variable width
  heatmap.style.gridTemplateColumns = `repeat(${numWeeks}, 11px)`;
  
  // Create cells for the entire year
  for (let week = 0; week < numWeeks; week++) {
    for (let day = 0; day < 7; day++) {
      // Calculate date for this cell
      const dayOffset = week * 7 + day - firstDayOffset;
      const date = new Date(year, 0, 1);
      date.setDate(date.getDate() + dayOffset);
      
      // Create cell
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.date = date.toISOString().slice(0, 10); // YYYY-MM-DD
      cell.dataset.level = '0';
      
      // Position cell in grid
      cell.style.gridColumn = week + 1;
      cell.style.gridRow = day + 1;
      
      // Only show dates within selected year
      if (date.getFullYear() !== parseInt(year)) {
        cell.style.visibility = 'hidden';
      }
      
      // Add tooltip showing date
      cell.title = `${date.toDateString()}`;
      
      // Click to paint
      cell.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateCell(cell);
        e.preventDefault(); // Prevent text selection while dragging
      });
      
      cell.addEventListener('mouseenter', () => {
        if (isDragging) {
          updateCell(cell);
        }
      });
      
      heatmap.appendChild(cell);
    }
  }
  
  updateContributionCount();
}

// Update cell with selected level
function updateCell(cell) {
  if (cell.style.visibility !== 'hidden') {
    cell.dataset.level = selectedLevel;
    // Clear all level classes
    cell.className = 'cell';
    if (selectedLevel > 0) {
      cell.classList.add(`cell-${selectedLevel}`);
    }
    updateContributionCount();
  }
}

// Stop dragging when mouse is up
document.addEventListener('mouseup', () => {
  isDragging = false;
});

// Initial render
buildCalendar(parseInt(yearSelect.value));

// Year change handler
yearSelect.addEventListener('change', () => {
  buildCalendar(parseInt(yearSelect.value));
});

// Clear board
clearBtn.addEventListener('click', () => {
  buildCalendar(parseInt(yearSelect.value));
});

// Keyboard shortcuts for color selection
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  
  if (key === 'escape' || key === 'esc') {
    buildCalendar(parseInt(yearSelect.value)); // Clear board
    return;
  }
  
  if (key === ' ' || key === 'spacebar') {
    selectedLevel = 0;
    colorButtons.forEach(b => b.classList.remove('selected'));
    document.querySelector('.color-button[data-level="0"]').classList.add('selected');
  } else if (key === 'a') {
    selectedLevel = 1;
    colorButtons.forEach(b => b.classList.remove('selected'));
    document.querySelector('.color-button[data-level="1"]').classList.add('selected');
  } else if (key === 's') {
    selectedLevel = 2;
    colorButtons.forEach(b => b.classList.remove('selected'));
    document.querySelector('.color-button[data-level="2"]').classList.add('selected');
  } else if (key === 'd') {
    selectedLevel = 3;
    colorButtons.forEach(b => b.classList.remove('selected'));
    document.querySelector('.color-button[data-level="3"]').classList.add('selected');
  } else if (key === 'f') {
    selectedLevel = 4;
    colorButtons.forEach(b => b.classList.remove('selected'));
    document.querySelector('.color-button[data-level="4"]').classList.add('selected');
  }
});

// Color selector buttons
colorButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedLevel = parseInt(btn.dataset.level, 10);
    colorButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

// Example buttons - update URLs to actual repository
exampleProfileBtn.addEventListener('click', () => {
  window.open('https://github.com/YunggiAlyana?tab=overview&from=2024-12-01&to=2024-12-31');
});

exampleScriptBtn.addEventListener('click', () => {
  // Create and show a sample script
  const sampleScript = `#!/bin/bash
echo 'GENERATING ART...'
# Example script that would draw a pattern
# Ensure correct repo URL
REPO_URL="https://github.com/username/repo"
echo "Using repository: $REPO_URL"

# Prepare directory
rm -rf github_painter
mkdir github_painter
cd github_painter
git init
git remote add origin "$REPO_URL"
git pull origin main || echo "Repository may be empty or not exist yet"
touch foobar.txt

# Creating commits for contribution graph
# ... commits would be here ...

# Push changes to repository
echo "Pushing to: $REPO_URL"
git remote -v
git push -u origin main --force
echo 'DONE!'`;
  
  alert(sampleScript);
});

// Update to your actual repository URLs
githubIssuesBtn.addEventListener('click', () => {
  window.open('https://github.com/YunggiAlyana/Contribution-painter/issues');
});

starBtn.addEventListener('click', () => {
  window.open('https://github.com/YunggiAlyana/Contribution-painter');
});

// Add randomness to commit times to make them look natural
function getRandomHour() {
  // Most active hours are typically during the workday (9am-5pm)
  return Math.floor(Math.random() * 8) + 9; // 9am to 5pm
}

function getRandomMinute() {
  return Math.floor(Math.random() * 60);
}

function getRandomSecond() {
  return Math.floor(Math.random() * 60);
}

// Generate bash script
generateBtn.addEventListener('click', () => {
  if (!repoUrl.value) {
    alert("Please enter a GitHub repository URL");
    return;
  }

  // Clean up the URL
  let repoUrlValue = repoUrl.value.trim();
  if (repoUrlValue.endsWith('/')) repoUrlValue = repoUrlValue.slice(0, -1);
  
  // Validate URL format
  if (!repoUrlValue.match(/^https?:\/\/github\.com\/[\w-]+\/[\w-]+$/)) {
    alert("Please enter a valid GitHub repository URL in the format: https://github.com/username/repo without .git");
    return;
  }

  const year = parseInt(yearSelect.value, 10);
  let bash = "#!/bin/bash\n";
  bash += "echo 'GENERATING GITHUB CONTRIBUTION ART...'\n";
  bash += "# Ensure correct repo URL\n";
  bash += `REPO_URL=\"${repoUrlValue}\"\n`;
  bash += "echo \"Using repository: $REPO_URL\"\n\n";
  bash += "# Extract repository name from URL\n";
  bash += "REPO_NAME=$(echo $REPO_URL | sed 's/.*github.com\\///g')\n";
  bash += "echo \"Repository name: $REPO_NAME\"\n\n";
  bash += "# Prepare directory\n";
  bash += "rm -rf github_painter_tmp\n";
  bash += "mkdir github_painter_tmp\n";
  bash += "cd github_painter_tmp\n";
  bash += "git init\n";
  bash += "git remote add origin \"$REPO_URL\"\n";
  bash += "git pull origin main || git pull origin master || echo \"Repository may be empty or not exist yet\"\n";
  bash += "echo \"Art generated by github-painter\" > README.md\n";
  bash += "git add README.md\n";
  bash += "git commit -m \"Initialize repository for GitHub art\"\n\n";
  bash += "# Creating commits for contribution graph\n";

  // Sort cells by date to ensure chronological order
  const activeCells = Array.from(document.querySelectorAll(".cell"))
    .filter(cell => cell.style.visibility !== 'hidden' && parseInt(cell.dataset.level || '0', 10) > 0)
    .sort((a, b) => a.dataset.date.localeCompare(b.dataset.date));

  // Track used timestamps to avoid duplicates
  const usedTimestamps = new Set();

  activeCells.forEach(cell => {
    const level = parseInt(cell.dataset.level || '0', 10);
    if (level > 0 && cell.dataset.date) {
      const [y, m, d] = cell.dataset.date.split('-');
      const yearNum = parseInt(y, 10);
      const monthNum = parseInt(m, 10);
      const dayNum = parseInt(d, 10) + 1; // Tambahkan 1 hari di sini
      
      for (let j = 0; j < level; j++) {
        // Generate natural-looking commit times
        let hour = getRandomHour();
        let minute = getRandomMinute();
        let second = getRandomSecond();
        
        // Buat objek tanggal dengan hari yang sudah digeser
        let dateObj = new Date(Date.UTC(yearNum, monthNum - 1, dayNum, hour, minute, second));
        let timeString = dateObj.toISOString();
        
        // Make sure we don't have duplicate timestamps
        while (usedTimestamps.has(timeString)) {
          second = (second + 1) % 60;
          minute = second === 0 ? (minute + 1) % 60 : minute;
          hour = minute === 0 && second === 0 ? (hour + 1) % 24 : hour;
          
          dateObj = new Date(Date.UTC(yearNum, monthNum - 1, dayNum, hour, minute, second));
          timeString = dateObj.toISOString();
        }
        
        usedTimestamps.add(timeString);
        
        // Create commit content with timestamp
        bash += `echo '${timeString}' >> foobar.txt\n`;
        bash += `git add foobar.txt\n`;
        bash += `GIT_AUTHOR_DATE='${timeString}' GIT_COMMITTER_DATE='${timeString}' git commit -m 'Update at ${timeString}'\n`;
      }
    }
  });

  bash += "\n# Push changes to repository\n";
  bash += "echo \"Pushing to: $REPO_URL\"\n";
  bash += "git branch -M main\n";
  bash += "git remote -v\n";
  bash += "git push -u origin main --force\n";
  bash += "cd ..\n";
  bash += "rm -rf github_painter_tmp\n";
  bash += "echo 'DONE! Check your GitHub profile to see the contribution graph art.'\n";

  // Download script
  const blob = new Blob([bash], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'github_painter.sh';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);

  console.log('Generated script:', bash);
});
