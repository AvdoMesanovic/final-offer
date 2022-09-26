export default interface Car {
    vin: string,
    brand: string,
    model: string,
    year: number,
    price: number,
    color: string,
    images: string[],
    completion: number,
    dealer: string,
    engine?: string,
    transmission?: string,
    mileage?: number,
    interior?: string,
    drivetrain?: string
}
