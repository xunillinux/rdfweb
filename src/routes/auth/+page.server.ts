import { auth } from '$lib/server/firebase';
import { fail, redirect } from '@sveltejs/kit';
import { signInWithEmailAndPassword } from 'firebase/auth';


export const actions = {
  login: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (!email || !password) {
      return fail(400, { error: 'Email and password are required.', values: { email } });
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a session cookie or token (simplified)
      const token = await user.getIdToken();
      cookies.set('session', token, { path: '/', httpOnly: true, secure: true, maxAge: 60 * 60 });

      // Redirect to home as logged in user
      throw redirect(303, '/');
    } catch (err) {
      console.error('Login failed:', err);
      return fail(400, { error: 'Invalid email or password.', values: { email } });
    }
  },

  logout: async () => {
    auth.signOut();
  }
};
