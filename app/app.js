// validKeys are from constants.js


// Startup Functions
var previousPress = null; // this will be an object {string, Date}
var matrix = makeEmptyMatrix();

function makeEmptyMatrix() {
  emptyMatrix = {};
  for(var key of validKeys) {
    emptyLine = {};
    for(var keyTwo of validKeys) {
      emptyLine[keyTwo] = 0;
    }
    emptyMatrix[key] = emptyLine;
  }
  return emptyMatrix;
}

// Switching Pages Functions
function startClick() {
  // sometimes browsers will cache the text in the textarea, so I clear it just to make sure it's empty
  document.getElementById("typeBox").value = '';

	document.getElementById("Start").style.display="none";
	document.getElementById("Type").style.display="block";

  document.getElementById("typeBox").focus();
}

function showResults() {
  displayResults(sortResults())

  document.getElementById("Type").style.display="none";
  document.getElementById("Results").style.display="block";
}

// Type Page Functions
function handleKey(event) {
	timeNow = new Date();
	if(previousPress !== null && validKeys.includes(event.key) && validKeys.includes(previousPress.key)) {
		updateMatrix(previousPress.key, event.key.toLowerCase(), timeNow - previousPress.pressTime);
	}
	previousPress = { "key": event.key, "pressTime": timeNow };
}

function updateMatrix(fromKey, toKey, betweenTime) {
	if(matrix[fromKey][toKey] === 0) {
		matrix[fromKey][toKey] = betweenTime;
	} else {
		matrix[fromKey][toKey] = (matrix[fromKey][toKey] + betweenTime)/2;
	}
}

// Result Page Functions
function sortResults() {
	var sorted = [];
	for (var cOne of validKeys) {
	  for (var cTwo of validKeys) {
	  	const pairData = { "from": cOne, "to": cTwo, "betweenTime": matrix[cOne][cTwo] }
	  	sorted = insertPair(pairData, sorted)
		}
	}
  return sorted;
}

function insertPair(pairData, sorted) {
  for(var i = 0; i < sorted.length; i++) {
    if (pairData.betweenTime < sorted[i].betweenTime) {
      sorted.splice(i, 0, pairData);
      return sorted;
    }
  }
  sorted.push(pairData);
  return sorted;
}

function displayResults(sorted){
  document.getElementById("resultText").innerHTML = makeResultsTableHTML(sorted);
}

function makeResultsTableHTML(sorted) {
  tableHTML = "<table> <tr> <th> From </th> <th> To </th> <th> Avg Time </th> </tr>";
  for(var i = 0; i < sorted.length; i++) {
    if (sorted[i].betweenTime !== 0) {
      tableHTML += `<tr> <td> ${sorted[i].from} </td> <td> ${sorted[i].to} </td> <td> ${Math.trunc(sorted[i].betweenTime)} ms </td> </tr>`;
    }
  }
  tableHTML += "</table>";
  return tableHTML;
}
