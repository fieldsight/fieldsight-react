/* eslint-disable no-restricted-syntax */
export default function copy(o) {
  let v;
  let key;
  const output = Array.isArray(o) ? [] : {};
  for (key in o) {
    if (key) {
      v = o[key];
      output[key] = typeof v === 'object' ? copy(v) : v;
    }
  }
  return output;
}
