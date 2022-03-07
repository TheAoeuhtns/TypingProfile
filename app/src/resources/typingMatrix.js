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

  // returns an object with:
  // {
  //  reducedMatrix: [Number[]], a 2d array with rows/columns in resultsMatrix that are entirely 0s removed
  //  rowKeys: String[], a list of keys matching the rows of the reducedMatrix (from keys)
  //  colKeys: String[], a list of keys matching the columns of the reducedMatrix (to keys)
  // }
  makeReducedResultsMatrix() {
    var reducedMatrix = [];
    var rowKeys = [];
    var colKeys = [];
    //Rows
    for(var i=0; i<validKeys.length; i++) {
      if(!this.resultsMatrix[i].every(t => t === 0)) {
        rowKeys.push(validKeys[i]);
        reducedMatrix.push([...this.resultsMatrix[i]]);
      }
    }

    //Columns
    for(var col=reducedMatrix[0].length-1; col>=0; col--) { //going backwards so removing doesn't change index
      var allZero = true;
      for(var row=0; row<reducedMatrix.length; row++) {
        if(reducedMatrix[row][col] !== 0) {
          allZero = false;
          break;
        }
      }
      if(allZero){
        //If column is zero, the col index needs to be removed on every row
        for(var row=0; row<reducedMatrix.length; row++) {
          reducedMatrix[row].splice(col, 1);
        }
      } else {
        //the col's not empty so it will stay and the key needs to be added to colKeys
        colKeys.push(validKeys[col]);
      }
    }
    //colKeys key were pushed on backwards, so need to flip
    colKeys.reverse();

    return {reducedMatrix, rowKeys, colKeys};
  }

  //---- sortedList Related Functions ----

  // sorted to be fastest -> slowest
  // each object in list is as so:
  // {
  //    from: String - first key pressed
  //    to: String - second key pressed
  //    betweenTime: Number - time between those two key presses
  // }
  sort() {
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
    //probably won't be in this state when calling this, but checknig just in case
    if(this.sortedList.length === 0) {
      return 0;
    }
    
    var i = 0;
    while(this.sortedList[i].betweenTime === 0) {
      i += 1;
    }
    return this.sortedList[i].betweenTime;
  }

  getSlowestTime() {
    //probably won't be in this state when calling this, but checknig just in case
    if(this.sortedList.length === 0) {
      return 0;
    }

    return this.sortedList[this.sortedList.length-1].betweenTime;
  }

  // returns: string[], list of from keys that were used
  getRelevantFromKeys() {
    var fromKeys = [];

    for(var i=0; i<validKeys.length; i++) {
      if(!this.resultsMatrix[i].every(t => t === 0)) {
        fromKeys.push(validKeys[i]);
      }
    }

    return fromKeys;
  }
}

export {TypingMatrix};
