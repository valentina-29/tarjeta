const fs = require('fs');
const path = require('path');

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};

  const content = fs.readFileSync(filePath, 'utf8');
  const env = {};

  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) return;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');
    env[key] = value;
  });

  return env;
}

const env = readEnvFile(path.join(__dirname, '.env'));
const scriptUrl = process.env.SCRIPT_URL || env.SCRIPT_URL || '';
const outputPath = path.join(__dirname, 'config.js');
const content = `window.__APP_CONFIG__ = {
  SCRIPT_URL: ${JSON.stringify(scriptUrl)}
};
`;

fs.writeFileSync(outputPath, content, 'utf8');
console.log(`config.js generated with SCRIPT_URL: ${scriptUrl}`);
