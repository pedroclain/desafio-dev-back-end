export interface Subscription {
    id?: number;
    subscription_date: Date;
    name: string;
    last_message?: number;
    active: boolean;
}