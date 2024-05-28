
$(document).ready(function () {
    $(".btn-login").click(function (e) {
        e.preventDefault();
        var name = $("#name").val();
        var password = $("#password").val();
        var errorName = "";
        var errorPassword = "";

        if (name === '') {
            errorName = 'Tên đăng nhập không được để trống';
            $(".error-name").text(errorName);
        } else if (name.length < 6) {
            errorName = 'Tên đăng nhập ít nhất 6 kí tự';
            $(".error-name").text(errorName);
        } else {
            $(".error-name").text("");
        }

        if (password === '') {
            errorPassword = 'Mật khẩu không được để trống';
            $(".error-password").text(errorPassword);
        } else if (password.length < 8 || !/[A-Z]/.test(password) || !/\W/.test(password) || !/\d/.test(password)) {
            errorPassword = "Mật khẩu cần ít nhất 8 ký tự, bao gồm chữ hoa, kí tự đặc biệt và số";
            $(".error-password").text(errorPassword);
        } else {
            $(".error-password").text("");
        }

        if (name === "huydat" && password === "Huydat201!") {
            var rememberLogin = $(".text_remember_login input[type='checkbox']").prop("checked");

            if (rememberLogin) {
                localStorage.setItem("username", name);
                localStorage.setItem("password", password);
            } else {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
            }

            window.location.href = "../Trang-chu-admin/Trang-chu-admin.html";
        }
    });

    $(".input_box i").click(function () {
        var passwordField = $("#password");
        if (passwordField.attr("type") === "password") {
            passwordField.attr("type", "text");
            $(this).removeClass("bi-eye-slash").addClass("bi-eye");
        } else {
            passwordField.attr("type", "password");
            $(this).removeClass("bi-eye").addClass("bi-eye-slash");
        }
    });

    var savedUsername = localStorage.getItem("username");
    var savedPassword = localStorage.getItem("password");
    if (savedUsername && savedPassword) {
        $("#name").val(savedUsername);
        $("#password").val(savedPassword);
        $(".text_remember_login input[type='checkbox']").prop("checked", true);
    }
});
