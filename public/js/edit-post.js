const updatePost = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title-input').value.trim();
    const postText = document.querySelector('#post_text').value.trim();
    const postId = event.target.getAttribute('post-id');
    console.log(`the ${title} and ${postText}`);
    console.log(`the ${postId}`);

  
    if (title && postText) {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, postText }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        alert('Failed to update the post');
      }
    }
  };
  
  document.querySelector('.btn-form-update').addEventListener('click', updatePost);