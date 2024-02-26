import { findIndex } from "../common/helper.js";

const user = [
  {
    id: 1,
    name: "Kio",
    mail: "rajakarthick924@gmail.com",
    password: "28112001",
    status: "true,",
    role: "user",
  },
];
const getAllUsers = (req, res) => {
  try {
    res.status(200).send({
      message: "Sucess",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: "internel server error",
    });
  }
};
const getAllUsersById = (req, res) => {
  try {
    const { id } = req.params;
    let index = findIndex(user, id);
    console.log(index);
    if (index !== -1) {
      res.status(200).send({
        message: "Sucess",
        user: user[index],
      });
    } else {
      res.status(400).send({
        message: "Invalid user id",
      });
    }
  } catch (error) {
    console.log(error),
      res.status(500).send({
        message: "internel server error",
      });
  }
};
const AddUsers = (req, res) => {
  try {
    let id = user.length ? user[user.length - 1].id + 1 : 1;

    console.log(req.body);

    req.body.id = id;

    user.push(req.body);

    res.status(200).send({
      message: "User added Successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "invalid",
    });
  }
};
const editUsersById = (req, res) => {
  try {
    const { id } = req.params;
    let index = findIndex(user, id);

    if (index !== -1) {
      req.body.id = Number(id);
      user.splice(index, 1, req.body);
      res.status(200).send({
        message: "Sucess",
      });
    } else {
      res.status(400).send({
        message: "Invalid user id",
      });
    }
  } catch (error) {
    console.log(error),
      res.status(500).send({
        message: "internel server error",
      });
  }
};
const deleteUserById = (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    let index = findIndex(user, id);
    if (index !== -1) {
      user.splice(index, 1);
      res.status(200).send({
        message: "User Deleted Successfully",
      });
    } else {
      res.status(400).send({
        message: "Invalid User Id",
      });
    }
  } catch (error) {
    console.loh(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

export default {
  getAllUsers,
  getAllUsersById,
  AddUsers,
  editUsersById,
  deleteUserById,
};
