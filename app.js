document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const needsContainer = document.getElementById('needsContainer');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const skills = document.getElementById('skills').value.trim();

      if (!name || !email || !skills) {
        alert('Please fill in all fields.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, skills })
        });

        const result = await response.json();
        alert(result.message);
        form.reset();
      } catch (err) {
        alert('There was an error submitting your form.');
      }
    });
  }

  async function loadNeeds() {
    if (!needsContainer) return;
    try {
      const res = await fetch('http://localhost:3000/needs');
      const needs = await res.json();

      needsContainer.innerHTML = '';

      needs.forEach(need => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<strong>${need.title}</strong><br>Skills: ${need.skills.join(', ')}<br>Date: ${need.date}`;
        needsContainer.appendChild(li);
      });
    } catch (err) {
      needsContainer.innerHTML = '<li class="list-group-item text-danger">Could not load community needs.</li>';
    }
  }

  loadNeeds();
});
document.getElementById('volunteerForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const skills = document.getElementById('skills').value;
  const availability = document.getElementById('availability').value;

  const response = await fetch('http://localhost:3000/api/volunteers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, skills, availability })
  });

  const result = await response.json();
  alert(result.message || 'Volunteer submitted!');
});
