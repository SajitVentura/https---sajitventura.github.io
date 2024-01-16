// desestructuración {}
import {createPool} from 'mysql2/promise'; 

export const conn = createPool({
    host: 'localhost',
    user: 'root',

    password: '1234',

    port: 3306,
    database: 'Proyecto'
});

