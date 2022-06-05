import { Request, Response } from "express";
import { ApiErrorResponse } from "../model/apiErrorResponse.model";
import { Subscription } from "../model/subscription.model";
import { SubscriptionRepository } from "../repository/subscription.repository";
import log from "../util/logging";

export class SubscriptionController {
    constructor(private subscriptionRepository: SubscriptionRepository) {}

    async post(req: Request, res: Response): Promise<void> {
        const {
            name
        } = req.body;

        let exists: boolean = await this.subscriptionRepository.existsEmail(name);

        if(exists == true) {
            log.error("email already exists");
            let error: ApiErrorResponse = {
                code: 400,
                timestamp: new Date(),
                name: 'subscription error',
                message: 'email alread exists'
            }
            res.status(400).json(error)
            return;
        }
        
        if(!this.validate(name)) {
            log.error("invalid email");
            let error: ApiErrorResponse = {
                code: 400,
                timestamp: new Date(),
                name: 'subscription error',
                message: 'invalid email'
            }
            res.status(400).json(error)
            return;
        }

        const subscription: Subscription = {
            name: name,
            active: true,
            subscription_date: new Date(),
            last_message: 0
        }

        let index = await this.subscriptionRepository.save(subscription);
        res.status(201).json({id: index});
        
    } 

    validate(email: string): boolean {
        var emailReg =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if(!emailReg.test(email)) {
            return false;			
        }

        return true;
    }
}