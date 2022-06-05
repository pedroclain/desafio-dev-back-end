import knex, { Knex } from "knex";
import { Subscription } from "../model/subscription.model";
import connection from "../databases/mysql.database";
import log from "../util/logging";

export class SubscriptionRepository {
    constructor() {}

    async save(subscription: Subscription): Promise<number[]> {
        
        return await connection('subscriptions').insert(subscription)
            .catch((err) => { log.error(err); throw err })
    }

    async existsEmail(email: string): Promise<boolean> {
        const result: any = await connection('subscriptions').select().where({name: email})
            
        return result[0] != undefined;
    }

    async updateMessages(): Promise<void> {
        const sql: string = 'UPDATE subscriptions SET last_message = last_message + 1 WHERE active = true and last_message < 3';
        const sql2: string = 'UPDATE subscriptions SET active = false WHERE last_message >= 3';

        await connection.raw(sql)
            .then(() => log.info('increasing last messages...'))
            .catch((err) =>  { console.log(err); throw err })

        await connection.raw(sql2)
            .then(() => log.info('updating status...'))
            .catch((err) =>  { console.log(err); throw err })    }
}