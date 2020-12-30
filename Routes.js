const fs = require('fs');

const ServerWorker = (req,res) => {
  const url = req.url,
        method = req.method;

  if (url === '/'){
    console.log('return initial page with forms and greeting');
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head>');
    res.write('<title>');
    res.write('Initial Page');
    res.write('</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<h1>');
    res.write('Hi, new user!');
    res.write('</h1>');
    res.write('<form action="/create-user" method="POST">');
    res.write('<input type="text" name="username">');
    res.write('<button type="submit">Register</button>');
    res.write('</form>');
    res.write('<a href="/users"> Check Registered Users </a>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/users'){
    console.log('Printing list of users');

    let data = fs.readFileSync('./usernameList.txt', {encoding:'utf-8',flag:'r'});
    console.log(data);
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head>');
    res.write('<title>');
    res.write('Users List');
    res.write('</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<h1>');
    res.write('List of Registered Users');
    res.write('</h1>');
    res.write('<ul>');
    data.split(',').forEach((username) => {
      if (username)
        res.write(`<li>${username}</li>`);
    })
    res.write('</ul>');
    res.write('<a href="/"> Go back to Home </a>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/create-user' && method === 'POST') {
    console.log('Writing username to file usernameList.txt');
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      let name = Buffer.concat(body).toString().split('=')[1];
      fs.appendFileSync('./usernameList.txt', `${name},`);
      console.log(`Username passed: ${name}`);
      res.setHeader('Content-Type','text/html');
      res.write('<html>');
      res.write('<head>');
      res.write('<title>');
      res.write('Initial Page');
      res.write('</title>');
      res.write('</head>');
      res.write('<body>');
      res.write('<h1>');
      res.write('Registered!');
      res.write('</h1>');
      res.write('<h3>');
      res.write(`Welcome, ${name}`);
      res.write('</h3>');
      res.write('<a href="/"> Return to Home </a>');
      res.write('</body>');
      res.write('</html>');
      return res.end();
    });
  }
}

module.exports = ServerWorker;