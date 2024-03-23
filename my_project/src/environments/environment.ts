
interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

interface Environment {
    production: boolean;
    firebase: FirebaseConfig;
}

export const environment: Environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyA8SgSbLZRZLDGJGXsQoCj6t0Z-yq4YgbM",
        authDomain: "animaladoption-95397.firebaseapp.com",
        projectId: "animaladoption-95397",
        storageBucket: "animaladoption-95397.appspot.com",
        messagingSenderId: "1080972947602",
        appId: "1:1080972947602:web:3e1d677ce8a0b69805b64b"
    }
};
