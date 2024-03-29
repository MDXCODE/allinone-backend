const express = require('express');
const { version, author } = require('../../package.json');

const {createSuccessResponse  } = require('../response');

const router = express.Router();

router.use(`/api`, require('./api'));

router.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).json(createSuccessResponse({author,githubUrl: 'https://github.com/MDXCODE/allinone-backend', version}));
});

module.exports = router;