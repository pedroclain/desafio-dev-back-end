import express from 'express'
import { Router, Request, Response } from 'express';
import schedule from 'node-schedule';
import log from './util/logging';
import { SubscriptionRepository } from './repository/subscription.repository';
import { SubscriptionController } from './controller/subscribtion.controller';

const subscriptionRepository = new SubscriptionRepository();
const subscriptionController = new SubscriptionController(subscriptionRepository);        

const app = express();

const route = Router();

app.use(express.json());

route.get('/', (req: Request, res: Response) => {
    res.status(200);
})

route.post('/subscribe', (req: Request, res: Response) => {
    subscriptionController.post(req, res);
})

app.use(route)

app.listen(3333, () => log.info('server running on port 3333'))

schedule.scheduleJob('0 0 * * *', () => {
    subscriptionRepository.updateMessages();
});

export default app;
