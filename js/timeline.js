/* =====================================================
   TATTOO TOUCH-UP TIMELINE - MAIN APP
   Handles UI interactions and calculator integration
   ===================================================== */

// Global state
let calculationResults = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
  setupTabs();
  setupForms();
  setupInfoCardListeners();
}

/**
 * Setup tab navigation
 */
function setupTabs() {
  const tabs = document.querySelectorAll('.touch-up-timeline__tab');
  const tabContents = document.querySelectorAll('.touch-up-timeline__tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');

      // Remove active class from all tabs and contents
      tabs.forEach(t => t.classList.remove('touch-up-timeline__tab--active'));
      tabContents.forEach(content => content.classList.remove('touch-up-timeline__tab-content--active'));

      // Add active class to clicked tab and corresponding content
      this.classList.add('touch-up-timeline__tab--active');
      document.getElementById(`tab-${targetTab}`).classList.add('touch-up-timeline__tab-content--active');

      // Show fading prediction if results exist
      if (targetTab === 'fading' && calculationResults) {
        showFadingPrediction();
      }
    });
  });
}

/**
 * Setup all form handlers
 */
function setupForms() {
  // Touch-up calculator form
  const touchUpForm = document.getElementById('touchUpForm');
  if (touchUpForm) {
    touchUpForm.addEventListener('submit', handleTouchUpCalculation);
  }

  // Cost calculator form
  const costForm = document.getElementById('costForm');
  if (costForm) {
    costForm.addEventListener('submit', handleCostCalculation);
  }

  // Sun damage calculator
  const sunCalculateBtn = document.getElementById('calculateSun');
  if (sunCalculateBtn) {
    sunCalculateBtn.addEventListener('click', handleSunDamageCalculation);
  }

  // Readiness checker form
  const readinessForm = document.getElementById('readinessForm');
  if (readinessForm) {
    readinessForm.addEventListener('submit', handleReadinessCheck);
  }
}

/**
 * Setup info card click listeners
 */
function setupInfoCardListeners() {
  // Add any interactive info card handlers here if needed
}

/**
 * Handle touch-up timeline calculation
 */
function handleTouchUpCalculation(e) {
  e.preventDefault();

  // Gather form data
  const formData = {
    tattooAge: parseFloat(document.getElementById('tattooAge').value),
    tattooStyle: document.getElementById('tattooStyle').value,
    colors: getSelectedColors(),
    bodyLocation: document.getElementById('bodyLocation').value,
    sunExposure: document.querySelector('input[name="sunExposure"]:checked').value,
    careLevel: document.querySelector('input[name="careLevel"]:checked').value
  };

  // Validate colors
  if (formData.colors.length === 0) {
    alert('Please select at least one color used in your tattoo');
    return;
  }

  // Calculate results
  calculationResults = TattooCalculators.calculateTouchUpTimeline(formData);

  // Display results
  displayTouchUpResults(calculationResults);

  // Scroll to results
  document.getElementById('touchUpResults').scrollIntoView({
    behavior: 'smooth',
    block: 'nearest'
  });
}

/**
 * Get selected colors from checkboxes
 */
function getSelectedColors() {
  const colorCheckboxes = document.querySelectorAll('input[name="colors"]:checked');
  return Array.from(colorCheckboxes).map(checkbox => checkbox.value);
}

/**
 * Display touch-up calculation results
 */
function displayTouchUpResults(results) {
  const resultsDiv = document.getElementById('touchUpResults');
  resultsDiv.style.display = 'block';

  // Update urgency indicator
  const urgencyCard = document.getElementById('urgencyIndicator');
  urgencyCard.style.borderLeftColor = results.urgency.color;
  document.getElementById('urgencyLevel').textContent = results.urgency.level;
  document.getElementById('urgencyLevel').style.color = results.urgency.color;
  document.getElementById('urgencyMessage').textContent = results.urgency.message;

  // Update result cards
  document.getElementById('currentAge').textContent = TattooCalculators.formatYears(results.currentAge);
  document.getElementById('touchUpIn').textContent = TattooCalculators.formatYears(results.yearsRemaining);
  document.getElementById('fadingProgress').textContent = results.fadingProgress + '%';

  // Display fading order
  displayFadingOrder(results.fadingOrder);

  // Display recommendations
  displayRecommendations(results.recommendations);
}

/**
 * Display fading order of colors
 */
function displayFadingOrder(fadingOrder) {
  const fadingList = document.getElementById('fadingOrderList');
  fadingList.innerHTML = '';

  if (fadingOrder.length === 0) {
    fadingList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No colors selected</p>';
    return;
  }

  fadingOrder.forEach((item, index) => {
    const fadingItem = document.createElement('div');
    fadingItem.className = 'touch-up-timeline__fading-item';

    fadingItem.innerHTML = `
      <span class="touch-up-timeline__fading-item-name">${index + 1}. ${item.color}</span>
      <span class="touch-up-timeline__fading-item-years">~${item.years} years</span>
    `;

    fadingList.appendChild(fadingItem);
  });
}

/**
 * Display recommendations
 */
function displayRecommendations(recommendations) {
  const recommendationsDiv = document.getElementById('recommendations');
  recommendationsDiv.innerHTML = '';

  if (recommendations.length === 0) {
    recommendationsDiv.innerHTML = '<p>Keep maintaining your tattoo with daily moisturizer and SPF protection!</p>';
    return;
  }

  const ul = document.createElement('ul');
  ul.style.listStyle = 'none';
  ul.style.padding = '0';
  ul.style.margin = '0';
  ul.style.display = 'flex';
  ul.style.flexDirection = 'column';
  ul.style.gap = 'var(--spacing-sm)';

  recommendations.forEach(rec => {
    const li = document.createElement('li');
    li.style.padding = 'var(--spacing-md)';
    li.style.paddingLeft = 'var(--spacing-xl)';
    li.style.background = 'var(--bg-card)';
    li.style.borderRadius = 'var(--border-radius)';
    li.style.borderLeft = rec.priority === 'high' ? '4px solid var(--critical-red)' : '4px solid var(--time-blue)';
    li.style.position = 'relative';
    li.style.color = 'var(--text-primary)';

    const icon = document.createElement('span');
    icon.textContent = rec.priority === 'high' ? '🔴' : '💡';
    icon.style.position = 'absolute';
    icon.style.left = 'var(--spacing-sm)';

    li.appendChild(icon);
    li.appendChild(document.createTextNode(' ' + rec.text));
    ul.appendChild(li);
  });

  recommendationsDiv.appendChild(ul);
}

/**
 * Show fading prediction timeline
 */
function showFadingPrediction() {
  const fadingPrediction = document.getElementById('fadingPrediction');

  if (!calculationResults) {
    fadingPrediction.style.display = 'none';
    return;
  }

  fadingPrediction.style.display = 'block';

  // Create timeline visualization
  createTimelineVisualization(calculationResults);

  // Create care comparison
  createCareComparison(calculationResults);
}

/**
 * Create visual timeline
 */
function createTimelineVisualization(results) {
  const timeline = document.getElementById('fadingTimeline');
  timeline.innerHTML = '';

  const totalYears = Math.ceil(results.totalLongevity * 1.5);
  const currentAge = results.currentAge;

  // Create timeline markers
  for (let year = 0; year <= totalYears; year += 2) {
    const marker = document.createElement('div');
    marker.style.display = 'flex';
    marker.style.alignItems = 'center';
    marker.style.gap = 'var(--spacing-md)';
    marker.style.marginBottom = 'var(--spacing-sm)';

    const yearLabel = document.createElement('span');
    yearLabel.textContent = `Year ${year}`;
    yearLabel.style.minWidth = '80px';
    yearLabel.style.fontWeight = '600';
    yearLabel.style.color = 'var(--text-primary)';

    const bar = document.createElement('div');
    bar.style.flex = '1';
    bar.style.height = '24px';
    bar.style.borderRadius = 'var(--border-radius)';
    bar.style.position = 'relative';

    // Calculate color based on fading
    let fadingPercent = (year / results.totalLongevity) * 100;
    fadingPercent = Math.min(100, fadingPercent);

    if (fadingPercent < 40) {
      bar.style.background = 'linear-gradient(to right, #10B981, #10B981)';
    } else if (fadingPercent < 70) {
      bar.style.background = 'linear-gradient(to right, #F59E0B, #F59E0B)';
    } else if (fadingPercent < 90) {
      bar.style.background = 'linear-gradient(to right, #F97316, #F97316)';
    } else {
      bar.style.background = 'linear-gradient(to right, #EF4444, #EF4444)';
    }

    // Add opacity for future years
    if (year > currentAge) {
      bar.style.opacity = '0.4';
      bar.style.border = '2px dashed var(--border-secondary)';
    } else {
      bar.style.opacity = '1';
    }

    // Current year indicator
    if (year === Math.floor(currentAge)) {
      const indicator = document.createElement('div');
      indicator.textContent = '← You are here';
      indicator.style.position = 'absolute';
      indicator.style.right = '-120px';
      indicator.style.color = 'var(--maintenance-purple)';
      indicator.style.fontWeight = '700';
      indicator.style.fontSize = '0.9rem';
      bar.appendChild(indicator);
    }

    marker.appendChild(yearLabel);
    marker.appendChild(bar);
    timeline.appendChild(marker);
  }
}

/**
 * Create care comparison chart
 */
function createCareComparison(results) {
  const comparison = document.getElementById('careComparison');
  comparison.innerHTML = '';

  const comparisonData = [
    {
      label: 'With Excellent Care',
      years: Math.round(results.totalLongevity * 1.3 * 10) / 10,
      color: '#10B981'
    },
    {
      label: 'With Good Care (Current)',
      years: results.totalLongevity,
      color: '#3B82F6'
    },
    {
      label: 'With Poor Care',
      years: Math.round(results.totalLongevity * 0.5 * 10) / 10,
      color: '#EF4444'
    }
  ];

  comparisonData.forEach(item => {
    const card = document.createElement('div');
    card.style.padding = 'var(--spacing-lg)';
    card.style.background = 'var(--bg-card)';
    card.style.borderRadius = 'var(--border-radius)';
    card.style.border = `3px solid ${item.color}`;
    card.style.textAlign = 'center';
    card.style.marginBottom = 'var(--spacing-md)';

    card.innerHTML = `
      <div style="font-weight: 600; margin-bottom: var(--spacing-sm); color: var(--text-primary);">${item.label}</div>
      <div style="font-size: 2rem; font-weight: 700; color: ${item.color}; margin-bottom: var(--spacing-xs);">${item.years} years</div>
      <div style="font-size: 0.9rem; color: var(--text-secondary);">until touch-up needed</div>
    `;

    comparison.appendChild(card);
  });
}

/**
 * Handle sun damage calculation
 */
function handleSunDamageCalculation() {
  const sunHours = parseInt(document.getElementById('sunHours').value);
  const spfUsage = document.getElementById('spfUsage').value;

  const results = TattooCalculators.calculateSunDamage(sunHours, spfUsage);

  // Display results
  const resultsDiv = document.getElementById('sunDamageResults');
  resultsDiv.style.display = 'block';

  document.getElementById('fadingAcceleration').textContent = `+${results.fadingAcceleration}%`;
  document.getElementById('yearsLost').textContent = `${results.yearsLost} years`;
  document.getElementById('sunRecommendation').textContent = results.recommendation;
}

/**
 * Handle cost calculation
 */
function handleCostCalculation(e) {
  e.preventDefault();

  const initialCost = parseFloat(document.getElementById('initialCost').value);
  const touchUpFrequency = parseFloat(document.getElementById('touchUpFrequency').value);

  const results = TattooCalculators.calculateLifetimeCost(initialCost, touchUpFrequency);

  // Display results
  const resultsDiv = document.getElementById('costResults');
  resultsDiv.style.display = 'block';

  document.getElementById('lifetimeCost').textContent = TattooCalculators.formatCurrency(results.lifetimeCost);
  document.getElementById('initialCostDisplay').textContent = TattooCalculators.formatCurrency(initialCost);
  document.getElementById('touchUpCostDisplay').textContent = TattooCalculators.formatCurrency(results.touchUpCost * results.numberOfTouchUps);

  document.getElementById('annualCost').textContent = TattooCalculators.formatCurrency(results.annualCost);
  document.getElementById('numberOfTouchUps').textContent = results.numberOfTouchUps;
  document.getElementById('touchUpCost').textContent = TattooCalculators.formatCurrency(results.touchUpCost);

  // Comparison cards
  document.getElementById('goodCareCost').textContent = TattooCalculators.formatCurrency(results.goodCareCost);
  document.getElementById('goodCareTouchUps').textContent = `${results.goodCareTouchUps} touch-ups over 30 years`;
  document.getElementById('savings').textContent = `💰 Save ${TattooCalculators.formatCurrency(results.savings)}!`;

  document.getElementById('poorCareCost').textContent = TattooCalculators.formatCurrency(results.poorCareCost);
  document.getElementById('poorCareTouchUps').textContent = `${results.poorCareTouchUps} touch-ups over 30 years`;
  document.getElementById('extraCost').textContent = `Extra ${TattooCalculators.formatCurrency(results.savings)} spent`;

  // Budget recommendation
  const monthlyBudget = Math.round((results.lifetimeCost / 30 / 12) * 100) / 100;
  document.getElementById('budgetRecommendation').textContent =
    `Set aside ${TattooCalculators.formatCurrency(monthlyBudget)}/month in a "tattoo maintenance fund" to be prepared for touch-ups. This makes maintenance affordable and stress-free!`;

  // Scroll to results
  resultsDiv.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest'
  });
}

/**
 * Handle readiness check
 */
function handleReadinessCheck(e) {
  e.preventDefault();

  // Gather form data
  const readinessData = {
    fadingLevel: document.querySelector('input[name="fadingLevel"]:checked').value,
    fadedColors: Array.from(document.querySelectorAll('input[name="fadedColors"]:checked')).map(cb => cb.value),
    lineBlurring: document.querySelector('input[name="lineBlurring"]:checked').value,
    detailLoss: document.querySelector('input[name="detailLoss"]:checked').value
  };

  const results = TattooCalculators.assessTouchUpReadiness(readinessData);

  // Display results
  displayReadinessResults(results);

  // Scroll to results
  document.getElementById('readinessResults').scrollIntoView({
    behavior: 'smooth',
    block: 'nearest'
  });
}

/**
 * Display readiness check results
 */
function displayReadinessResults(results) {
  const resultsDiv = document.getElementById('readinessResults');
  resultsDiv.style.display = 'block';

  // Status card
  const statusDiv = document.getElementById('readinessStatus');
  statusDiv.innerHTML = '';
  statusDiv.style.background = `linear-gradient(135deg, ${results.status.color}15, ${results.status.color}05)`;
  statusDiv.style.borderColor = results.status.color;

  statusDiv.innerHTML = `
    <h4 style="color: ${results.status.color};">${results.status.icon} ${results.status.level}</h4>
    <p style="color: var(--text-primary);">${results.status.message}</p>
  `;

  // Issues list
  const attentionList = document.getElementById('attentionList');
  attentionList.innerHTML = '';

  if (results.issues.length > 0) {
    results.issues.forEach(issue => {
      const li = document.createElement('li');
      li.textContent = issue;
      attentionList.appendChild(li);
    });
  } else {
    attentionList.innerHTML = '<li style="border-left-color: var(--well-maintained-green);">No significant issues detected!</li>';
  }

  // Next steps
  document.getElementById('nextSteps').textContent = results.status.action;
}
