import type { UploadApiResponse } from 'cloudinary';

import cloudinary from '@/cloudinary';

export async function uploadImageToCloudinary(
  buffer: Uint8Array
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        if (result) resolve(result);
      })
      .end(buffer);
  });
}
