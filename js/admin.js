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

auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
            const userData = doc.data();
            if (!userData.isAdmin) {
                alert('Access denied!');
                auth.signOut();
                window.location.href = "../html/auth.html";
            }
        }).catch(error => {
            console.error('Error fetching user data:', error);
        });
    } else {
        window.location.href = "../html/LoginSignup.html";
    }
});

function logout() {
    auth.signOut().then(() => {
        window.location.href = "../html/LoginSignup.html";
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
            const li = document.createElement('li');
            li.textContent = `${user.username} (${user.email})`;
            li.setAttribute('data-user-id', doc.id); // Store user ID as data attribute
            //li.addEventListener('click', () => openDeleteUserModal(doc.id)); // Add click listener for delete confirmation
            usersUl.appendChild(li);
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

