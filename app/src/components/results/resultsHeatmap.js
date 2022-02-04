import React from 'react';
import Plot from 'react-plotly.js';

import { validKeys } from '../../resources/constants';
import { TypingMatrix } from '../../resources/typingMatrix';

function ResultsHeatmap({ data }) {
	const matrix = new TypingMatrix(data.matrix);
  const dataOffset = (matrix.getSlowestTime() - matrix.getFastestTime())/15; //This is so the heatmap looks better
  const { reducedMatrix, rowKeys, colKeys } = matrix.makeReducedResultsMatrix();

	return (
    <Plot
      data = {[
        {
          z: reducedMatrix.map(row => row.map(val => val===0 ? 0 : val+dataOffset)),
          x: colKeys,
          y: rowKeys,
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
