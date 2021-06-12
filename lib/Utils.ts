// @ts-ignore
import DOMPurify from "dompurify";
import sanitizeHtml from "sanitize-html";
import config from "../site.config.json";

// can't import from tailwind.js unfortunately...
export const sm: number = 640;
export const md: number = 768;
export const lg: number = 1024;
export const xl: number = 1280;

export const isProduction = process.env.NODE_ENV === "production";
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

export const downloadConfig = async (data) => {
  const uxfSettings = {
    "sessionBlockCount": 10,
    "blockTrialCount": 3,
  };
  const config = {
    ...data,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
    url: `${site}/${data.username}/${data.slug}`,
    ...uxfSettings
  };

  download(JSON.stringify(config, null, 2), "config.json", "text/plain");
}

export function download(content, fileName, contentType) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
