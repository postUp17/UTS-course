// import React, { useState } from 'react';
// import StarRatings from 'react-star-ratings';

// const Subject = props => {
//   const { title, rating, changeRating } = props;

//   const [stars, setStars] = useState(0);

//   handleRatingChange = () => {
//     this.props.onSelectRating(stars);
//   };
//   return (
//     <div className='container'>
//       <div>
//         <img
//           alt='subject-img'
//           style={{ width: '150px', height: '100px' }}
//           src={require('./img/Cloud.jpg')}
//         />
//       </div>

//       <div>
//         <div>{title}</div>
//         <div>
//           <StarRatings
//             starRatedColor='green'
//             starEmptyColor='grey'
//             starHoverColor='green'
//             rating={stars}
//             changeRating={stars}
//             numberOfStars={5}
//             name='rating'
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Subject;
