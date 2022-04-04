import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { validKeys, textExerpt } from '../resources/constants';
import { TypingMatrix } from '../resources/typingMatrix';
import { TypingExerpt } from './typingExerpt';

function TypingCaptureArea() {

  const [previousPress, setPreviousPress] = React.useState( { "key" : undefined, "pressTime" : undefined } );
  const [matrix, setMatrix] = React.useState( new TypingMatrix() );
  const [markedWord, setMarkedWord] = React.useState( 0 );

  const focusArea = useRef();
  useEffect(() => {
   if(focusArea.current) focusArea.current.focus(); 
  }, [focusArea]);


  const handleKey = event => {
    const timeNow = new Date();
    // update displayed example text
    if(event.key === " ") {
      setMarkedWord(markedWord+1);
    }
    // update matrix
    var newMatrix = new TypingMatrix(matrix.matrix);
    if(previousPress.key !== undefined && validKeys.includes(event.key) && validKeys.includes(previousPress.key)) {
      newMatrix.update(previousPress.key, event.key, timeNow - previousPress.pressTime)
      setMatrix(newMatrix);
    }
    setPreviousPress({ "key": event.key, "pressTime": timeNow });
  }

  // note: it may make more sense to have the typing page and going to the next page
  //    but passing the matrix is easier from here
  const navigate = useNavigate();
  const toResults = () => {
    navigate('/results', {state: {matrix: matrix }});
  }

	return (
    <div>
      <TypingExerpt wordMarkNum={markedWord}/>
      <textarea 
        id="typeBox" 
        placeholder="Please Type Here" 
        cols="40" 
        rows="5" 
        onKeyDown={handleKey}
        ref={focusArea}
      ></textarea>
      <br />
      <button onClick={toResults} class="rounded-button">Show Results</button>
    </div>
  );
}

export { TypingCaptureArea };