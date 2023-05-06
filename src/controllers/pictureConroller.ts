import express from 'express'
import { UploadedFile } from 'express-fileupload'
import path from 'path'
import fs from 'fs'
import {v4}  from 'uuid'
import Jimp from 'jimp'
import convert from 'heic-convert'
const { promisify } = require('util');

const uploadPicture = async (req: express.Request, res: express.Response) => {
    const { category } = req.body
    const files = req.files
    if (!files) {
        return res.status(400).send('Нема файлу')
    }
    if (!files.img) {
        return res.status(400).send('Нема файлу')
    }
    console.log(files.img)


    //console.log(model, brand)
    if (!category) return res.status(400).send('Невказана категорія')
    const newCategoryName = category.replace(/[^A-Za-zА-Яа-я0-9\s]/ig, "").replace(/[\s]/ig, "-").toLowerCase();
    const img = files.img
    //console.log(model_dir, brand_dir)
    const dir = `public/${newCategoryName}`
    try{
    const new_name = await resizeAndUpload(img, dir)
    return res.json(new_name)
    }
    catch(e){
        console.log(e)
        return res.status(400).json('помилка')
    }
    


    // return res.send('kkk')
}


async function resizeAndUpload(img: UploadedFile | UploadedFile[], dir: string) {
    try {
        //console.log(img)

        if (!fs.existsSync(path.resolve(__dirname, '..', 'static', dir))) {
            fs.mkdirSync(path.resolve(__dirname, '..', 'static', dir), { recursive: true });
        }
        const fileName = v4() + '.jpeg'
        const newImg = ('length' in img) ? img[0] : img

        if (newImg.mimetype == 'image/heic') {
            
            (async () => {
                const outputBuffer = await convert({
                    buffer: newImg.data, // the HEIC file buffer
                    format: 'JPEG',        // output format
                    quality: 0.4
                });

                await promisify(fs.writeFile)(path.resolve(__dirname, '..', 'static', dir, fileName), outputBuffer);
            })();

            console.log('sttd')
        }
        else {
            try{
                console.log('starte')
                await convertJPG(newImg, fileName, dir)
            }
            catch(e){
                console.log(e)
                
            }
            //console.log('переробка фото', res)
            //console.log(img)

        }
        //console.log('идача')

        return dir + '/' + fileName
    }
    catch (e) {
        console.log(e)
        throw new Error('не вдалося завантажити')
    }
}

function convertJPG(img: UploadedFile, fileName: string, dir: string) {
    const pic_path = path.resolve(__dirname, '..', 'static', dir, fileName)
    //console.log(pic_path)
    return Jimp.read(img.data)
        .then(lenna => {
            return lenna
                //.resize(256, 256) // resize
                .quality(50) // set JPEG quality
                //.greyscale() // set greyscale
                .write(pic_path); // save
        })
        .catch(err => {
            console.error(err);
        });

}

export default uploadPicture