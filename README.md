# Tattoo Touch-Up & Maintenance Timeline Calculator

> **Professional tattoo longevity prediction and maintenance planning tool.**

[![License](https://img.shields.io/github/license/Poli-International/touch-up-timeline)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/Poli-International/touch-up-timeline)](https://github.com/Poli-International/touch-up-timeline/commits/master)
[![GitHub Stars](https://img.shields.io/github/stars/Poli-International/touch-up-timeline?style=social)](https://github.com/Poli-International/touch-up-timeline/stargazers)

**Live Demo:** [https://poliinternational.com/tools/touch-up-timeline/](https://poliinternational.com/tools/touch-up-timeline/)

---

## 📋 Overview

The **Tattoo Touch-Up & Maintenance Timeline Calculator** helps tattoo enthusiasts and professionals predict when tattoos will need touch-ups, understand color fading patterns, plan maintenance schedules, and budget for lifetime tattoo care.

### Key Features

1. **⏱️ Touch-Up Timeline Calculator**
   - Predicts when tattoos need touch-ups based on:
     - Tattoo style (8 different styles)
     - Colors used (9 color options)
     - Body location (4 risk levels)
     - Sun exposure level
     - Care routine quality
   - Displays urgency indicator with color-coded alerts
   - Shows fading progress percentage
   - Provides personalized recommendations

2. **📉 Fading Predictor**
   - Visual timeline showing tattoo aging over 10-15 years
   - Color-coded fading progression (green → yellow → orange → red)
   - "Current Age" marker on timeline
   - Care comparison chart (excellent vs. good vs. poor care)

3. **📋 Maintenance Plan**
   - Daily, weekly, monthly, and annual care routines
   - Sun protection impact calculator
   - SPF usage recommendations
   - Years of tattoo life lost due to sun damage

4. **💰 Lifetime Cost Calculator**
   - 30-year cost projection
   - Touch-up frequency planning
   - Annual cost breakdown
   - Good care vs. poor care cost comparison
   - Savings calculator
   - Monthly budget planning recommendations

5. **✅ Touch-Up Readiness Checker**
   - Assesses current tattoo condition
   - Evaluates fading level, color loss, line blurring, detail loss
   - Provides readiness score (0-100)
   - Recommends next steps and timing

---

## 🎨 Design & Aesthetic

**Theme:** Time & Longevity
**Colors:**

- Primary: Blue (#3B82F6) to Purple (#8B5CF6) gradient
- Success: Green (#10B981)
- Warning: Orange (#F97316)
- Critical: Red (#EF4444)

**Features:**

- ✅ Dark mode support with localStorage persistence
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Smooth animations and transitions
- ✅ Accessible color contrasts
- ✅ Professional gradient header

---

## 📁 File Structure

```
touch-up-timeline/
├── index.html              # Main tool page
├── embed.html             # Embeddable widget version
├── README.md              # This file
├── css/
│   └── style.css          # Complete styling (1541 lines)
├── js/
│   ├── longevity-database.js  # Tattoo longevity data
│   ├── calculators.js         # Core calculation logic
│   ├── timeline.js            # Main app & UI logic
│   ├── common.js              # Dark mode & embed modal
│   └── feedback.js            # Community feedback form
└── images/
    └── Poli-International-Co.webp  # Logo (60px height)
```

---

## 🔧 Technical Details

### Data Science & Algorithms

#### Touch-Up Timeline Calculation

The calculator uses a multi-factor algorithm:

```javascript
baseLongevity = styleData.baseLongevity
totalModifier = styleModifier × locationModifier × sunModifier × careModifier × colorModifier
totalLongevity = baseLongevity × totalModifier
yearsRemaining = totalLongevity - currentAge
fadingProgress = (currentAge / totalLongevity) × 100
```

**Style Longevity (Base Years):**

- Tribal/Blackwork: 12 years (most durable)
- Black & Grey: 10 years
- Script/Text: 9 years
- Traditional Color: 8 years
- Black Realism: 7 years
- Color Realism: 6 years
- Fine Line: 5 years
- Watercolor: 4 years (least durable)

**Location Modifiers:**

- Covered areas: ×1.2
- Occasionally exposed: ×1.0
- Frequently exposed: ×0.7
- High friction: ×0.5

**Sun Exposure Modifiers:**

- Low: ×1.1
- Medium: ×0.85
- High: ×0.6

**Care Level Modifiers:**

- Excellent: ×1.3
- Good: ×1.0
- Fair: ×0.8
- Poor: ×0.5

**Color Longevity (Years):**

- Black: 10 years (most stable)
- Dark Blue: 8 years
- Green: 7 years
- Red: 6 years
- Purple: 5 years
- Orange: 4 years
- Yellow: 3 years
- Pink/Light: 3 years
- White: 2 years (least stable)

#### Urgency Levels

Based on years remaining:

- **Looking Great!** (5+ years): Green, no action needed
- **Plan Ahead** (3-5 years): Yellow, start planning
- **Schedule Soon** (1-3 years): Orange, book consultation
- **Overdue** (0-1 years): Red, immediate action

#### Sun Damage Calculation

```javascript
fadingAcceleration = sunHoursPerWeek × spfMultiplier
// SPF multipliers: Never = 8, Sometimes = 4, Always = 1
yearsLost = (sunHoursPerWeek × 52 × lossRate)
```

#### Lifetime Cost Projection

```javascript
numberOfTouchUps = floor(30 years / touchUpFrequency)
touchUpCost = initialCost × 0.5  // 50% of original
lifetimeCost = initialCost + (numberOfTouchUps × touchUpCost)
annualCost = lifetimeCost / 30
```

**Care Impact on Costs:**

- Excellent care: Touch-ups 1.5× less frequent → Save $$$
- Poor care: Touch-ups 0.6× more frequent → Cost $$$

#### Readiness Score (0-100)

```javascript
score = fadingLevel (0-40) + colorLoss (8 per color) +
        lineBlurring (0-30) + detailLoss (0-30)

Thresholds:
- 0-25: Still Looking Great (green)
- 25-45: Monitor Closely (yellow)
- 45-70: Touch-Up Recommended (orange)
- 70+: Needs Touch-Up Now (red)
```

---

## 🚀 Features Implemented

### SKILL.md Compliance

✅ **Standard Header**

- Logo (60px height)
- Title and subtitle
- Embed button with ⚡ icon
- Dark mode toggle with ◐ icon
- Gradient background (#3B82F6 to #8B5CF6)
- Sticky positioning

✅ **Community Feedback Section**

- Email input (required)
- Role dropdown (6 options)
- Feedback textarea (required)
- Submit button with ✉️ icon
- Web3Forms integration (access key: ebd0e138-c7aa-4290-b028-74d1c3fa8faa)
- Success/error messaging
- Form reset on success

✅ **Standard Footer**

- Logo display (60px)
- Ko-fi support button (45px height, exact)
- Support text
- Copyright © 2025 Poli International
- Disclaimer text
- 3px purple border-top

✅ **Embed Modal**

- Opens on button click
- Shows embed code for embed.html
- Copy button with clipboard functionality
- Close button (×)
- Click outside to close

✅ **Dark Mode**

- Toggle button in header
- LocalStorage persistence
- All text readable in both modes
- Border and background color adjustments

✅ **Common.js & Feedback.js**

- Shared functionality across all tools
- Consistent user experience

---

## 📱 Responsive Breakpoints

- **Desktop:** 1024px+ (full 3-column grids)
- **Tablet:** 768px-1024px (2-column grids)
- **Mobile:** 480px-768px (single column, stacked)
- **Small Mobile:** <480px (compressed text, adjusted sizes)

**Mobile Optimizations:**

- Header text shrinks to 1.25rem
- "Free Embed" text hides, icon shows
- Tabs stack vertically
- Color checkboxes go single column
- Result values shrink to 1.5rem
- Modal width adjusts to 95%

---

## 🎯 User Flow

1. **User arrives** → Sees gradient header, tabs, first calculator
2. **Fills out form** → Tattoo age, style, colors, location, sun exposure, care level
3. **Clicks "Calculate"** → JavaScript calculates timeline
4. **Results display** → Urgency card, stats, fading order, recommendations
5. **Switches to "Fading" tab** → Sees visual timeline and care comparison
6. **Explores other tabs** → Maintenance plan, cost calculator, readiness checker
7. **Submits feedback** → (Optional) Shares thoughts via Web3Forms
8. **Clicks "Embed"** → Gets iframe code for their website

---

## 🔗 Embed Usage

To embed this tool on your website:

1. Click the "⚡ Free Embed" button in the header
2. Copy the provided iframe code
3. Paste into your HTML

**Example:**

```html
<iframe src="https://your-domain.com/standalone-tools/touch-up-timeline/embed.html"
        width="100%"
        height="800"
        frameborder="0"
        style="border: 1px solid #e5e7eb; border-radius: 8px;">
</iframe>
```

**Embed Version Features:**

- Simplified header (no embed button in embed)
- Full calculator functionality
- Dark mode toggle
- Minimal footer
- No Ko-fi or feedback form (cleaner for embedding)

---

## 📊 Data Accuracy

**Sources & Validation:**

- Tattoo longevity data based on industry standards
- Style durability rankings from professional artists
- Color fading order based on ink pigment chemistry
- Sun damage calculations from dermatology research
- Location modifiers based on skin wear patterns

**Disclaimer:**
All calculations are **general guidelines**. Individual results vary significantly based on:

- Skin type and tone
- Ink quality and brand
- Artist technique
- Healing process
- Immune system
- Age and health
- Genetics

---

## 🛠️ Maintenance & Updates

### To Update Longevity Data

1. Edit `js/longevity-database.js`
2. Modify style longevities, color fading years, or modifiers
3. Save and refresh browser

### To Add New Styles

1. Add to `TattooLongevityData.styles` object
2. Add corresponding `<option>` in HTML
3. Set `baseLongevity` and `modifier`

### To Add New Colors

1. Add to `TattooLongevityData.colors` object
2. Add checkbox in HTML with color swatch
3. Set `fadingYears` and `longevityModifier`

---

## ✅ Testing Checklist

Before deploying:

- [ ] All 5 tabs functional
- [ ] Calculator produces results
- [ ] Fading timeline displays after calculation
- [ ] Sun damage calculator works
- [ ] Cost calculator computes correctly
- [ ] Readiness checker scores properly
- [ ] Dark mode toggles correctly
- [ ] Embed modal opens and copies code
- [ ] Feedback form submits successfully
- [ ] Mobile responsive (test on phone)
- [ ] Embed version loads and works
- [ ] Logo displays (60px height)
- [ ] Ko-fi button displays (45px height exactly)

---

## 🚀 Deployment

1. **Upload to server:**
   - Upload entire `touch-up-timeline/` folder
   - Maintain folder structure

2. **Test URLs:**
   - Main tool: `your-domain.com/standalone-tools/touch-up-timeline/index.html`
   - Embed: `your-domain.com/standalone-tools/touch-up-timeline/embed.html`

3. **Link from main site:**
   - Add to tools directory
   - Update navigation menus
   - Create marketing materials

---

## 📈 Future Enhancements

**Potential v2.0 Features:**

- Export results as PDF
- Save calculations to account
- Photo upload for AI fading analysis
- Email reminders for touch-up dates
- Integration with artist booking system
- Multi-tattoo tracking dashboard
- Social sharing of results
- Before/after photo gallery
- Artist directory with touch-up specialists

---

## 👨‍💻 Credits

**Built by:** Claude Code Agent System
**Client:** Poli International
**Version:** 1.0
**Date:** January 2025
**Tool ID:** #12 (Touch-Up Timeline Calculator)

**Agent Team:**

- Agent 1A: HTML Structure Builder ✅
- Agent 1B: CSS Styling Specialist ✅
- Agent 1C: JavaScript Logic Engineer ✅
- Agent 1D: Embeddable Widget Builder ✅

---

## 📧 Contact & Support

**Feedback:** Use the community feedback form on the tool
**Email:** <patrick@poli-international.com>
**Support Development:** [Ko-fi](https://ko-fi.com/C0C81NEXBV)

---

## 📜 License

© 2025 Poli International - Professional Tattoo & Piercing Supplies
All rights reserved.

This tool is provided as-is for informational and educational purposes.
Always consult with professional tattoo artists for personalized assessment.

---

**🎉 Ready to use! Open `index.html` in a browser to start calculating touch-up timelines!**
