import express from 'express';
import { createFriendship, getFriendship, getFriendshipId, updateFriendship, deleteFriendship, getFriendsList } from '../dataAccess/FriendshipDa.js';
import Friendship from '../entities/Friendship.js';
import FriendshipRequest from '../entities/FriendshipRequest.js';
import User from '../entities/User.js';
import { Sequelize } from 'sequelize';


let friendshipRouter = express.Router();

friendshipRouter.route('/friendship').post(async (req, res) => {
    res.status(201).json(await createFriendship(req.body));
})

friendshipRouter.route('/friendship/:userEmail').get(async (req, res) => {
  const { userEmail } = req.params;
  const friendsList = await getFriendsList(userEmail);
  res.status(200).json(friendsList);
});


friendshipRouter.route('/friendship/:id').get(async (req, res) => {
    res.status(200).json(await getFriendshipId(req.params.id));
})

friendshipRouter.route('/friendship/:id').put(async (req,res ) => {
    let ret = await updateFriendship(req.params.id, req.body);

    if(ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj);

})

friendshipRouter.route('/friendship/:id').delete(async (req,res ) => {
    let ret = await deleteFriendship(req.params.id);

    if(ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj);

})


friendshipRouter.route('/accept-friend-request/:friendRequestId').post(async (req, res) => {
  const { FriendshipRequestId } = req.body;

  try {
    const friendRequest = await FriendshipRequest.findByPk(FriendshipRequestId);

    console.log(friendRequest);
    if (!friendRequest) {
      res.status(404).json({ error: 'Friend request not found' });
      return;
    }

    const existingFriendship = await Friendship.findOne({
      where: {
        [Sequelize.Op.or]: [
          { senderId: friendRequest.senderId, receiverId: friendRequest.receiverId },
          { senderId: friendRequest.receiverId, receiverId: friendRequest.senderId },
        ],
      },
    });

    if (existingFriendship) {
      res.status(400).json({ error: 'Friendship already exists' });
      return;
    }

    await Friendship.create({
      senderId: friendRequest.senderId,
      receiverId: friendRequest.receiverId,
    });

    await friendRequest.destroy();

    res.status(200).json({ message: 'Friend request accepted successfully' });
  } catch (error) {
    console.error('Error accepting friend request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

friendshipRouter.route('/accept-friend-request').post(async (req, res) => {
  const { userEmail, senderEmail } = req.body;

  try {
    const friendRequest = await FriendshipRequest.findOne({
      where: {
        senderId: { [Sequelize.Op.ne]: null },
        receiverId: { [Sequelize.Op.ne]: null },
      },
    });
  
    if (!friendRequest) {
      res.status(404).json({ error: 'Friend request not found' });
      return;
    }
  
    const existingFriendship = await Friendship.findOne({
      where: {
        [Sequelize.Op.or]: [
          { senderId: friendRequest.senderId, receiverId: friendRequest.receiverId },
          { senderId: friendRequest.receiverId, receiverId: friendRequest.senderId },
        ],
      },
    });
  
    if (existingFriendship) {
      res.status(400).json({ error: 'Friendship already exists' });
      return;
    }
  
    const [user, sender] = await Promise.all([
      User.findOne({ where: { UserEmail: userEmail } }),
      User.findOne({ where: { UserEmail: senderEmail } }),
    ]);
  
    if (!user || !sender) {
      res.status(404).json({ error: 'User or sender not found' });
      return;
    }
  
    await Friendship.create({
      senderId: user.UserId,
      receiverId: sender.UserId,
    });
  
    await FriendshipRequest.destroy({
      where: {
        FriendshipRequestId: friendRequest.FriendshipRequestId,
      },
    });
  
    res.status(200).json({ message: 'Friend request accepted successfully' });
  } catch (error) {
    console.error('Error accepting friend request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default friendshipRouter;

