import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { validKeys } from '../resources/constants';
import { TypingMatrix } from '../resources/typingMatrix';

function TypingCaptureArea() {
  var previousPress = null; // this will be an object {string, Date}
  var matrix = new TypingMatrix();

  const focusArea = useRef();
  useEffect(() => {
   if(focusArea.current) focusArea.current.focus(); 
  }, [focusArea]);

  const handleKey = event => {
    const timeNow = new Date();
    if(previousPress !== null && validKeys.includes(event.key) && validKeys.includes(previousPress.key)) {
      matrix.update(previousPress.key, event.key, timeNow - previousPress.pressTime);
    }
    previousPress = { "key": event.key, "pressTime": timeNow };
  }

  const navigate = useNavigate();
  const toResults = () => {
    navigate('/results', {state: {matrix: matrix }});
  }

	return (
    <div>
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