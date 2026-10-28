# Personal Notes

N322 Homework 4

I made a notes app with Expo and Firebase. You can make an account, login, add notes, edit them, delete them, and favorite them.

## Running it

1. Run `npm install`.
2. Make a Firebase project at https://console.firebase.google.com/.
3. Add a Web app in Firebase and copy `.env.example` to `.env`.
4. Put the Firebase Web app values in `.env`.
5. Turn on Email/Password in Firebase Authentication.
6. Create a Firestore database and paste `firestore.rules` into the Firestore Rules page. Publish the rules.
7. Run `npx expo start`.

## App

The Notes tab has the list of notes. The Favorites tab shows the number of favorites. New Note goes to the note screen. The note ID is passed to the note screen when editing. Notes are in the Firestore `notes` collection and have a title, content, date, user ID, and favorite value.

The user ID is used to get the logged-in person's notes. The Firestore rules also check the user ID.

For the assignment submission, upload the project to GitHub and submit the link and a screenshot in Canvas. The `.env` file and `node_modules` folder should not be uploaded.
