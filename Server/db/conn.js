const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, (error) => {
    if (error) {
        console.log("We can not connect with database" + error);
    }
    else {
        console.log("We are connected with database");
    }
});