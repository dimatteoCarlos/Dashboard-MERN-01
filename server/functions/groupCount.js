//function: groupCount.js
//return an object {key:indexParam, value:groupCounted}
//for each object of the array, the value of the keyParam is assigned to indexParam, so to accumulate or to count the coincident values of keyParam property.

export function groupCount(array, keyParam) {
  const groupCounted = array.reduce((grouped, item) => {
    const indexParam = item[keyParam];

    if (grouped[indexParam] == null || !grouped[indexParam]) {
      grouped[indexParam] = 0;
    }

    //accumulator{indexParam:grouped.value}

    grouped[indexParam]++;

    return grouped;
  }, {});

  return groupCounted;
}
