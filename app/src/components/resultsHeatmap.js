import React from 'react';
import Plot from 'react-plotly.js';

import { validKeys } from '../resources/constants';
import { TypingMatrix } from '../resources/typingMatrix';

function ResultsHeatmap({ data }) {
	const matrix = new TypingMatrix(data.matrix);
  const dataOffset = (matrix.getSlowestTime() - matrix.getFastestTime())/15; //This is so the heatmap looks better

  var reducedMatrix = [];
  var xAxisLabel = [];
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
        //If column is zero, the col index needs to be removed on every row
        for(var row=0; row<reducedMatrix.length; row++) {
          reducedMatrix[row].splice(col, 1);
        }
      } else {
        //the col's not empty so it will stay and the x axis needs a label
        xAxisLabel.push(validKeys[col]);
      }
    }
    //xAxisLabel labels were pushed on backwards, so need to flip
    xAxisLabel.reverse();
  }

  makeReducedResultsMatrix();

	return (
    <Plot
      data = {[
        {
          z: reducedMatrix.map(row => row.map(val => val===0 ? 0 : val+dataOffset)),
          x: xAxisLabel,
          y: yAxisLabel,
          type: "heatmap",
          colorscale: "Blackbody",
          colorbar: { 
            tickmode: "array",
            tickvals: [0, matrix.getFastestTime()+dataOffset, matrix.getSlowestTime()+dataOffset],
            ticktext: ["Not typed", "Fast", "Slow"] 
          },
          hovertemplate:"%{y} to %{x} <extra></extra>"
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
