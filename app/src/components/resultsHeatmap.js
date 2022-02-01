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
          type: 'heatmap'
        }
      ]}
    />
	);
}

export {ResultsHeatmap};
