import type { UploadApiResponse } from 'cloudinary';

import cloudinary from '@/cloudinary';

export async function uploadImageToCloudinary(
  fileUri: string
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(
        fileUri,
        { folder: 'epicure', invalidate: true },
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          if (result) resolve(result);
        }
      )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
