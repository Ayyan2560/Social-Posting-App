document.querySelector('form').addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirm-password").value;
    console.log("Signing up with", email, password, confirmPassword);

    if (!email.includes("@")) {
        alert("Make sure that your email have `@`.");
        return;
    }

    if (!password) {
        alert("Password is required.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const users_in_string = localStorage.getItem("users");
    const all_user = JSON.parse(users_in_string) || [];

    let new_user = {
        email: email.toLowerCase(),
        password: password
    };

    all_user.push(new_user);
    localStorage.setItem("users", JSON.stringify(all_user));
    alert("Signup successful!");
       window.location.href = "../login/index.html";
});
