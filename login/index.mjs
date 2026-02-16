document.querySelector("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const button = document.querySelector("#loginForm button");
    const email = document.querySelector("#email").value.trim().toLowerCase();
    const password = document.querySelector("#password").value;
    const errorDiv = document.querySelector("#errorMessage");

    errorDiv.style.display = "none";
    errorDiv.textContent = "";
    button.classList.add("loading");
    button.textContent = "Logging in...";

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!email.includes("@")) {
        errorDiv.textContent = "Please enter a valid email address.";
        errorDiv.style.display = "block";
        button.classList.remove("loading");
        button.textContent = "Login";
        return;
    }

    if (!password) {
        errorDiv.textContent = "Password is required.";
        errorDiv.style.display = "block";
        button.classList.remove("loading");
        button.textContent = "Login";
        return;
    }

    const usersString = localStorage.getItem("users");
    const users = usersString ? JSON.parse(usersString) : [];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert("Login successful! Welcome back.");

        localStorage.setItem("currentUser", JSON.stringify(user));

        window.location.href = "../posts/index.html";
    } else {
        errorDiv.textContent = "Invalid email or password.";
        errorDiv.style.display = "block";
    }

    button.classList.remove("loading");
    button.textContent = "Login";
});
