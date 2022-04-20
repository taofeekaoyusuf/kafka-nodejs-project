const { Kafka } = require('kafkajs');

run();
async function run() {
  try {
    const kafka = new Kafka({
      "clientId": "kafkaApp",
      "brokers": ["dfnt:9092"]
    })

    const consumer = kafka.consumer({"groupId": "consumer_1"});
    console.log('Connecting to Broker....')
    await consumer.connect()
    console.log('Connection Attained!!!')

    consumer.subscribe({
      "topic": "Users",
      "fromBeginning": true // Reading Topic from the Top or Beginning
    })

    await consumer.run({
      "eachMessage": async result => {
        console.log(`Message received is ${result.message.value} on partition ${result.partition}`);
      }
    })

  } catch (err) {
    console.error(`Error: ${err} occurred`);
  } finally {
    // process.exit(0);
  }
}