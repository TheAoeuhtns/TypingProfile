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
          z: [[1, 20, 30], [20, 1, 60], [30, 60, 1]],
          x: validKeys,
          y: validKeys,
          type: 'heatmap'
        }
      ]}
    />
	);
}

export {ResultsHeatmap};
