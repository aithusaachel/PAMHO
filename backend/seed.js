import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'data.sqlite');

const formTypes = ['contact', 'join', 'partners', 'conversation', 'ambassadors'];

const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'Daniel', 'Olivia', 'James', 'Sophia', 'Kwame', 'Amina', 'Chidi', 'Nneka', 'Tariq'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Okafor', 'Mensah', 'Diallo', 'Keita', 'Adebayo'];
const orgs = ['TechCorp', 'HealthPlus', 'EduGlobal', 'GreenFuture', 'BuildRight', 'InnovateAfrica', 'MentalHealthOrg'];
const countries = ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Uganda', 'Rwanda', 'Egypt', 'Morocco'];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateName() {
  return `${getRandom(firstNames)} ${getRandom(lastNames)}`;
}

function generateEmail(name) {
  return `${name.replace(' ', '.').toLowerCase()}${Math.floor(Math.random() * 100)}@example.com`;
}

async function seedDB() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Create table just in case it doesn't exist yet
  await db.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      formType TEXT NOT NULL,
      data TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Seeding database with 5000 fake entries...');

  await db.run('BEGIN TRANSACTION');

  for (let i = 0; i < 5000; i++) {
    const formType = getRandom(formTypes);
    let data = {};

    const fullName = generateName();
    const email = generateEmail(fullName);
    const whatsapp = `+234${Math.floor(Math.random() * 9000000000 + 1000000000)}`;

    if (formType === 'partners') {
      data = {
        orgName: getRandom(orgs),
        contactName: fullName,
        email,
        whatsapp,
        partnershipType: getRandom(['Financial', 'Strategic', 'Media', 'Technology']),
        message: 'We are interested in partnering with PAMHO to improve mental health access across Africa.'
      };
    } else if (formType === 'join') {
      data = {
        fullName,
        country: getRandom(countries),
        email,
        whatsapp,
        occupation: getRandom(['Student', 'Doctor', 'Engineer', 'Teacher', 'Designer', 'Psychologist']),
        referral: getRandom(['Social Media', 'Friend', 'Event', 'Website', 'Newsletter']),
        theme: getRandom(['Innovation and Technology in Mental Health', 'Community Support', 'Policy Advocacy']),
        message: 'I would love to join the network and contribute to the upcoming initiatives.'
      };
    } else if (formType === 'ambassadors') {
      data = {
        fullName,
        country: getRandom(countries),
        email,
        whatsapp,
        linkedin: `https://linkedin.com/in/${fullName.replace(' ', '').toLowerCase()}`,
        motivation: 'I am highly motivated to spread awareness about mental health in my local community and reduce stigma.'
      };
    } else if (formType === 'contact') {
      data = {
        fullName,
        email,
        whatsapp,
        subject: getRandom(['General Inquiry', 'Support', 'Feedback', 'Press']),
        message: 'Hello, I have a quick question regarding your upcoming event next month. Can you please provide more details?'
      };
    } else if (formType === 'conversation') {
      data = {
        fullName,
        email,
        whatsapp,
        message: 'Please add me to the mailing list for the next conversation circle!'
      };
    }

    // Spread them out over the last 30 days
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - Math.floor(Math.random() * 30));

    await db.run(
      'INSERT INTO submissions (formType, data, createdAt) VALUES (?, ?, ?)',
      formType,
      JSON.stringify(data),
      pastDate.toISOString()
    );
  }

  await db.run('COMMIT');

  console.log('Successfully added 5000 entries!');
}

seedDB().catch(console.error);
