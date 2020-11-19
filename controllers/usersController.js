exports.editUserEmail = async (req, res) => {
   const user = req.user;
   const body = req.body;

   try {
     const result = await pool.query(`
       UPDATE users SET
       name = $1, email = $2
       WHERE id = $3
       RETURNING *
     `,
       [body.name, body.email, user.id]
     )
 
     const editedUser = result.rows[0];
     console.log(editedUser);
     const userForToken = {
       id: editedUser.id,
       email: editedUser.email
     }
 
     const token = jwt.sign(userForToken, config.SECRET);
     res.status(200).send({ token, email: editedUser.email, name: editedUser.name});
   }
   catch(e) {
     res.status(400).send({ error: 'failed to edit'})
   }
 }