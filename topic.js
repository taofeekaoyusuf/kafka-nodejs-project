const { Kafka } = require('kafkajs');

run();
async function run() {
  try {
    const kafka = new Kafka({
      "clientId": "kafkaApp",
      "brokers": ["dfnt:9092"]
    })

    const admin = kafka.admin();
    console.log('Connecting to Broker....')
    await admin.connect()
    console.log('Connection Attained!!!')

    await admin.createTopics({
      "topics": [{
        "topic": "Users",
        "numPartitions": 2
      }]
    })

    console.log('Topics created successfully!!!');
    await admin.disconnect();
  } catch (err) {
    console.error(`Error: ${err} occurred`);
  } finally {
    process.exit(0);
  }
}