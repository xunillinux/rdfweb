export const load = async ({ cookies }) => {
  
  const sessionCookie = cookies.get('__session');

  try {{
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie!)
  }} catch(e: any) {
    
  }

};
