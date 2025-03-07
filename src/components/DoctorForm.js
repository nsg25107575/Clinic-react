import React from "react";

export default function DoctorForm({ persons, setPersons, error, setPosts, posts, editIndex, setEditIndex, setErrorDoctorForm }) {

  function capitalizeFirstLetter(str) {
    if (!str) return str; 
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!persons.surname || !persons.name || !persons.patronymic || !persons.phone || !persons.specialization) {
      setErrorDoctorForm('Будь ласка, заповніть усі поля.');
      return;
    }

    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(persons.phone) || persons.phone.length !== 10) {
      setErrorDoctorForm('Номер Телефону повинен містити лише цифри і мати довжину 10 цифр.');
      return;
    }

    const nameRegex = /^[A-Za-zА-Яа-я]+$/;
    if (!nameRegex.test(persons.name) || !nameRegex.test(persons.surname) || !nameRegex.test(persons.patronymic) || !nameRegex.test(persons.specialization)) {
      setErrorDoctorForm('У всіх полях повинні бути лише букви.');
      return;
    }

    if (editIndex !== null) {
      const updatePosts = posts.map((e, index) => index === editIndex ? { ...persons, appointments: persons.appointments || [] } : e);
      setPosts(updatePosts);
      setEditIndex(null);
    } else {
      setPosts([...posts, { ...persons, appointments: [] }]);
    }
    setPersons({ surname: '', name: '', patronymic: '', phone: '', specialization: '' });
    setErrorDoctorForm('');  
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Прізвище лікаря"
        value={persons.surname}
        onChange={(e) => setPersons({ ...persons, surname: capitalizeFirstLetter(e.target.value) })}
      />
      <input
        type="text"
        placeholder="Ім'я лікаря"
        value={persons.name}
        onChange={(e) => setPersons({ ...persons, name: capitalizeFirstLetter(e.target.value) })}
      />
      <input
        type="text"
        placeholder="По батькові лікаря"
        value={persons.patronymic}
        onChange={(e) => setPersons({ ...persons, patronymic: capitalizeFirstLetter(e.target.value) })}
      />
      <input
        type="text"
        placeholder="Номер телефону (10 цифр)"
        value={persons.phone}
        onChange={(e) => setPersons({ ...persons, phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Спеціалізація"
        value={persons.specialization}
        onChange={(e) => setPersons({ ...persons, specialization: e.target.value })}
      />
      <button type="submit">Додати лікаря</button>
      {error && <h2 style={{ color: 'red' }}>{error}</h2>} 
    </form>
  );
}
