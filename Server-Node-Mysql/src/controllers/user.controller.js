'use strict';
const User = require('../models/user.model');
exports.findAll = function (req, res) {
    User.findAll(function (err, user) {
        // console.log('controller')
        if (err)
            res.send(err);
        // console.log('res', user);
        res.send(user);
    });
};
exports.create = function (req, res) {
    console.log("req.body = ",req.body)
    console.log("req.file = ",req.file)
    
    try {
        console.log("file info = ",req.selectedFile);
    
        if (req.selectedFile == undefined) {
          return res.send(`You must select a selectedFile.`);
        }
    
        Image.create({
          type: req.selectedFile.mimetype,
          name: req.selectedFile.originalname,
          data: fs.readFileSync(
            __basedir + "/resources/static/assets/uploads/" + req.selectedFile.filename
          ),
        }).then((selectedFile) => {
          fs.writeFileSync(
            __basedir + "/resources/static/assets/tmp/" + selectedFile.name,
            selectedFile.data
          );
    
          return res.send(`File has been uploaded.`);
        });
      } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
      }

    const new_employee = new User(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        User.create(new_employee, function (err, user) {
            if (err)
                res.send(err);
            res.json({ error: false, message: "User added successfully!", data: user });
        });
    }
};
exports.findById = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        User.update(req.params.id, new User(req.body), function (err, user) {
            if (err)
                res.send(err);
            res.json({ error: false, message: 'User successfully updated' });
        });
    }
};
exports.delete = function (req, res) {
    User.delete(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'User successfully deleted' });
    });
};
exports.UploadImage = function (req, res) {
    console.log("req.file = ", req.file)
    if (!req.file) {
        return res.status(500).send({ msg: "file is not found" })
    }
        // accessing the file
    const myFile = req.file['uploads[]'];
    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({name: myFile.name, path: `/${myFile.name}`});
    });
}