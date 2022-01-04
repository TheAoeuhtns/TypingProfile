// validKeys are from constants.js


// Startup Functions
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
  sortResults();
  displayResults();

  document.getElementById("Type").style.display="none";
  document.getElementById("Results").style.display="block";
}

// Type Page Functions
var previousPress = null; // this will be an object {string, Date}

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
var displayOptions = { "timeSort" : "fastest" }
var sorted = [];

function sortResults() { // sorted to be fastest -> slowest
	for (var cOne of validKeys) {
	  for (var cTwo of validKeys) {
	  	const pairData = { "from": cOne, "to": cTwo, "betweenTime": matrix[cOne][cTwo] }
	  	insertPair(pairData)
		}
	}
}

function insertPair(pairData) {
  for(var i = 0; i < sorted.length; i++) {
    if (pairData.betweenTime < sorted[i].betweenTime) {
      sorted.splice(i, 0, pairData);
      return;
    }
  }
  sorted.push(pairData);
}

function displayResults(){
  document.getElementById("resultText").innerHTML = makeResultsTableHTML();
}

function makeResultsTableHTML() {
  tableHTML = `<table> 
    <tr> 
      <th> From </th>
      <th> To </th> 
      <th> <button id="timeSortButton" onClick="resortDisplay()"> Avg Time<i class="material-icons" style="font-size:15px">swap_vert</i> </button> </th> 
    </tr>`;
  if (displayOptions.timeSort === "fastest") {
    tableHTML += makeTableRowsHTML("", 0, 1);
  } else if (displayOptions.timeSort === "slowest") {
    tableHTML += makeTableRowsHTML("", sorted.length-1, -1);
  }
  tableHTML += "</table>";
  return tableHTML;
}

function makeTableRowsHTML(tableRowsHTML, i, increment) {
  if (i >= sorted.length || i < 0) {
    return tableRowsHTML;
  }
  if (sorted[i].betweenTime !== 0) {
    tableRowsHTML += `<tr> <td> ${sorted[i].from} </td> <td> ${sorted[i].to} </td> <td> ${Math.trunc(sorted[i].betweenTime)} ms </td> </tr>`;
  }
  return makeTableRowsHTML(tableRowsHTML, i+increment, increment);
}

function resortDisplay() {
  if (displayOptions.timeSort === "fastest") {
    displayOptions.timeSort = "slowest";
  } else {
    displayOptions.timeSort = "fastest";
  }
  document.getElementById("resultText").innerHTML = "";
  displayResults();
}