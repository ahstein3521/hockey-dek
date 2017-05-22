import React from 'react';
import {TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';

import FlatButton from 'material-ui/FlatButton';
import ArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';

const style = {color:'black', fontWeight:'bolder'};

const headings = [
	{text:'Name',val:'lastName',width:150},
	{text:'#' ,val:'jerseyNumber'},
	{text:'Check-ins',val:'checkIns'},
	{text:'Paid' ,val:'amountPaid'},
	{text:'Comped' ,val:'amountComped'},
	{text:'Suspended' ,val:null },
	{text:'Waiver' ,val:null }
]

const Arrow = ({ direction, selected }) => {
	if(!selected) return <noScript/>
	if(direction === 'asc') return <ArrowDropDown/>
	else return <ArrowDropUp/>	
}

const Label = ({val, text, onClick, ...rest}) => {
	const cursor = val? 'pointer' : 'default';
	return(
		<div 
			onClick={() => onClick(val)}
			style={{display:'flex', alignItems:'center', cursor}}>
			{text}
			<Arrow {...rest}/>
		</div>
	)
}

const THead = props => {
	const { sortProps: {direction, sortCategory }} = props;

	return(
	  <TableRow >
	  	{headings.map((heading,i) => (
	  		<TableHeaderColumn 
	  			style={{width: heading.width, color:'black'}}
	  			key={i}
	  		>
	  			<Label 
	  				{...heading}
	  				onClick={props.onClick}
	  				selected={sortCategory===heading.val}
	  				direction={direction}
	  			/>
				</TableHeaderColumn>

	  		))
	  	}
	  </TableRow>
	  
	)
}

export default THead