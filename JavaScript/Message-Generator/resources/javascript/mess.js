let nounArray = [];
let arrCheck = 0;
let saySize = 0;

// Extract nouns possibly acting as verbs
const extractNounArray = (nouns, verbsAsNouns, adjsAsNouns) => {
  let result1 = nouns.filter(x => !verbsAsNouns.includes(x));
  let result2 = result1.filter(x => !adjsAsNouns.includes(x));
  return result2;
}
// console.log(extractNounArray(nouns, verbsAsNouns));

nounArray = extractNounArray(nouns, verbsAsNouns, adjsAsNouns);
// console.log(nounArray);

// Limits the length of the sayings 
const restrictSayingSize = () => {
  let restrictSayings = [];

  for (let i = 0; i < sayings.length; i++) {
    if (sayings[i].length > 1 && sayings[i].length < 300) {
      restrictSayings.push(sayings[i]);
    }
  }
  return restrictSayings;
}
// console.log(restrictSayingSize());


// Picks a random saying
const pickSaying = () => {
  let restrictSaying = restrictSayingSize();
  const rSI = Math.floor(Math.random() * restrictSaying.length);
  let restrictedSaying = restrictSaying[rSI];
  // console.log(restrictedSaying);
  saySize = restrictedSaying.length;
  return restrictedSaying;
}
// console.log(pickSaying());


// Picks a random noun
const pickNoun = () => {
  let esFlag = false;
  let yFlag = false;
  let plsFlag = false;
  const rNI = Math.floor(Math.random() * nounArray.length);
  let noun = nounArray[rNI];
  if (noun.charAt(noun.length - 1) === 'x' || (noun.charAt(noun.length - 1) === 's' && noun.charAt(noun.length - 2) === 's' || (noun.charAt(noun.length - 1) === 'h' && noun.charAt(noun.length - 2) === 'c'))) {
    esFlag = true;
  }
  else if ((noun.charAt(noun.length - 1) === 's' && (noun.charAt(noun.length - 2) != 'i'|| noun.charAt(noun.length - 2) != 'u' || noun.charAt(noun.length - 2) != 'a')) || (noun.charAt(noun.length - 1) === 'n' && noun.charAt(noun.length - 2) === 'e' && noun.charAt(noun.length - 3) === 'm')) {
    plsFlag = true;
  }
  else if (noun.charAt(noun.length - 1) === 'y' && (noun.charAt(noun.length - 2) != 'e' || noun.charAt(noun.length - 2) != 'a')) {
    yFlag = true;
  }
  console.log(noun, esFlag, yFlag, plsFlag);
  return [noun, esFlag, yFlag, plsFlag];
}
// console.log(pickNoun());


// Picks a random adjective
const pickAdjective = adjectives => {
  let adjFlag = false;
  const rAI = Math.floor(Math.random() * adjectives.length);
  let adjective = adjectives[rAI];
  if (adjective.charAt(0) === 'a' || adjective.charAt(0) === 'e' || adjective.charAt(0) === 'i' || adjective.charAt(0) === 'o' || adjective.charAt(0) === 'u') {
    adjFlag = true;
  }
  return [adjective, adjFlag];
}
// console.log(pickAdjective(adjectives));


// Compares the nouns in the saying to the array of nouns and outputs an array with the noun, the plural flag, and if there was a previous a/an string.
const findNouns = () => {
  let count = 0;
  let sayingArray = [];
  const arrNouns = nounArray;

  while (count < 1) {
    let said = pickSaying();
    says = said.toLowerCase();
    let x = 0, y = 0;
    let plural = false;
    let prevA = '';

    for (let i = 0; i < says.length; i++) {
      for (let j = 0; j < arrNouns.length; j++) {
        if (says[i] === arrNouns[j][0]) {
          if (says[i - 1] === ' ' || !says.charAt(i - 1)) {
            for (let k = i; k < i + arrNouns[j].length; k++) {
              if (says[k] == arrNouns[j][k - i]) {
                y++;
              }
              if (y === arrNouns[j].length) {
                if (says[k + 1] === ' ' || says[k + 1] === ',' || !says.charAt(k + 1) ||
                  (says[k + 1] === 's' && (says[k + 2] === ' ' || !says.charAt(k + 2))) ||
                  (says[k + 1] === 'e' && says[k + 2] === 's' && (says[k + 3] === ' ' || !says.charAt(k + 3)))) {
                  if (says[k + 1] === 's' && (says[k + 2] === ' ' || !says.charAt(k + 2))) {
                    if (says[i - 2] === 'a' && (says[i - 3] === ' ' || !says.charAt(i - 3))) {
                      prevA = 'a';
                    }
                    else if (says[i - 2] === 'n' && says[i - 3] === 'a' && (says[i - 4] === ' ' || !says.charAt(i - 4))) {
                      prevA = 'an';
                    }
                    else {
                      prevA = '';
                    }
                    plural = true;
                    sayingArray.push('', [arrNouns[j] + 's', plural, prevA]);
                    x++;
                    count++;
                  }
                  else if (says[k + 1] === 'e' && says[k + 2] === 's' && (says[k + 3] === ' ' || !says.charAt(k + 3))) {
                    if (says[i - 2] === 'a' && (says[i - 3] === ' ' || !says.charAt(i - 3))) {
                      prevA = 'a';
                    }
                    else if (says[i - 2] === 'n' && says[i - 3] === 'a' && (says[i - 4] === ' ' || !says.charAt(i - 4))) {
                      prevA = 'an';
                    }
                    else {
                      prevA = '';
                    }
                    plural = true;
                    sayingArray.push('', [arrNouns[j] + 'es', plural, prevA]);
                    x++;
                    count++;
                  }
                  else {
                    if (says[i - 2] === 'a' && (says[i - 3] === ' ' || !says.charAt(i - 3))) {
                      prevA = 'a';
                    }
                    else if (says[i - 2] === 'n' && says[i - 3] === 'a' && (says[i - 4] === ' ' || !says.charAt(i - 4))) {
                      prevA = 'an';
                    }
                    else {
                      prevA = '';
                    }
                    sayingArray.push('', [arrNouns[j], plural, prevA]);
                    x++;
                    count++;
                  }
                }
              }
            }
            y = 0;
          }
        }
      }
    }
    sayingArray[0] = says;
  }
  arrCheck = sayingArray.length;
  console.log(sayingArray);
  return sayingArray;
}
// console.log(findNouns());


// Turns the saying into an array of words and puncuation
const toArraySaying = () => {
  const ArrSaying = findNouns();
  let store = [];
  store = ArrSaying[0].split(/([ , ; ' ])/);
  ArrSaying[0] = store;
  if (ArrSaying.length === arrCheck) {
    return ArrSaying;
  }
  else {
    return 'error';
  }

}
// console.log(toArraySaying());

// debugger;

// // // Compares the nouns in the saying to the array of nouns and replaces them with a random adjective and noun.
const replaceNouns = () => {
  let temp = toArraySaying();
  if (temp !== 'error') {
    let says = temp[0];
    let recIndexes = [];
    let countRan = 0;
    let rand = 0;
    let ranIndex = 0;
    let ranIndexIndex = [];
    let adjFlag = false;

    for (i = 0; i < says.length; i++) {
      for (j = 1; j < temp.length; j++) {
        if (says[i] === temp[j][0]) {
          if (recIndexes.indexOf(says[i]) === -1) {
            recIndexes.push([i, temp[j][1], temp[j][2]]);
          }
        }
      }
    }

    if (recIndexes.length !== 0) {
      if (saySize > 40) {
        countRan = -1;
      }
      if (saySize > 80) {
        countRan = -2;
      }
      if (saySize > 120) {
        countRan = -3;
      }
      if (saySize > 160) {
        countRan = -4;
      }

      // debugger;

      while (countRan < 1) {
        rand = Math.floor(Math.random() * recIndexes.length);
        ranIndex = recIndexes[rand][0];
        while (ranIndexIndex.includes(ranIndex)) {
          rand = Math.floor(Math.random() * recIndexes.length);
          ranIndex = recIndexes[rand][0];
          if (!ranIndexIndex.includes(ranIndex)) {
            break;
          }
        }

        let pickAdj = pickAdjective(adjectives);
        adjFlag = pickAdj[1];
        let pickNou = pickNoun();
        let esFlag = pickNou[1];
        let yFlag = pickNou[2];
        let plsFlag = pickNou[3];

        if (recIndexes[rand][1] === true) {

          if (esFlag === false && yFlag === false && plsFlag === false) {
            says[ranIndex] = pickAdj[0] + ' ' + pickNou[0] + 's';
            ranIndexIndex.push(ranIndex);
          }
          else if (yFlag === true) {
            let pN = pickNou[0].slice(0, pickNou[0].length - 1);
            says[ranIndex] = pickAdj[0] + ' ' + pN + 'ies';
            ranIndexIndex.push(ranIndex);
          }
          else {
            says[ranIndex] = pickAdj[0] + ' ' + pickNou[0] + 'es';
            ranIndexIndex.push(ranIndex);
          }
        }
        else if (recIndexes[rand][1] === false && plsFlag === true && pickNou[0].charAt(pickNou[0].length - 1) === 's') {
          let pN = pickNou[0].slice(0, pickNou[0].length - 1);
          says[ranIndex] = pickAdj[0] + ' ' + pN;
          ranIndexIndex.push(ranIndex);
        }
        else {
          says[ranIndex] = pickAdj[0] + ' ' + pickNou[0];
          ranIndexIndex.push(ranIndex);
        }

        console.log(recIndexes);
        console.log(adjFlag);

        // debugger;

        if (recIndexes[rand][2] === 'a' && adjFlag === true) {
          for (let i = 0; i < says.length; i++) {
            if (says[i] === 'a' && says[i + 1] === ' ' && (says[i + 2].charAt(0) === 'a' || says[i + 2].charAt(0) === 'e' ||
              says[i + 2].charAt(0) === 'i' || says[i + 2].charAt(0) === 'o' || says[i + 2].charAt(0) === 'u')) {
              says[i] = 'an';
            }
          }
        }
        if (recIndexes[rand][2] === 'an' && adjFlag === false) {
          for (let i = 0; i < says.length; i++) {
            if (says[i] === 'an' && says[i + 1] === ' ') {
              says[i] = 'a';
            }
          }
        }

        countRan++;

        if (recIndexes.length === 1) {
          break;
        }
        if (recIndexes.length === 2 && countRan === 2) {
          break;
        }
      }
    }
    else {
      return 'error';
    }
    console.log(says);
    // debugger;
    return says;
  }
  else {
    return 'error';
  }
}
console.log(replaceNouns());


// Joins the saying array back together, capitalising the first letter.
const deliverMessage = () => {
  let finalSaying = replaceNouns();
  if (finalSaying !== 'error') {
    const firstWord = finalSaying[0];
    const firstChar1 = firstWord.charAt(0).toUpperCase();
    const remainingChars1 = firstWord.slice(1);
    finalSaying[0] = `${firstChar1}${remainingChars1}`;
    for (i = 0; i < finalSaying.length; i++) {
      if (finalSaying[i] === 'i' && (finalSaying[i - 1] === ' ' || !finalSaying[i].charAt(i - 1)) && (finalSaying[i + 1] === ' ' || !finalSaying[i].charAt(i + 1) || finalSaying[i + 1] === "'")) {
        finalSaying[i] = 'I';
      }
    }
    let fs = finalSaying.join('') + '.';
    console.log(fs);
    document.getElementById("message").innerHTML = fs;
    arrCheck = 0;
    return fs;
  }
  else {
    return 'error';
  }
}
// console.log(deliverMessage());


window.onload = () => {
  let test = deliverMessage();
  while (test === 'error') {
    deliverMessage();
    if (test !== 'error') {
      break;
    }
  }
}
