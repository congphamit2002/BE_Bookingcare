import db from "../models"

let handleCreateSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.image || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    message: 'Missing Parameter'
                })
            } else {
                let specialty = await db.specialty.create({
                    name: data.name,
                    image: data.image,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                if (specialty) {
                    resolve({
                        errCode: 0,
                        message: 'Create specialty is successed'
                    })
                }
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

let handleGetAllSpecialties = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.specialty.findAll({
            })
            if (data && data.length > 0) {
                data.map((item, index) => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                })
            }
            resolve({
                errCode: 0,
                data: data
            })
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}
export default {
    handleCreateSpecialty: handleCreateSpecialty,
    handleGetAllSpecialties: handleGetAllSpecialties
}