import React from 'react';
import ReactDOM from 'react-dom';

import Body from './components/Body';

class App extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<Body />
		)
	}
	
}

ReactDOM.render(<App />, document.querySelector('#react'));