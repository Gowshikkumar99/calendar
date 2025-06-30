import React from "react";
import moment from "moment";
import { Navigate, Views } from "react-big-calendar";
import { useCalendar } from "../../context/CalendarContext";
import "/src/components/Calendar/YearView.scss";

const YearView = ({ date, events, onNavigate, onView }) => {
  const { setDate, setView } = useCalendar();
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
    setDate(day.toDate());
    setView(Views.DAY);
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
