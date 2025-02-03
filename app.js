const MQ = require('./lib/mq');

async function main() {
    // Setup MQ module to work to our RabbitMQ server
    const mq = MQ({ url: "amqp://ims:8rW3d3Zzq25Yw@rabbitmq.aks-live.rolecsmartsolutions.com/ims" });

    // Create an RPC client connection
    const client = mq.rpcClient();

    // Create a proxy to 'sage200'
    // ('sage200' is the identity of the RPC server belonging to the Sage connector)
    const db = client.bind('sage200');

    // Perform a query:
    const res = await db.query(`
        SELECT
            CustomerDocumentNo,
            DocumentDate
        FROM SOPOrderReturn
        WHERE CustomerDocumentNo = @docNo
    `, {
        docNo: 'RTH/066547'
    });

    // Output the result
    console.log(res.recordset);
    // When we're not going to use the client or db object anymore...
    client.close(); // Dispose of RPC connection
}

main().catch(console.error);
