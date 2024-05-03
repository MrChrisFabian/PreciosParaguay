const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ruta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    // Obtener el ID o el nombre del usuario desde la solicitud (asegúrate de tenerlo disponible en req.params o req.body)
    const userIdOrName = req.params.id || req.body.name; // Ajusta esto según cómo obtengas el ID o el nombre del usuario
    
    // Generar el nombre del archivo con el ID o nombre del usuario y una extensión predefinida
    const filename = userIdOrName ? userIdOrName + '-profile' + path.extname(file.originalname) : 'image-profile' + path.extname(file.originalname);

    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
