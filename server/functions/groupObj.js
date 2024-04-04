//function: groupObj.js
//return an object {key:indexParam, value:item[keyParam] grouped}
//for each object of the array, the value of the keyParam is assigned to indexParam, so to group the item property chosen, or the whole item,  for coincident values of each keyParam property.
//groupObj returns an array?

export function groupObj(array, keyParam) {
  const grouped = array.reduce((grouped, item) => {
    const indexParam = item[keyParam];

    if (grouped[indexParam] == null || !grouped[indexParam]) grouped[indexParam] = [];

    grouped[indexParam].push(item.name);

    return grouped;
  }, {});
  return grouped;
}