import type Car from "./Car"
import type Offer from "./Offer";
export default interface UserData {
    streetAddress?: string,
    streetAddressTwo?: string,
    streetAdress?: string,
    streetAdressTwo?: string,
    city?: string,
    state?: string,
    sex?: string,
    dateOfBirth?: string,
    phoneNumber?: string,
    dealerName?: string,
    dealsCompleted?: number,
    email?: string,
    inventory?: Car[],
    name?: string,
    offers?: Offer[],
    type?: string,
    zip?: string,
}
