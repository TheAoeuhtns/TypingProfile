import React from 'react';
import { useLocation } from 'react-router-dom';

import { ResultsTable } from '../components/results/resultsTable';
import { ResultsHeatmap } from '../components/results/resultsHeatmap';
import { ResultsScatterplot } from '../components/results/resultsScatterplot';
import { TypingDistribution } from '../components/results/typingDistribution';

function ResultsPage() {
  const location = useLocation();

	return (
		<div id="Results">
      <p class="large-text">Results!</p>
      <ResultsScatterplot data={location.state.matrix} />
      <br/>
      <ResultsHeatmap data={location.state.matrix} />
      <br/>
      <TypingDistribution data={location.state.matrix} />
      <br />
      <ResultsTable data={location.state.matrix} />
    </div>
	);
}

export {ResultsPage};
