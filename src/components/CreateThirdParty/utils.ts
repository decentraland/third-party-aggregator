import { ChainName } from "@dcl/schemas";
import { CreateThirdParty } from "../../modules/thirdParty/types";
import { CreateThirdPartyFormData } from "./CreateThirdParty.types";

export const toCreateThirdParty = (
  data: CreateThirdPartyFormData,
  chainName: ChainName
): CreateThirdParty => {
  return {
    urn: getUrn(data.name, chainName),
    resolver: data.resolver,
    slots: data.slots,
    managers: data.managers.split(","),
    metadata: `tp:1:${data.name}:${data.description}`,
  };
};

export const getUrn = (thirdPartyName: string, chainName: ChainName) => {
  return `urn:decentraland:${chainName.toLowerCase()}:collections-thirdparty:${formatThirdPartyName(
    thirdPartyName
  )}`;
};

export const formatThirdPartyName = (value: string) => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]+/g, "")
    .replace(/\s/g, "-")
    .replace(/-+$/, "");
};
