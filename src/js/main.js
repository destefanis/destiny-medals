// Import React, ReactDOM and the DummyComponent.
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/app.jsx'

// Define the root element.
const root = document.getElementById('root')

// Append the DummyComponent instance to the root element.
ReactDOM.render(
  <App />, 
  root
)

// API Requests
// const api_key = "b8f2f9674ea24761bfe8f0a49a84d3a3";
// const host = 'https://www.bungie.net/Platform/Destiny2/';
// const endpoint = host + 'SearchDestinyPlayer/4/DanielRD%231957/';
// // const endpoint = host + 'SearchDestinyPlayer/1/MARURIKI/';

// // https://www.bungie.net/Platform/Destiny2/img/destiny_content/pgcr/crucible_cliffside.jpg

// // Request object
// const initialRequest = new Request(endpoint, {
//   method: 'GET',
//   mode: 'cors',
//   headers: new Headers({
//     "X-API-Key": api_key
//   })
// });


// // Fetch the MembershipID for the user.
// // The membership ID is used to access the bungie.net profile and game activity.
// fetch(initialRequest)
//   .then(
//     function(response) {
//       if (response.status !== 200) {
//         console.log('Looks like there was a problem. Status Code: ' +
//           response.status);
//         return;
//       }

//       // Examine the text in the response  
//       response.json().then(function(data) {
//         let userCode = data.Response[0].membershipId;
//         // userRequest(userCode);
//       });
//     }
//   )
//   .catch(function(err) {
//     console.log('Fetch Error :-S', err);
//   });

//   // Fetch the users game activity.
//   function userRequest(userCode) {
//     let userEndpoint = host + '4/Profile/' + userCode + '/?components=100';
//     let userRequest = new Request(userEndpoint, {
//       method: 'GET',
//       mode: 'cors',
//       headers: new Headers({
//         "X-API-Key": api_key
//       })
//     });

//     fetch(userRequest)
//       .then(
//         function(response) {
//           if (response.status !== 200) {
//             console.log('Looks like there was a problem. Status Code: ' +
//               response.status);
//             return;
//           }
//           response.json().then(function(data) {
//             let characterIds = data.Response.profile.data.characterIds;
//             console.log(data);

//             // @todo Don't loop, let the player choose their character.
//             characterIds.forEach(characterId => {
//               profileRequest(userCode, characterId);
//             });
//           });
//         }
//       )
//       .catch(function(err) {
//         console.log('Fetch Error :-S', err);
//       });
//   }
 
//   // Find the game acitivity for the specific character chosen.
//   function profileRequest(userCode, characterId) {
//     // let endpoint = host + '1/Profile/' + userCode + '/Character/' + characterId + '/?components=CharacterActivities ';
//     // let endpoint = host + '1/Account/' + userCode + '/Character/' + characterId + '/Stats/ ';
//     let endpoint = host + '4/Account/' + userCode + '/Character/' + characterId + '/Stats/Activities/?mode=5';

//     let request = new Request(endpoint, {
//       method: 'GET',
//       mode: 'cors',
//       headers: new Headers({
//         "X-API-Key": api_key
//       })
//     });

//     fetch(request)
//       .then(
//         function(response) {
//           if (response.status !== 200) {
//             console.log('Looks like there was a problem. Status Code: ' +
//               response.status);
//             return;
//           }
//           response.json().then(function(data) {
//             let activityId = data.Response.activities[0].activityDetails.instanceId;
//             let referenceId = data.Response.activities[0].activityDetails.referenceId;
//             console.table(data);

//             manifestRequest(activityId, referenceId);
//           });
//         }
//       )
//       .catch(function(err) {
//         console.log('Fetch Error :-S', err);
//       });
//   }

//   // Search in activitydefinitions
//   // ReferenceId is the activity hash
//   // https://destiny.plumbing/2/en/raw/DestinyActivityDefinition.json
//   // We don't have the manifest handy so lets just find out what the activity is
//   // using this endpoint.
//   function manifestRequest(activityId, referenceId) {

//     let endpoint = host + 'Manifest/DestinyActivityDefinition/' + referenceId + '/';

//     let request = new Request(endpoint, {
//       method: 'GET',
//       mode: 'cors',
//       headers: new Headers({
//         "X-API-Key": api_key
//       })
//     });

//     fetch(request)
//       .then(
//         function(response) {
//           if (response.status !== 200) {
//             console.log('Looks like there was a problem. Status Code: ' +
//               response.status);
//             return;
//           }
//           response.json().then(function(data) {
//             console.log(data);
//           });
//         }
//       )
//       .catch(function(err) {
//         console.log('Fetch Error :-S', err);
//       });
//   }

