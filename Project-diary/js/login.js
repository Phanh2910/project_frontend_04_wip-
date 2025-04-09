document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const emailInput = form.querySelector('input[type="email"]');
    const passwordInput = form.querySelector('input[type="password"]');
    const errorBox = document.createElement("div");
    form.appendChild(errorBox);
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        errorBox.innerHTML = "";
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            showError("Vui lòng nhập đầy đủ email và mật khẩu");
            return;
        }
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            showError("Email hoặc mật khẩu không đúng");
        } else {
            alert("Đăng nhập thành công!");
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "../html/dashboard.html";
        }
    });
    function showError(msg) {
        errorBox.innerHTML = `<p style="color: red;">${msg}</p>`;
    }
    const registerLink = document.getElementById("registerLink");
    if (registerLink) {
        registerLink.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "../html/register.html";
        });
    }
});
