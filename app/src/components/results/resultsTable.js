import React from 'react';

import { TypingMatrix } from '../../resources/typingMatrix';
import { ResultsTableRows } from './resultsTableRows';

function ResultsTable ({ data }) {
  const [displayOptions, setDisplayOptions] = React.useState({ timeSort : "fastest", filterKey : undefined });

  const matrix = new TypingMatrix(data.matrix);

  const changeTimeSort = () => {
    if(displayOptions.timeSort === "fastest") {
      setDisplayOptions({...displayOptions, timeSort : "slowest" });
    } else {
      setDisplayOptions({...displayOptions, timeSort : "fastest" });
    }
  }

  const filterOnChange = (e) => {
    if(e.target.value === "none") {
      setDisplayOptions({...displayOptions, filterKey : undefined });
    } else {
      setDisplayOptions({...displayOptions, filterKey : e.target.value });
    }
  }

  const makeOption = (key) => {
    return (
      <option value={key}> {key} </option>
    );
  }

  const makeSelectList = () => {
    return matrix.getRelevantFromKeys().map( key => makeOption(key));
  }

  return (
    <div>
      <table id="resultsTable"> 
        <tr> 
          <th> From </th>
          <th> To </th> 
          <th> <button id="timeSortButton" onClick={changeTimeSort}> Avg Time<i className="material-icons">swap_vert</i> </button> </th> 
        </tr>
        <ResultsTableRows list={matrix.sortedList} options={displayOptions}/>
      </table>
      <div id="resultsSelectDiv">
        Filter list on From key:
        <select onChange={filterOnChange}>
          <option value="none"> None </option>
          {makeSelectList()}
        </select>
      </div>
    </div>
  );
}

export {ResultsTable};
