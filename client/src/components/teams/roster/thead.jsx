import React from 'react';
import {TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';

const style = {color:'black', fontWeight:'bolder'};

const headings = [
	{text:'Name',val:'lastName',width:150},
	{text:'#' ,val:'jerseyNumber' },
	{text:'Check-ins',val:null},
	{text:'Paid' ,val:null },
	{text:'Comped' ,val:null },
	{text:'Suspended' ,val:null },
	{text:'Waiver' ,val:null }
]

const THead = props => {
	return(
	  <TableRow style={{color:'black'}}>
	  	{headings.map(heading => (
	  		<TableHeaderColumn
	  			key={heading.text}
					style ={{...style, width: heading.width}}
				>
				<b onClick={()=> props.onClick(heading.val)}>{heading.text}</b>
				</TableHeaderColumn>

	  		))
	  	}
	  </TableRow>
	  
	)
}

export default THead