import type Car from "./Car"
export default interface Offer {
    car: Car,
    dealer: string,
    buyer: string,
    status: string,
    history: Object,
    prevRoute: string,
    completion?: number,
    initialInfo?: {
        "Title and Licensing"?: {
            disabled: boolean,
            title: {
                name: string,
                address: string,
                addressTwo: string,
                phone: string,
                city: string,
                state: string,
                zip: string,
                email: string,
            }
        },
        "Delivery and Pickup"?: {
            disabled: boolean,
            option: string,
        },
        "Financing"?: {
            disabled: boolean
        },
        "Trade-in"?: {
            disabled: boolean
        },
        "Review and Submit"?: {
            disabled: boolean
        },
    }
}