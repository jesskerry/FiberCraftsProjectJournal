var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Project = require('../schema/Project');

const dbRoute =
  'mongodb+srv://dbUser:dbUserPassword@cluster0.zufin.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';//*

mongoose.connect(dbRoute, { useUnifiedTopology: true });//*
let db = mongoose.connection;//*

mongoose.set('useFindAndModify', false);

db.once('open', () => console.log('connected to the database'));//*

// code to upload and save images
// some of the following code is copied from https://www.digitalocean.com/community/tutorials/nodejs-uploading-files-multer-express
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '/src/my-images');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  }
});

const fs = require('fs')

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));//*

router.get('/', function (req, res, next) {
  Project.find(function (err, data) {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true, info: data })

  });
});

/* gets a specific project based on its unique id */
router.get('/:projectid/', function (req, res, next) {
  Project.find({ _id: req.params.projectid }, function (err, data) {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true, info: data })

  });
});

router.post('/', upload.single('projectimg'), function (req, res, next) {
  let newProj = new Project();
  console.log(req.body);
  newProj.userid = req.body.userid;
  newProj.name = req.body.projname;
  newProj.type = req.body.projtype;
  newProj.otherType = req.body.otherType ? req.body.otherType : "";
  newProj.status = "WIP";
  newProj.materials = req.body.materials;
  newProj.patsrc = req.body.patternsource;
  newProj.updates = [];
  newProj.imgsrc = req.file ? req.file.filename : "";

  newProj.save(function (err, data) {
    if (err) {
      return res.json({ success: false, error: err });
    } else {
      return res.json({ success: true, info: data })
    }
  });
})

router.put('/', upload.single('projectimg'), function (req, res, next) {
  var updatedProject = {};
  console.log("backend:");
  console.log(req.body);
  console.log(req.file);
  if (req.body.projname !== undefined) {
    updatedProject.name = req.body.projname;
  }
  if (req.body.projtype !== undefined) {
    updatedProject.type = req.body.projtype;
  }
  if (req.body.otherType !== undefined) {
    updatedProject.otherType = req.body.otherType;
  }
  if (req.body.imgsrc !== undefined) {
    updatedProject.imgsrc = req.body.imgsrc;
  }
  if (req.body.status !== undefined) {
    updatedProject.status = req.body.status;
  }
  if (req.body.materials !== undefined) {
    updatedProject.materials = req.body.materials;
  }
  if (req.body.patternsource !== undefined) {
    updatedProject.patsrc = req.body.patternsource;
  }
  if (req.body.updates !== undefined) {
    updatedProject.updates = req.body.updates;
  }
  if (req.file !== undefined) {
    updatedProject.imgsrc = req.file.filename;
  }
  console.log("updated project: ");
  console.log(updatedProject);
  Project.updateOne({ _id: req.body.projectid }, updatedProject, (err) => {
    if (err) {
      return res.json({ success: false, error: err });
    } else {
      return res.json({ success: true })
    }
  })

})

router.delete('/', function (req, res, next) {
  Project.find({ _id: req.body.projectid }, function (err, data) {
    if (err) {
      return res.json({ success: false, error: err });
    }
    console.log(data);
    const path = "./uploads/" + data[0].imgsrc;
    console.log(path);
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err)
        return
      }
      console.log("file removed");
      //file removed
    })
  });

  Project.findOneAndRemove({ _id: req.body.projectid }, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
})

module.exports = router;
