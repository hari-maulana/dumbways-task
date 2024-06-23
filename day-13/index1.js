// dibawah ini adalah imprted module yang dibutuhkan
// fungsi rquire untuk mengimpor modules

const express = require('express')
// express adalah framework web aplikasi
//middleware, routing, templating

const { Sequelize, QuerryTypes } = require("sequelize");
// Sequelize adalah ORM (object relational mapping)
// yang Menghubungkan tabel dalam database dengan objek dalam kode
// yang dalam hal ini berinteraksi dengan posgresql

const config = require("./config/config.json");
// config ini mengandung konfigurasi database berbentuk JSON

const path = require("path");
// path adalah modul built-in node js untuk menghandle file path

const sequelize = new Sequelize(config.development);
// menginisialisasi sequelize baru menggunakan config development

// VARIABLE BISA APA SAJA JANGAN BINGUNG!!

const app = express();
//  instance dari express PLICATION
//  Variabel app di sini digunakan untuk menampung hasil dari pemanggilan express(). Objek yang dikembalikan oleh express() adalah aplikasi Express yang siap digunakan untuk menentukan rute, menambahkan middleware, dan memulai server HTTP.

const port  = 3000;
const data = [];

app.set('view engine', 'hbs');
// jika tidak menggunakan hbs maka codingan akan jadi bala
// View engine bukan nama default dari express anda bisa menggantinya
// dengan apa saja

app.set('views', path.join(__dirname, 'src/views'));
// app.set untuk mengatur konfigurasi global express
// __dirname adalah path saat ini yang mengandung kode JS ini
// mis. app/src/views, jika di src ada file js ini maka penulisannya seperti diatas tanpa include app dir. nya.
// path.join adalah method untuk meggabungkan path segment jadi 1 path

app.use("/assets", express.static(path.join(__dirname, 'src/assets')));
//


