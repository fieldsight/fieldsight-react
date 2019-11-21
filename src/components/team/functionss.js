/* eslint-disable */
function isOdd(num) {
  return num % 2;
}

const calculaterange = (start, end, step) => {
  //
  // //
  const range = [];
  const typeofStart = typeof start;
  const typeofEnd = typeof end;

  if (step === 0) {
    throw TypeError('Step cannot be zero.');
  }

  if (typeofStart === 'undefined' || typeofEnd === 'undefined') {
    throw TypeError('Must pass start and end arguments.');
  } else if (typeofStart !== typeofEnd) {
    throw TypeError('Start and end arguments must be of same type.');
  }

  if (typeof step === 'undefined') return (step = 1);

  if (end < start) {
    step = -step;
  }

  if (typeofStart === 'number') {
    while (step > 0 ? end >= start : end <= start) {
      if (end <= 10) {
        range.push(start.toFixed(2));
      } else {
        range.push(Math.round(start));
      }

      start += step;
    }
    if (isOdd(Math.round(end))) {
      if (end <= 10) {
        range.push(end.toFixed(2));
      } else {
        range.push(Math.round(end));
      }
    }
  } else if (typeofStart === 'string') {
    if (start.length !== 1 || end.length !== 1) {
      throw TypeError(
        'Only strings with one character are supported.',
      );
    }

    start = start.charCodeAt(0);
    end = end.charCodeAt(0);

    while (step > 0 ? end >= start : end <= start) {
      range.push(String.fromCharCode(start));
      start += step;
    }
  } else {
    throw TypeError('Only string and number types are supported');
  }

  return range;
};
