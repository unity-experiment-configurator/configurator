import { MediaType } from "@iiif/vocabulary";

// @ts-ignore
export type Timestamp = firebase.firestore.Timestamp;

export interface ExhibitDBValue {
  author: string;
  created: Timestamp;
  description: string;
  duplicatedFrom: string | null;
  id: string;
  modified: Timestamp;
  presentationType: PresentationType;
  duplicationEnabled: boolean;
  publicId: string;
  rights: string;
  title: string;
}

export interface Exhibit extends ExhibitDBValue {
  items: Map<any, {
    [x: string]: any;
    // @ts-ignore
    "": string & firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
  }>
  annotations: Map<any, {
    [x: string]: any;
    // @ts-ignore
    "": string & firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
  }>
}

export type PublicExhibitValue = Omit<ExhibitDBValue, "id">;

export interface PublicExhibit extends PublicExhibitValue {
  items: ItemValue[];
  annotations: AnnotationValue[];
}

export type ItemDBValue = {
  created: string;
  id: string;
  label: string | undefined;
  url: string;
};

export type ItemValue = Omit<ItemDBValue, "id">;
export type ItemTuple = [string, ItemValue];
export type ItemMap = Map<string, ItemValue>;

export type AnnotationDBValue = {
  value: string;
  created: Timestamp;
  id: string;
  modified: Timestamp;
  orderIndex: number;
  partOf: string | null;
  target: string | null;
};

export type AnnotationValue = Omit<AnnotationDBValue, "id">;
export type AnnotationTuple = [string, AnnotationValue];
export type AnnotationMap = Map<string, AnnotationValue>;

export type ExhibitImport = {
  label: string | null;
  format: MediaType;
  url: string;
};

export type ExhibitImports = ExhibitImport[];

export type PresentationType = "slides" | "scroll";

export enum Motivation {
  COMMENTING = "commenting",
}