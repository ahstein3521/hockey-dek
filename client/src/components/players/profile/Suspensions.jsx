import React from 'react';

import Card from './CardWrapper.jsx';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/content/create';
import SadIcon from 'material-ui/svg-icons/social/mood-bad';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import formatDate from '../../utils/formatDate';

import { Link } from 'react-router-dom';

const makeRouteConfig = subtitle =>
  function({ record={}, season }, formType) {
    const routes = {
      newForm: { 
        pathname: '/players/suspension/new',
        state: { title: 'New Suspension', subtitle, season } 
      },
      editForm: {
        pathname: `/players/suspension/edit/${record._id}`,
        state: { title: 'Edit Suspension', subtitle, record, season }
      }
    }
    return routes[formType];
  }

const SuspensionList = ({suspensions, playerName, season}) => {
  if (!suspensions) return <noScript />;
	
  const configRoute = makeRouteConfig(playerName);

  return(
		<div style={{width:'90%', margin:'0 auto 20px', paddingBottom:10}}>
      <div className='btn-group'>
        <Link to={configRoute({ season }, 'newForm')}>
          <RaisedButton
            secondary={true}
            icon={<SadIcon/>}
            label="New Suspension"
          />
        </Link>
      </div> 		
			{
				suspensions.map(({records = [] },i) => {
          if (!records.length) return <noScript key={i}/>

          return (
            <Card season={season} key={i}>
              <List>
              {
                records.map((record, i) => (
                  <ListItem 
                    key={i}
                    primaryText = {`FROM: ${record.start} , UNTIL: ${record.end}`}
                    rightIconButton = {
                      <IconButton 
                        containerElement={
                          <Link to={configRoute({record, season}, 'editForm')}/>
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