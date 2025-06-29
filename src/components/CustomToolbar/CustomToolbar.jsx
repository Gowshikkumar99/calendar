import React from "react";
import { navigate } from "react-big-calendar/lib/utils/constants";
import moment from "moment";
import leftArrow from "../../assets/images/customToolbar/left-arrow.png";
import rightArrow from "../../assets/images/customToolbar/right-arrow.png";
import plusIcon from "../../assets/images/common/plus-icon.png";
import "../CustomToolbar/CustomToolbar.scss";

const CustomToolbar = ({ date, view, onNavigate, onView }) => {
  const goToToday = () => {
    onNavigate(navigate.TODAY);
  };

  const goToBack = () => {
    onNavigate(navigate.PREVIOUS);
  };

  const goToNext = () => {
    onNavigate(navigate.NEXT);
  };

  const changeView = (newView) => {
    onView(newView);
  };

  const formattedLabel = () => {
    if (view === "week") {
      const start = moment(date).startOf("week");
      const end = moment(date).endOf("week");
      return `${start.format("DD MMMM")} to ${end.format("DD MMMM, YYYY")}`;
    }
    return moment(date).format("DD MMMM, YYYY");
  };

  return (
    <>
      <div className="rbc-toolbar">
        <div className="rbc-toolbar-head">
          <div className="rbc-toolbar-title">Your's Todo</div>
          <div className="rbc-toolbar-create-btn">
            <img src={plusIcon} alt="+" loading="lazy" />
            Create Schedule
          </div>
        </div>
        <span className="rbc-btn-group">
          <button className="rbc-btn-left rbc-btn" onClick={goToBack}>
            <img src={leftArrow} alt="Back" />
          </button>
          <button className="rbc-btn-right rbc-btn" onClick={goToNext}>
            <img src={rightArrow} alt="Next" />
          </button>
          <span className="rbc-toolbar-today" onClick={goToToday}>
            {String(new Date().getDate()).padStart(2, "0")}
          </span>
        </span>

        <span className="rbc-toolbar-label">
          <strong>{formattedLabel()}</strong>
        </span>

        <span className="rbc-btn-group">
          <button
            type="button"
            className={
              view === "day"
                ? "rbc-btn-nav rbc-btn active"
                : "rbc-btn-nav rbc-btn"
            }
            onClick={() => changeView("day")}
          >
            Day
          </button>
          <button
            type="button"
            className={
              view === "week"
                ? "rbc-btn-nav rbc-btn active"
                : "rbc-btn-nav rbc-btn"
            }
            onClick={() => changeView("week")}
          >
            Week
          </button>
          <button
            type="button"
            className={
              view === "month"
                ? "rbc-btn-nav rbc-btn active"
                : "rbc-btn-nav rbc-btn"
            }
            onClick={() => changeView("month")}
          >
            Month
          </button>
          <button
            type="button"
            className={
              view === "agenda"
                ? "rbc-btn-nav rbc-btn active"
                : "rbc-btn-nav rbc-btn"
            }
            onClick={() => {
              changeView("agenda");
              // setYearFilter(new Date(date).getFullYear());
            }}
          >
            Year
          </button>
        </span>
      </div>
    </>
  );
};

export default CustomToolbar;
