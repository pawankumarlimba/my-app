import cloudinary from 'cloudinary';


cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});


export const UploadImage = async (file: File, folder: string): Promise<cloudinary.UploadApiResponse> => {
 
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

 
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { resource_type: 'auto', folder: folder },
      (error, result) => {
        if (error) {
          return reject(new Error(error.message)); 
        }
        if (result) {
          resolve(result); 
        }
      }
    );

    uploadStream.end(bytes); 
  });
};
