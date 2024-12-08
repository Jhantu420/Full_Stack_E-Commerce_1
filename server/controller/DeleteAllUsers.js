const User = require('../models/userModel');

async function deleteAllUsers(req, res) {
  try {
    // Delete all users except the admin (if applicable)
    const result = await User.deleteMany({ role: { $ne: 'admin' } }); // Avoid deleting admin users if needed

    res.status(200).json({
      success: true,
      message: 'All users deleted successfully',
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Error deleting users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete users',
    });
  }
}

module.exports = deleteAllUsers;
