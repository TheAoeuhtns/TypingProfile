import React from 'react';
import { useLocation } from 'react-router-dom';

import { ResultsTable } from '../components/results/resultsTable';
import { ResultsHeatmap } from '../components/results/resultsHeatmap';
import { ResultsScatterplot } from '../components/results/resultsScatterplot';
import { TypingDistribution } from '../components/results/typingDistribution';

function ResultsPage() {
  const location = useLocation();
  const [hideComponent, setHideComponent] = React.useState({
    "showScatterplot": true,
    "showHeatmap": true,
    "showDistribution": false,
    "showTable": true
  });

  const toggleScatterplot = () => {
    setHideComponent({...hideComponent, "showScatterplot" : !hideComponent["showScatterplot"]});
  }

  const toggleHeatmap = () => {
    setHideComponent({...hideComponent, "showHeatmap" : !hideComponent["showHeatmap"]});
  }

  const toggleTable = () => {
    setHideComponent({...hideComponent, "showTable" : !hideComponent["showTable"]});
  }

	return (
		<div id="Results">
      <p class="large-text">Results!</p>
      <button onClick={() => toggleScatterplot()} class={`rounded-button-small ${hideComponent.showScatterplot ? "" : "unselected-results-button"}`}> Scatterplot </button>
      <button onClick={() => toggleHeatmap()} class={`rounded-button-small ${hideComponent.showHeatmap ? "" : "unselected-results-button"}`}> Heatmap </button>
      <button onClick={() => toggleTable()} class={`rounded-button-small ${hideComponent.showTable ? "" : "unselected-results-button"}`}> Ranking Table </button>
      <br/>
      {hideComponent.showScatterplot && <ResultsScatterplot data={location.state.matrix} />}
      <br/>
      {hideComponent.showHeatmap && <ResultsHeatmap data={location.state.matrix} />}
      <br/>
      {hideComponent.showDistribution && <TypingDistribution data={location.state.matrix} />}
      <br />
      {hideComponent.showTable && <ResultsTable data={location.state.matrix} />}
    </div>
	);
}

export {ResultsPage};
