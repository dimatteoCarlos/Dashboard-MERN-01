//reverseToken.js
//this fn reverses the object values entered

export function reverseToken(Objeto) {
  const keyObject = Object.keys(Objeto);
  const valuesObject = Object.values(Objeto);

  // console.log({ keyObject }, keyObject.length);

  // console.log({ valuesObject }, valuesObject.length);

  let arrKeyOfObj = [],
    arrValueOfObj = [];

  const keyObjectLength = keyObject.length;
  for (let elem = 0; elem < keyObjectLength; elem++) {
    arrKeyOfObj[elem] = Object.keys(valuesObject[elem]);

    arrValueOfObj[elem] = Object.values(valuesObject[elem]).reverse();
  }

  // console.log({ arrKeyOfObj }, { arrValueOfObj });

  let newObj = {};
  for (let k = 0; k < keyObject.length; k++) {
    for (let i = 0; i < arrKeyOfObj[k].length; i++) {
      newObj[keyObject[k]] = {
        ...newObj[keyObject[k]],
        [arrKeyOfObj[k][i]]: arrValueOfObj[k][i],
      };
    }
  }
  // console.log({ newObj });
  return newObj;
}
