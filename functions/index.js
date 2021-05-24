/* eslint-disable @typescript-eslint/no-unused-vars */
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const firestore = require('@google-cloud/firestore');

admin.initializeApp();
const firestoreAdmin = admin.firestore();

exports.getExperiment = functions
  .region('europe-west3')
  .https.onCall(async (data, _context) => {
    try {
      const publicId = data.publicId;

      const experimentSnapshot = await firestoreAdmin
        .collection('experiments')
        .where('publicId', '==', publicId)
        .limit(1)
        .get();

      // if we found a doc
      if (experimentSnapshot.docs.length > 0) {
        const snapshot = experimentSnapshot.docs[0];
        // const ref = snapshot.ref;
        const experiment = snapshot.data();

        return {
          ...experiment,
        };
      }
      return {
        error: 'experiment not found'
      };
    } catch (err) {
      return {
        error: 'experiment not found'
      };
    }
  });
