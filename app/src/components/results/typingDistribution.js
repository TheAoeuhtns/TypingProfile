import React from 'react';
import Plot from 'react-plotly.js';

import { validKeys } from '../../resources/constants';
import { TypingMatrix } from '../../resources/typingMatrix';

function TypingDistribution({ data }) {
  const matrix = new TypingMatrix(data.matrix);
  const { reducedMatrix, rowKeys, colKeys } = matrix.makeReducedResultsMatrix();
  
  const getDistro = () => {
    var distro = [];
    for(var fromKey of validKeys) {
      distro.push(new Array(validKeys.length).fill(0));
      for(var toKey of validKeys) {
        if(matrix.matrix[fromKey][toKey].length > 0) {
          distro[validKeys.indexOf(fromKey)][validKeys.indexOf(toKey)] = matrix.matrix[fromKey][toKey].length;
        }
      }
    }
    console.log(distro)
    return distro;
  }

  const dis = getDistro();

  return (
    <Plot
      data = {[
        {
          z: dis,
          x: validKeys,
          y: validKeys,
          type: "heatmap",
          colorscale: "Portland",
          hovertemplate:"%{y} to %{x}, %{z} times <extra></extra>"
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

export {TypingDistribution};
