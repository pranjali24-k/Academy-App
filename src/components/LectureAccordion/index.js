import React, { useState } from 'react';
import './styles.css';

const LectureAccordion = ({ lectures }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='lectureAccordion'>
      {lectures.map((lecture, index) => (
        <div key={index}>
          <div
            className={`accordion-header ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleClick(index)}
          >
           <p> {lecture.topicName}</p>
           <p> {lecture.lectureDate}</p>
          </div>
          {activeIndex === index && (
            <div className="accordion-content">
              <p>{lecture.topicDetails}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LectureAccordion;
