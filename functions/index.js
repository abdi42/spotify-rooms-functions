// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.countNameChanges = functions.firestore
    .document('rooms/{roomId}/{queueCollectionId}/{queueId}')
    .onCreate((snap, context) => {
      console.log(snap.ref.parent);
      return new Promise(function(resolve, reject) {
        
        snap.ref.parent.get().then((queue) => {
          snap.ref.parent.ref.set({
            queue_length: queue.size
          }, {merge: true});
          
          resolve()
        })
        
      });

      
    });
