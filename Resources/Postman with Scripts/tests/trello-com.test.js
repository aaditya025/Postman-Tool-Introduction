require('dotenv').config();

const newman = require('newman');
const {handleResult} = require('jest-runner-newman/handle-result');

const apiUrlBase = 'https://api.getpostman.com';

const getCollectionUrl = (uid, apiKey) =>
  `${apiUrlBase}/collections/${uid}?apikey=${apiKey}`;
const getEnvironmentUrl = (uid, apiKey) =>
  `${apiUrlBase}/environments/${uid}?apikey=${apiKey}`;

const postmanApiKey = process.env.POSTMAN_WORKSPACE_API_KEY;
const collectionUid = process.env.POSTMAN_COLLECTION_UID;
const environmentUid = process.env.POSTMAN_ENVIRONMENT_UID;

newman.run(
  {
    collection: getCollectionUrl(collectionUid, postmanApiKey),
    environment: getEnvironmentUrl(environmentUid, postmanApiKey),
    reporters: ['cli'],
  },
  (err, summary) => {
    handleResult(err, summary);

    console.log('collection run complete');
  }
);
