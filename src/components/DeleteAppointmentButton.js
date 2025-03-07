export default function DeleteAppointmentButton({doctorIndex, appointmentIndex, posts, setPosts}){
    function deleteAppointment() {
        const updatedDoctor = { 
          ...posts[doctorIndex], 
          appointments: posts[doctorIndex].appointments.filter((_, index) => index !== appointmentIndex) 
        };
        const updatedPosts = posts.map((doc, index) => index === doctorIndex ? updatedDoctor : doc);
        setPosts(updatedPosts);
      }
      return(
        <button onClick={deleteAppointment}>Видалити</button>
      )
}
