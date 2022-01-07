import { validKeys } from '../resources/constants';

class TypingMatrix {
  constructor(m) {
    if(m === undefined) {
      this.matrix = this.makeEmptyMatrix();
    } else {
      // probably should make a deep copy
      this.matrix = m;
    }
  }

	makeEmptyMatrix() {
	  var emptyMatrix = {};
	  for(var key of validKeys) {
	    var emptyLine = {};
	    for(var keyTwo of validKeys) {
	      emptyLine[keyTwo] = 0;
	    }
	    emptyMatrix[key] = emptyLine;
	  }
	  return emptyMatrix;
	}

	update(fromKey, toKey, betweenTime) {
    if(this.matrix[fromKey][toKey] === 0) {
      this.matrix[fromKey][toKey] = betweenTime;
    } else {
      this.matrix[fromKey][toKey] = (this.matrix[fromKey][toKey] + betweenTime)/2;
    }
	}

  sort() { // sorted to be fastest -> slowest
    var sorted = [];
    for(var cOne of validKeys) {
      for(var cTwo of validKeys) {
        const pairData = { from: cOne, to: cTwo, betweenTime: this.matrix[cOne][cTwo] }
        sorted = this.insertPair(pairData, sorted);
      }
    }
    return sorted;
  }

  insertPair(pairData, sorted) {
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
