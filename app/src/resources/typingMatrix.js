import { validKeys } from '../resources/constants';

class TypingMatrix {
  constructor(m) {
    if(m === undefined) {
      this.matrix = this.makeEmptyMatrix();
      this.resultsMatrix = [];
    } else {
      // probably should make a deep copy
      this.matrix = m;
      this.resultsMatrix = this.populateResultsMatrix();
    }
  }

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

  makeEmptyResultsMatrix() {
    var emptyMatrix = [];
    for(var key of validKeys) {
      emptyMatrix.push(new Array(validKeys.length).fill(0));
    }
    return emptyMatrix;
  }

  populateResultsMatrix() {
    var emptyResultsMatrix = [];
    for(var fromKey of validKeys) {
      emptyResultsMatrix.push(new Array(validKeys.length).fill(0));
      for(var toKey of validKeys) {
        if(this.matrix[fromKey][toKey].length > 0) {
          emptyResultsMatrix[validKeys.indexOf(fromKey)][validKeys.indexOf(toKey)] = this.matrix[fromKey][toKey].reduce((a,b) => a+b, 0)/this.matrix[fromKey][toKey].length;
        }
      }
    }
    return emptyResultsMatrix;
  }

	update(fromKey, toKey, betweenTime) {
    this.matrix[fromKey][toKey].push(betweenTime);
	}

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
}

export {TypingMatrix};
