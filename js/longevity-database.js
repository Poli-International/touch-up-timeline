/* =====================================================
   TATTOO LONGEVITY DATABASE
   Comprehensive data for touch-up timeline calculations
   ===================================================== */

const TattooLongevityData = {
  // Tattoo styles and their base longevity (years before first touch-up needed)
  styles: {
    'black_and_grey': {
      name: 'Black & Grey',
      baseLongevity: 10,
      modifier: 1.0,
      description: 'Highly durable, ages well'
    },
    'traditional_color': {
      name: 'Traditional / American Traditional',
      baseLongevity: 8,
      modifier: 0.9,
      description: 'Bold lines and colors last well'
    },
    'color_realism': {
      name: 'Color Realism',
      baseLongevity: 6,
      modifier: 0.7,
      description: 'Complex shading fades faster'
    },
    'black_realism': {
      name: 'Black & Grey Realism',
      baseLongevity: 7,
      modifier: 0.8,
      description: 'Detailed work may blur over time'
    },
    'watercolor': {
      name: 'Watercolor',
      baseLongevity: 4,
      modifier: 0.5,
      description: 'Fades quickly, requires frequent touch-ups'
    },
    'fine_line': {
      name: 'Fine Line / Single Needle',
      baseLongevity: 5,
      modifier: 0.6,
      description: 'Delicate lines spread and fade'
    },
    'tribal_blackwork': {
      name: 'Tribal / Solid Blackwork',
      baseLongevity: 12,
      modifier: 1.2,
      description: 'Most durable style'
    },
    'script_text': {
      name: 'Script / Lettering',
      baseLongevity: 9,
      modifier: 0.95,
      description: 'Depends on line weight and placement'
    }
  },

  // Color longevity modifiers (how fast each color fades)
  colors: {
    'black': {
      name: 'Black',
      fadingYears: 10,
      longevityModifier: 1.0,
      fadingOrder: 9 // 9 = lasts longest, 1 = fades fastest
    },
    'dark_blue': {
      name: 'Dark Blue',
      fadingYears: 8,
      longevityModifier: 0.9,
      fadingOrder: 8
    },
    'purple': {
      name: 'Purple',
      fadingYears: 5,
      longevityModifier: 0.7,
      fadingOrder: 5
    },
    'red': {
      name: 'Red',
      fadingYears: 6,
      longevityModifier: 0.75,
      fadingOrder: 6
    },
    'green': {
      name: 'Green',
      fadingYears: 7,
      longevityModifier: 0.8,
      fadingOrder: 7
    },
    'yellow': {
      name: 'Yellow',
      fadingYears: 3,
      longevityModifier: 0.5,
      fadingOrder: 2
    },
    'orange': {
      name: 'Orange',
      fadingYears: 4,
      longevityModifier: 0.6,
      fadingOrder: 3
    },
    'pink_light_colors': {
      name: 'Pink/Light Colors',
      fadingYears: 3,
      longevityModifier: 0.5,
      fadingOrder: 1
    },
    'white': {
      name: 'White',
      fadingYears: 2,
      longevityModifier: 0.4,
      fadingOrder: 0
    }
  },

  // Body location modifiers
  locations: {
    'covered_areas': {
      name: 'Covered Areas (Torso, Upper Arms, Thighs)',
      longevityModifier: 1.2,
      fadingRisk: 'Low',
      description: 'Protected from sun and friction'
    },
    'occasionally_exposed': {
      name: 'Occasionally Exposed (Forearms, Lower Legs)',
      longevityModifier: 1.0,
      fadingRisk: 'Moderate',
      description: 'Some sun exposure'
    },
    'frequently_exposed': {
      name: 'Frequently Exposed (Hands, Face, Neck)',
      longevityModifier: 0.7,
      fadingRisk: 'High',
      description: 'Heavy sun exposure accelerates fading'
    },
    'high_friction': {
      name: 'High Friction (Feet, Hands, Fingers)',
      longevityModifier: 0.5,
      fadingRisk: 'Very High',
      description: 'Constant friction and washing'
    }
  },

  // Sun exposure modifiers
  sunExposure: {
    'low': {
      name: 'Low - Usually covered',
      longevityModifier: 1.1,
      fadingAcceleration: '0%'
    },
    'medium': {
      name: 'Medium - Sometimes exposed',
      longevityModifier: 0.85,
      fadingAcceleration: '15-30%'
    },
    'high': {
      name: 'High - Frequently in sun',
      longevityModifier: 0.6,
      fadingAcceleration: '40-60%'
    }
  },

  // Care level modifiers
  careLevel: {
    'excellent': {
      name: 'Excellent - Daily moisturizer, always SPF',
      longevityModifier: 1.3,
      description: 'Extends tattoo life significantly'
    },
    'good': {
      name: 'Good - Regular moisturizer, SPF when exposed',
      longevityModifier: 1.0,
      description: 'Standard care routine'
    },
    'fair': {
      name: 'Fair - Occasional moisturizer, some SPF',
      longevityModifier: 0.8,
      description: 'Below optimal care'
    },
    'poor': {
      name: 'Poor - Minimal care, no SPF',
      longevityModifier: 0.5,
      description: 'Accelerates fading significantly'
    }
  },

  // Urgency levels for touch-up recommendations
  urgencyLevels: {
    'no_rush': {
      threshold: 5, // Years remaining
      level: 'Looking Great!',
      icon: '✅',
      color: '#10B981',
      message: 'Your tattoo is still in excellent condition. Keep up the great care routine!'
    },
    'plan_ahead': {
      threshold: 3,
      level: 'Plan Ahead',
      icon: '📅',
      color: '#F59E0B',
      message: 'Start planning for a touch-up in the next few years. Schedule a consultation with your artist.'
    },
    'schedule_soon': {
      threshold: 1,
      level: 'Schedule Soon',
      icon: '⏰',
      color: '#F97316',
      message: 'Touch-up recommended within the next year to maintain vibrancy and detail.'
    },
    'overdue': {
      threshold: 0,
      level: 'Overdue',
      icon: '🚨',
      color: '#EF4444',
      message: 'Your tattoo is overdue for a touch-up. Significant fading may have occurred.'
    }
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TattooLongevityData;
}
