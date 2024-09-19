import { faker } from '@faker-js/faker';
import fs from 'fs';

const generateRandomData = () => {
  return {
    Name: faker.commerce.productName(),
    Description: faker.lorem.paragraph(),
    // Price: faker.commerce.price(100, 10000, 2, '$'),
    Price: faker.number.int({ min: 1000, max: 200000 }),
    PictureUrl: `/images/products/${faker.system.commonFileName('png')}`,
    Brand: faker.company.name(),  // Updated to faker.company.name()
    Type: faker.commerce.department(),
    QuantityInStock: faker.number.int({ min: 1, max: 1000 })  // Updated to faker.number.int()
  };
};

const data = [];

for (let i = 0; i < 15000; i++) {
  data.push(generateRandomData());
}

fs.writeFileSync('productData.json', JSON.stringify(data, null, 2));

console.log('1000 records generated and saved to dummyData.json');
