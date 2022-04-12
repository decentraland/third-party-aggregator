export type ThirdParty = {
  id: string;
  managers: string[];
  rawMetadata: string;
  resolver: string;
  isApproved: boolean;
  maxItems: string;
  root: string;
  consumedSlots: string;
  metadata: Metadata;
};

export type Metadata = {
  id: string;
  name: string;
  description: string;
};

export type CreateThirdParty = {
  urn: string;
  metadata: string;
  resolver: string;
  managers: string[];
  slots: string;
};

export type UpdateThirdParty = {
  urn: string;
  metadata: string;
  resolver: string;
  managers: string[];
  managerValues: boolean[];
  slots: string;
};
