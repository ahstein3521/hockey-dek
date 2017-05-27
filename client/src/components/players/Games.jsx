import React,{Component} from 'react';

import SeasonCard from './SeasonCard.jsx';


export default class GamesList extends Component{
	render(){
		const {games} = this.props;
		return(
		<div style={{width:'90%', margin:'0 auto 20px'}}> 		
			{
				games.map((seasonsCheckins,i) => (
					<SeasonCard key={i} {...seasonsCheckins} />
					)
				)
			}
		</div>
		)
	}
} 

