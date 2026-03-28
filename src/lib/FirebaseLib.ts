import {
  initializeApp,
  cert,
  getApps,
  type AppOptions,
  type App,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

class FirebaseLib {
  private static instance: App;
  private static config: AppOptions;

  private static getConfig() {
    try {
      const firebaseAdminConfig: AppOptions = {
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID!,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")!,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        }),
      };

      this.config = firebaseAdminConfig;
    } catch (err) {
      throw new Error("Error on firebase config.");
    }
  }

  public static init() {
    this.getConfig();
    if (getApps().length === 0) {
      this.instance = initializeApp(this.config);
    }
  }

  public static getFirestore() {
    return getFirestore(this.instance);
  }
}

export { FirebaseLib };
