import React from 'react';
import { useLocation } from 'react-router-dom';

import { ResultsTable } from '../components/resultsTable';
import { ResultsHeatmap } from '../components/resultsHeatmap';

function ResultsPage() {
  const location = useLocation();

	return (
		<div id="Results">
      Here are the results! Note: This excludes any combinations that were never typed
      <ResultsHeatmap data={location.state.matrix} />
      <ResultsTable data={location.state.matrix} />
    </div>
	);
}

export {ResultsPage};
