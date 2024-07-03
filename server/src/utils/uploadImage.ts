import cloudinary from 'cloudinary';

const uploadImg = async (file: Express.Multer.File): Promise<string> => {
  // Upload room image file
  const base64Image = Buffer.from(file.buffer).toString('base64');
  const dataUrl = `data:${file.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataUrl);

  return uploadResponse.url;
};

export default uploadImg;
