import React from 'react';

import Card from './CardWrapper.jsx';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/content/create';
import SadIcon from 'material-ui/svg-icons/social/mood-bad';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import formatDate from '../../utils/formatDate';

import { Link } from 'react-router-dom';

const makeDate = d => {
  d = new Date(d);
  return `${d.getMonth() + 1} / ${d.getDate()} / ${d.getFullYear()}`;
}

const makeRouteConfig = subtitle =>
  function({ record={}, season,  playerId, index, i }, formType) {
    const routes = {
      newForm: { 
        pathname: '/players/suspension/new',
        state: { title: 'New Suspension', subtitle, season, playerId } 
      },
      editForm: {
        pathname: `/players/suspension/edit/${record._id}`,
        state: { title: 'Edit Suspension', subtitle, record, season, index, i }
      }
    }
    return routes[formType];
  }

const SuspensionList = ({suspensions, playerName, playerId, season}) => {
  if (!suspensions) return <noScript />;
	
  const configRoute = makeRouteConfig(playerName);

  return(
		<div style={{width:'90%', margin:'0 auto 20px', paddingBottom:10}}>
      <div className='btn-group'>
        <Link to={configRoute({ season, playerId }, 'newForm')}>
          <RaisedButton
            secondary={true}
            icon={<SadIcon/>}
            label="New Suspension"
          />
        </Link>
      </div> 		
			{
				suspensions.map(({records = [], season },index) => {
        
          return (
            <Card season={season} key={index}>
              <List>
              {
                records.map((record, i) => (
                  <ListItem 
                    key={i}
                    primaryText = {`FROM: ${makeDate(record.start)} , UNTIL: ${makeDate(record.end)}`}
                    rightIconButton = {
                      <IconButton 
                        containerElement={
                          <Link to={configRoute({record, season, index, i}, 'editForm')}/>
                        }
                        tooltip="Edit?"
                        >
                        <EditIcon/>
                      </IconButton>  
                    }
                    secondaryText = {<p><b>Reason: </b>{record.reason}</p>}
                  />
                ))
              }
              </List>
            </Card>
          )
        })
			}
		</div>
	)
}

export default SuspensionList;