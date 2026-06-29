
const validEmail = "mohammadtalhaqureshi0000@gmail.com";
const validPassword = "1234567";

/* =========================
   LOGIN SYSTEM
========================= */

document.getElementById("loginForm")?.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === validEmail && password === validPassword) {

        localStorage.setItem("loggedIn", "true");

        window.location.href = "dashboard.html";

    } else {
        alert("Invalid Email or Password");
    }
});


/* =========================
   DASHBOARD PROTECTION
========================= */

window.addEventListener("DOMContentLoaded", function () {

    if (window.location.pathname.includes("dashboard")) {

        if (localStorage.getItem("loggedIn") !== "true") {
            window.location.href = "index.html";
        }

        /* Apply theme on dashboard load */
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.classList.add("dark");
        }
    }
});


/* =========================
   LOGOUT
========================= */

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}


/* =========================
   DARK / LIGHT MODE
========================= */

function toggleTheme() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}


/* =========================
   CLEAR ERROR ON INPUT
========================= */

document.addEventListener("input", function (e) {
    if (e.target.closest(".form-group")) {
        const error = e.target.parentElement.querySelector(".error");
        if (error) error.innerText = "";
    }
});


/* =========================
   FIELD VALIDATION
========================= */

function validateField(id, message) {

    const input = document.getElementById(id);
    const error = input.parentElement.querySelector(".error");

    if (!input.value.trim()) {
        error.innerText = message;
        return false;
    } else {
        error.innerText = "";
        return true;
    }
}


/* =========================
   PDF GENERATION
========================= */

function generatePDF() {

    const isValid =
        validateField("patientId", "Patient ID is required") &&
        validateField("patientName", "Patient Name is required") &&
        validateField("age", "Age is required") &&
        validateField("gender", "Gender is required") &&
        validateField("phone", "Phone is required") &&
        validateField("address", "Address is required") &&
        validateField("notes", "Notes is required") &&
        validateField("disease", "Disease is required") &&
        validateField("doctor", "Doctor is required") &&
        validateField("admissionDate", "Date is required");

    if (!isValid) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const patientId = document.getElementById("patientId").value;
    const patientName = document.getElementById("patientName").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const notes = document.getElementById("notes").value;
    const disease = document.getElementById("disease").value;
    const doctor = document.getElementById("doctor").value;
    const date = document.getElementById("admissionDate").value;

    /* HEADER */
    doc.setFillColor(0, 119, 204);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("PATIENT MEDICAL REPORT", 45, 18);

    doc.setTextColor(0, 0, 0);

    /* TABLE */
    let y = 50;

    function row(label, value) {

        doc.rect(20, y - 6, 170, 10);

        doc.setFont("helvetica", "bold");
        doc.text(label, 22, y);

        doc.setFont("helvetica", "normal");
        doc.text(String(value || ""), 80, y);

        y += 10;
    }

    row("Patient ID", patientId);
    row("Patient Name", patientName);
    row("Age", age);
    row("Gender", gender);
    row("Phone", phone);
    row("Address", address);
    row("Notes", notes);
    row("Disease", disease);
    row("Doctor", doctor);
    row("Admission Date", date);

    doc.save(`${patientName}_Medical_Report.pdf`);

    document.getElementById("patientForm").reset();
}


/* =========================
   PASSWORD TOGGLE
========================= */

function togglePassword() {

    const password = document.getElementById("password");

    password.type = password.type === "password" ? "text" : "password";
}