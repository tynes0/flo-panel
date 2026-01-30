const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/flo_panel_db')
    .then(async () => {
        console.log("MongoDB Bağlantısı Başarılı");
        const admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            await User.create({
                username: "admin",
                password: "123",
                role: "admin",
                name: "Sistem Yöneticisi",
                targets: { abu: 0, iso: 0, tabanlik: 0 }
            });
            console.log("Default admin (admin/123) oluşturuldu.");
        }
    })
    .catch(err => console.log("Bağlantı Hatası:", err));

app.use('/api/users', userRoutes);

app.listen(5000, () => console.log("Backend 5000 portunda çalışıyor."));