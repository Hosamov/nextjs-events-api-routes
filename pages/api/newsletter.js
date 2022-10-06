function handler() {
  if(req.method === 'POST') {
    const userEmail = req.body.email;

    if(!userEmail || !userEmail.includes('@')) {
      res.status(422).json({message: 'Invalid email addres.'});
      return;
    }

    console.log(userEmail);
    res.status(201).json({message: 'Signed up!'});
  }
}

export default handler;