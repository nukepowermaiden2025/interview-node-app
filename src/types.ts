export enum EventType {
    NewDevice = 'NewDevice',
    SignIn = 'SignIn',
    CreateItem = 'CreateItem',
    DeleteItem = 'DeleteItem',
    ViewItem = 'ViewItem'
}

export type CreateEvent =  {
    createdAt: string
    eventType: EventType
    account: string
    user: string
}

export type EventsSummary = {
    eventTypes: any
    users: number
}

