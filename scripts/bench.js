import autocannon from 'autocannon';
async function run(url, title) {
    const result = await autocannon({ url, connections: 100, duration: 20 });
    autocannon.printResult(result);
    console.log(`\n=== ${title}: ~${Math.round(result.requests.average)} req/s ===`);
}
await run('http://localhost:3000/ping', 'Fastify /ping (no DB)');
