import * as dotenv from "dotenv";
import fs from 'fs';

dotenv.config();

const path = `${__dirname}/../../.env`;
if (!fs.existsSync(path)) {
  console.log('\x1b[41m%s\x1b[0m',
  'ERROR: No .env file detected, closing application process')
  console.log('\x1b[41m%s\x1b[0m',
  'Please create a valid .env file, take a look to the .env.example file');
  process.exit();
}
dotenv.config({ path });

export const PROVIDER_USERNAME = process.env.PROVIDER_USERNAME;
export const PROVIDER_PASSWORD = process.env.PROVIDER_PASSWORD;
export const API_TIMEOUT = process.env.API_TIMEOUT? +process.env.API_TIMEOUT: 1000;
export const SOURCE_1 = process.env.PROVIDER_SOURCE_1 ?? '';
export const SOURCE_2 = process.env.PROVIDER_SOURCE_2 ?? '';