require('dotenv').config();
const mongoose = require('mongoose');
const setupExpressServer = require('./expressServer');

const PORT = process.env.PORT || 5000;
const server = setupExpressServer();

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();