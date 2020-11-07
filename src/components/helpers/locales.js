export default function inPrimaryLocale(text, locale = 'en') {
  return JSON.parse(text)[locale]
}