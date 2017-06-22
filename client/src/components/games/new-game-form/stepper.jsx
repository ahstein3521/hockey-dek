import React, { Component } from 'react'
import WizardFormFirstPage from './page1.jsx';
import WizardFormSecondPage from './page2.jsx';

class WizardForm extends Component {
  
  state = { page: 1 }
  
  nextPage = () => 
    this.setState({ page: this.state.page + 1 })
  

  previousPage = () => 
    this.setState({ page: this.state.page - 1 })
  
  onSubmit = (a,b,c) => {
    console.log(a,b,c);
  }

  render() {
    const { onSubmit } = this.props
    const { page } = this.state
    return (
      <div>
        {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage}/>}
        {page === 2 && <WizardFormSecondPage previousPage={this.previousPage} onSubmit={this.onSubmit}/>}
      </div>
    )
  }
}

const funcComp = () => <WizardForm/>

export default funcComp;