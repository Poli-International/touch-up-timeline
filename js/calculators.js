/* =====================================================
   TATTOO TOUCH-UP CALCULATORS
   Core calculation logic for timeline predictions
   ===================================================== */

const TattooCalculators = {
  /**
   * Calculate touch-up timeline based on tattoo details
   * @param {Object} data - Tattoo data from form
   * @returns {Object} - Calculation results
   */
  calculateTouchUpTimeline(data) {
    const {
      tattooAge,
      tattooStyle,
      colors,
      bodyLocation,
      sunExposure,
      careLevel
    } = data;

    // Get base longevity from style
    const styleData = TattooLongevityData.styles[tattooStyle];
    let baseLongevity = styleData.baseLongevity;

    // Apply modifiers
    let totalModifier = 1.0;
    totalModifier *= styleData.modifier;
    totalModifier *= TattooLongevityData.locations[bodyLocation].longevityModifier;
    totalModifier *= TattooLongevityData.sunExposure[sunExposure].longevityModifier;
    totalModifier *= TattooLongevityData.careLevel[careLevel].longevityModifier;

    // Color modifier (average if multiple colors)
    if (colors.length > 0) {
      let colorModifier = 0;
      colors.forEach(color => {
        colorModifier += TattooLongevityData.colors[color].longevityModifier;
      });
      colorModifier = colorModifier / colors.length;
      totalModifier *= colorModifier;
    }

    // Calculate total longevity
    const totalLongevity = Math.round(baseLongevity * totalModifier * 10) / 10;

    // Calculate years until touch-up
    const yearsRemaining = Math.max(0, totalLongevity - tattooAge);

    // Calculate fading progress percentage
    const fadingProgress = Math.min(100, Math.round((tattooAge / totalLongevity) * 100));

    // Determine urgency level
    const urgency = this.determineUrgency(yearsRemaining);

    // Get fading order of colors
    const fadingOrder = this.calculateFadingOrder(colors, totalLongevity);

    // Generate recommendations
    const recommendations = this.generateRecommendations(data, yearsRemaining, urgency);

    return {
      currentAge: tattooAge,
      totalLongevity: totalLongevity,
      yearsRemaining: yearsRemaining,
      fadingProgress: fadingProgress,
      urgency: urgency,
      fadingOrder: fadingOrder,
      recommendations: recommendations
    };
  },

  /**
   * Determine urgency level based on years remaining
   */
  determineUrgency(yearsRemaining) {
    const levels = TattooLongevityData.urgencyLevels;

    if (yearsRemaining >= levels.no_rush.threshold) {
      return levels.no_rush;
    } else if (yearsRemaining >= levels.plan_ahead.threshold) {
      return levels.plan_ahead;
    } else if (yearsRemaining >= levels.schedule_soon.threshold) {
      return levels.schedule_soon;
    } else {
      return levels.overdue;
    }
  },

  /**
   * Calculate the order in which colors will fade
   */
  calculateFadingOrder(colors, totalLongevity) {
    if (colors.length === 0) return [];

    const fadingList = colors.map(colorKey => {
      const colorData = TattooLongevityData.colors[colorKey];
      const fadingTime = colorData.fadingYears * (totalLongevity / 8); // Normalize

      return {
        color: colorData.name,
        years: Math.round(fadingTime * 10) / 10,
        order: colorData.fadingOrder
      };
    });

    // Sort by fading order (fastest first)
    fadingList.sort((a, b) => a.order - b.order);

    return fadingList;
  },

  /**
   * Generate personalized recommendations
   */
  generateRecommendations(data, yearsRemaining, urgency) {
    const recommendations = [];

    // Care level recommendations
    if (data.careLevel === 'poor' || data.careLevel === 'fair') {
      recommendations.push({
        type: 'care',
        priority: 'high',
        text: 'Improve your care routine! Daily moisturizing and SPF 50+ can extend your tattoo life by 30-50%.'
      });
    }

    // Sun exposure recommendations
    if (data.sunExposure === 'high') {
      recommendations.push({
        type: 'sun',
        priority: 'high',
        text: 'High sun exposure is the #1 cause of fading. Apply SPF 50+ sunscreen every 2 hours when exposed.'
      });
    }

    // Location-specific advice
    if (data.bodyLocation === 'high_friction' || data.bodyLocation === 'frequently_exposed') {
      recommendations.push({
        type: 'location',
        priority: 'medium',
        text: 'Your tattoo location experiences high stress. Consider protective clothing and extra moisturizing.'
      });
    }

    // Color-specific advice
    const hasLightColors = data.colors.some(c =>
      ['yellow', 'pink_light_colors', 'white', 'orange'].includes(c)
    );
    if (hasLightColors) {
      recommendations.push({
        type: 'color',
        priority: 'medium',
        text: 'Light colors fade fastest. These will need touch-up before darker colors.'
      });
    }

    // Urgency-based recommendations
    if (urgency.level === 'Overdue' || urgency.level === 'Schedule Soon') {
      recommendations.push({
        type: 'urgent',
        priority: 'high',
        text: 'Contact your original artist or a reputable local artist for a touch-up consultation. Bring reference photos from when it was fresh.'
      });
    }

    return recommendations;
  },

  /**
   * Calculate sun damage impact
   */
  calculateSunDamage(sunHoursPerWeek, spfUsage) {
    let fadingAcceleration = 0;
    let yearsLost = 0;

    // Base calculation
    if (spfUsage === 'never') {
      fadingAcceleration = sunHoursPerWeek * 8; // 8% per hour per week
      yearsLost = (sunHoursPerWeek * 52 * 0.01); // Rough estimate
    } else if (spfUsage === 'sometimes') {
      fadingAcceleration = sunHoursPerWeek * 4;
      yearsLost = (sunHoursPerWeek * 52 * 0.005);
    } else {
      fadingAcceleration = sunHoursPerWeek * 1;
      yearsLost = (sunHoursPerWeek * 52 * 0.001);
    }

    fadingAcceleration = Math.min(100, Math.round(fadingAcceleration));
    yearsLost = Math.round(yearsLost * 10) / 10;

    let recommendation = '';
    if (fadingAcceleration > 50) {
      recommendation = '🚨 Critical: Your tattoo is fading MUCH faster than normal. You need SPF 50+ protection immediately!';
    } else if (fadingAcceleration > 30) {
      recommendation = '⚠️ Warning: Significant fading acceleration detected. Start using SPF 50+ every day.';
    } else if (fadingAcceleration > 15) {
      recommendation = '📊 Moderate: Some fading acceleration. Consider using SPF more consistently.';
    } else {
      recommendation = '✅ Good: Your sun protection routine is helping preserve your tattoo!';
    }

    return {
      fadingAcceleration: fadingAcceleration,
      yearsLost: yearsLost,
      recommendation: recommendation
    };
  },

  /**
   * Calculate lifetime cost of tattoo maintenance
   */
  calculateLifetimeCost(initialCost, touchUpFrequency) {
    const yearsToProject = 30;
    const numberOfTouchUps = Math.floor(yearsToProject / touchUpFrequency);

    // Touch-ups typically cost 40-60% of original
    const touchUpCost = Math.round(initialCost * 0.5);
    const totalTouchUpCost = numberOfTouchUps * touchUpCost;
    const lifetimeCost = initialCost + totalTouchUpCost;
    const annualCost = Math.round((lifetimeCost / yearsToProject) * 100) / 100;

    // Calculate with good care vs poor care
    const goodCareFrequency = touchUpFrequency * 1.5; // Touch up less often
    const goodCareTouchUps = Math.floor(yearsToProject / goodCareFrequency);
    const goodCareCost = initialCost + (goodCareTouchUps * touchUpCost);

    const poorCareFrequency = touchUpFrequency * 0.6; // Touch up more often
    const poorCareTouchUps = Math.floor(yearsToProject / poorCareFrequency);
    const poorCareCost = initialCost + (poorCareTouchUps * touchUpCost);

    const savings = poorCareCost - goodCareCost;

    return {
      lifetimeCost: lifetimeCost,
      annualCost: annualCost,
      numberOfTouchUps: numberOfTouchUps,
      touchUpCost: touchUpCost,
      goodCareCost: goodCareCost,
      goodCareTouchUps: goodCareTouchUps,
      poorCareCost: poorCareCost,
      poorCareTouchUps: poorCareTouchUps,
      savings: savings
    };
  },

  /**
   * Assess readiness for touch-up
   */
  assessTouchUpReadiness(readinessData) {
    let score = 0;
    const issues = [];

    // Fading level assessment
    if (readinessData.fadingLevel === 'significant') {
      score += 40;
      issues.push('Significant overall fading detected');
    } else if (readinessData.fadingLevel === 'moderate') {
      score += 25;
      issues.push('Moderate fading present');
    } else {
      score += 10;
    }

    // Color loss assessment
    const fadedColors = readinessData.fadedColors || [];
    if (fadedColors.length > 0) {
      score += fadedColors.length * 8;
      issues.push(`${fadedColors.length} color(s) showing significant fading`);
    }

    // Line blurring
    if (readinessData.lineBlurring === 'significant') {
      score += 30;
      issues.push('Lines are blurring and spreading');
    } else if (readinessData.lineBlurring === 'slight') {
      score += 15;
      issues.push('Some line softening detected');
    }

    // Detail loss
    if (readinessData.detailLoss === 'major') {
      score += 30;
      issues.push('Fine details are being lost');
    } else if (readinessData.detailLoss === 'some') {
      score += 15;
      issues.push('Minor detail degradation');
    }

    // Determine readiness status
    let status = {};
    if (score >= 70) {
      status = {
        level: 'Needs Touch-Up Now',
        color: '#EF4444',
        icon: '🚨',
        message: 'Your tattoo is showing significant wear and should be touched up soon to prevent further deterioration.',
        action: 'Book a consultation with your tattoo artist within the next 2-4 weeks.'
      };
    } else if (score >= 45) {
      status = {
        level: 'Touch-Up Recommended',
        color: '#F97316',
        icon: '⏰',
        message: 'Your tattoo is showing moderate wear. A touch-up in the next 3-6 months will restore its vibrancy.',
        action: 'Start planning your touch-up. Reach out to artists and discuss timing and cost.'
      };
    } else if (score >= 25) {
      status = {
        level: 'Monitor Closely',
        color: '#F59E0B',
        icon: '👀',
        message: 'Your tattoo is starting to show some wear. Keep an eye on it over the next 6-12 months.',
        action: 'Take photos now for comparison. Continue your care routine and reassess in 6 months.'
      };
    } else {
      status = {
        level: 'Still Looking Great!',
        color: '#10B981',
        icon: '✅',
        message: 'Your tattoo is in excellent condition. No immediate touch-up needed.',
        action: 'Keep up your current care routine! Reassess annually and compare to current photos.'
      };
    }

    return {
      score: score,
      status: status,
      issues: issues
    };
  },

  /**
   * Format currency for display
   */
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  },

  /**
   * Format years for display
   */
  formatYears(years) {
    if (years === 0) return 'Now';
    if (years < 1) return `${Math.round(years * 12)} months`;
    if (years === 1) return '1 year';
    return `${Math.round(years * 10) / 10} years`;
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TattooCalculators;
}
