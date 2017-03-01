import React from 'react';

class Header extends React.Component{
	
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div className="header" id="header">
				{this.props.title}
			</div>
		)
	}
}

export default Header;