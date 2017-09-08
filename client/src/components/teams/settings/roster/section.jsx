import React, {Component} from 'react';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';



const PlayerCategory = props => {
	const { title, list=[], onRequestDelete,...chipProps } = props;	
	const category = title.split(' ')[0].toLowerCase();
	return (
		<div>
			{	list.length > 0 &&
				<div>
					<Subheader>{ title }</Subheader>
					<div style={{display:'flex', flexWrap:'wrap', marginBottom:35}}>
						{
							list.map((player,i) => (
								<Chip 
									key={player._id}
									style={{margin:5}}
									onRequestDelete={() => onRequestDelete(player, category)}
									{...chipProps}
								>
									{`${player.firstName} ${player.lastName}`}
								</Chip>
								)
							)
						}
					</div>
					<Divider/>
				</div>
			}
		</div>
	)
}
export default PlayerCategory;