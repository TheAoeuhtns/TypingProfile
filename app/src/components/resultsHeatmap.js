import React from 'react';
import Plot from 'react-plotly.js';

import { validKeys } from '../resources/constants';
import { TypingMatrix } from '../resources/typingMatrix';

function ResultsHeatmap({ data }) {
	const matrix = new TypingMatrix(data.matrix);

  var reducedMatrix = [];
  var xAxisLabel = [...validKeys];
  var yAxisLabel = [];

  // returns a 2d array with rows/columns that are entirely 0s removed
  const makeReducedResultsMatrix = () => {
    //Rows
    for(var i=0; i<validKeys.length; i++) {
      if(!matrix.resultsMatrix[i].every(t => t === 0)) {
        yAxisLabel.push(validKeys[i]);
        reducedMatrix.push([...matrix.resultsMatrix[i]]);
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
        for(var row=0; row<reducedMatrix.length; row++) {
          reducedMatrix[row].splice(col, 1);
        }
        xAxisLabel.splice(col, 1);
      }
    }
  }

  makeReducedResultsMatrix();

	return (
    <Plot
      data = {[
        {
          z: reducedMatrix,
          x: xAxisLabel,
          y: yAxisLabel,
          type: "heatmap",
          colorscale: "Blackbody",
          colorbar: { 
            tickmode: "array",
            tickvals: [0, matrix.getFastestTime(), matrix.sortedList[matrix.sortedList.length-1].betweenTime],
            ticktext: ["Not typed", "Fast", "Slow"] 
          },
          hovertemplate:"%{y} to %{x}, %{z} ms <extra></extra>"
        }
      ]}
      layout={{
        width: 700, 
        height: 700,
        xaxis: { title: "To Key" },
        yaxis: { title: "From Key" }
      }}
    />
	);
}

export {ResultsHeatmap};
