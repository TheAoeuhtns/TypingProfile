import React from 'react';
import Plot from 'react-plotly.js';

import { validKeys } from '../resources/constants';
import { TypingMatrix } from '../resources/typingMatrix';

function ResultsHeatmap({ data }) {
	const matrix = new TypingMatrix(data.matrix);

	return (
    <Plot
      data = {[
        {
          z: matrix.resultsMatrix,
          x: validKeys,
          y: validKeys,
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
