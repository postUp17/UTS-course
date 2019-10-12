import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

import Recommendation from './Recommendation';
import Header from './Header';
import { checkImg } from './helpers';

import data from './ratings.json';
import './App.css';

const { titles } = data;

let resultDivs = [];

const roundTwoDecimals = number => (Math.round(number * 100) / 100).toFixed(2);

const euclideanDistance = (ratings1, ratings2) => {
  let titles = data.titles;

  let sumSquares = 0;
  for (let i = 0; i < titles.length; i++) {
    let title = titles[i];
    let rating1 = ratings1[title];
    let rating2 = ratings2[title];
    if (rating1 != null && rating2 != null) {
      let diff = rating1 - rating2;
      sumSquares += diff * diff;
    }
  }
  let d = Math.sqrt(sumSquares);

  let similarity = 1 / (1 + d);
  return similarity;
};

const App = () => {
  const [ratings, setRatings] = useState({
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0,
    value5: 0,
    value6: 0,
    value7: 0,
    value8: 0,
    value9: 0
  });
  const [reco, setReco] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const handleDropdowns = (fieldName, eventKey) => {
    setRatings({
      ...ratings,
      [fieldName]: eventKey
    });
  };

  const clearRatings = () => {
    setRatings({
      value1: 0,
      value2: 0,
      value3: 0,
      value4: 0,
      value5: 0,
      value6: 0,
      value7: 0,
      value8: 0,
      value9: 0
    });
  };

  const predictRatings = () => {
    let newUser = {};
    for (let i = 0; i < titles.length; i++) {
      let title = titles[i];
      let rating = ratings[`value${i + 1}`];
      if (rating === 0) {
        rating = null;
      }
      newUser[title] = rating;
    }
    findNearestNeighbors(newUser);
    setModalShow(true);
  };

  const findNearestNeighbors = user => {
    resultDivs = [];

    let similarityScores = {};
    for (let i = 0; i < data.users.length; i++) {
      let other = data.users[i];
      let similarity = euclideanDistance(user, other);
      similarityScores[other.name] = similarity;
    }

    data.users.sort(compareSimilarity);

    function compareSimilarity(a, b) {
      let score1 = similarityScores[a.name];
      let score2 = similarityScores[b.name];
      return score2 - score1;
    }

    for (let i = 0; i < data.titles.length; i++) {
      let title = data.titles[i];
      if (user[title] == null) {
        let k = 5;
        let weightedSum = 0;
        let similaritySum = 0;
        for (let j = 0; j < k; j++) {
          let name = data.users[j].name;
          let sim = similarityScores[name];
          let ratings = data.users[j];
          let rating = ratings[title];
          if (rating != null) {
            weightedSum += rating * sim;
            similaritySum += sim;
          }
        }

        let stars = roundTwoDecimals(weightedSum / similaritySum);
        let div = { subject: title, stars: stars };
        resultDivs.push(div);
        setReco(resultDivs);
      }
    }
  };

  return (
    <div className="over-all">
      <Header />
      <div className="container mt-3">
        <div className="description ">
          Please rate the courses you have taken
        </div>
        <div className="row">
          {titles.map((title, index) => (
            <div key={index} className="col-12 col-md-6 col-xl-4 text-center">
              <div className="each-card">
                <div>
                  <img
                    alt="subject-img"
                    style={{ width: '150px', height: '100px' }}
                    src={checkImg(title)}
                  />
                </div>
                <div className="sub-info">
                  <div className="sub-title">{title}</div>
                  <div>
                    <StarRatings
                      starRatedColor="f8ac2e"
                      starEmptyColor="grey"
                      starHoverColor="f8ac2e"
                      rating={ratings[`value${index + 1}`]}
                      changeRating={k =>
                        handleDropdowns(`value${index + 1}`, k)
                      }
                      numberOfStars={5}
                      starDimension="20px"
                      starSpacing="5px"
                      name="rating"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="btns row">
          <div>
            <Button
              variant="outline-info"
              onClick={clearRatings}
              className="action-btn"
            >
              Clear
            </Button>
          </div>
          <div className="ml-3">
            <Button
              variant="info"
              onClick={predictRatings}
              className="action-btn"
            >
              Try Me
            </Button>
          </div>
        </div>
        <div>
          <Recommendation
            show={modalShow}
            onHide={() => setModalShow(false)}
            reco={reco}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
