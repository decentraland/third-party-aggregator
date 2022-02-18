import { CreateThirdParty } from "../../modules/thirdParty/types";
import { CreateThirdPartyFormData } from "./CreateThirdParty.types";

export const toCreateThirdParty = (
  data: CreateThirdPartyFormData
): CreateThirdParty => {
  return {
    urn: data.urn,
    resolver: data.resolver,
    slots: data.slots,
    managers: data.managers.split(","),
    metadata: `tp:1:${data.name}:${data.description}`,
  };
};
