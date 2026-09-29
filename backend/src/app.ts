import 'dotenv/config';
import {server} from './server/server.js';
import {connect} from "./config/database.js";
import {createServer} from "node:http";

import {showingExpiryWorker} from "@/domains/showings/_feat/showing-redis/showingExpiryWorker";
import {reservationCancellationWorker} from "@/domains/reservations/_feat/reservation-queues/cancellation/reservationCancellationWorker";
import {reservationLifecycleWorker} from "@/domains/reservations/_feat/reservation-queues/lifecycle/reservationLifecycleWorker";
import {registerSocketServer} from "@/server/registerSocketServer";

const port: number = parseInt(process.env.PORT || "") || 8000;
const httpServer = createServer(server);
registerSocketServer(httpServer);

connect().then(() => {
    httpServer.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
}).catch((err) => {
    console.log(err);
});

