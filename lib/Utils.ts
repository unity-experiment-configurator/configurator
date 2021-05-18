// @ts-ignore
import DOMPurify from "dompurify";
import sanitizeHtml from "sanitize-html";
import config from "../site.config.json";

// can't import from tailwind.js unfortunately...
export const sm: number = 640;
export const md: number = 768;
export const lg: number = 1024;
export const xl: number = 1280;

export const recaptchaSiteKey = config.recaptchaSiteKey;
export const site = config.site;
export const siteName = config.siteName;

export const copyText = (text: string) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
};

export const sanitizeClient = (html: string) => {
  const sanitized = DOMPurify.sanitize(html);
  return { __html: sanitized };
};

export const sanitizeSSR = (html: string) => {
  const sanitized = sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ "span" ]),
    allowedAttributes: {
      span: [ "style" ],
    }
  });
  return { __html: sanitized };
};

export const isValidUrl = (value: string) => {
  try {
    new URL(value);
  } catch (_) {
    return false;
  }

  return true;
};

export const urlsEqual = (url1: string, url2: string): boolean => {
  const URL1 = new URL(url1);
  const URL2 = new URL(url2);
  return URL1.hostname === URL2.hostname && URL1.pathname === URL2.pathname;
};
