export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const dashCase = (s) => s.replace(/\s+/g, '-').toLowerCase();
