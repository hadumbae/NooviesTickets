import 'dotenv/config';
import {server} from './server/server.js';
import {connect} from "./config/database.js";

import {showingExpiryWorker} from "@/domains/showings/_feat/showing-redis/showingExpiryWorker";
import {reservationCancellationWorker} from "@/domains/reservations/_feat/reservation-queues/cancellation/reservationCancellationWorker";
import {reservationLifecycleWorker} from "@/domains/reservations/_feat/reservation-queues/lifecycle/reservationLifecycleWorker";

const port: number = parseInt(process.env.PORT || "") || 8000;

connect().then(() => {
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
}).catch((err) => {
    console.log(err);
});

