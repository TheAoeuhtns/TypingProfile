import { validKeys } from '../resources/constants';

class TypingMatrix {
  constructor(m) {
    if(m === undefined) {
      this.matrix = this.makeEmptyMatrix();
      this.resultsMatrix = [];
      this.sortedList = [];
    } else {
      // probably should make a deep copy
      this.matrix = m;
      this.resultsMatrix = this.populateResultsMatrix();
      this.sortedList = this.sort();
    }
  }

  //---- matrix Related functions ----

	makeEmptyMatrix() {
	  var emptyMatrix = {};
	  for(var key of validKeys) {
	    var emptyLine = {};
	    for(var keyTwo of validKeys) {
	      emptyLine[keyTwo] = [];
	    }
	    emptyMatrix[key] = emptyLine;
	  }
	  return emptyMatrix;
	}

  update(fromKey, toKey, betweenTime) {
    this.matrix[fromKey][toKey].push(betweenTime);
  }

  //---- resultsMatrix Related Functions ----

  populateResultsMatrix() {
    var emptyResultsMatrix = [];
    for(var fromKey of validKeys) {
      emptyResultsMatrix.push(new Array(validKeys.length).fill(0));
      for(var toKey of validKeys) {
        if(this.matrix[fromKey][toKey].length > 0) {
          emptyResultsMatrix[validKeys.indexOf(fromKey)][validKeys.indexOf(toKey)] = Math.trunc(this.matrix[fromKey][toKey].reduce((a,b) => a+b, 0)/this.matrix[fromKey][toKey].length);
        }
      }
    }
    return emptyResultsMatrix;
  }

  //---- sortedList Related Functions ----

  sort() { // sorted to be fastest -> slowest
    var sorted = [];
    for(var cOne in validKeys) {
      for(var cTwo in validKeys) {
        const pairData = { from: validKeys[cOne], to: validKeys[cTwo], betweenTime: this.resultsMatrix[cOne][cTwo] }
        sorted = this.insertSortPair(pairData, sorted);
      }
    }
    return sorted;
  }

  insertSortPair(pairData, sorted) {
    for(var i = 0; i < sorted.length; i++) {
      if(pairData.betweenTime < sorted[i].betweenTime) {
        sorted.splice(i, 0, pairData);
        return sorted;
      }
    }
    sorted.push(pairData);
    return sorted;
  }

  //---- Get functions ----

  getFastestTime() {
    // I doubt this function will ever be called when sortedList is not filled in
    // but just somehow it ever does, it checks just so it doesn't crash
    if(this.sortedList.length === 0) {
      return 0;
    }

    var i = 0;
    while(this.sortedList[i].betweenTime === 0) {
      i += 1;
    }
    return this.sortedList[i].betweenTime;
  }
}

export {TypingMatrix};
