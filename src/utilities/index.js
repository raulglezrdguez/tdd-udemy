/**
 * @function formatCurrency
 * Format number as currency
 *
 * @param {number} amount
 * @returns {string} amount formatted as currency
 *
 * @example
 *  formatCurrency(0)
 *  => $0.00
 *
 * @example
 *  formatCurrency(2.5)
 *  => $2.50
 *
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};
