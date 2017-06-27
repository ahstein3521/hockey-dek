import React, { Component } from 'react';

import Card from './CardWrapper.jsx';
import SadIcon from 'material-ui/svg-icons/social/mood-bad';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import formatDate from '../../utils/formatDate';

import { Link } from 'react-router-dom';
export default class SuspensionList extends Component{
	render(){
		const { player, openModal} = this.props;
    const suspensions = player.suspensions || [];

    const url = {
      pathname: '/players/suspension',
      state: {
        player,
        title: 'Suspend Player',
        subtitle: player.basicInfo.fullName,
      }
    }

		return(
		<div style={{width:'90%', margin:'0 auto 20px', paddingBottom:10}}>
      <div className='btn-group'>
        <Link to={url}>
          <RaisedButton
            secondary={true}
            icon={<SadIcon/>}
            onTouchTap={(a,b,c)=> {console.log(a,b,c)}}
            label="New Suspension"
          />
        </Link>
      </div> 		
			{
				player.suspensions.map(({records = [], season={}},i) => {
          if (!records.length) return <noScript key={i}/>

          return (
            <Card season={season} key={i}>
              <ul className="card-list">
              {
                records.map((record, i) => (
                  <li key={i}>
                    <b>{`${formatDate(record.start)} - ${formatDate(record.end)}`}</b>
                    <p>{record.reason}</p>
                  </li>
                ))
              }
              </ul>
            </Card>
          )
        })
			}
		</div>
		)
	}
} 