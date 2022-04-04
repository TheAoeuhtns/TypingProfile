import React, { useEffect, useRef } from 'react';

import { textExerpt } from '../resources/constants';

function TypingExerpt ({ wordMarkNum }) {

	const [exampleText, setExampleText] = React.useState( "Press space to start." );
	const exampleTextArray = textExerpt.split(" ");

	const displayTextWithMark = () => {
    return exampleTextArray.map((word, i) => {
      if(wordMarkNum < exampleTextArray.length && wordMarkNum === i) {
        return ( <mark>{ word }</mark> );
      } else {
        return ( <span> { word } </span> );
      }
    });
  }

  return (
  	<div
      id="exampleTextBox"
    >
      { displayTextWithMark() }
    </div>
  );
}

export { TypingExerpt };