import jsonwebtoken from 'jsonwebtoken';

const mintToken = (user) => {
  const jwt = jsonwebtoken.sign(
    {
      user: {
        id: user.id,
        email: user.email,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: parseInt(process.env.JWT_EXPIRATION, 10) },
  );
  return jwt;
};

const verifyToken = (token) => {
  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    return decoded.user;
  } catch (e) {
    return null;
  }
};

module.exports = {
  mintToken,
  verifyToken,
};
