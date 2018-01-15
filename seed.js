const Sequelize = require('sequelize');
const pkg = require('../../package.json');
const Promise = require('bluebird');
const { Student, Campus } = require('./server/db/models');
const db = require('./server/db/db');

const students = [
  {
    firstName: 'Suyash',
    lastName: 'Chopra',
    email: 'sc@gmail.com',
    gpa: '3.25',
    campusId: 1
  },
  {
    firstName: 'A',
    lastName: 'B',
    email: 'ab@gmail.com',
    gpa: '3.95',
    campusId: 2
  },
  {
    firstName: 'C',
    lastName: 'D',
    email: 'cd@gmail.com',
    gpa: '3.59',
    campusId: 3
  },
  {
    firstName: 'E',
    lastName: 'F',
    email: 'ef@gmail.com',
    gpa: '3.15',
    campusId: 4
  },
  {
    firstName: 'G',
    lastName: 'H',
    email: 'gh@gmail.com',
    gpa: '3.25',
    campusId: 1
  },
  {
    firstName: 'I',
    lastName: 'J',
    email: 'ij@gmail.com',
    gpa: '3.95',
    campusId: 2
  },
  {
    firstName: 'K',
    lastName: 'L',
    email: 'kl@gmail.com',
    gpa: '3.59',
    campusId: 3
  },
  {
    firstName: 'M',
    lastName: 'N',
    email: 'mn@gmail.com',
    gpa: '3.15',
    campusId: 4
  },
  {
    firstName: 'O',
    lastName: 'P',
    email: 'op@gmail.com',
    gpa: '3.25',
    campusId: 1
  },
  {
    firstName: 'Q',
    lastName: 'R',
    email: 'qr@gmail.com',
    gpa: '3.95',
    campusId: 2
  },
  {
    firstName: 'S',
    lastName: 'T',
    email: 'st@gmail.com',
    gpa: '3.59',
    campusId: 3
  },
  {
    firstName: 'U',
    lastName: 'V',
    email: 'ef@gmail.com',
    gpa: '3.15',
    campusId: 4
  },
  {
    firstName: 'W',
    lastName: 'X',
    email: 'wx@gmail.com',
    gpa: '3.25',
    campusId: 1
  },
  {
    firstName: 'Y',
    lastName: 'Z',
    email: 'yz@gmail.com',
    gpa: '3.95',
    campusId: 2
  },
  {
    firstName: 'AB',
    lastName: 'CD',
    email: 'abcd@gmail.com',
    gpa: '3.59',
    campusId: 3
  },
  {
    firstName: 'EF',
    lastName: 'GH',
    email: 'efgh@gmail.com',
    gpa: '3.15',
    campusId: 4
  },
  {
    firstName: 'IJ',
    lastName: 'KL',
    email: 'ijkl@gmail.com',
    gpa: '3.25',
    campusId: 1
  },
  {
    firstName: 'MN',
    lastName: 'OP',
    email: 'ab@gmail.com',
    gpa: '3.95',
    campusId: 2
  },
  {
    firstName: 'QR',
    lastName: 'ST',
    email: 'qrst@gmail.com',
    gpa: '3.59',
    campusId: 3
  },
  {
    firstName: 'UV',
    lastName: 'WX',
    email: 'uvwx@gmail.com',
    gpa: '3.15',
    campusId: 4
  }
];

const campuses = [
  {
    name: 'Luna',
    imageUrl:
      'https://pbs.twimg.com/profile_images/694191024416112642/VtJUhbKk.png',
    description: 'This is Luna'
  },
  {
    name: 'Terra',
    imageUrl:
      'https://pbs.twimg.com/profile_images/694191024416112642/VtJUhbKk.png',
    description: 'This is Terra'
  },
  {
    name: 'Mars',
    imageUrl:
      'https://pbs.twimg.com/profile_images/694191024416112642/VtJUhbKk.png',
    description: 'This is Mars'
  },
  {
    name: 'Titan',
    imageUrl:
      'https://pbs.twimg.com/profile_images/694191024416112642/VtJUhbKk.png',
    description: 'This is Titan '
  }
];

const seed = () =>
  Promise.all(campuses.map(campus => Campus.create(campus))).then(() =>
    Promise.all(students.map(student => Student.create(student)))
  );

const main = () => {
  console.log('Syncing db...');
  db
    .sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
