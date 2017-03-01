import React from 'react';
import ReactDOM from 'react-dom';

import Body from './containers/Body';
import Header from './containers/Header';
import Footer from './containers/Footer';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			title: 'EBH Dev Site',
			copyright: `${String.fromCharCode(169)} EBH, ${(new Date()).getFullYear()}`
		}
	}
	
	render() {
		return (
			<div>
				<Header title={this.state.title} />
				<Body />
				<Footer copyright={this.state.copyright} />
			</div>
		)
	}
	
}

ReactDOM.render(<App />, document.querySelector('#react'));