const loginService = require('../services/login.service');

class LoginController {

  async login(req, res) {
    const { email, password } = req.body;
    const data =
      await loginService.login(
        email,
        password
      );
    res.json(data);
  }
}

module.exports = new LoginController();