export const getNonce = () =>
  (typeof document !== 'undefined'
    ? document.querySelector('meta[name="csp-nonce"]')?.content
    : undefined) ?? '';
