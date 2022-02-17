require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('./middleware/authentication');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

require('./db/conn');
const User = require('./models/User');
const Food = require('./models/Food');

// Signup
app.post("/signup", async (req, res) => {
    try {
        const findUser = await User.findOne({ email: req.body.email });
        if (!findUser) {
            if (req.body.password === req.body.confirmpassword) {
                const newPass = await bcrypt.hash(req.body.password, 10);
                const newConfirmPass = await bcrypt.hash(req.body.confirmpassword, 10);
                const createUser = new User({ email: req.body.email, password: newPass, confirmpassword: newConfirmPass });
                const saveUser = await createUser.save();
                if (!saveUser) {
                    return res.status(400).json("Some error to create account");
                }
                const data = {
                    user: {
                        id: saveUser.id
                    }
                }
                const jwtToken = jwt.sign(data, process.env.JWT_SECUREKEY);
                return res.status(200).json({ solve: "Account created", jwtToken });
            }
            return res.status(400).json("Password not match");
        }
        return res.status(400).json("This email id is already in use");
    }
    catch (error) {
        return res.status(400).json("Some error occurd while signup " + error);
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
        const findUser = await User.findOne({ email: req.body.email });
        if (!findUser) {
            return res.status(400).json("Email id not found, Please create your account first");
        }
        const isMatch = await bcrypt.compare(req.body.password, findUser.password);
        if (!isMatch) {
            return res.status(400).json("Password not match");
        }
        const data = {
            user: {
                id: findUser._id
            }
        }
        const jwtToken = jwt.sign(data, process.env.JWT_SECUREKEY);
        return res.status(200).json({ solve: "Login Successful", jwtToken });
    }
    catch (error) {
        return res.status(400).json("Some error occurd while login " + error);
    }
})

// Get user
app.get("/getuser", authenticate, async (req, res) => {
    try {
        const findUser = await User.findById(req.userId, { password: 0, confirmpassword: 0 });
        if (!findUser) {
            return res.status(400).json("User not found");
        }
        return res.status(200).json(findUser);
    }
    catch (error) {
        return res.status(400).json("Some error occured while get user " + error);
    }
})

// Add Food
app.post("/addfood", authenticate, async (req, res) => {
    const { foodname, foodimage, hotelname, foodprice } = req.body;
    try {
        const createFoodData = new Food({ foodname, foodimage, hotelname, foodprice, user: req.userId });

        const saveFood = await createFoodData.save();

        if (!saveFood) return res.status(400).json("Food Not Saved");

        return res.status(200).json("Food Saved");
    } catch (error) {
        return res.status(400).json("Some error to add food " + error);
    }
})

// Update Food
app.put("/updatefood/:id", authenticate, async (req, res) => {
    const { foodname, foodimage, hotelname, foodprice } = req.body;
    try {
        let updateFoodObj = {};
        if (foodname) updateFoodObj.foodname = foodname;
        if (foodimage) updateFoodObj.foodimage = foodimage;
        if (hotelname) updateFoodObj.hotelname = hotelname;
        if (foodprice) updateFoodObj.foodprice = foodprice;
        if (Object.keys(updateFoodObj).length === 0) return res.status(400).json("Please Enter Updated Values");

        const findFood = await Food.findById(req.params.id);
        if (!findFood) return res.status(400).json("Food Detail Not Find");

        if (findFood.user.toString() !== req.userId.toString()) return res.status(400).json("Access Denied for update food");

        const updateFood = await Food.findByIdAndUpdate(req.params.id, { $set: updateFoodObj }, { new: true });
        if (!updateFood) return res.status(400).json("Food Not Udpated");
        return res.status(200).json("Food Udpated");
    }
    catch (error) {
        return res.status(400).json("Some error to update food " + error);
    }
})

// Delete food
app.delete("/deletefood/:id", authenticate, async (req, res) => {
    try {
        const findFood = await Food.findById(req.params.id);
        if (!findFood) return res.status(400).json("Food Detail Not Find");

        if (req.userId.toString() !== findFood.user.toString()) return res.status(400).json("Access Denied for delete food");

        const deleteFood = await Food.findByIdAndDelete(req.params.id);
        if (!deleteFood) return res.status(400).json("Food Not Deleted");
        return res.status(200).json("Food Deleted");

    }
    catch (error) {
        return res.status(400).json("Some error to delete food " + error);

    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
