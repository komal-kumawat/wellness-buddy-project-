document.addEventListener("DOMContentLoaded", () => {
    // Replace with your deployed backend URL
    const registerRoute = "http://localhost:5000/api/auth/register";

    document.getElementById("registerForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const values = {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            confirmPassword: document.getElementById("confirmPassword").value,
        };

        if (handleValidation(values)) {
            try {
                const response = await axios.post(registerRoute, {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                });
                const data = response.data;
                if (data.status === false) {
                    console.log(data);
                    alert("Error registering");
                }
                if (data.status === true) {
                    console.log("Registered user");
                    alert("Successfully registered");
                    localStorage.setItem("user", JSON.stringify(data.user));
                    window.location.href = "login.html";
                }
            } catch (error) {
                alert("Registration failed");
                console.log("Registration failed", error);
            }
        }
    });

    function handleValidation(values) {
        const { password, confirmPassword, username, email } = values;

        if (!validateEmail(email)) {
            alert("Invalid email format");
            return false;
        } else if (password !== confirmPassword) {
            alert("Password and confirm password must be the same");
            return false;
        } else if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return false;
        } else if (!username || username.length < 3) {
            alert("Username should be at least 3 characters");
            return false;
        }

        return true;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
