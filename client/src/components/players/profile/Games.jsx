import React,{Component} from 'react';

import SeasonCard from './CardWrapper.jsx';


export default class GamesList extends Component{
	render(){
    if (!this.props.games) return <noScript />
		const { games = [] } = this.props;
		return(
		<div style={{width:'90%', margin:'0 auto 20px', padding: 10}}> 		
			{
				games.map((val ={}, i) => (
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
              	val.records.map(({date, attended},j) => (
                	<tr key={j}>
                  	<td>{date}</td>
                  	<td>{attended? 'Yes' : 'No'}</td>
                	</tr>
              	))
            	}
            	</tbody>
            	<tfoot>
              	<tr>
                	<td>{"Total Checkins: "+ val.totalAttended}</td>
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

