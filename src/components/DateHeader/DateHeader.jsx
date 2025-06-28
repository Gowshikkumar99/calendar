import React from 'react';
import moment from 'moment';

const DateHeader = ({ date }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div>{moment(date).format('DD MMM')}</div>
      <br></br>
      <div>{moment(date).format('dddd')}</div>
    </div>
  );
};

export default DateHeader;
