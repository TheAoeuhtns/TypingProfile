import React from 'react';

function ResultsTableRows ({ list, options }) {
  const makeTableRows = () => {
    const displayRows = list.map((item) => {
      if(item.betweenTime !== 0 && (options.filterKey === undefined || options.filterKey === item.from)) {
        return ( <tr> <td> {item.from} </td> <td> {item.to} </td> <td> {item.betweenTime} ms </td> </tr> );
      }
    });
    
    if(options.timeSort === "fastest") {
      return displayRows;
    } else if(options.timeSort === "slowest") {
      return displayRows.reverse();
    }
  }

	return makeTableRows();
}

export {ResultsTableRows};
