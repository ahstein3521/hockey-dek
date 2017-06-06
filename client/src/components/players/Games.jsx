import React,{Component} from 'react';

import SeasonCard from './CardWrapper.jsx';


export default class GamesList extends Component{
	render(){
		const {games} = this.props;
		return(
		<div style={{width:'90%', margin:'0 auto 20px'}}> 		
			{
				games.map((val, i) => (
					<SeasonCard 
						key={i}
						season={val.season}
					>
						<table >
            	<thead>
              	<tr>
                	<th>Date</th>
                	<th>Played</th>
              	</tr>
            	</thead>
            	<tbody>
            	{
              	val.checkIns.map(({date, attended}) => (
                	<tr key={date}>
                  	<td>{date}</td>
                  	<td>{attended? 'Yes' : 'No'}</td>
                	</tr>
              	))
            	}
            	</tbody>
            	<tfoot>
              	<tr>
                	<td>{"Total Checkins: "+ val.totalPlayed}</td>
              	</tr>
            	</tfoot>  
          	</table>					
					</SeasonCard>
					)
				)
			}
		</div>
		)
	}
} 

