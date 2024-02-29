const express = require('express');
const router = express.Router();
const _ = require('lodash');
const List = require('../models/list');
const Party = require('../models/party');

router.get("/", async (req, res) => {
    try {
        const data_array = await List.find();

        if (data_array.length === 0) {
            await List.insertMany([work1, work2, work3]);
            res.redirect("/");
            console.log("Successfully inserted");
        } else {
            res.render("index", { list: "item-list", newListItem: data_array });
        }
    } catch (err) {
        console.log("Error:", err);
    }
});

router.get("/:postName", async (req, res) => {
    const title = _.upperFirst(req.params.postName);

    try {
        let data = await Party.findOne({ name: title });

        if (!data) {
            const birthday = new Party({
                name: title,
                people: data_array
            });
            await birthday.save();
            res.render("compose", { list: birthday.name, newListItem: birthday.people });
        } else {
            res.render("compose", { list: data.name, newListItem: data.people });
        }
    } catch (err) {
        console.log("Error:", err);
    }
});

router.post("/delete", async (req, res) => {
    const checkValId = req.body.checkbox;
    const checkTitle = req.body.listName;

    try {
        if (checkTitle === "item-list") {
            await List.deleteOne({ _id: checkValId });
            // console.log("Deletion of one item if item successfully");
            res.redirect("/");
        } else {
            await Party.findOneAndUpdate({ name: checkTitle }, { $pull: { people: { _id: checkValId } } });
            // console.log("Deletion of one item else item successfully");
            res.redirect("/" + checkTitle);
        }
    } catch (err) {
        console.log("Deletion of one item error", err);
    }
});

router.post("/", async (req, res) => {
    let user_data = req.body.addItem;
    let user_title = req.body.title;

    try {
        const work = new List({ name: user_data });
        if (user_title === "item-list") {
            await work.save();
            // console.log("Inserted one item in if block successfully");
            res.redirect("/");
        } else {
            await Party.findOneAndUpdate({ name: user_title }, { $push: { people: work } });
            // console.log("Inserted one item in else block successfully");
            res.redirect("/" + user_title);
        }
    } catch (err) {
        console.log("Insertion of one item error", err);
    }
});

module.exports = router;
