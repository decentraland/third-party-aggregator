import { env, envTLD } from 'dcl-ops-lib/domain'
import { buildStatic } from 'dcl-ops-lib/buildStatic'

async function main() {
  const thirdPartyAggregator = buildStatic({
    domain: `third-party-aggregator.decentraland.${env === 'prd' ? 'org' : envTLD}`,
    defaultPath: 'index.html',
  })

  return {
    cloudfrontDistribution: thirdPartyAggregator.cloudfrontDistribution,
    bucketName: thirdPartyAggregator.contentBucket,
  }
}
export = main
