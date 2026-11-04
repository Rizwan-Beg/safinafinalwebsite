/**
 * Utility functions for transforming Cloudinary image URLs dynamically.
 * These apply Cloudinary's AI capabilities on-the-fly.
 */

/**
 * Injects transformations into a Cloudinary URL before the version/public ID.
 * Example input: https://res.cloudinary.com/demo/image/upload/v1234/sample.jpg
 * Example output with 'e_deskew': https://res.cloudinary.com/demo/image/upload/e_deskew/v1234/sample.jpg
 */
function applyCloudinaryTransformations(url, transformations) {
  if (!url || typeof url !== 'string' || !url.includes('cloudinary.com')) {
    return url;
  }

  // Cloudinary URLs usually have the format:
  // https://res.cloudinary.com/<cloud_name>/image/upload/<transformations>/v<version>/<public_id>
  // We want to insert our AI transformations right after '/upload/'
  
  const uploadToken = '/upload/';
  const uploadIndex = url.indexOf(uploadToken);
  
  if (uploadIndex !== -1) {
    const beforeUpload = url.substring(0, uploadIndex + uploadToken.length);
    const afterUpload = url.substring(uploadIndex + uploadToken.length);
    
    // Check if there are already transformations, avoid duplicating
    // If we want to strictly prepend our transformations:
    return `${beforeUpload}${transformations}/${afterUpload}`;
  }

  return url;
}

/**
 * Applies AI background removal, white background, and deskewing (straightening)
 * Ideal for the main thumbnail on catalog pages.
 */
export function getTransformedThumbnailUrl(url) {
  // e_background_removal: AI removes floor/background
  // b_white: sets removed background to solid white
  return applyCloudinaryTransformations(url, 'e_background_removal,b_white');
}

/**
 * Applies AI background removal and white background (no straightening)
 * Ideal for gallery images on the product details page.
 */
export function getTransformedGalleryUrl(url) {
  // e_background_removal: AI removes floor/background
  // b_white: sets removed background to solid white
  return applyCloudinaryTransformations(url, 'e_background_removal,b_white');
}
