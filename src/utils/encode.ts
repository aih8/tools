export function encodeBase64(text: string): string {
  return btoa(encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (_, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  }));
}

export function decodeBase64(encoded: string): string {
  return decodeURIComponent(Array.prototype.map.call(atob(encoded), (c: string) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

export function encodeURL(text: string): string {
  return encodeURIComponent(text);
}

export function decodeURL(encoded: string): string {
  return decodeURIComponent(encoded);
}

export function encodeHTMLEntities(text: string): string {
  const element = document.createElement('div');
  element.textContent = text;
  return element.innerHTML;
}

export function decodeHTMLEntities(html: string): string {
  const element = document.createElement('div');
  element.innerHTML = html;
  return element.textContent || '';
}

