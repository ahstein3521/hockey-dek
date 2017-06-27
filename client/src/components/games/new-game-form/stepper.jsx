import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRosters } from '../../../actions/index';
import WizardFormFirstPage from './page1.jsx';
import WizardFormSecondPage from './page2.jsx';

export default class WizardForm extends Component {
  
  state = { page: 1 }
  
  nextPage = () => 
    this.setState({ page: this.state.page + 1 })
  

  previousPage = () => 
    this.setState({ page: this.state.page - 1 })
  
  render() {
    const { page } = this.state;
    const { history } = this.props;
    return (
      <div>
        {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage}/>}
        {page === 2 && <WizardFormSecondPage previousPage={this.previousPage} history={history}/>}
      </div>
    )
  }
}


