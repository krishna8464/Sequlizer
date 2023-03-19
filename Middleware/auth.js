const express = require("express");
const jwt = require("jsonwebtoken");

//to check whether the user is logged in or not

const authMiddleware = async (req, res, next) => {
  let [tokenSyn, token] = req.headers.authorization.trim().split(" ");

  try {
    if (tokenSyn=="Bearer") {
      const decodedToken = jwt.verify(token, "loginToken");
      req.body.userId = decodedToken.id;
      next();
    } else {
      res.status.send("Token not authorized.");
      return;
    }
  } catch (e) {
    res.status(500).send("Error, not authorized");
  }
};

module.exports = { authMiddleware };
