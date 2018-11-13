import RxDB from 'rxdb';
RxDB.plugin(require('pouchdb-adapter-asyncstorage').default);
RxDB.plugin(require('pouchdb-adapter-http'));

export const SYNC_URL = 'http://localhost:10102/'; // Replace localhost with a public ip address!
export const DB_NAME = 'db_tour';

class dataStore {

    constructor(props) {
        
    }

    async createDatabase() {
        const db = await RxDB.create({
            name: DB_NAME,
            adapter: 'asyncstorage',
            password: 'myLongAndStupidPassword',
            multiInstance: false,
        });
        return db;
    }
}

export default dataStore;