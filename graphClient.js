import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import 'isomorphic-fetch';
import dotenv from 'dotenv';
dotenv.config();

const credential = new ClientSecretCredential(
  process.env.TENANT_ID,
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

export async function getAppGraphClient() {
  const token = await credential.getToken("https://graph.microsoft.com/.default");

  return Client.init({
    authProvider: (done) => done(null, token.token),
  });
}
