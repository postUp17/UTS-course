import React from 'react';
import { Modal } from 'react-bootstrap';

import { checkImg } from './helpers';
import './Recommendation.css';

const sortRecommendations = (a, b) => {
  const recoA = Number(a.stars);
  const recoB = Number(b.stars);

  let comparison = 0;
  if (recoA > recoB) {
    comparison = -1;
  } else if (recoA < recoB) {
    comparison = 1;
  }
  return comparison;
};

const Recommendation = props => {
  const { reco } = props;
  const sortedReco = reco.sort(sortRecommendations);
  const topReco = sortedReco.slice(0, 2);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Recommendated Courses
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>You might also like:</h6>
        <div className="sub-content">
          {topReco.length > 0 &&
            topReco.map(item => (
              <div key={item.subject}>
                <div>
                  <img
                    alt="subject-img"
                    style={{ width: '300px', height: '200px' }}
                    src={checkImg(item.subject)}
                  />
                </div>
                <div className="sub-name">{item.subject}</div>
              </div>
            ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Recommendation;
