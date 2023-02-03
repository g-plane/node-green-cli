import { table, TableUserConfig } from 'table'
import query from 'node-green'
import c from 'ansi-colors'
import minimist from 'minimist'

export default async function (argv: string[]): Promise<number> {
  const args = minimist(argv, {
    boolean: ['allow-harmony'],
    string: ['node-version'],
  })

  if (args.v || args.version) {
    process.stdout.write(`v${require('../package.json').version}\n`)
    return 0
  }

  if (args.h || args.help) {
    process.stdout.write(
      `
A CLI tool for checking Node.js ECMAScript compatibility.
Author: Pig Fang <g-plane@hotmail.com>

Usage:
$ node-green [options] <ES feature name>

Options:
  --allow-harmony            Allow \`harmony\` flag.
  --node-version=<version>   Specify Node.js version.

Examples:
$ node-green Array.prototype.includes
$ node-green --node-version=6.4.0 Array.prototype.includes
$ node-green --allow-harmony Array.prototype.includes
`.slice(1)
    )
    return 0
  }

  const result = await query(args._.join(' '), {
    allowHarmony: args['allow-harmony'],
    nodeVersion: args['node-version'],
  })

  const data = result.result.map((item) => [
    item.esVersion,
    item.featureType,
    item.category,
    item.feature,
    item.passed ? c.green('Yes') : c.red('No'),
  ])
  data.unshift([
    c.cyan('ES Version'),
    c.cyan('Feature Type'),
    c.cyan('Category'),
    c.cyan('Feature'),
    c.cyan('Availability'),
  ])

  const config: TableUserConfig = {
    columns: {
      0: { width: 10 },
      1: { width: 20 },
      2: { width: 20 },
      3: { width: 30 },
      4: { width: 12 },
    },
  }

  process.stdout.write(table(data, config))
  process.stdout.write(
    `  (Node.js: ${result.nodeVersion}, V8: ${result.v8Version})\n`
  )

  return 0
}
