const redis = require('redis');
const client = redis.createClient();

client.connect().catch(console.error);

async function addToBlacklist(token) {
  await client.set(token, 'blacklisted', { EX: 3600 });
}

async function isBlacklisted(token) {
  const result = await client.get(token);
  return result === 'blacklisted';
}

module.exports = { addToBlacklist, isBlacklisted };
