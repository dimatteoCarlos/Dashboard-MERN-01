//capitalize.js

//Method 00
export function capitalize(str) {
  const firstLetter = str.trim().substring(0, 1).toUpperCase();
  const restOfWord = str.trim().substring(1).toLowerCase();
  return firstLetter + restOfWord;
}

//Method 01
export function capitalize01(str) {
  const word = str.trim();
  return word.charAt(0).toUpperCase() + word.slice(1);
}

//Method 02
export function capitalize02(str) {
  return str.trim().replace(/./, (c) => c.toUpperCase());
}
//Method 03
export function capitalizeEachWord(str) {
  return str.replace(/(^\w|\s\w)/g, (c) => c.toUpperCase());
}

export function eachWordCapital(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
}
