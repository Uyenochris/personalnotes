# N322 Homework 4 – Personal Notes

I made a notes app using Expo and Firebase. Users can sign up, log in, add notes, edit notes, delete notes, and favorite notes.

## How to Run

1. Run `npm install`.
2. Make a Firebase project.
3. Add Firebase info to the `.env` file.
4. Turn on Email/Password login.
5. Set up Firestore and its rules.
6. Run `npx expo start`.

## How the App Works

- **Notes:** Shows all your notes.
- **Favorites:** Shows how many notes you favorited.
- **New Note:** Lets you make a note.
- **Edit Note:** Lets you change a note.

Notes are saved in Firebase. Each user can only see their own notes.

## Turning It In

Upload the project to GitHub. Submit the GitHub link and a screenshot on Canvas.

Don't upload `.env` or `node_modules`.
