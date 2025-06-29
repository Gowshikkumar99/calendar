import React from 'react';
import './Modal.scss';
import googleMeetIcon from '/src/assets/images/popup-icons/google-meet.png';
import eyeIcon from '/src/assets/images/popup-icons/eye-icon.png';
import downloadIcon from '/src/assets/images/popup-icons/download-icon.png';

const EventModal = ({ title, candidate, job_id, interviewer, start, end, link, closeModal, moment }) => {
  if (!title || !start || !end) return null;
  return (
    <div className="popup-overlay" onClick={closeModal}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>×</button>
        <div className="popup-inner">
          <div className="popup-left">
            <p><strong>Interview With:</strong> {candidate?.candidate_firstName || 'N/A'}</p>
            <p><strong>Position:</strong> {job_id?.jobRequest_Title || 'N/A'}</p>
            <p><strong>Created By:</strong> {interviewer?.firstName || '-'}</p>
            <p><strong>Interview Date:</strong> {new Date(start).toLocaleDateString()}</p>
            <p><strong>Interview Time:</strong> {moment(start).format('hh:mm A')} - {moment(end).format('hh:mm A')}</p>
            <p><strong>Interview Via:</strong> Google Meet</p>
            <div className="popup-files">
              <button className="file-btn">Resume.docx
                <div className="icon-wrapper">
                  <img src={eyeIcon} alt="Eye Icon" className="icon" loading="lazy" />
                  <img src={downloadIcon} alt="Download Icon" className="icon" loading="lazy" />
                </div>
              </button>
              <button className="file-btn">Aadharcard
                <div className="icon-wrapper">
                  <img src={eyeIcon} alt="Eye Icon" className="icon" loading="lazy" />
                  <img src={downloadIcon} alt="Download Icon" className="icon" loading="lazy" />
                </div>
              </button>
            </div>
          </div>
          <div className="popup-right">
            <img src={googleMeetIcon} alt="Google Meet" className="meet-icon" loading="lazy" />
            <a href={link} target="_blank" rel="noopener noreferrer" className="join-btn">JOIN</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
