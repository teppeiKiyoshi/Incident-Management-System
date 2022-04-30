import User from "../models/User.js";

const getStats = async (req, res) => {
  const userCount = await User.countDocuments();

  if (true) {
    return res.json({
      status: "ok",
      userCount: userCount,
    });
  } else {
    return res.json({ status: "error", user: false });
  }
};

export { getStats };
