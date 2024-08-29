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

document.addEventListener('DOMContentLoaded', () => {
    auth.onAuthStateChanged(user => {
        if (user) {
            loadUserProfile(user.uid);
        } else {
            window.location.href = '../index.html';
        }
    });

    //document.getElementById('upload-profile-picture').addEventListener('change', uploadProfilePicture);
});
      const btn = document.getElementById("submit-btn");
      const post = document.querySelector(".post");
      const widget = document.querySelector(".star-widget");
      const editBtn = document.querySelector(".edit");
      const reviewList = document.getElementById("review-list");
      const name="";
      
function loadUserProfile(uid) {
    db.collection('users').doc(uid).get().then(doc => {
        if (doc.exists) {
            const userData = doc.data();
            document.getElementById("username").value=userData.username;
            
        }
    })};
     
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const username= document.getElementById("username").value;
        const rating = document.querySelector('input[name="rate"]:checked').id.split("-")[1];
        const review = document.querySelector("textarea").value;

        db.collection("reviews").add({
          username: username,
          rating: parseInt(rating),
          review: review,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then((docRef) => {
          console.log("Review added successfully:", docRef.id);
          displayReviews();
        })
        .catch((error) => {
          console.error("Error adding review:", error);
        });

        widget.style.display = "none";
        post.style.display = "block";
        editBtn.onclick = () => {
          widget.style.display = "block";
          post.style.display = "none";
        }
      });

      function displayReviews() {
        db.collection("reviews")
          .orderBy("timestamp", "desc")
          .get()
          .then((querySnapshot) => {
            const reviews = [];
            querySnapshot.forEach((doc) => {
              reviews.push(doc.data());
            });
      
            // Limit to the most recent 3 reviews
            const recentReviews = reviews.slice(0, 3);
      
            // Clear the review list
            reviewList.innerHTML = "";
      
            // Add the most recent 3 reviews to the list
            recentReviews.forEach((review) => {
              const reviewHTML = `
                <li id="list">
                  <h3>${review.username}</h3>
                  <p>Rating: ${review.rating}/5</p>
                  <p>${review.review}</p>
                </li>
              `;
              reviewList.innerHTML += reviewHTML;
            });
          })
          .catch((error) => {
            console.error("Error fetching reviews:", error);
          });
      }
      

      displayReviews();