
function auth(){
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if(connectedUser){
        const user = document.getElementById('username');
       
        user.innerText= connectedUser.username;
        user.style.color="white";
        

        const reg = document.getElementById('register');
        const log = document.getElementById('login');
        reg.style.display= "none";
        log.style.display="none";
       
    } else {
        const logout = document.getElementById('logout');
        logout.style.display="none";
    }
    
}


function loadAndDisplayUsers() {


    const userListElement = document.getElementById("userList");
    // Clear any existing content in the userListElement
    userListElement.innerHTML = "Loading...";
    // Retrieve the userList from Local Storage
    fetch('http://localhost:8080/api/v1/users')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            displayUsers(data, userListElement);
        });
}

function displayUsers(userList, userListElement) {
    userListElement.innerHTML = "";

    // Loop through the userList and create list items to display each user
    userList.forEach(user => {
        const listItem = document.createElement("li");
        if(user.status === "online"){
            listItem.innerHTML = `
            <div>
                <p class="bi bi check-lg"></p>
                ${user.username} <i class="user-email" font-weight="small">(${user.email})</i>
            </div>
            <i class="bi bi check-lg ${user.status === "online" ? "online" : "offline"}"></i>
        `;
    userListElement.appendChild(listItem);
        }
       
    });
    auth();
}

// Call the loadAndDisplayUsers function when the page loads
window.addEventListener("load", loadAndDisplayUsers);




function handleLogout() {
    fetch('http://localhost:8080/api/v1/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: localStorage.getItem('connectedUser')
    })
        .then((response) => {
            
            console.log("usuario eliminado")
            return response;
        })
        .then(() => {
            
            
        });
        localStorage.removeItem('connectedUser');
        window.location.href = "index.html";
}

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", handleLogout);


function handleNewMeeting() {
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if(!connectedUser){
        window.location="login.html";
        return;
    }
    window.open(`videocall.html?username=${connectedUser.username}`);
}

// Attach the handleNewMeeting function to the "Create a New Meeting" button
const newMeetingBtn = document.getElementById("newMeetingBtn");
newMeetingBtn.addEventListener("click", handleNewMeeting);


function handleJoinMeeting() {

    
    const roomId = document.getElementById("meetingName").value;
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

    if(!connectedUser){
        window.location="login.html";
        return;
    }

    const url = `videocall.html?roomID=${roomId}&username=${connectedUser.username}`;

    window.open(url);
}

const joinMeetingBtn = document.getElementById("joinMeetingBtn");
joinMeetingBtn.addEventListener("click", handleJoinMeeting);


