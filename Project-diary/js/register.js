document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const errorContainer = document.getElementById("registerErrors");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        errorContainer.innerHTML = "";
        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const errors = [];
        if (!fullName) errors.push("Họ và tên không được để trống");
        const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
            errors.push("Email không được để trống");
        } else if (!emailRegex.test(email)) {
            errors.push("Email phải đúng định dạng");
        }

        if (!password) {
            errors.push("Mật khẩu không được để trống");
        } else if (password.length < 6) {
            errors.push("Mật khẩu phải có ít nhất 6 ký tự");
        }
        if (!confirmPassword) {
            errors.push("Vui lòng xác nhận mật khẩu");
        } else if (password !== confirmPassword) {
            errors.push("Mật khẩu xác nhận không khớp");
        }
        if (errors.length > 0) {
            errors.forEach(msg => {
                const p = document.createElement("p");
                p.style.color = "red";
                p.textContent = msg;
                errorContainer.appendChild(p);
            });
            return;
        }
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            const p = document.createElement("p");
            p.style.color = "red";
            p.textContent = "Email này đã được sử dụng";
            errorContainer.appendChild(p);
            return;
        }
        const user = { fullName, email, password };
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Đăng ký thành công! Chuyển hướng đến trang đăng nhập...");
        window.location.href = "/html/login.html";
    });
});
