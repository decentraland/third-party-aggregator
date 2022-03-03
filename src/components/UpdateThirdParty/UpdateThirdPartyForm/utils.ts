import {
  ThirdParty,
  UpdateThirdParty,
} from "../../../modules/thirdParty/types";
import { UpdateThirdPartyFormData } from "./UpdateThirdPartyForm.types";

export const toUpdateThirdParty = (
  previous: ThirdParty,
  data: UpdateThirdPartyFormData
): UpdateThirdParty => {
  const managersMap = new Map<string, boolean>();

  previous.managers.forEach((m) => {
    managersMap.set(m, false);
  });

  data.managers.forEach((m) => {
    managersMap.set(m, true);
  });

  const { managers, managerValues } = Array.from(managersMap.entries()).reduce(
    (acc, next) => {
      const [m, v] = next;
      acc.managers.push(m);
      acc.managerValues.push(v);
      return acc;
    },
    {
      managers: [],
      managerValues: [],
    } as {
      managers: string[];
      managerValues: boolean[];
    }
  );

  return {
    urn: previous.id,
    resolver: data.resolver,
    slots: data.slots,
    managers,
    managerValues,
    metadata: `tp:1:${data.name}:${data.description}`,
  };
};
