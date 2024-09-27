import { config } from 'dotenv'; 
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'; 


config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


interface CloudinaryResponse {
  url: string; 
  public_id: string; 

}

export const UploadImage = async (file: File, folder: string): Promise<CloudinaryResponse> => {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);
  
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: folder,
      },
      (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => { 
        if (err) {
          return reject(err.message);
        }
        if (result) {
          return resolve({ url: result.secure_url, public_id: result.public_id }); 
        }
        reject('Unknown error occurred'); 
      }
    ).end(bytes);
  });
};
