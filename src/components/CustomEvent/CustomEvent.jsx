import React from "react";
import moment from "moment";
import "./CustomEvent.scss";

const CustomEvent = ({ event }) => {
  const jobTitle = event?.job_id?.jobRequest_Title;

  return (
    <>
      <div className="custom-event-wrapper">
        <div className="event-content">
          {jobTitle && (
            <div className="event-job-title">
              {jobTitle}
            </div>
          )}
          
          <div className="event-title">{event.title.split("\n")[0]}</div>

          <div className="event-time">
            {moment(event.start).format("hh:mm A")} – {moment(event.end).format("hh:mm A")}
          </div>

        </div>
      </div>

      {/* Badge if multiple events */}
      {event.children?.length > 1 && (
        <span className="notification-badge">{event.children.length}</span>
      )}
    </>
  );
};

export default CustomEvent;
