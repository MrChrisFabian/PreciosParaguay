const { PORT } = require("./config/settings");
const express = require("express");
const cors = require('cors')
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser'); // to be able to read cookies

app.use(cookieParser());

const corsOptions = {
    credentials: true, // Allow credentials (cookies) to be sent to/from origin
    origin: 'http://localhost:5173', // Allow only this origin
    methods: 'GET, POST, PUT, PATCH, DELETE', // Allow these methods
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/mongoose.config");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const UserRouter = require("./routes/user.routes");
app.use("/api/auth", UserRouter);

const AllMyProductRoutes = require("./routes/product.routes");
AllMyProductRoutes(app);

const wishlistRoutes = require('./routes/wishList.routes');
app.use('/api', wishlistRoutes);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));