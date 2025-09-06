# How to Run the create_admins_collection.js Script

This guide explains how to run the `create_admins_collection.js` script to create the "admins" collection in your Firestore database and add authorized users.

## Prerequisites

- Node.js installed on your machine. Download from https://nodejs.org/
- Firebase project with Firestore enabled.
- Firebase service account key JSON file downloaded from Firebase Console.

## Steps

1. **Install Node.js**

   Download and install Node.js from https://nodejs.org/ if you don't have it.

2. **Prepare your project folder**

   Place the `create_admins_collection.js` script and your Firebase service account key JSON file in the same folder.

3. **Install Firebase Admin SDK**

   Open a terminal in the project folder and run:

   ```
   npm install firebase-admin
   ```

4. **Edit the script**

   - Open `create_admins_collection.js`.
   - Replace `'./path/to/serviceAccountKey.json'` with the actual filename of your service account key JSON.
   - Replace the `authorizedUserUids` array with the UIDs of the users you want to authorize.

5. **Run the script**

   In the terminal, run:

   ```
   node create_admins_collection.js
   ```

   This will create the "admins" collection and add the specified users.

## How to get user UIDs

- Go to Firebase Console > Authentication > Users.
- Find the user and copy their UID.

## Notes

- This script must be run in a secure environment since it uses admin credentials.
- After running, authorized users will be able to access adm.html.

If you need help with any step, please ask.
