import React from 'react';
import {TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';

import FlatButton from 'material-ui/FlatButton';
import ArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';

import { primary3Color } from '../../../theme';

const Arrow = ({ direction, selected }) => {
	if  (!selected) return <noScript />;
	if (direction === 'asc') return <ArrowDropDown />;
	else return <ArrowDropUp />	
}

const Label = ({val, text, onClick, ...rest}) => {
	const cursor = val? 'pointer' : 'default';
	return(
		<div 
			onClick={() => onClick(val)}
			style={{display:'flex', alignItems:'center', textAlign:'left',cursor}}>
			{text}
			<Arrow {...rest}/>
		</div>
	)
}

const THead = props => {
	const {direction, sortCategory, headings} = props;
	
	return(
	  <TableRow style={{backgroundColor: primary3Color}}>
	  	{headings.map((heading,i) => (
	  		<TableHeaderColumn
	  			style={{color:'black'}} 
	  			colSpan={heading.colSpan || 1}
	  			key={i}
	  		>
	  			<Label 
	  				{...heading}
	  				onClick={props.onClick}
	  				selected={sortCategory === heading.val}
	  				direction={direction}
	  			/>
				</TableHeaderColumn>

	  		))
	  	}
	  </TableRow>
	  
	)
}

export default THead