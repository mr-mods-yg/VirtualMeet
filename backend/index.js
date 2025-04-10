require("dotenv").config();
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./lib/db");
const User = require("./models/user");

const app = express();
let origin = null;

app.set('trust proxy', 1); // trust first proxy
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URI],
    credentials: true
}));


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.ORIGIN_URL + "/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => {
    // Todo: Store user info in DB or session
    return done(null, profile);
}));

app.use(passport.initialize());


passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    async (req, res) => {
        const userData = req.user._json;
        // _json: {
        //     sub: '101076041466164809210',
        //     name: 'Yash Garg',
        //     given_name: 'Yash',
        //     family_name: 'Garg',
        //     picture: 'https://lh3.googleusercontent.com/a/ACg8ocImy4jM3zNTztKxHGvRcEFfRwkkOcxC3lJjjtQ0Y9NeS2oiW7QN=s96-c',
        //     email: 'yg292001@gmail.com',
        //     email_verified: true
        //   }
        let user = await User.findOne({ googleId: userData.sub });
        if (!user) {
            // if user does not exists create new user in the database
            user = new User({
                name: userData.name,
                firstName: userData.given_name,
                lastName: userData.family_name,
                email: userData.email,
                googleId: userData.sub,
                picture: userData.picture
            })
            await user.save();
        }
        userData.id = user._id.toString(); // Add the user ID to the userData object
        // console.log(userData);
        const token = jwt.sign({ userData }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "None",
            maxAge: 3600000 // 1 hour
        });
        res.redirect(process.env.FRONTEND_URI + "/dashboard"); // Redirect to frontend after login
    }
);

// Logout Route
app.get("/auth/logout", (req, res) => {
    res.clearCookie("authToken", {
        httpOnly: true,
        sameSite: "None",
        secure: process.env.NODE_ENV === 'production'
    });
    res.json({ message: "Logged out successfully" });
});

// Routes Setup
app.use("/user", require("./routes/user"));
app.use("/event", require("./routes/event"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    await connectDB();
    console.log("Server running on port " + PORT);
});