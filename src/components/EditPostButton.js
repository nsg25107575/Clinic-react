export function EditPostButton({index, setEditIndex, setPersons, posts}){
    function editPost() {
        setEditIndex(index);
        setPersons(posts[index]);
      }
      return(
        <button onClick={editPost}>Редагувати</button>
      )
}