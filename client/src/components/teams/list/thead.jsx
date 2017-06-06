//TODO Make table template instead of using duplicate logic for sorting 

import React from 'react';
import {TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';

import FlatButton from 'material-ui/FlatButton';
import ArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';


const headings = [
	{text:'Team Name',val:'name',width:150},
	{text:'Hockey Type' ,val:'hockeyType'},
	{text:'Current Season', val:'currentSeason.year'},
	{text:'Edit' ,val:null },
	{text:'Delete' ,val:null }
]

const Arrow = ({ direction, selected }) => {
	if(!selected) return <noScript/>
	if(direction === 'asc') return <ArrowDropDown/>
	else return <ArrowDropUp/>	
}

const Label = ({val, text, onSort, ...rest}) => {
	const cursor = val? 'pointer' : 'default';
	return(
		<div 
			onClick={() => onSort(val)}
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
	  				onSort={props.onSort}
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