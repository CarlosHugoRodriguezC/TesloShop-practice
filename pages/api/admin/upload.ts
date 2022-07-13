import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
// import fs from 'fs';
import { v2 as Cloudinary } from 'cloudinary';
Cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return uploadFile(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  //   const { files } = req;

  const imagreUrl = await parseFiles(req);


  return res.status(200).json({ message: imagreUrl });
};

const saveFile = async (file: formidable.File):Promise<string> => {
  // !Warning! this is the code for saving files to filsystem DONT USE IT IN PRODUCTION
  //   const data = fs.readFileSync(file.filepath);
  //   fs.writeFileSync(`./public/${file.originalFilename}`, data);
  //   fs.unlinkSync(file.filepath);
  const { secure_url } = await Cloudinary.uploader.upload(file.filepath);
//   console.log(data);

  return secure_url;
};

const parseFiles = async (req: NextApiRequest):Promise<string> => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      //   console.log({ err, fields, files });
      if (err) {
        reject(err);
      }

      const filePath = await saveFile(files.file as formidable.File);
      resolve(filePath);
    });
  });
};
