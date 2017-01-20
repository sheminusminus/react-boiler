import React from 'react';
import Header from './Header';
import Footer from './Footer';

class Body extends React.Component{
	
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div className="pagebody" id="pagebody">
				<Header />
				<Footer />
			</div>
		)
	}
	
}

export default Body;