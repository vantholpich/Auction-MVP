import { supabase } from '../lib/supabase';

export interface UploadResult {
  url: string;
  path: string;
}

/**
 * Convert URI to ArrayBuffer for React Native
 */
async function uriToArrayBuffer(uri: string): Promise<ArrayBuffer> {
  const response = await fetch(uri);
  return await response.arrayBuffer();
}

/**
 * Upload an image to Supabase Storage
 */
export async function uploadImage(uri: string, fileName: string): Promise<UploadResult> {
  try {
    console.log('Starting image upload:', uri);
    
    // Create a unique file name
    const fileExt = fileName.split('.').pop() || 'jpg';
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `profile-images/${uniqueFileName}`;

    // Convert URI to ArrayBuffer
    const arrayBuffer = await uriToArrayBuffer(uri);
    
    console.log('Uploading to path:', filePath);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('friend-profiles')
      .upload(filePath, arrayBuffer, {
        contentType: 'image/jpeg',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw error;
    }

    console.log('Upload successful:', data);

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('friend-profiles')
      .getPublicUrl(filePath);

    console.log('Public URL:', urlData.publicUrl);

    return {
      url: urlData.publicUrl,
      path: filePath
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

/**
 * Upload multiple images
 */
export async function uploadMultipleImages(uris: string[]): Promise<string[]> {
  try {
    const uploadPromises = uris.map((uri, index) => 
      uploadImage(uri, `image-${index}.jpg`)
    );
    
    const results = await Promise.all(uploadPromises);
    return results.map(result => result.url);
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    throw error;
  }
}

/**
 * Test if the storage bucket exists and is accessible
 */
export async function testStorageSetup(): Promise<boolean> {
  try {
    // Try to list files in the bucket (this will fail if bucket doesn't exist or no permissions)
    const { data, error } = await supabase.storage
      .from('friend-profiles')
      .list('profile-images', {
        limit: 1
      });

    if (error) {
      console.error('Storage setup test failed:', error);
      return false;
    }

    console.log('Storage setup test passed');
    return true;
  } catch (error) {
    console.error('Storage setup test error:', error);
    return false;
  }
}

/**
 * Delete an image from Supabase Storage
 */
export async function deleteImage(filePath: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from('friend-profiles')
      .remove([filePath]);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}