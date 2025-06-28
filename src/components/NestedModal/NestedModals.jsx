import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import './NestedModals.scss';
import deleteIcon from '../../assets/images/popup-icons/delete-icon.png';
import editIcon from '../../assets/images/popup-icons/edit-icon.png';

const NestedEventModal = ({ nestedEvents, onClose, onSelect, onDelete, position }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (nestedEvents) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [nestedEvents, onClose]);

  if (!nestedEvents || nestedEvents.length === 0) return null;

  const modalStyle = {
    position: 'absolute',
    top: position?.top || 0,
    left: position?.left || 0,
    zIndex: 1000,
  };

  return (
    <div
      className={`nested-modal${position === 'mobile' ? ' nested-modal--mobile' : ''}`}
      style={typeof position === 'object' ? modalStyle : {}}
      role="dialog"
      aria-modal="true"
      ref={modalRef}
    >
      <div className="nested-modal-header">
        <span>Meeting</span>
        <button className="nested-modal-close-btn" onClick={onClose}>x</button>
      </div>
      <div className="nested-modal-content">
        {nestedEvents.map((ev, i) => (
          <div className="nested-event-card" key={i}>
            <div className="event-wrapper">
              <div className="event-title">{ev.summary || ev.title}</div>
              <div className="event-actions">
                <button className="edit-btn nested-btn" onClick={() => onSelect(ev)}>
                  <img src={editIcon} loading='lazy' alt='Edit Icon' />
                </button>
                <button className="delete-btn nested-btn" onClick={() => onDelete(ev)}>
                  <img src={deleteIcon} loading='lazy' alt='Delete Icon' />
                </button>
              </div>
            </div>
            <div className="event-meta">
              {ev.interviewer?.firstName && (
                <div className='event-interviewer'>Interviewer: {ev.interviewer.firstName}</div>
              )}
              <div className="event-meta-row">
                <div className='event-date'>Date: {moment(ev.start).format("DD MMM YYYY")}</div>
                <> | </>
                <div className='event-time'>Time: {moment(ev.start).format("hh:mm A")} - {moment(ev.end).format("hh:mm A")}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NestedEventModal;
