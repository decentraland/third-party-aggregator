import { createMatchSelector } from "connected-react-router";
import { locations } from "../locations";
import { RootState } from "../reducer";
import { UpdateThirdPartyParams } from "./types";

export const getThirdPartiesMatch = createMatchSelector<RootState, {}>(
  locations.thirdParties()
);

export const getUpdateThirdPartyMatch = createMatchSelector<
  RootState,
  UpdateThirdPartyParams
>(locations.updateThirdParty());
