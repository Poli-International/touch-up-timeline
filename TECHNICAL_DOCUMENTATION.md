# Touch-up Timeline Planner - Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Data Schemas](#data-schemas)
3. [Calculation / Logic Algorithms](#calculation--logic-algorithms)
4. [API Reference](#api-reference)
5. [Integration Guide](#integration-guide)
6. [Customization](#customization)
7. [Performance](#performance)
8. [Browser Compatibility](#browser-compatibility)
9. [Security](#security)
10. [Version History](#version-history)
11. [Support / Contact](#support--contact)

---

## Architecture Overview

### Technology Stack

- **HTML5** - Semantic markup with embedded schema.org structured data
- **CSS3** - Custom properties, flexbox, grid, responsive design
- **Vanilla JavaScript (ES6+)** - No frameworks, no dependencies
- **Web3Forms API** - For feedback form submission (external dependency)

### File Structure

```
touch-up-timeline/
├── index.html              # Main tool interface (calculator, fading predictor, maintenance, cost, readiness)
├── documentation.html      # Standalone documentation page
├── embed.html              # Embed code generator with iframe options
├── css/
│   └── style.css           # All styling (dark/light mode, responsive layout)
└── js/
    ├── longevity-database.js   # TattooLongevityData - static data constants
    ├── calculators.js          # TattooCalculators - core calculation logic
    ├── timeline.js             # Main app controller, UI handlers, DOM manipulation
    ├── common.js               # Theme toggle, embed modal, auto-resize iframe
    └── feedback.js             # Community feedback form handler
```

### Component / Logic Breakdown

| Component | File | Responsibility |
|-----------|------|----------------|
| Data Layer | `longevity-database.js` | Defines all tattoo style, color, location, sun exposure, care level, and urgency constants |
| Calculation Engine | `calculators.js` | Pure functions for timeline prediction, sun damage, lifetime cost, readiness assessment |
| UI Controller | `timeline.js` | Form handlers, tab navigation, result rendering, timeline visualization |
| Utilities | `common.js` | Dark/light mode, embed modal, iframe auto-resize, email subscription simulation |
| Feedback | `feedback.js` | Sends user feedback via Web3Forms to patrick@poli-international.com |

---

## Data Schemas

### `TattooLongevityData` (defined in `longevity-database.js`)

#### `styles` - Tattoo style definitions

```javascript
{
  black_and_grey: {
    name: 'Black & Grey',
    baseLongevity: 10,       // years before first touch-up
    modifier: 1.0,           // multiplier applied to base longevity
    description: 'Highly durable, ages well'
  },
  traditional_color: {
    name: 'Traditional / American Traditional',
    baseLongevity: 8,
    modifier: 0.9,
    description: 'Bold lines and colors last well'
  },
  color_realism: {
    name: 'Color Realism',
    baseLongevity: 6,
    modifier: 0.7,
    description: 'Complex shading fades faster'
  },
  black_realism: {
    name: 'Black & Grey Realism',
    baseLongevity: 7,
    modifier: 0.8,
    description: 'Detailed work may blur over time'
  },
  watercolor: {
    name: 'Watercolor',
    baseLongevity: 4,
    modifier: 0.5,
    description: 'Fades quickly, requires frequent touch-ups'
  },
  fine_line: {
    name: 'Fine Line / Single Needle',
    baseLongevity: 5,
    modifier: 0.6,
    description: 'Delicate lines spread and fade'
  },
  tribal_blackwork: {
    name: 'Tribal / Solid Blackwork',
    baseLongevity: 12,
    modifier: 1.2,
    description: 'Most durable style'
  },
  script_text: {
    name: 'Script / Lettering',
    baseLongevity: 9,
    modifier: 0.95,
    description: 'Depends on line weight and placement'
  }
}
```

#### `colors` - Color longevity data

```javascript
{
  black: {
    name: 'Black',
    fadingYears: 10,
    longevityModifier: 1.0,
    fadingOrder: 9          // 9 = lasts longest, 0 = fades fastest
  },
  dark_blue: {
    name: 'Dark Blue',
    fadingYears: 8,
    longevityModifier: 0.9,
    fadingOrder: 8
  },
  purple: {
    name: 'Purple',
    fadingYears: 5,
    longevityModifier: 0.7,
    fadingOrder: 5
  },
  red: {
    name: 'Red',
    fadingYears: 6,
    longevityModifier: 0.75,
    fadingOrder: 6
  },
  green: {
    name: 'Green',
    fadingYears: 7,
    longevityModifier: 0.8,
    fadingOrder: 7
  },
  yellow: {
    name: 'Yellow',
    fadingYears: 3,
    longevityModifier: 0.5,
    fadingOrder: 2
  },
  orange: {
    name: 'Orange',
    fadingYears: 4,
    longevityModifier: 0.6,
    fadingOrder: 3
  },
  pink_light_colors: {
    name: 'Pink/Light Colors',
    fadingYears: 3,
    longevityModifier: 0.5,
    fadingOrder: 1
  },
  white: {
    name: 'White',
    fadingYears: 2,
    longevityModifier: 0.4,
    fadingOrder: 0
  }
}
```

#### `locations` - Body placement modifiers

```javascript
{
  covered_areas: {
    name: 'Covered Areas (Torso, Upper Arms, Thighs)',
    longevityModifier: 1.2,
    fadingRisk: 'Low',
    description: 'Protected from sun and friction'
  },
  occasionally_exposed: {
    name: 'Occasionally Exposed (Forearms, Lower Legs)',
    longevityModifier: 1.0,
    fadingRisk: 'Moderate',
    description: 'Some sun exposure'
  },
  frequently_exposed: {
    name: 'Frequently Exposed (Hands, Face, Neck)',
    longevityModifier: 0.7,
    fadingRisk: 'High',
    description: 'Heavy sun exposure accelerates fading'
  },
  high_friction: {
    name: 'High Friction (Feet, Hands, Fingers)',
    longevityModifier: 0.5,
    fadingRisk: 'Very High',
    description: 'Constant friction and washing'
  }
}
```

#### `sunExposure` - Sun exposure modifiers

```javascript
{
  low: {
    name: 'Low - Usually covered',
    longevityModifier: 1.1,
    fadingAcceleration: '0%'
  },
  medium: {
    name: 'Medium - Sometimes exposed',
    longevityModifier: 0.85,
    fadingAcceleration: '15-30%'
  },
  high: {
    name: 'High - Frequently in sun',
    longevityModifier: 0.6,
    fadingAcceleration: '40-60%'
  }
}
```

#### `careLevel` - Aftercare quality modifiers

```javascript
{
  excellent: {
    name: 'Excellent - Daily moisturizer, always SPF',
    longevityModifier: 1.3,
    description: 'Extends tattoo life significantly'
  },
  good: {
    name: 'Good - Regular moisturizer, SPF when exposed',
    longevityModifier: 1.0,
    description: 'Standard care routine'
  },
  fair: {
    name: 'Fair - Occasional moisturizer, some SPF',
    longevityModifier: 0.8,
    description: 'Below optimal care'
  },
  poor: {
    name: 'Poor - Minimal care, no SPF',
    longevityModifier: 0.5,
    description: 'Accelerates fading significantly'
  }
}
```

#### `urgencyLevels` - Touch-up urgency thresholds

```javascript
{
  no_rush: {
    threshold: 5,            // years remaining
    level: 'Looking Great!',
    icon: '✅',
    color: '#10B981',
    message: 'Your tattoo is still in excellent condition. Keep up the great care routine!'
  },
  plan_ahead: {
    threshold: 3,
    level: 'Plan Ahead',
    icon: '📅',
    color: '#F59E0B',
    message: 'Start planning for a touch-up in the next few years. Schedule a consultation with your artist.'
  },
  schedule_soon: {
    threshold: 1,
    level: 'Schedule Soon',
    icon: '⏰',
    color: '#F97316',
    message: 'Touch-up recommended within the next year to maintain vibrancy and detail.'
  },
  overdue: {
    threshold: 0,
    level: 'Overdue',
    icon: '🚨',
    color: '#EF4444',
    message: 'Your tattoo is overdue for a touch-up. Significant fading may have occurred.'
  }
}
```

---

## Calculation / Logic Algorithms

All calculation functions live in `calculators.js` under the `TattooCalculators` object.

### `calculateTouchUpTimeline(data)` - Core timeline prediction

**Input:** `data` object with fields:
- `tattooAge` (number) - years since tattoo was done
- `tattooStyle` (string) - key from `TattooLongevityData.styles`
- `colors` (array of strings) - keys from `TattooLongevityData.colors`
- `bodyLocation` (string) - key from `TattooLongevityData.locations`
- `sunExposure` (string) - key from `TattooLongevityData.sunExposure`
- `careLevel` (string) - key from `TattooLongevityData.careLevel`

**Algorithm:**

1. Look up `baseLongevity` from `styles[tattooStyle]`
2. Initialize `totalModifier = 1.0`
3. Multiply `totalModifier` by:
   - `styles[tattooStyle].modifier`
   - `locations[bodyLocation].longevityModifier`
   - `sunExposure[sunExposure].longevityModifier`
   - `careLevel[careLevel].longevityModifier`
4. If colors are selected, calculate average color modifier:
   - Sum `colors[color].longevityModifier` for all selected colors
   - Divide by number of colors
   - Multiply `totalModifier` by this average
5. Calculate `totalLongevity = round(baseLongevity * totalModifier, 1 decimal)`
6. Calculate `yearsRemaining = max(0, totalLongevity - tattooAge)`
7. Calculate `fadingProgress = min(100, round((tattooAge / totalLongevity) * 100))`
8. Determine urgency by comparing `yearsRemaining` against urgency thresholds
9. Calculate fading order of colors (sorted by `fadingOrder` ascending)
10. Generate recommendations based on care level, sun exposure, location, colors, and urgency

**Output:** Object with:
- `currentAge`, `totalLongevity`, `yearsRemaining`, `fadingProgress` (numbers)
- `urgency` (object from `urgencyLevels`)
- `fadingOrder` (array of `{color, years, order}` objects)
- `recommendations` (array of `{type, priority, text}` objects)

### `determineUrgency(yearsRemaining)` - Urgency level lookup

**Input:** `yearsRemaining` (number)

**Logic:** Compare against `urgencyLevels` thresholds in descending order (no_rush >= 5, plan_ahead >= 3, schedule_soon >= 1, overdue < 1)

**Output:** One of the four urgency level objects

### `calculateFadingOrder(colors, totalLongevity)` - Color fading sequence

**Input:** `colors` (array of color keys), `totalLongevity` (number)

**Logic:** For each color, calculate `fadingTime = colorData.fadingYears * (totalLongevity / 8)`. Sort by `fadingOrder` ascending.

**Output:** Array of `{color: string, years: number, order: number}`

### `generateRecommendations(data, yearsRemaining, urgency)` - Personalized advice

**Logic:** Builds array of recommendation objects based on:
- Poor/fair care level -> high priority care improvement
- High sun exposure -> high priority SPF advice
- High friction/frequently exposed location -> medium priority
- Light colors present -> medium priority color-specific advice
- Overdue or schedule soon urgency -> high priority booking advice

### `calculateSunDamage(sunHoursPerWeek, spfUsage)` - Sun impact calculator

**Input:**
- `sunHoursPerWeek` (number)
- `spfUsage` (string: 'never', 'sometimes', 'always')

**Logic:**
- If SPF never: `fadingAcceleration = sunHours * 8`, `yearsLost = sunHours * 52 * 0.01`
- If SPF sometimes: `fadingAcceleration = sunHours * 4`, `yearsLost = sunHours * 52 * 0.005`
- If SPF always: `fadingAcceleration = sunHours * 1`, `yearsLost = sunHours * 52 * 0.001`
- Cap `fadingAcceleration` at 100

**Output:** `{fadingAcceleration: number, yearsLost: number, recommendation: string}`

### `calculateLifetimeCost(initialCost, touchUpFrequency)` - 30-year cost projection

**Input:**
- `initialCost` (number) - original tattoo cost in USD
- `touchUpFrequency` (number) - years between touch-ups

**Logic:**
- Project over 30 years
- `touchUpCost = initialCost * 0.5` (50% of original)
- `numberOfTouchUps = floor(30 / touchUpFrequency)`
- `lifetimeCost = initialCost + (numberOfTouchUps * touchUpCost)`
- Good care scenario: frequency * 1.5 (fewer touch-ups)
- Poor care scenario: frequency * 0.6 (more touch-ups)
- `savings = poorCareCost - goodCareCost`

**Output:** `{lifetimeCost, annualCost, numberOfTouchUps, touchUpCost, goodCareCost, goodCareTouchUps, poorCareCost, poorCareTouchUps, savings}`

### `assessTouchUpReadiness(readinessData)` - Readiness score

**Input:** Object with:
- `fadingLevel` (string: 'none', 'moderate', 'significant')
- `fadedColors` (array of strings)
- `lineBlurring` (string: 'none', 'slight', 'significant')
- `detailLoss` (string: 'none', 'some', 'major')

**Scoring:**
- Fading: none=10, moderate=25, significant=40
- Each faded color: +8
- Line blurring: none=0, slight=15, significant=30
- Detail loss: none=0, some=15, major=30

**Output:** `{score: number, status: {level, color, icon, message, action}, issues: array}`

### `formatCurrency(amount)` - USD formatting

Uses `Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0})`

### `formatYears(years)` - Human-readable year display

- 0 -> "Now"
- < 1 -> "X months"
- 1 -> "1 year"
- > 1 -> "X years"

---

## API Reference

All public functions are exposed on the `TattooCalculators` global object.

### `TattooCalculators.calculateTouchUpTimeline(data)`
- **Params:** `data` (object) - see input schema above
- **Returns:** Object with `currentAge`, `totalLongevity`, `yearsRemaining`, `fadingProgress`, `urgency`, `fadingOrder`, `recommendations`
- **Throws:** None (graceful defaults)

### `TattooCalculators.determineUrgency(yearsRemaining)`
- **Params:** `yearsRemaining` (number)
- **Returns:** Urgency level object from `TattooLongevityData.urgencyLevels`

### `TattooCalculators.calculateFadingOrder(colors, totalLongevity)`
- **Params:** `colors` (array of strings), `totalLongevity` (number)
- **Returns:** Array of `{color, years, order}` sorted by fading speed

### `TattooCalculators.generateRecommendations(data, yearsRemaining, urgency)`
- **Params:** `data` (object), `yearsRemaining` (number), `urgency` (object)
- **Returns:** Array of `{type, priority, text}` recommendation objects

### `TattooCalculators.calculateSunDamage(sunHoursPerWeek, spfUsage)`
- **Params:** `sunHoursPerWeek` (number), `spfUsage` (string)
- **Returns:** `{fadingAcceleration, yearsLost, recommendation}`

### `TattooCalculators.calculateLifetimeCost(initialCost, touchUpFrequency)`
- **Params:** `initialCost` (number), `touchUpFrequency` (number)
- **Returns:** `{lifetimeCost, annualCost, numberOfTouchUps, touchUpCost, goodCareCost, goodCareTouchUps, poorCareCost, poorCareTouchUps, savings}`

### `TattooCalculators.assessTouchUpReadiness(readinessData)`
- **Params:** `readinessData` (object)
- **Returns:** `{score, status, issues}`

### `TattooCalculators.formatCurrency(amount)`
- **Params:** `amount` (number)
- **Returns:** Formatted USD string (e.g., "$500")

### `TattooCalculators.formatYears(years)`
- **Params:** `years` (number)
- **Returns:** Human-readable string (e.g., "2.5 years", "6 months")

---

## Integration Guide

### Standalone Embed via iframe

The tool is a self-contained static HTML/CSS/JS application with zero server-side dependencies. Embed it on any website using an iframe:

```html
<!-- Standard version (recommended) -->
<iframe
  src="https://poliinternational.com/tools/touch-up-timeline/index.html"
  width="100%"
  height="800"
  frameborder="0"
  style="border: 1px solid #ddd; border-radius: 8px;"
  title="Touch-up Timeline by Poli International">
</iframe>
```

### Available Embed Sizes

| Version | Height | Use Case |
|---------|--------|----------|
| Compact | 600px | Space-constrained layouts |
| Standard | 800px | General purpose (recommended) |
| Large | 1000px | Dedicated tool pages |

### Auto-Resize Behavior

The tool automatically sends its height to the parent window via `window.parent.postMessage({ height: number }, '*')` on load, resize, and content changes. If your site can handle these messages, you can dynamically adjust the iframe height.

### Dark Mode

The tool respects a `theme` message from the parent:
```javascript
window.parent.postMessage({ theme: 'light' }, '*');
window.parent.postMessage({ theme: 'dark' }, '*');
```

Users can also toggle dark/light mode locally via the ◐ button in the header.

### No Dependencies

The tool requires no external libraries, API keys, or configuration. It works immediately when loaded in any modern browser.

---

## Customization

### Styling Overrides

The tool uses CSS custom properties for theming. If embedding, you cannot directly modify the tool's CSS, but you can style the iframe container:

```html
<iframe
  src="https://poliinternational.com/tools/touch-up-timeline/index.html"
  width="100%"
  height="800"
  frameborder="0"
  style="border: 2px solid #B76E79; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
</iframe>
```

### Tab Navigation

The tool has 5 tabs accessible via the UI:
1. **Touch-Up Calculator** - Main timeline prediction
2. **Fading Predictor** - Visual timeline and care comparison
3. **Maintenance Plan** - Personalized aftercare schedule
4. **Lifetime Costs** - 30-year cost projection
5. **Touch-Up Readiness** - Self-assessment checklist

---

## Performance

- **Bundle size:** Approximately 25KB total (HTML + CSS + JS)
- **No external resources:** No CDN fonts, icons, or libraries
- **Zero network requests** after initial page load (except feedback form submission)
- **DOM manipulation:** Targeted updates only (no full re-renders)
- **Event delegation:** Minimal event listeners via form submit handlers
- **MutationObserver:** Used only for iframe height auto-resize

---

## Browser Compatibility

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| iOS Safari | 14+ |
| Android Chrome | 90+ |

**Features used:**
- ES6 modules (via script tags, not import/export)
- `Intl.NumberFormat`
- `fetch` API
- `MutationObserver`
- `window.postMessage`
- CSS custom properties
- CSS Grid and Flexbox
- `localStorage`

---

## Security

### Input Handling

- All user inputs are parsed as numbers or strings via standard DOM value access
- No `innerHTML` is used with user-supplied data (all dynamic content uses `textContent` or structured template literals with controlled values)
- Color values from checkboxes are validated against the known `TattooLongevityData.colors` keys
- Form values are read directly from DOM elements, not from URL parameters or external sources

### XSS Prevention

- The tool does not render any user-supplied HTML
- All dynamic text is inserted via `textContent` or controlled template strings
- No `eval()`, `document.write()`, or `setTimeout()` with string arguments
- The feedback form submits to Web3Forms API via `fetch()` with JSON body

### Data Privacy

- No cookies are set
- No tracking scripts
- No analytics
- No user data is stored server-side
- Feedback emails are sent to patrick@poli-international.com via Web3Forms (third-party service)
- Theme preference is stored in `localStorage` (client-side only)

### iframe Security

- The tool sends `postMessage` to the parent window for height auto-resize
- No sensitive data is transmitted via `postMessage`
- The embed code uses `frameborder="0"` and optional `sandbox` attributes

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01 | Initial release |

---

## Support / Contact

For technical support, integration assistance, or bug reports:

- **Email:** patrick@poli-international.com
- **Website:** https://poliinternational.com
- **Documentation:** https://poliinternational.com/touch-up-timeline-documentation/
- **Feedback:** Use the feedback form within the tool (sends to patrick@poli-international.com via Web3Forms)
