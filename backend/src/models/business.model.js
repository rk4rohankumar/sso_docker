import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const businessSchema = new Schema(
  {
    businessName: {
      required: [true, "Business Name is required"],
      type: String,
    },
    businessAddress: {
      required: [true, "Address is required"],
      type: String,
    },
    pinCode: {
      type: Number,
      required: [true, "PinCode is required"],
    },
    category: {
      type: String,
      enum: [
        "AC SERVICE",
        "AMBULANCE SERVICE",
        "ASTROLOGERS",
        "AUTO MOBILE",
        "AYURVEDIC DOCTORS",
        "B2B",
        "BABY CARE",
        "BALLON DECORATORS",
        "BANQUETS",
        "BEAUTY",
        "BIRTH DAY PARTY ORGANIZERS",
        "BONE& joint doctors",
        "bore well contractors",
        "bridal makeup",
        "builders contractors",
        "bulk sms",
        "bus on hire",
        "cctv",
        "car rental",
        "cake shops",
        "car insurance agents",
        "car loan",
        "car repair",
        "cardioligists",
        "carpenters",
        "contractors",
        "caters",
        "ca",
        "child specialist",
        "civil contractors",
        "cleaning services",
        "computer repairs",
        "computer training institues",
        "consulatants",
        "daily needs",
        "dance & music",
        "day care centers",
        "decorators",
        "dentitsts",
        "dermalatology",
        "detective agencies",
        "diabetologists",
        "daigonistic centers",
        "dietitians",
        "doctors",
        "ent doctors",
        "educttion",
        "eletrical contractors",
        "eletricians",
        "event organizers",
        "eye doctors",
        "false ceiling",
        "fire extingusher",
        "fitness",
        "flex printing services ",
        "florists",
        "foreign exchange",
        "furniture",
        "gst registeration",
        "gastroenterologists",
        "general phyisican doctors",
        "general surgeons",
        "generators",
        "groceries",
        "gyms",
        "gyanacalogy ",
        "hearing aids",
        "home services",
        "home tutor",
        "homeopathy",
        "hostels",
        "hotels",
        "house keeping",
        "housing loan",
        "income tax consultation",
        "insurance",
        "interior designers",
        "international courier services",
        "internet",
        "jobs",
        "kindergartens",
        "langauge classes",
        "lapTop repairs",
        "lawyers",
        "loans",
        "logistics",
        "makeup artists",
        "matrimonial",
        "medicines",
        "modular kitchen",
        "mototr training schools",
        "movies",
        "neurologists",
        "nurse bureaus",
        "online passport agents",
        "ophthalmologists",
        "opticians",
        "orthapadeic doctors",
        "overseas education",
        "pg accomodations",
        "packers & movers",
        "paediatricians",
        "painting ",
        "party",
        "party ornganizers",
        "pathologyy labs",
        "personal loans",
        "pest control",
        "pet& pet care",
        "photographers",
        "physiotherapists",
        "playgroups",
        "plumber",
        "ready mix concrete",
        "real estate",
        "refrigr rapirs",
        "registeration consulations",
        "rent & hire",
        "repair & services",
        "restuarants",
        "security &cctv",
        "shop online",
        "skin & hair doctors",
        "skin doctors",
        "t shirt printers",
        "tatoo artists",
        "taxi",
        "tempos on hire",
        "tent house",
        "towing service",
        "train ticketing",
        "training insituties",
        "transporters",
        "travel",
        "tutorials",
        "visa assiatance",
        "wall papers",
        "water suppliers",
        "waterproofing contractors",
        "website designers",
        "wedding requisites",
        "weight loss centre's ",
        "yoga classes",
      ],
      required: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    rewardTitle: {
      type: String,
    },
    rewardDiscription: {
      type: String,
    },
    rewardType: {
      type: String,
      enum: [
        "Reward Points",
        "Discounts",
        "Buy one Get one Deal",
        "Cashback",
        "Exclusive offer",
        "Loyalty Rewards",
        "Freebies",
        "Giftcards",
      ],
      required: true,
    },
    rewardValue: {
      type: Number,
    },
    timings: {
      type: String,
      required: [true, "Timing  is required"],
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowecase: true,
      trim: true,
    },
    countryCode: {
      type: String,
      enum: ["+91", "+1", "+44", "+61"],
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone Number is required"],
    },
    extension: {
      type: String,
    },
    website:{
      type: String,
    },
    logo: {
      type: String, // cloudinary url
      //required: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

businessSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // if it not modified then return
  this.password = await bcrypt.hash(this.password, 10); // 10 rounds of algorithm
  next();
});

businessSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); // Check if password is correct
};

businessSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      timings: this.timings,
      businessName: this.businessName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

businessSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const Business = mongoose.model("Business", businessSchema);
