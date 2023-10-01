import admin from "firebase-admin";
import {getApps} from 'firebase-admin/app'
import {getAuth} from 'firebase-admin/auth';

const cred = require("../../firebase-credentials.json");

const app = getApps().length === 0 ? admin.initializeApp({credential: admin.credential.cert(cred)}) : getApps()[0];


export default app
export const auth = getAuth(app);