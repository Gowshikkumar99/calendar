import React from 'react';
import moment from 'moment';
import './CustomEvent.scss';

const CustomEvent = ({ event }) => {
  return (
    <>
      <div className="custom-event-wrapper">
        <div className="event-content">
          <div className="event-time">
            {moment(event.start).format('hh:mm A')} – {moment(event.end).format('hh:mm A')}
          </div>
          <div className="event-title">{event.title}</div>
        </div>
      </div>
      {event.children?.length > 1 && (
          <span className="notification-badge">{event.children.length}</span>
        )}
    </>
  );
};

export default CustomEvent;
