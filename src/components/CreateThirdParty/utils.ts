import { ChainId, getURNProtocol } from "@dcl/schemas";
import { CreateThirdParty } from "../../modules/thirdParty/types";
import { CreateThirdPartyFormData } from "./CreateThirdParty.types";

export const toCreateThirdParty = (
  data: CreateThirdPartyFormData,
  chainId: ChainId
): CreateThirdParty => {
  return {
    urn: getUrn(data.name, chainId),
    resolver: data.resolver,
    slots: data.slots,
    managers: data.managers,
    metadata: `tp:1:${data.name}:${data.description}`,
  };
};

export const getUrn = (thirdPartyName: string, chainId: ChainId) => {
  const protocol = getURNProtocol(chainId);
  const name = formatThirdPartyName(thirdPartyName);
  return `urn:decentraland:${protocol}:collections-thirdparty:${name}`;
};

export const formatThirdPartyName = (value: string) => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]+/g, "")
    .replace(/\s/g, "-")
    .replace(/-+$/, "");
};
