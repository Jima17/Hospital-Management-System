const doctors = [
  { id: "D-101", name: "Dr. Emma Clark", specialty: "Cardiology" },
  { id: "D-102", name: "Dr. Liam Patel", specialty: "Orthopedics" },
  { id: "D-103", name: "Dr. Sophia Kim", specialty: "Neurology" },
];

const patients = [];
const appointments = [];

const doctorList = document.getElementById("doctor-list");
const patientList = document.getElementById("patient-list");
const appointmentList = document.getElementById("appointment-list");
const patientSelect = document.getElementById("appointment-patient");
const doctorSelect = document.getElementById("appointment-doctor");

function renderDoctors() {
  doctorList.innerHTML = doctors
    .map((doctor) => `<li>${doctor.id} - ${doctor.name} (${doctor.specialty})</li>`)
    .join("");

  doctorSelect.innerHTML = '<option value="">Select doctor</option>';
  doctors.forEach((doctor) => {
    const option = document.createElement("option");
    option.value = doctor.id;
    option.textContent = `${doctor.name} (${doctor.specialty})`;
    doctorSelect.appendChild(option);
  });
}

function renderPatients() {
  patientList.innerHTML = patients
    .map(
      (patient) =>
        `<li>${patient.id} - ${patient.name}, ${patient.age} years (${patient.gender}) | ${patient.contact}</li>`
    )
    .join("");

  patientSelect.innerHTML = '<option value="">Select patient</option>';
  patients.forEach((patient) => {
    const option = document.createElement("option");
    option.value = patient.id;
    option.textContent = `${patient.name} (${patient.id})`;
    patientSelect.appendChild(option);
  });
}

function renderAppointments() {
  appointmentList.innerHTML = appointments
    .map(
      (appointment) =>
        `<li>${appointment.date} - ${appointment.patientName} with ${appointment.doctorName}</li>`
    )
    .join("");
}

document.getElementById("patient-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const patient = {
    id: `P-${String(patients.length + 1).padStart(3, "0")}`,
    name: formData.get("name").toString().trim(),
    age: Number(formData.get("age")),
    gender: formData.get("gender").toString(),
    contact: formData.get("contact").toString().trim(),
  };

  if (!patient.name || !patient.contact || Number.isNaN(patient.age)) {
    return;
  }

  patients.push(patient);
  renderPatients();
  form.reset();
});

document.getElementById("appointment-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);

  const patientId = formData.get("patient").toString();
  const doctorId = formData.get("doctor").toString();
  const date = formData.get("date").toString();

  const patient = patients.find((item) => item.id === patientId);
  const doctor = doctors.find((item) => item.id === doctorId);

  if (!patient || !doctor || !date) {
    return;
  }

  appointments.push({
    patientName: patient.name,
    doctorName: doctor.name,
    date,
  });

  renderAppointments();
  event.target.reset();
});

renderDoctors();
renderPatients();
renderAppointments();
