import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import '/src/components/Calendar/Mycalendar.scss';

import EventModal from '../Modal/EventModal.jsx';
import CustomToolbar from '../CustomToolbar/CustomToolbar';
import NestedEventModal from '../NestedModal/NestedModals.jsx';
import CustomEvent from '../CustomEvent/CustomEvent.jsx';
import DateHeader from '../DateHeader/DateHeader.jsx';

import React, { useState, useEffect } from 'react';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const calendarStartHour = 10;
const calendarEndHour = 19;

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState(Views.WEEK);
  const [nestedEvents, setNestedEvents] = useState(null);
  const [modalPosition, setModalPosition] = useState(null);

  const handleDeleteEvent = (eventToDelete) => {
    const updatedEvents = events.flatMap(ev => {
      if (ev.children) {
        const filteredChildren = ev.children.filter(child => child !== eventToDelete);
        if (filteredChildren.length === 1) {
          return [{ ...filteredChildren[0], children: undefined }];
        } else if (filteredChildren.length > 1) {
          return [{ ...ev, children: filteredChildren }];
        } else {
          return [];
        }
      }
      return ev !== eventToDelete ? [ev] : [];
    });

    setEvents(updatedEvents);
    setNestedEvents(null);
  };

  const moveEvent = ({ event, start, end }) => {
    const updatedEvents = events.map((evt) =>
      evt === event ? { ...evt, start, end } : evt
    );
    setEvents(updatedEvents);
  };

  const handleSelectEvent = (event, e) => {
    e.preventDefault();
    e.stopPropagation();

    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const offset = 15;
    const modalWidth = 260;
    const modalHeight = 180;
    const viewportWidth = window.innerWidth;

    let left = rect.right + window.scrollX + offset;
    if (rect.right + modalWidth + offset > viewportWidth) {
      left = rect.left + window.scrollX - modalWidth - offset;
    }

    const top = rect.top + window.scrollY + rect.height / 2 - modalHeight / 2;
    const position = { top, left };

    if (event.children) {
      const isMobile = window.innerWidth <= 768;
      setModalPosition(isMobile ? 'mobile' : position);
      setNestedEvents(event.children);
    } else {
      setSelectedEvent(event);
    }
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  useEffect(() => {
    document.body.classList.toggle('modal-open', !!selectedEvent);
    return () => document.body.classList.remove('modal-open');
  }, [selectedEvent]);

  useEffect(() => {
    fetch('/data/calendarfromtoenddate.json')
      .then(res => res.json())
      .then(data => {
        const mapped = data.map(item => ({
          title: `${item.summary}\nInterviewer: ${item.user_det.handled_by.firstName}`,
          start: new Date(item.start),
          end: new Date(item.end),
          link: item.link,
          candidate: item.user_det.candidate,
          interviewer: item.user_det.handled_by,
          score: item.score,
        }));

        const groupedMap = {};
        mapped.forEach(event => {
          const key = new Date(event.start).toISOString();
          if (!groupedMap[key]) groupedMap[key] = [];
          groupedMap[key].push(event);
        });

        const grouped = Object.values(groupedMap).map(group => {
          const first = group[0];
          return {
            title: group.length > 1 ? 'Multiple Interviews' : first.title,
            start: new Date(first.start),
            end: new Date(first.end),
            children: group.length > 1 ? group : undefined,
            link: first.link,
            interviewer: first.interviewer,
            round: first.round,
            candidate: first.candidate,
            score: first.score
          };
        });

        setEvents(grouped);
      })
      .catch(err => console.error('Failed to load calendar data:', err));
  }, []);

  return (
    <div className="my-calendar-container">
      <div className="calendar-header"></div>

      <DnDCalendar
        localizer={localizer}
        events={events}
        date={date}
        view={view}
        onView={setView}
        onNavigate={setDate}
        views={[Views.DAY, Views.WEEK, Views.MONTH, Views.AGENDA]}
        step={60}
        timeslots={1}
        min={new Date(new Date().setHours(calendarStartHour, 0))}
        max={new Date(new Date().setHours(calendarEndHour, 0))}
        onEventDrop={moveEvent}
        onSelectEvent={(event, e) => handleSelectEvent(event, e)}
        components={{
          toolbar: CustomToolbar,
          event: CustomEvent,
          week: {
            header: DateHeader
          },
          month: {
            event: CustomEvent
          },
        }}
      />

      <EventModal
        candidate={selectedEvent?.candidate}
        title={selectedEvent?.title}
        interviewer={selectedEvent?.interviewer}
        start={selectedEvent?.start}
        end={selectedEvent?.end}
        link={selectedEvent?.link}
        closeModal={closeModal}
        moment={moment}
      />

      <NestedEventModal
        nestedEvents={nestedEvents}
        position={modalPosition}
        onClose={() => setNestedEvents(null)}
        onSelect={(ev) => {
          setSelectedEvent(ev);
          setNestedEvents(null);
        }}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
};

export default MyCalendar;