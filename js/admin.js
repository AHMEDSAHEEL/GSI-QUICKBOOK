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

auth.onAuthStateChanged(user => {
    if (user) {
        // Fetch user data from Firestore
        db.collection('users').doc(user.uid).get().then(doc => {
            if (doc.exists) {
                const userData = doc.data();
                if (userData.isAdmin) {
                    const adminName = userData.username; // Assuming username is stored in Firestore
                    document.getElementById('welcomeAdmin').textContent = `Welcome, ${adminName}!`;
                } else {
                    // Non-admin user should not access admin panel
                    alert('Access denied!');
                    auth.signOut();
                    window.location.href = "/index.html";
                }
            } else {
                // Handle case where user document doesn't exist
                console.error('User document does not exist');
                auth.signOut();
                window.location.href = "/index.html";
            }
        }).catch(error => {
            console.error('Error fetching user data:', error);
            auth.signOut();
            window.location.href = "/index.html";
        });
    } else {
        // Redirect to authentication page if no user is logged in
        window.location.href = "../html/auth.html";
    }
});

function logout() {
    auth.signOut().then(() => {
        window.location.href = "/index.html";
    }).catch(error => {
        console.error('Error logging out:', error);
    });
}

function viewUsers() {
    const userList = document.getElementById('user-list');
    const usersUl = document.getElementById('users');
    usersUl.innerHTML = '';
    db.collection('users').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const user = doc.data();
            
           
            if(!user.isAdmin){
            const li = document.createElement('li');
            li.textContent = `${user.username} - ${user.email}`;
            
            li.setAttribute('data-user-id', doc.id); // Store user ID as data attribute
            //li.addEventListener('click', () => openDeleteUserModal(doc.id)); // Add click listener for delete confirmation
            usersUl.appendChild(li);
            }
        });
        userList.style.display = 'block';
    }).catch(error => {
        console.error('Error fetching users:', error);
    });
}

// function openDeleteUserModal(userId) {
//     const modal = document.getElementById('delete-user-modal');
//     modal.style.display = 'block';
//     modal.setAttribute('data-user-id', userId); // Store user ID in modal
// }

// function closeDeleteUserModal() {
//     const modal = document.getElementById('delete-user-modal');
//     modal.style.display = 'none';
// }

// // Delete user function
// function deleteUser() {
//     const modal = document.getElementById('delete-user-modal');
//     const userId = modal.getAttribute('data-user-id');

//     // Delete user from Authentication
//     firebase.auth().deleteUser(userId)
//         .then(() => {
//             console.log('User deleted successfully from Authentication');
//             // Delete user document from Firestore
//             db.collection('users').doc(userId).delete()
//                 .then(() => {
//                     console.log('User deleted successfully from Firestore');
//                     // Close the modal after deletion
//                     closeDeleteUserModal();
//                     // Refresh user list
//                     viewUsers();
//                 })
//                 .catch(error => {
//                     console.error('Error deleting user from Firestore:', error);
//                 });
//         })
//         .catch(error => {
//             console.error('Error deleting user from Authentication:', error);
//         });
// }

