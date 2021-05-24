// @ts-ignore
export type Timestamp = firebase.firestore.Timestamp;

export interface ExperimentDBValue {
  author: string;
  created: Timestamp;
  description: string;
  duplicatedFrom: string | null;
  id: string;
  modified: Timestamp;
  presentationType: ExperimentType;
  duplicationEnabled: boolean;
  publicId: string;
  rights: string;
  title: string;
}

export type PublicExperimentValue = Omit<ExperimentDBValue, "id">;

export type ExperimentType = "tables";