import { auth } from '$lib/server/firebase';
import { adminAuth } from '$lib/server/firebase-admin.js';
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

      // Create a session cookie or token
      const token = await user.getIdToken();
      const expiresIn = 60 * 60 * 24 * 7 * 1000; // 5 days

      const cookie = await adminAuth.createSessionCookie(token, {expiresIn});
      const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' }
      cookies.set('__session', cookie, options);


      // Redirect to home as logged in user
      return redirect(303, '/');
    } catch (err) {
      console.error('Login failed:', err);
      return fail(400, { error: 'Invalid email or password.', values: { email } });
    }
  },

  logout: async ({ cookies }) => {
    // Clear the session cookie
    cookies.delete('__session', { path: '/' });
    return redirect(303, '/auth/login'); // Redirect to login page after logout
  }
};
