const workspace = require('../models/workspaceModel');

module.exports = {
    createWorkspace,
    // updateWorkspace,
    getAllWorkspaces,
    deleteWorkspaceByName,
};

async function createWorkspace(req, res){
    try{
        const {WorkspaceName} = req.body;
        const userId = req.user.UserId;
        const DB = await workspace.findOne({WorkspaceName});
        if(DB != null){
            if(WorkspaceName === DB.WorkspaceName ? WorkspaceName : null){
                return res
                .status(409)
                .send("Workspace already exist");
            }
        }
        else{
            // let emailExist = await userExists({email: req.body.email})
            const newWorkspace = await workspace.create({WorkspaceName:req.body.WorkspaceName, UserId: userId});
            if(!newWorkspace) return res.status(401).json({msg: "Failed to create User"});
            res.json({
                msg:"Workspace created Successfully",
                // UserId: newUser._id.toString(),
            });
        }
    }catch(err){
        res.json({error : err.message});
    }
}

async function getAllWorkspaces(req, res){
    try {
        // console.log(req.user.UserEmail);
        const userId = req.user.UserId;
        // const workspaces = await workspace.find();
        const workspaces = await workspace.find({ UserId: userId });
        res.send(workspaces);
    } catch (err) {
        res.json({error : err.message});
    }
}

async function deleteWorkspaceByName(req, res) {
    try {
        const { WorkspaceName } = req.body;
        const userId = req.user.UserId; // Assuming the user ID is obtained from the token

        // Find the workspace by name and user ID
        const workspaceToDelete = await workspace.findOne({ WorkspaceName, UserId: userId });
        if (!workspaceToDelete) {
            return res.status(404).json({ message: 'Workspace not found or unauthorized to delete' });
        }

        // Delete the workspace if it exists and belongs to the user
        await workspace.deleteOne({ WorkspaceName, UserId: userId });

        res.status(200).json({ message: 'Workspace deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
