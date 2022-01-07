import React from 'react';

import { TypingMatrix } from '../resources/typingMatrix';
import { ResultsTableRows } from './resultsTableRows';

function ResultsTable ({ data }) {
  const [displayOptions, setDisplayOptions] = React.useState({ timeSort : "fastest" });

  const matrix = new TypingMatrix(data.matrix);
  const sortedMatrix = matrix.sort();

  const changeTimeSort = () => {
    if(displayOptions.timeSort === "fastest") {
      setDisplayOptions({ timeSort : "slowest" });
    } else {
      setDisplayOptions({ timeSort : "fastest" });
    }
  }

  return (
    <table> 
      <tr> 
        <th> From </th>
        <th> To </th> 
        <th> <button id="timeSortButton" onClick={changeTimeSort}> Avg Time<i className="material-icons">swap_vert</i> </button> </th> 
      </tr>
      <ResultsTableRows list={sortedMatrix} options={displayOptions}/>
    </table>
  );
}

export {ResultsTable};
