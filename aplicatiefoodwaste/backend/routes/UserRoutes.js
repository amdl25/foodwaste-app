import express from 'express';
import { createUser, getUser, getUserByEmail, updateUser, deleteUser } from '../dataAccess/UserDa.js';
import User from '../entities/User.js'

let userRouter = express.Router();

userRouter.route('/user').post(async (req, res) => {
    res.status(201).json(await createUser(req.body));
})

userRouter.route('/user').get(async (req, res) => {
    res.status(200).json(await getUser());
})

userRouter.route('/user/:email').get(async (req, res) => {
    const { email } = req.params;
  
    try {
      const user = await getUserByEmail(email);
      if (user === null || user ===undefined) {
        res.status(404).json({ message: 'User does not exist' });
      } else {
        res.status(200).json({ message: 'User exists'});
      }
    } catch (error) {
      console.error('Error searching for a friend:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
userRouter.route('/user/:id').put(async (req,res ) => {
    let ret = await updateUser(req.params.id, req.body);

    if(ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj);

})

userRouter.route('/user/:id').delete(async (req,res ) => {
    let ret = await deleteUser(req.params.id);

    if(ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj);

})

userRouter.route('/login').post(async (req, res) => {
        const {UserEmail, UserPassword } = req.body;
    
        try {
            const user = await User.findOne({
                where: {
                    UserEmail,
                    UserPassword,
                },
            });

            if (user) {

                res.status(200).json({message: "User logged in succesfully"});
            }
            else {
            res.status(401).json({ error: 'Invalid credentials' });
            }

        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
});

  
  userRouter.route('/signup').post(async (req, res) => {
    const {UserFirstName, UserLastName, UserEmail, UserPassword} = req.body;
    
    try {
        const user = await User.findOne({
            where: {
                UserEmail,
            },
        });

        if (user) {

            res.status(200).json({message: "User already exists"});
        }
        else {
            res.status(201).json(await createUser(req.body));
        }

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  });

export default userRouter;

