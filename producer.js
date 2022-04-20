const { Kafka } = require('kafkajs');
const msg = process.argv[2];

run();
async function run() {
  try {
    const kafka = new Kafka({
      "clientId": "kafkaApp",
      "brokers": ["dfnt:9092"]
    })

    const producer = kafka.producer();
    console.log('Connecting to Broker....')
    await producer.connect()
    console.log('Connection Attained!!!')

    const partition = msg[0] < 'N' ? 0 : 1;
    const part_msg = await producer.send({
      "topic": "Users",
      "messages": [{
        "value": msg,
        "partition": partition
      }]
    })

    console.log(`\nProducer sent message to the partition successfully!!!\n ${JSON.stringify(part_msg)}\n`);
    await producer.disconnect();
  } catch (err) {
    console.error(`Error: ${err} occurred`);
  } finally {
    process.exit(0);
  }
}