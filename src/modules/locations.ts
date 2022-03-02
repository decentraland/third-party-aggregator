export const locations = {
  root: () => "/",
  signIn: () => "/sign-in",
  settings: () => "/settings",
  thirdParties: () => "/thirdParties",
  createThirdParty: () => "/thirdParties/create",
  updateThirdParty: (tpId?: string) =>
    `/thirdParties/${tpId ?? ":tpId"}/update`,
};
