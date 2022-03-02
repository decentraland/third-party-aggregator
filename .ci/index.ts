import { env, envTLD } from 'dcl-ops-lib/domain'
import { buildStatic } from 'dcl-ops-lib/buildStatic'

async function main() {
  const account = buildStatic({
    domain: `third-party-aggregator.decentraland.${env === 'prd' ? 'org' : envTLD}`,
    defaultPath: 'index.html',
  })

  return {
    cloudfrontDistribution: account.cloudfrontDistribution,
    bucketName: account.contentBucket,
  }
}
export = main
