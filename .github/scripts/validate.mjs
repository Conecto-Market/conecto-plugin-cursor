#!/usr/bin/env node
// Checks this repository against Cursor's plugin submission checklist (cursor.com/docs/reference/plugins.md) for a
// single plugin at the repository root: the manifest, every component's frontmatter, mcp.json, the logo, and that no
// key or token is committed. Run from the repository root: node .github/scripts/validate.mjs

import { promises as fs } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const errors = []
const fail = (message) => errors.push(message)

const NAME = /^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/          // Cursor: lowercase, kebab-case, may contain periods
const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/
const SECRET = /conecto_(?:sk|at|rt|join)_[A-Za-z0-9]|Bearer\s+[A-Za-z0-9._~+/-]{16,}/
// Placeholders Cursor fills in itself; any other ${NAME} must be a variable declared in the manifest.
const BUILT_IN = /^(?:env:.+|userHome|workspaceFolder|workspaceFolderBasename|pathSeparator|\/|CURSOR_PLUGIN_ROOT|CLAUDE_PLUGIN_ROOT)$/

const exists = (p) => fs.access(p).then(() => true, () => false)

async function readJson(rel) {
  try {
    return JSON.parse(await fs.readFile(path.join(root, rel), 'utf8'))
  } catch (error) {
    fail(`${rel}: ${error.code === 'ENOENT' ? 'missing' : `not valid JSON (${error.message})`}`)
    return null
  }
}

function safeRelative(value) {
  if (typeof value !== 'string' || !value || path.isAbsolute(value)) return false
  const normalized = path.posix.normalize(value.replace(/\\/g, '/'))
  return normalized !== '..' && !normalized.startsWith('../')
}

function frontmatter(text) {
  const normalized = text.replace(/\r\n/g, '\n')
  if (!normalized.startsWith('---\n')) return null
  const end = normalized.indexOf('\n---\n', 4)
  if (end === -1) return null
  const fields = {}
  for (const line of normalized.slice(4, end).split('\n')) {
    const at = line.indexOf(':')
    if (at === -1 || /^\s|^#/.test(line)) continue
    fields[line.slice(0, at).trim()] = line.slice(at + 1).trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1')
  }
  return fields
}

async function walk(dir) {
  const found = []
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) found.push(...await walk(full))
    else if (entry.isFile()) found.push(full)
  }
  return found
}

async function checkComponents(folder, required, extensions, label) {
  const dir = path.join(root, folder)
  if (!await exists(dir)) return
  for (const file of await walk(dir)) {
    const rel = path.relative(root, file)
    const isSkill = folder === 'skills'
    if (isSkill ? path.basename(file) !== 'SKILL.md' : !extensions.includes(path.extname(file).toLowerCase())) continue
    const fields = frontmatter(await fs.readFile(file, 'utf8'))
    if (!fields) {
      fail(`${rel}: the ${label} has no YAML frontmatter`)
      continue
    }
    for (const key of required) {
      if (!fields[key]) fail(`${rel}: the ${label}'s frontmatter has no "${key}"`)
    }
    if (fields.name && !KEBAB.test(fields.name)) fail(`${rel}: the ${label}'s name "${fields.name}" isn't kebab-case`)
    if (isSkill && fields.name && fields.name !== path.basename(path.dirname(file))) {
      fail(`${rel}: the skill's name "${fields.name}" differs from its folder "${path.basename(path.dirname(file))}"`)
    }
  }
}

function pngSize(buffer) {
  const signature = '89504e470d0a1a0a'
  if (buffer.length < 24 || buffer.subarray(0, 8).toString('hex') !== signature) return null
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
}

const manifest = await readJson('.cursor-plugin/plugin.json')
if (manifest) {
  if (typeof manifest.name !== 'string' || !NAME.test(manifest.name)) {
    fail('.cursor-plugin/plugin.json: "name" must be lowercase kebab-case (letters, digits, hyphens, periods)')
  }
  if (typeof manifest.description !== 'string' || manifest.description.trim().length < 20) {
    fail('.cursor-plugin/plugin.json: "description" must say what the plugin does')
  }
  if (typeof manifest.version !== 'string' || !SEMVER.test(manifest.version)) {
    fail('.cursor-plugin/plugin.json: "version" must be a semantic version, like 1.0.0')
  }
  if (!manifest.author || typeof manifest.author.name !== 'string' || !manifest.author.name) {
    fail('.cursor-plugin/plugin.json: "author.name" is required')
  }
  for (const field of ['homepage', 'repository']) {
    if (manifest[field] !== undefined && !/^https:\/\/\S+$/.test(manifest[field])) {
      fail(`.cursor-plugin/plugin.json: "${field}" must be an https URL`)
    }
  }
  for (const field of ['logo', 'rules', 'skills', 'agents', 'commands', 'hooks', 'mcpServers']) {
    const values = [manifest[field]].flat().filter((v) => typeof v === 'string')
    for (const value of values) {
      if (/^https?:\/\//.test(value)) continue
      if (!safeRelative(value)) fail(`.cursor-plugin/plugin.json: "${field}" path "${value}" must be relative, without ".."`)
      else if (!await exists(path.join(root, value))) fail(`.cursor-plugin/plugin.json: "${field}" points to missing "${value}"`)
    }
  }
  if (typeof manifest.logo === 'string' && manifest.logo.endsWith('.png') && await exists(path.join(root, manifest.logo))) {
    const size = pngSize(await fs.readFile(path.join(root, manifest.logo)))
    if (!size) fail(`${manifest.logo}: not a PNG file`)
    else if (size.width !== size.height) fail(`${manifest.logo}: the logo must be square, not ${size.width} x ${size.height}`)
  }
}

if (await exists(path.join(root, '.cursor-plugin/marketplace.json'))) {
  fail('.cursor-plugin/marketplace.json: a single plugin at the repository root has no marketplace manifest')
}

await checkComponents('rules', ['description'], ['.md', '.mdc', '.markdown'], 'rule')
await checkComponents('skills', ['name', 'description'], [], 'skill')
await checkComponents('agents', ['name', 'description'], ['.md', '.mdc', '.markdown'], 'agent')
await checkComponents('commands', ['name', 'description'], ['.md', '.mdc', '.markdown', '.txt'], 'command')

const mcp = await readJson('mcp.json')
if (mcp) {
  const servers = mcp.mcpServers
  if (!servers || typeof servers !== 'object' || !Object.keys(servers).length) {
    fail('mcp.json: "mcpServers" must name at least one server')
  } else {
    const declared = new Set(Object.keys(manifest?.variables?.properties || {}))
    for (const [name, server] of Object.entries(servers)) {
      if (!KEBAB.test(name)) fail(`mcp.json: the server name "${name}" isn't kebab-case`)
      if (server.url !== undefined && !/^https:\/\/[^\s/]+\/\S*$/.test(server.url)) {
        fail(`mcp.json: ${name}'s url must be an https address`)
      }
      if (server.url === undefined && server.command === undefined) fail(`mcp.json: ${name} needs a url or a command`)
      for (const [, placeholder] of JSON.stringify(server).matchAll(/\$\{([^}]+)\}/g)) {
        if (!BUILT_IN.test(placeholder) && !declared.has(placeholder)) {
          fail(`mcp.json: ${name} uses \${${placeholder}}, which "variables" in plugin.json doesn't declare`)
        }
      }
    }
  }
}

for (const file of ['README.md', 'LICENSE']) {
  if (!await exists(path.join(root, file))) fail(`${file}: missing`)
}

for (const file of await walk(root)) {
  const rel = path.relative(root, file)
  if (rel === path.join('.github', 'scripts', 'validate.mjs')) continue
  if (!/\.(?:json|md|mdc|markdown|txt|ya?ml|sh|mjs|js)$/i.test(file)) continue
  if (SECRET.test(await fs.readFile(file, 'utf8'))) fail(`${rel}: looks like it holds a key or token`)
}

if (errors.length) {
  console.error('Validation failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}
console.log('Validation passed.')
