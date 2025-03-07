import React, { useState } from "react";

export default function AppointmentForm({
  doctorIndex,
  posts,
  setPosts,
  patient,
  setPatient
}) {
  const [errorAppointmentForm, setErrorAppointmentForm] = useState('');
  
  function handleAppointmentSubmit(e) {
    e.preventDefault();

    const { appointmentDate, appointmentTime, patientName } = patient;

    if (!appointmentDate || !appointmentTime || !patientName) {
      setErrorAppointmentForm('Будь ласка, заповніть усі поля для запису.');
      return;
    }

    const nameRegex = /^[A-Za-zА-Яа-я]+$/;
    if (!nameRegex.test(patientName)) {
      setErrorAppointmentForm('Ім\'я пацієнта повинно містити тільки літери.');
      return;
    }

    const formattedName = patientName.charAt(0).toUpperCase() + patientName.slice(1).toLowerCase();
    setPatient(prevState => ({ ...prevState, patientName: formattedName }));

    const doctor = posts[doctorIndex];
    const appointments = doctor.appointments || [];

    const isSlotAvailable = !appointments.some(
      appointment => appointment.date === appointmentDate && appointment.time === appointmentTime
    );

    if (isSlotAvailable) {
      const newAppointment = { patientName: formattedName, date: appointmentDate, time: appointmentTime };
      const updatedDoctor = { ...doctor, appointments: [...appointments, newAppointment] };
      const updatedPosts = posts.map((doc, index) => index === doctorIndex ? updatedDoctor : doc);
      setPosts(updatedPosts);
      setPatient({ appointmentDate: '', appointmentTime: '', patientSurname: '', patientName: '' });
      setErrorAppointmentForm('');
    } else {
      setErrorAppointmentForm('Цей слот вже зайнятий. Будь ласка, виберіть інший.');
    }
  }

  return (
    <div>
      <form onSubmit={handleAppointmentSubmit}>
        <input
          type="text"
          placeholder="Прізвище пацієнта"
          value={patient.patientSurname}
          onChange={(e) => setPatient({...patient, patientSurname: e.target.value})}
        />
        <input
          type="text"
          placeholder="Ім'я пацієнта"
          value={patient.patientName}
          onChange={(e) => setPatient({...patient, patientName: e.target.value})}
        />
        <input
          type="date"
          value={patient.appointmentDate}
          onChange={(e) => setPatient({...patient, appointmentDate: e.target.value})}
        />
        <input
          type="time"
          value={patient.appointmentTime}
          onChange={(e) => setPatient({...patient, appointmentTime: e.target.value})}
        />
        <button type="submit">Записати на прийом</button>
      </form>
      {errorAppointmentForm && <p style={{ color: 'red' }}>{errorAppointmentForm}</p>} 
    </div>
  );
}
