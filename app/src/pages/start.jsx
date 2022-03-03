import React from 'react';
import { NavLink } from 'react-router-dom';

function StartPage() {
	return (
		<div id="Start">
	    <p class="large-text">
	      This app has you type and then shows you the time between keystrokes, it's kind of interesting, maybe.
	    </p>
	    <NavLink to="/typing" id="StartButton"> Start! </NavLink>
	  </div>
	);
}

export {StartPage};