const express = require('express');
const router = express.Router();
const workspaceControllers = require('../controllers/workspaceController');
const memberControllers = require('../controllers/memberController')
const validateToken = require('../utils/authentication')

// const Member = require('../models/memberModel');
// const axios = require('axios');

router.post('/workspace', validateToken, workspaceControllers.createWorkspace);

router.get('/workspace', validateToken, workspaceControllers.getAllWorkspaces);

router.post('/workspace/delete', validateToken, workspaceControllers.deleteWorkspaceByName);

router.post('/member', memberControllers.addMember);

module.exports = router;