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

/*
  "userMovement": true,
  "experimentTrialCount": 5,
  "targetOnGrabAudio": "CorrectTypeI",
  "goalAudio": "DoubleBeep",
  "experimentCreationDate": "1 / 9 / 2021",
  "userDirectGrab": false,
  "distractorColours": [
      "White"
  ],
  "experimentInstructions": "<color=#00FF00>Test Configuration Experiment's Instructions In Green. Test Configuration Experiment's Instructions In Green. Test Configuration Experiment's Instructions In Green. Test Configuration Experiment's Instructions In Green. Test Configuration Experiment's Instructions In Green. Test Configuration Experiment's Instructions In Green. Test Configuration Experiment's Instructions In Green. Test Configuration Experiment's Instructions In Green. Test Configuration Experiment's Instructions In Green. Test Configuration Experiment's Instructions In Green. Test Configuration Experiment's Instructions In Green. Test Configuration Experiment's Instructions In Green. </color>",
  "targetModel": "Sphere",
  "experimentDescription": "<color=#FF0000>Test Configuration Experiment's Description In Red. Test Configuration Experiment's Description In Red. Test Configuration Experiment's Description In Red. Test Configuration Experiment's Description In Red. Test Configuration Experiment's Description In Red. Test Configuration Experiment's Description In Red. Test Configuration Experiment's Description In Red. Test Configuration Experiment's Description In Red. Test Configuration Experiment's Description In Red. Test Configuration Experiment's Description In Red. Test Configuration Experiment's Description In Red. Test Configuration Experiment's Description In Red.</color>",
  "distractorSize": 0.5,
  "experimentTitle": "Test Configuration File 2",
  "environmentAudio": "BusyStreet",
  "targetColour": "Yellow",
  "experimentURL": "",
  "experimentType": "FindTargetAmongstDistractorsExperiment",
  "targetConstantAudio": "PhoneRing",
  "distractorModels": [
      "Cube"
  ],
  "userRayGrab": true,
  "experimentAuthor": "Stelios Petrakos",
  "targetSize": 0.5,
  "targetOnReleaseAudio": "FalseTypeF",
  "experimentUID": "00000000000000",
  "distractorCount": 10,
  "experimentUpdateDate": "3 / 9 / 2021"
*/

export const downloadConfig = async (data) => {
  const config = {
    userMovement: data.options.userMovement,
    experimentTrialCount: data.blockTrialCount,
    targetOnGrabAudio: data.options.targetOnGrabAudio,
    goalAudio: data.options.goalAudio,
    experimentCreationDate: new Date(data.createdAt).toLocaleString("en-GB").split(',')[0],
    userDirectGrab: data.options.userDirectGrab,
    distractorColours: data.options.distractorColors,
    experimentInstructions: data.instructions,
    targetModel: data.options.targetModel,
    experimentDescription: data.description,
    distractorSize: data.options.distractorSize,
    experimentTitle: data.title,
    environmentAudio: data.options.environmentAudio,
    targetColour: data.options.targetColor,
    experimentURL: `${site}/${data.username}/${data.slug}`,
    experimentType: data.type,
    targetConstantAudio: data.options.targetConstantAudio,
    distractorModels: data.options.distractorModels,
    userRayGrab: data.options.userRayGrab,
    experimentAuthor: data.username,
    targetSize: data.options.targetSize,
    targetOnReleaseAudio: data.options.targetOnReleaseAudio,
    experimentUID: data.uid,
    distractorCount: data.options.distractorCount,
    experimentUpdateDate: new Date(data.updatedAt).toLocaleString("en-GB").split(',')[0],
  };

  download(JSON.stringify(config, null, 2), `${data.slug}.json`, "text/plain");
}

export function download(content, fileName, contentType) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
