import React, { useState } from 'react';
import Plot from 'react-plotly.js';

import { validKeys } from '../../resources/constants';
import { TypingMatrix } from '../../resources/typingMatrix';

function ResultsScatterplot({ data }) {
  const matrix = new TypingMatrix(data.matrix);
  const { reducedMatrix, rowKeys, colKeys } = matrix.makeReducedResultsMatrix();

  var listTimes = []; // int[], times
  var listFroms = []; // stirng[], from keys
  var listTos = []; // string[], to keys

  for(var i in rowKeys) {
    for(var j in colKeys) {
      if(reducedMatrix[i][j] !== 0) {
        listTimes.push(reducedMatrix[i][j]);
        listFroms.push(rowKeys[i]);
        listTos.push(colKeys[j]);
      }
    }
  }

  //States
  const [x, setX] = useState(listTimes);
  const [y, setY] = useState(listFroms);
  const [z, setZ] = useState(listTos);
  const [axisText, setAxisText] = useState("From Keys");
  const [hovertemplateText, setHovertemplateText] = useState("%{y} to %{customdata} %{x} ms <extra></extra>");

  // The next two functions keep things in alphabetical order
  const setYtoTos = () => {
    var times = [];
    var froms = [];
    var tos = [];

    for(var j in colKeys) {
      for(var i in rowKeys) {
        if(reducedMatrix[i][j] !== 0) {
          times.push(reducedMatrix[i][j]);
          froms.push(rowKeys[i]);
          tos.push(colKeys[j]);
        }
      }
    }
    setX(times);
    setY(tos);
    setZ(froms);
  }

  const setYtoFroms = () => {
    var times = [];
    var froms = [];
    var tos = [];

    for(var i in rowKeys) {
      for(var j in colKeys) {
        if(reducedMatrix[i][j] !== 0) {
          times.push(reducedMatrix[i][j]);
          froms.push(rowKeys[i]);
          tos.push(colKeys[j]);
        }
      }
    }
    setX(times);
    setY(froms);
    setZ(tos);
  }

  const switchYAxis = () => {
    if(axisText === "From Keys") {
      setYtoTos();
      setAxisText("To Keys");
      setHovertemplateText("%{y} from %{customdata} %{x} ms <extra></extra>");
    } else {
      setYtoFroms();
      setAxisText("From Keys");
      setHovertemplateText("%{y} to %{customdata} %{x} ms <extra></extra>");
    }
  }

	return(
		<div>
      <Plot
        data={[
          {
            x: x,
            y: y,
            type: "scatter",
            mode: "markers",
            customdata: z,
            hovertemplate: hovertemplateText
          }
        ]}
        layout={{
          width: 1000, 
          height: 700,
          xaxis: { title: "Time Between" },
          yaxis: { title: axisText }
        }}
      />
      <button onClick={switchYAxis} class="rounded-button-small">Switch Y Axis </button>
    </div>
	);
}

export {ResultsScatterplot};
