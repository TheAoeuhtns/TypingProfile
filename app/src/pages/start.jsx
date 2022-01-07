import React from 'react';
import { NavLink } from 'react-router-dom';

function StartPage() {
	return (
		<div id="Start">
	    <p>
	      This app has you type and then shows you the time between keystrokes, it's kind of interesting, maybe.
	    </p>
	    <NavLink to="/typing"> Start! </NavLink>
	  </div>
	);
}

export {StartPage};