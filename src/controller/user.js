import { findIndex } from "../common/helper.js";
import DB_CONFIG from "../config/dbConfig.js";
import mongodb, { MongoClient } from "mongodb";
// const user = [
//   {
//     id: 1,

//     name: "lali",
//     mail: "lali925@gmail.com",
//     password: "2201",
//     status: "true,",
//     role: "user",
//   },
// ];

const client = new MongoClient(DB_CONFIG.DB_URL);
const getAllUsers = async (req, res) => {
  await client.connect();

  try {
    const db = await client.db(DB_CONFIG.DB_Name);
    let users = await db.collection("users").find().toArray();
    res.status(200).send({
      message: "Sucess",
      users,
    });
  } catch (error) {
    res.status(500).send({
      message: "internel server error",
    });
  } finally {
    client.close();
  }
};
const getAllUsersById = async (req, res) => {
  await client.connect();

  try {
    const db = await client.db(DB_CONFIG.DB_Name);
    let users = await db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(req.params.id) });

    res.status(200).send({
      message: "Sucess",
      users,
    });
  } catch (error) {
    res.status(500).send({
      message: "internel server error",
    });
  } finally {
    client.close();
  }
};
const AddUsers = async (req, res) => {
  await client.connect();
  try {
    const db = await client.db(DB_CONFIG.DB_Name);
    const user = await db.collection("users").findOne({ email: req.body.mail });
    if (!user) {
      let newUser = await db.collection("users").insertOne(req.body);
      res.status(200).send({
        message: "user added successfully",
      });
    } else {
      res.status(400).send({
        message: `user with ${req.body.mail} already exist`,
      });
    }
    res.status(200).send({
      message: "User added Successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "invalid",
    });
  } finally {
    client.close();
  }
};
const editUsersById = async (req, res) => {
  await client.connect();
  try {
    const db = await client.db(DB_CONFIG.DB_Name);
    let user = await db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(req.params.id) },
        { $set: req.body }
      );

    res.status(200).send({
      message: "Sucess",
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        message: "internel server error",
      });
  } finally {
    client.close();
  }
};
const deleteUserById = async (req, res) => {
  await client.connect();
  try {
    const db = await client.db(DB_CONFIG.DB_Name);
    let user = await db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(req.params.id) });
    if (user) {
      await db
        .collection("users")
        .deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
      res.status(200).send({
        message: "User Deleted Successfully",
      });
    } else {
      res.status(400).send({
        message: `Invalid User Id`,
      });
    }
  } catch (error) {
    console.log(error),
      res.status(500).send({
        message: "internel server error",
      });
  } finally {
    client.close();
  }
};

export default {
  getAllUsers,
  getAllUsersById,
  AddUsers,
  editUsersById,
  deleteUserById,
};
