import { faker } from '@faker-js/faker';
function createRandomCarList() {
    return {
        name: faker.vehicle.vehicle(),
        fuelType: faker.vehicle.fuel(),
        model: faker.vehicle.model(),
        type: faker.vehicle.type(),
        image: 'https://i.pinimg.com/736x/5f/19/66/5f1966a0bc1166a29bb8d3271829d34c.jpg',
        miles: 1000,
        gearType: 'Manual',
        price: faker.finance.amount({ min: 4000, max: 20000 })
    };
}
const carList = faker.helpers.multiple(createRandomCarList, {
    count: 7
})

export default {
    carList
}