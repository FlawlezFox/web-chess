import dotenv from "dotenv";
import assert from "assert";

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    FRONTEND_URL,
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID
} = process.env;

assert(PORT, "Port is required");
assert(HOST, "Host is required");

const config = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    frontend_url: FRONTEND_URL,

    firebaseConfig: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        databaseURL: DATABASE_URL,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID,
        measurementId: MEASUREMENT_ID,
    }
}

export default config;