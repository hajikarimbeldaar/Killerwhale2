/**
 * Utility for dynamic SEO dates (Month Year)
 * Used to provide "freshness" signals to search engines.
 */
export const getCurrentMonthYear = () => {
  const now = new Date()
  return now.toLocaleString('en-IN', { month: 'long', year: 'numeric' })
}

export const getCurrentYear = () => {
  return new Date().getFullYear().toString()
}
