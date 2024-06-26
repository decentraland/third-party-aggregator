export const locations = {
  root: () => '/',
  signIn: () => '/sign-in',
  settings: () => '/settings',
  thirdParties: () => '/thirdParties',
  createThirdParty: () => '/thirdParties/create',
  thirdPartyDetails: (tpId?: string) => `/thirdParties/${tpId ?? ':tpId'}/details`
}
