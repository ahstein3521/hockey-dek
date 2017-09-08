import React from 'react';

import Card from './CardWrapper.jsx';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/content/create';
import SadIcon from 'material-ui/svg-icons/social/mood-bad';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import formatDate from '../../utils/formatDate';

import { Link } from 'react-router-dom';

function configRoute(formType, params) {
  const subtitle = this.basicInfo.fullName;
  const routes = {
    newForm: { 
      pathname: '/players/suspension/new',
      state: { title: 'New Suspension', subtitle } 
    },
    editForm: {
      pathname: `/players/suspension/edit/${params}`,
      state: { title: 'Edit Suspension', subtitle }
    }
  }
  return routes[formType];
}

const SuspensionList = ({player}) => {
  const suspensions = player.suspensions || [];
  const getFormRoute = configRoute.bind(player);

	return(
		<div style={{width:'90%', margin:'0 auto 20px', paddingBottom:10}}>
      <div className='btn-group'>
        <Link to={getFormRoute('newForm', null)}>
          <RaisedButton
            secondary={true}
            icon={<SadIcon/>}
            label="New Suspension"
          />
        </Link>
      </div> 		
			{
				suspensions.map(({records = [], season={}},i) => {
          if (!records.length) return <noScript key={i}/>

          return (
            <Card season={season} key={i}>
              <List>
              {
                records.map((record, i) => (
                  <ListItem 
                    key={i}
                    primaryText = {`${formatDate(record.start)} - ${formatDate(record.end)}`}
                    rightIconButton = {
                      <IconButton 
                        containerElement={<Link to={getFormRoute('editForm', record._id)}/>}
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