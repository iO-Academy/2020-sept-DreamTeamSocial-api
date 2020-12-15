async function getLoggedInUser(req, res) {
    if(req.user) {
        return res.json({
            success: true,
            message: "User logged in",
            info: req.user
        })
    } else {
        return res.status(400).json({
            success: false,
            message: "User not logged in",
            info: ''
        })
    }
}

module.exports = getLoggedInUser;