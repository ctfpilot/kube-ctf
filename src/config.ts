export const PORT = parseInt(process.env.PORT || '3000');
export const HOST =
  process.env.HOST ||
  (process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1');
export const NAMESPACE = process.env.KUBECTF_NAMESPACE || 'default';
export const BASE_DOMAIN = process.env.KUBECTF_BASE_DOMAIN || 'example.com';
export const API_DOMAIN =
  process.env.KUBECTF_API_DOMAIN || `challenge-manager.${BASE_DOMAIN}`;
export const MAX_OWNER_DEPLOYMENTS =
  parseInt(process.env.KUBECTF_MAX_OWNER_DEPLOYMENTS ?? '0') || 0;

let _authSecret = process.env.KUBECTF_AUTH_SECRET;
let _containerSecret = process.env.KUBECTF_CONTAINER_SECRET;

if (process.env.NODE_ENV === 'production') {
  if (!_authSecret) {
    throw new Error('KUBECTF_AUTH_SECRET environment variable must be set in production.');
  }
  if (!_containerSecret) {
    throw new Error('KUBECTF_CONTAINER_SECRET environment variable must be set in production.');
  }
}

if (!_authSecret) {
  console.warn('Warning: Using default AUTH_SECRET. Set KUBECTF_AUTH_SECRET for better security.');
  _authSecret = 'keyboard-cat';
}
if (!_containerSecret) {
  console.warn('Warning: Using default CONTAINER_SECRET. Set KUBECTF_CONTAINER_SECRET for better security.');
  _containerSecret = 'keyboard-cat';
}

export const AUTH_SECRET = _authSecret;
export const CONTAINER_SECRET = _containerSecret;
export const REGISTRY_PREFIX = process.env.KUBECTF_REGISTRY_PREFIX || '';
