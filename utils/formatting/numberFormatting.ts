/**
 * Number formatting utility functions
 */

// Format number with commas (e.g., 1,234,567)
export const formatNumber = (number: number): string => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Format currency (e.g., $1,234.56)
export const formatCurrency = (amount: number, currency: string = 'USD', locale: string = 'en-US'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

// Shorten large numbers (e.g., 1.2k, 1.2M)
export const shortenNumber = (number: number): string => {
  const tiers = [
    { threshold: 1e9, suffix: 'B' },
    { threshold: 1e6, suffix: 'M' },
    { threshold: 1e3, suffix: 'k' },
  ];
  
  for (const { threshold, suffix } of tiers) {
    if (number >= threshold) {
      return (number / threshold).toFixed(1).replace(/\.0$/, '') + suffix;
    }
  }
  
  return number.toString();
};