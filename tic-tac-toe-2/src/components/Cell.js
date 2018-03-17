import React from 'react';
import '../index.css';

const Cell = ({ piece }) => (
  <div className='valign margin-center'>
    <i className={`fa ${piece} fa-5x white-text`} />
  </div>
)

export default Cell;