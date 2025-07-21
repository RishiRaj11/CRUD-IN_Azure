import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const client = jwksClient({
  jwksUri: "https://login.microsoftonline.com/44d9bf97-02ce-4a07-a40f-82073a59502a/discovery/v2.0/keys",
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.getPublicKey();
    console.log(signingKey)
    callback(null, signingKey);
  });
}

export const checkJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  console.log(jwt.decode(token, { complete: true }));


  if (!token) return res.status(401).send("No token provided");

  // const options = {
  //   algorithms: ["RS256"],
  //   audience: "api://200b6d4a-95b4-404b-b1ff-4be4b740eb60",  // ✅ Replace with backend's Application ID URI
  //   issuer: `https://login.microsoftonline.com/44d9bf97-02ce-4a07-a40f-82073a59502a/v2.0`,  // ✅ Your Azure tenant
  // };

  jwt.verify(token, getKey, (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(403).send("Invalid token");
    }
    req.user = decoded;
    next();
  });
};
