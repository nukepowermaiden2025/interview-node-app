export enum EventType {
    NEW_DEVICE = 'New Device',
    SIGN_IN = 'Sign-in',
    CREATE_ITEM = 'Create Item',
    DELETE_ITEM = 'Delete Item',
    VIEW_ITEM = 'View Item'

}
export type CreateEvent =  {
    createdAt: string
    eventType: EventType
    account: string
    user: string
}