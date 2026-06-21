const multer=require('multer')

const storage=multer.diskStorage({
    destination:function(req,file,cb){

        //check if the mimetype of file exist or not
    const allowedFileTypes=['image/png','image/jpg','image/jpeg','image/webp']
    if(!allowedFileTypes.includes(file.mimetype)){
        cb(new Error("This filetype is not supported!!"))
        return
    }
    cb(null,'./uploads') // cb(error,success)    
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + "-" + file.originalname)
    }
})

module.exports={
    multer,storage
}