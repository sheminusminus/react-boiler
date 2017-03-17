import React from 'react';

class Footer extends React.Component{
	
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div className="footer" id="footer">
				{this.props.copyright}
			</div>
		)
	}
}

export default Footer;