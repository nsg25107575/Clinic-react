import { useState } from "react";

export default function HandleRescheduleButton({ doctorIndex, appointmentIndex, posts, setPosts }) {
  const [error, setError] = useState('');

  const formatDateAndTime = (dateString, timeString) => {
    const [day, month, year] = dateString.split('/');
    const formattedDate = `${day}.${month}.${year}`;
    const [hours, minutes] = timeString.split(':');
    const formattedTime = `${hours}.${minutes}`;

    return { formattedDate, formattedTime };
  };

  const handleReschedule = (doctorIndex, appointmentIndex, newDate, newTime) => {
    if (!posts[doctorIndex] || !posts[doctorIndex].appointments) {
      console.error('Не найден врач или его приемы.');
      return;
    }

    const doctor = posts[doctorIndex];
    const isSlotAvailable = !doctor.appointments.some(
      appointment => appointment.date === newDate && appointment.time === newTime
    );

    if (isSlotAvailable) {
      const { formattedDate, formattedTime } = formatDateAndTime(newDate, newTime);

      const updatedAppointments = doctor.appointments.map((appointment, index) =>
        index === appointmentIndex ? { ...appointment, date: formattedDate, time: formattedTime } : appointment
      );
      const updatedDoctor = { ...doctor, appointments: updatedAppointments };
      const updatedPosts = posts.map((doc, index) => index === doctorIndex ? updatedDoctor : doc);
      setPosts(updatedPosts);
    } else {
      setError('Цей новий слот також зайнятий. Спробуйте вибрати інший час.');
    }
  };

  const rescheduleAppointment = () => {
    const newDate = prompt("Новая дата (формат: ДД/ММ/ГГГГ)");
    const newTime = prompt("Новое время (формат: ЧЧ:ММ)");
    if (newDate && newTime) {
      handleReschedule(doctorIndex, appointmentIndex, newDate, newTime);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <button onClick={rescheduleAppointment}>Перенести</button>
    </div>
  );
}
