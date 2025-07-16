import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
import dotenv from 'dotenv'
dotenv.config()

// Replace with your Key Vault URL
const keyVaultName = process.env.AZURE_KEY_VAULT;
const keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;
console.log("KKKKKK",keyVaultName)
const credential = new DefaultAzureCredential();
const client = new SecretClient(keyVaultUrl, credential);

export const getSecret=async(secretName)=> {
  try {
    const secret = await client.getSecret(secretName);
    return secret.value;
  } catch (err) {
    console.error(`Error getting secret ${secretName}:`, err.message);
    return null;
  }
}
