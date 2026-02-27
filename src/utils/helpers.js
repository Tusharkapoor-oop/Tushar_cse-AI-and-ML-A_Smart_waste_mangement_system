export const formatCurrency = (value, locale = 'en-IN') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(value);

export const formatPercent = (value) => `${Number(value).toFixed(1)}%`;

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

export const ecoCreditFromWeight = (grams) => Number(((grams / 10) * 0.1).toFixed(2));
