import React from 'react';
import { useLocation } from 'react-router-dom';

import { validKeys } from '../resources/constants';
import { ResultsTable } from '../components/resultsTable';

function ResultsPage() {
  const location = useLocation();

	return (
		<div id="Results">
      Here are the results! Note: This excludes any combinations that were never typed
      <ResultsTable data={location.state.matrix} />
    </div>
	);
}

export {ResultsPage};
