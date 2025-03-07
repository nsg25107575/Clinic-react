import { useState } from "react";
import DoctorForm from "./DoctorForm";
import AppointmentForm from "./AppointmentForm";
import DeleteDoctorButton from "./DeletePostButton";
import { EditPostButton } from "./EditPostButton";
import DeleteAppointmentButton from "./DeleteAppointmentButton";
import HandleRescheduleButton from "./HandleRescheduleButton";

export default function DoctorsList() {
  const [persons, setPersons] = useState({ surname: '', name: '', patronymic: '', phone: '', specialization: '' });
  const [posts, setPosts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [errorDoctorForm, setErrorDoctorForm] = useState('');
  const [errorAppointmentForm, setErrorAppointmentForm] = useState('');  
  const [patient, setPatient] = useState({ appointmentDate: '', appointmentTime: '', patientSurname: '', patientName: '' });

  return (
    <div>
      <h1>Список лікарів</h1>
      <DoctorForm
        persons={persons}
        setPersons={setPersons}
        setPosts={setPosts}
        posts={posts}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
        setErrorDoctorForm={setErrorDoctorForm}  
        error={errorDoctorForm}
      />
      {posts.length < 1 ? <h2>Список лікарів порожній</h2> :
        posts.map((e, ind) =>
          <div key={ind} className="post">
            <div className='doctor'>
              <div className="doctor-data">
                <div style={{fontSize:'18px'}}>{ind + 1} Лікар</div>
                <div style={{fontSize:'25px', fontWeight:550}}>{e.surname} {e.name} {e.patronymic}</div>
                <div style={{fontSize:'18px'}}>тел: {e.phone}</div>
                <div>{e.specialization}</div>
              </div>
              <div>
                <EditPostButton index={ind} setEditIndex={setEditIndex} setPersons={setPersons} posts={posts}/>
                <DeleteDoctorButton index={ind} setPosts={setPosts} posts={posts} />
              </div>
            </div>

            <div>
              <h3>Запис на прийом:</h3>
              <AppointmentForm
                doctorIndex={ind}
                posts={posts}
                setPosts={setPosts}
                error={errorAppointmentForm}    
                setErrorAppointmentForm={setErrorAppointmentForm}  
                patient={patient}
                setPatient={setPatient}
              />

              <h4>Записані пацієнти:</h4>
              {e.appointments && e.appointments.length > 0 ? (
                <ul>
                  {e.appointments.map((appointment, appIndex) => (
                    <li key={appIndex} className="patient">
                      {appointment.patientName} {appointment.patientName} - {appointment.date} {appointment.time}
                      <div className="patient-btn">
                        <DeleteAppointmentButton doctorIndex={ind} appointmentIndex={appIndex} posts={posts} setPosts={setPosts}/>
                        <HandleRescheduleButton doctorIndex={ind} appointmentIndex={appIndex} posts={posts} setPosts={setPosts} />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Немає записів на прийом</p>
              )}
            </div>
          </div>
        )}
    </div>
  );
}
