document.querySelector("#signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const button = document.querySelector("#signupForm button");
    const email = document.querySelector("#email").value.trim().toLowerCase();
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirm-password").value;
    const errorDiv = document.querySelector("#errorMessage");
    const successDiv = document.querySelector("#successMessage");

    errorDiv.style.display = "none";
    errorDiv.textContent = "";
    successDiv.style.display = "none";
    successDiv.textContent = "";
    button.classList.add("loading");
    button.textContent = "Signing up...";

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!email.includes("@")) {
        errorDiv.textContent = "Please enter a valid email address.";
        errorDiv.style.display = "block";
        button.classList.remove("loading");
        button.textContent = "Sign Up";
        return;
    }

    if (!password) {
        errorDiv.textContent = "Password is required.";
        errorDiv.style.display = "block";
        button.classList.remove("loading");
        button.textContent = "Sign Up";
        return;
    }

    if (password !== confirmPassword) {
        errorDiv.textContent = "Passwords do not match.";
        errorDiv.style.display = "block";
        button.classList.remove("loading");
        button.textContent = "Sign Up";
        return;
    }

    const usersString = localStorage.getItem("users");
    const users = usersString ? JSON.parse(usersString) : [];

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        errorDiv.textContent = "An account with this email already exists.";
        errorDiv.style.display = "block";
        button.classList.remove("loading");
        button.textContent = "Sign Up";
        return;
    }

    const newUser = {
        email: email,
        password: password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    successDiv.textContent = "Account created successfully! You can now log in.";
    successDiv.style.display = "block";

    // Clear the form
    document.querySelector("#signupForm").reset();

    button.classList.remove("loading");
    button.textContent = "Sign Up";
});
