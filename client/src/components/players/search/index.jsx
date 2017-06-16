import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPlayerDetails } from '../../../actions/index';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import { Card } from 'material-ui/Card';

import { searchStyle as styles } from '../../../styles/index';

const getDataSource = (list) => (

	list.map(({firstName, lastName, ...rest}) => ({
 		text: `${firstName} ${lastName}`,
 		playerData:{firstName, lastName, ...rest},
    value:(<MenuItem primaryText={`${firstName} ${lastName}`}/>)
  }))
);


const PlayerMenu = ({fetchPlayerDetails, playerList, history}) => (
		
		<div style={styles.wrapper}>
			<AutoComplete
				onNewRequest={player => fetchPlayerDetails(player.playerData, history)}
				fullWidth={true}
				floatingLabelText="Player Name:"
				name="name"
				maxSearchResults={6}
	  		filter={AutoComplete.caseInsensitiveFilter}  
				dataSource={getDataSource(playerList)}
			/>
		</div>
)

function mapStateToProps({player}) {
	return { playerList: player.list}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchPlayerDetails}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerMenu);
