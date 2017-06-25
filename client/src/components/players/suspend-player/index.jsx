import React from 'react';
import SuspensionForm from './form.jsx';

const SuspendPlayer = ({history, location : { state: { player }}}) => {

  return (
    <div>
      <SuspensionForm 
      	initialValues={player}
      	history={history}
      />
    </div>
  )
}

export default SuspendPlayer;