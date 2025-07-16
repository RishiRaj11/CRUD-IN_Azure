import { BlobServiceClient } from '@azure/storage-blob';
import dotenv from 'dotenv';
import { getSecret } from './getSecret.js';

dotenv.config();

if (!process.env.AZURE_STORAGE_CONNECTION_STRING || !process.env.AZURE_CONTAINER_NAME) {
  throw new Error("Azure storage connection string or container name missing in .env");
}
const c_string=await getSecret(process.env.AZURE_STORAGE_CONNECTION_STRING);
const client = BlobServiceClient.fromConnectionString(c_string);
const container = client.getContainerClient(process.env.AZURE_CONTAINER_NAME);

// 🔼 Upload handler
export const uploadFile = async (fileBuffer, mimetype, userId, originalName) => {
  const blobName = `${userId}/${Date.now()}-${originalName}`;
  const blobClient = container.getBlockBlobClient(blobName);

  try {
    // Lazy check: ensure container exists before uploading
    if (!(await container.exists())) {
      await container.create();
    }

    await blobClient.uploadData(fileBuffer, {
      blobHTTPHeaders: { blobContentType: mimetype },
    });

    return blobClient.url;
  } catch (err) {
    console.error("Error uploading file to blob:", err.message);
    throw err; // propagate for error handling in route
  }
};
