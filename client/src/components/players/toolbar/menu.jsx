import React from 'react';

import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/social/person-add';

import {Link} from 'react-router-dom';

const linkProps = {
	to: {
		pathname: 'players/add',
		state: {
			title: 'Add a new player'
		}
	}
};

const MenuBanner = () => (
	<Link {...linkProps}>
		<IconButton
			tooltip="Add A New Player"
		>
		<AddIcon/>
	</IconButton>
	</Link>		
)

export default MenuBanner;