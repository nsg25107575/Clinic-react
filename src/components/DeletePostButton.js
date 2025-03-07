import React from 'react';

export default function DeleteDoctorButton({ index, setPosts, posts }) {
  function deletePost() {
    const deleteDoc = posts.filter((_, i) => i !== index);
    setPosts(deleteDoc);
  }

  return (
    <button onClick={deletePost}>Видалити</button>
  );
}