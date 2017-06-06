import React, {Component} from 'react';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';



const PlayerCategory = ({ title, list, onRequestDelete,...chipProps }) => (	
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
								onRequestDelete={() => onRequestDelete(player, i)}
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

export default PlayerCategory;