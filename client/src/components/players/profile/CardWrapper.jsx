import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import AddPaymentIcon from 'material-ui/svg-icons/editor/attach-money';
import AddCompIcon from 'material-ui/svg-icons/action/payment';
import Receipt from 'material-ui/svg-icons/action/receipt';
import axios from 'axios';
import { primary3Color } from '../../../../theme';

export default class SeasonCard extends Component {

  state = { expanded: false };

  handleExpandChange = expanded => this.setState({ expanded });

  handleExpand = () => this.setState({expanded: true});
  
  handleReduce = () => this.setState({expanded: false});
  
  
  render() {
    if (!this.props.season) return <noScript/>
    const {season: { team , hockeyType, displayName, quarter, year }, openModal, playerId} = this.props;
    let initialValues = { year, quarter, playerId };

    const title = team? `${team}, ${hockeyType}` : displayName;
    const subtitle = team? displayName : '';
    return (
      <Card 
        style={{marginTop:20}}
        expanded={this.state.expanded} 
        onExpandChange={this.handleExpandChange}
      >
        <CardHeader
          style={{backgroundColor: primary3Color }}
          title={title}
          subtitle={subtitle}
          actAsExpander={true}
          showExpandableButton={true}
        />
        {
          openModal && 
          <CardActions>
              <FlatButton 
                label='Add a new payment'
                icon={<AddPaymentIcon/>}
                onTouchTap={() => openModal('NewPayment', { initialValues })}
              />
              <FlatButton
                label='Add a new credit'
                icon={<AddCompIcon/>}
                onTouchTap={() => openModal('NewCredit', { initialValues })}
              />
              <a href={`/player/receipt?playerId=${playerId}&year=${year}&quarter=${quarter}`}>
                <FlatButton
                  label='Download a receipt'
                  icon={<Receipt/>}
                />  
              </a>       
          </CardActions>
        }
        <CardText expandable={true}>
          {this.props.children}
        </CardText>
      </Card>
    );
  }
}