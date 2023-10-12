let data = localStorage.getItem("passwords");
console.log();


const deletePassword = (website) => {
    // let data = localStorage.getItem("passwords");
    showPasswords();
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e) => {
        return e.website != website;
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    alert("Password Deleted !");
    showPasswords();
    window.location.reload();
};

const showPasswords = () => {
    let tb = document.querySelector("table");
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No data to show";
        tb.classList.add('red');
    }
    else {
        tb.innerHTML = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Actions</th>
    </tr>`
        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            str += `<tr>
                <td>${element.website}</td>
                <td>${element.username} <i class="fa-solid fa-copy" onclick="copyText('${element.username}')"></i> </td>
                <td>${maskPassword(element.password)} <i class="fa-solid fa-copy" onclick="copyText('${element.password}')"></i> </td>
                <td><button class="btn" onclick="deletePassword('${element.website}')">Delete</button></td>
            </tr>`;
        }
        tb.innerHTML = tb.innerHTML + str;

        website.value = "";
        username.value = "";
        password.value = "";
    }
};

function maskPassword(pass) {
    let str = "";
    for (let index = 0; index < pass.length; index++) {
        str += "*";
    }
    return str;
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            copied.classList.add('show');
            setTimeout(() => {
                copied.classList.remove('show');
            }, 2000)
        },
        () => {
            span.innerHTML = "(Not Copied!)";
        }
    );
}
console.log("Working")
showPasswords();
document.querySelector(".submit").addEventListener("click", (e) => {
    document.addEventListener('contextmenu', event => event.preventDefault());
    e.preventDefault();
    // console.log("clicked....");
    let passwords = localStorage.getItem("passwords")
    // console.log(passwords);
    if (passwords == null) {
        let json = []
        json.push({ website: website.value, username: username.value, password: password.value })
        console.log(JSON.stringify(json));
        localStorage.setItem("passwords", JSON.stringify(json));
    }
    else {
        let json = JSON.parse(localStorage.getItem("passwords"));
        json.push({ website: website.value, username: username.value, password: password.value })
        saved.classList.add('show');
        setTimeout(() => {
            saved.classList.remove('show');
        }, 2000);
        localStorage.setItem("passwords", JSON.stringify(json));
        showPasswords();
        window.location.reload();
    }
});
