const bcrypt = require('bcryptjs');
const faker = require('faker');

const DEFAULT_PASSWORD = 'Abc123@@';

// Generate a random string
function randomStr() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

/**
 * Hashing default password
 */
const password = bcrypt.hashSync(
  DEFAULT_PASSWORD,
  parseInt(process.env.SALT_FACTOR, 10),
);
/**
 * Hasing version key
 */
const versionKey = bcrypt.hashSync(
  randomStr(),
  parseInt(process.env.SALT_FACTOR, 10),
);

/**
 * Seed core user
 */
const usersData = [
  {
    firstname: 'Admin',
    lastname: 'Mr.',
    email: 'admin@gmail.com',
    password,
    gender: 'male',
    phone_number: faker.phone.phoneNumberFormat(),
    version_key: versionKey,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

/**
 * Seed other 99 random users
 */
for (let i = 0; i < 99; i += 1) {
  const firstname = faker.name.firstName();
  const lastname = faker.name.lastName();
  usersData.push({
    firstname,
    lastname,
    password,
    email: faker.internet.email(firstname, lastname, 'gmail'),
    gender: faker.random.arrayElement(['male', 'female', 'unknown']),
    version_key: versionKey,
    phone_number: faker.phone.phoneNumberFormat(),
    created_at: new Date(),
    updated_at: new Date(),
  });
}

module.exports = usersData;
