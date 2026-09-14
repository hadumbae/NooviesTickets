import 'dotenv/config';
import {server} from './server/server.js';
import {connect} from "./config/database.js";

const port: number = parseInt(process.env.PORT || "") || 8000;

connect().then(() => {
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
}).catch((err) => {
    console.log(err);
});

