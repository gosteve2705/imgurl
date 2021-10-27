var express = require('express'),
 path = require('path'),
 router = express.Router(),
 home = require('../controllers/home'),
 image = require('../controllers/image');
 const multer  = require('multer')
const upload = multer({ dest: path.join(__dirname,
    'public/upload/temp')});
module.exports = function(app) {
 router.get('/', home.index);
 router.get('/images/:image_id', image.index);
 router.post('/images',upload.single('image'), image.create);
 router.post('/images/:image_id/like', image.like);
 router.post('/images/:image_id/comment', image.comment);
 router.delete('/images/:image_id', image.remove);
 app.use(router);
};