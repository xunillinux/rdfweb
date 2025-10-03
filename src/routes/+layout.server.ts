
export const load = async ({ locals }) => ({
  cspNonce: (locals as any).cspNonce ?? ''
});