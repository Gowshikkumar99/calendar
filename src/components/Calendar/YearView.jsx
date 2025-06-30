import React from "react";
import moment from "moment";
import { Navigate } from "react-big-calendar";

const YearView = ({ date, events, onNavigate, onView }) => {
  const months = Array.from({ length: 12 }, (_, i) => {
    const start = moment(date).month(i).startOf("month");
    const end = moment(date).month(i).endOf("month");

    const days = [];
    const current = start.clone();
    while (current.isSameOrBefore(end, "day")) {
      days.push(current.clone());
      current.add(1, "day");
    }

    return days;
  });

  const handleDayClick = (day) => {
    if (onNavigate && onView) {
      const selectedDate = day.toDate();
      onView("day");
      onNavigate(selectedDate);
    }
  };

  const renderEvents = (day) => {
    const todaysEvents = events?.filter((ev) =>
      moment(ev.start).isSame(day, "day")
    );
    return todaysEvents.length > 1
      ? " has-multiple"
      : todaysEvents.length === 1
      ? " has-event"
      : "";
  };

  return (
    <>
      <style>{`
        .yearview-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          padding: 1rem;
        }
        .month {
          border: 1px solid #ccc;
          padding: 0.5rem;
          background: #fff;
        }
        .month h4 {
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .month-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 2px;
        }
        .day-cell {
          background: #f9f9f9;
          padding: 4px;
          font-size: 0.75rem;
          min-height: 40px;
          border-radius: 4px;
          cursor: pointer;
        }
        .day-cell.has-event {
          background-color: #c9e6ff;
        }
        .day-cell.has-multiple {
          background-color: #ffa9a9;
        }
        .date-number {
          font-weight: bold;
          font-size: 0.8rem;
        }
      `}</style>

      <div className="yearview-container">
        {months.map((days, i) => (
          <div className="month" key={i}>
            <h4>{days[0].format("MMMM")}</h4>
            <div className="month-grid">
              {days.map((day, idx) => (
                <div
                  key={idx}
                  className={`day-cell${renderEvents(day)}`}
                  onClick={() => handleDayClick(day)}
                >
                  <div className="date-number">{day.format("D")}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

// Static methods required for custom views
YearView.range = (date, { localizer }) => {
  const start = localizer.startOf(date, "year");
  const end = localizer.endOf(date, "year");
  const range = [];

  let current = start;
  while (localizer.lte(current, end, "month")) {
    range.push(current);
    current = localizer.add(current, 1, "month");
  }

  return range;
};

YearView.navigate = (date, action, { localizer }) => {
  switch (action) {
    case Navigate.NEXT:
      return localizer.add(date, 1, "year");
    case Navigate.PREVIOUS:
      return localizer.add(date, -1, "year");
    default:
      return date;
  }
};

YearView.title = (date, { localizer }) =>
  `Year: ${localizer.format(date, "yyyy")}`;

export default YearView;
