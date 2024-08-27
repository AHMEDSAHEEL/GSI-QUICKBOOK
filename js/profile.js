// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCS1H8GgHeXxprx2yro5dIxFA0O_0wyl70",
    authDomain: "loginsignupgsi.firebaseapp.com",
    projectId: "loginsignupgsi",
    storageBucket: "loginsignupgsi.appspot.com",
    messagingSenderId: "70847031831",
    appId: "1:70847031831:web:163cb409e13163040a0a52"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

document.addEventListener('DOMContentLoaded', () => {
    auth.onAuthStateChanged(user => {
        if (user) {
            loadUserProfile(user.uid);
        } else {
            window.location.href = '/index.html';
        }
    });

    document.getElementById('upload-profile-picture').addEventListener('change', uploadProfilePicture);
});

function loadUserProfile(uid) {
    db.collection('users').doc(uid).get().then(doc => {
        if (doc.exists) {
            const userData = doc.data();
            document.getElementById('profile-username').textContent = `Username: ${userData.username}`;
            document.getElementById('profile-email').textContent = `Email: ${userData.email}`;
            document.getElementById('profile-phone').textContent = `Phone: ${userData.phone}`;
            document.getElementById('profile-gender').textContent = `Gender: ${userData.gender}`;

            if (userData.profilePicture) {
                document.getElementById('profile-picture').src = userData.profilePicture;
            } else {
                setDefaultAvatar(userData.gender);
            }
        }
    }).catch(error => {
        console.error('Error loading user profile:', error);
    });
}

function setDefaultAvatar(gender) {
    const profilePictureElement = document.getElementById('profile-picture');
    
    if (gender==='male') {
        profilePictureElement.src = '../images/male-avatar.png'; // Path to your default male avatar image
        console.log(profilePictureElement.src)
        console.log("ahmed")
    } else if (gender==='female') {
        profilePictureElement.src = '../images/female-avatar.png'; // Path to your default female avatar image
        console.log("ahmed")
    }
}

function uploadProfilePicture(event) {
    const file = event.target.files[0];
    const user = auth.currentUser;

    if (file && user) {
        const loadingSpinner = document.getElementById('loading-spinner');
        loadingSpinner.style.display = 'block';

        const storageRef = storage.ref();
        const profilePicRef = storageRef.child(`profilePictures/${user.uid}`);
      

        profilePicRef.put(file).then(snapshot => {
            snapshot.ref.getDownloadURL().then(downloadURL => {
                document.getElementById('profile-picture').src = downloadURL;
                loadingSpinner.style.display = 'none';
                return db.collection('users').doc(user.uid).update({
                    profilePicture: downloadURL
                });
            });
        }).catch(error => {
            loadingSpinner.style.display = 'none';
            console.error('Error uploading profile picture:', error);
        });
    }
}

function logout() {
    auth.signOut().then(() => {
        window.location.href = '/index.html';
    }).catch(error => {
        console.error('Error logging out:', error);
    });
}
