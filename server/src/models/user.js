import mongoose from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import bcrypt  from 'bcryptjs'
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

// Encrypting Password Before Saving User
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', UserSchema);

/* Creating two Type Composers for protected fields i.e 'password' */
// Readable Type Composer
const UserTC = composeWithMongoose(User, {
  name: 'UserInput',
  fields: {
    remove: ['password']
  }
});
// Writeable Type Composer
const UserITC = composeWithMongoose(User)

// Login Resolver
UserTC.addResolver({
  kind: 'query',
  name: 'userLogin',
  args: {
    identity: 'String!', // For multi-purpose usage as email and username
    password: 'String!',
  },
  // Adding new token field to the User GraphQL type
  type: UserTC.addFields({
    'token': 'String!'
  }).getResolver('findById').getType(),
  resolve: async({args, context}) => {
    let user = null;
    if(isNaN(Number(args.identity))){
      user = await User.findOne({ email: args.identity });
    // } else {
      // user = await User.findOne({ username: args.identity });
    }

    if(!user) {
      throw new Error('User does not exist.')
    }

    const isEqual = await bcrypt.compareSync(args.password, user.password);
    if(!isEqual) {
      throw new Error('Password is not correct.');
    }
    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    user.token = token;

    return user;
  }
})

// Get authenticated user who's making the requests
UserTC.addResolver({
  kind: 'query',
  name: 'authUser',
  // Adding new token field to the User GraphQL type
  type: UserTC.getResolver('findById').getType(),
  resolve: async({args, context}) => {
    return (await User.findById(context.userId) );
  }
})

export {UserSchema, User, UserTC, UserITC}