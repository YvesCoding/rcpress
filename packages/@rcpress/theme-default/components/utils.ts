export const outboundRE = /^(https?:|mailto:|tel:)/;

export function isExternal(path: string) {
  return outboundRE.test(path);
}
export function resolvePathWithBase(
  path: string,
  base: string
) {
  if (!base.endsWith('/')) {
    base += '/';
  }

  if (path.startsWith('/')) {
    path = path.slice(1);
  }

  return base + path;
}
