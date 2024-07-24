document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            document.getElementById('authSection').classList.add('d-none');
            document.getElementById('fileSection').classList.remove('d-none');
            fetchFiles(); // Load files after login
        } else {
            alert('Invalid credentials');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error logging in');
    }
});
