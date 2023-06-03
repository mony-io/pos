const Users = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

exports.create = async (req, res, next) => {
  try {
    const [username] = await Users.findByUsername(req.body.username);
    if (username.length !== 0) {
      return res.send({
        message: 'ឈ្មោះអ្នកប្រើមានរួចហើយ...!',
        success: false,
      });
    }
    if (req.body.email !== '') {
      const [email] = await Users.findByEmail(req.body.email);
      if (email.length !== 0) {
        return res.send({ message: 'អ៊ីមែលមានរួចហើយ...!', success: false });
      }
    }

    let password = await bcrypt.hash(req.body.password, 10);
    let user = new Users(
      req.body.username,
      password,
      req.body.email,
      req.body.phone_number,
      req.body.role_id,
      req.body.status_id
    );
    await user.save();
    res
      .status(200)
      .send({ message: 'អ្នកប្រើប្រាស់ត្រូវបានបង្កើត...!', success: true });
  } catch (error) {
    next(error);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const search_keyword = req.query.search || '';
    // get number of row
    const [nRows] = await Users.getNumberOfRow(search_keyword);

    const totalPage = Math.ceil(nRows[0][0].totalRows / limit);
    const [result] = await Users.findAll(limit, page, search_keyword);

    res.send({
      result: result[0],
      page: page,
      limit: limit,
      totalRows: nRows[0][0].totalRows,
      totalPage: totalPage,
    });
  } catch (error) {
    next(error);
  }
};

exports.UserLogin = async (req, res, next) => {
  try {
    // validate request
    if (!req.body.email || !req.body.password) {
      return res.send({
        message: 'សូមអភ័សទោស...! ទាមទារអ៊ីមែលនិងពាក្យសម្ងាត់',
      });
    }
    const [user, _] = await Users.findByEmail(req.body.email);
    //console.log(user);
    if (user.length > 0) {
      const match = await bcrypt.compare(req.body.password, user[0].password);
      if (!match) {
        return res.send({
          message:
            'សូមអភ័សទោស...! ពាក្យសម្ងាត់និងឈ្មោះអ្នកប្រើប្រាស់មិនត្រឹមត្រូវទេ...?',
          success: false,
        });
      }

      const userid = user[0].id;
      const username = user[0].username;
      const email = user[0].email;
      let role = user[0].role_name;
      //console.log(role);

      const accessToken = jwt.sign(
        { userid, username, email, role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
      );

      const refreshToken = jwt.sign(
        { userid, username, email, role },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: '1d',
        }
      );

      await Users.updateRefreshToken(userid, refreshToken);

      await res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.send({ token: accessToken, success: true });
    } else {
      // work when email not correct
      const [user] = await Users.findByUsername(req.body.email);
      if (user.length > 0) {
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) {
          return res.send({
            message:
              'សូមអភ័សទោស...! ពាក្យសម្ងាត់និងឈ្មោះអ្នកប្រើប្រាស់មិនត្រឹមត្រូវទេ...?',
            success: false,
          });
        }

        const userid = user[0].id;
        const username = user[0].username;
        const email = user[0].email;
        let role = user[0].role_name;

        const accessToken = jwt.sign(
          { role, userid, username, email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '30s' }
        );

        const refreshToken = jwt.sign(
          { userid, username, email, role },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: '1d',
          }
        );

        await Users.updateRefreshToken(userid, refreshToken);

        await res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.send({ token: accessToken, success: true });
      } else {
        res.send({
          message:
            'សូមអភ័សទោស...! ពាក្យសម្ងាត់និងឈ្មោះអ្នកប្រើប្រាស់មិនត្រឹមត្រូវទេ...?',
          success: false,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteToken = async (req, res, next) => {
  try {
    const result = await Users.updateRefreshToken(req.params.id, '');
    res.send(result);
  } catch (err) {}
};

exports.logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    //console.log(refreshToken);
    if (!refreshToken) return res.sendStatus(204);
    const [user] = await Users.findByRefreshToken(refreshToken);
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.updateRefreshToken(userId, null);
    res.clearCookie('refreshToken');
    return res.send('ការចាកចេញរបស់អ្នកត្រូវបានជោគជ័យ...!');
  } catch (error) {
    next(error);
  }
};

exports.resetpassword_mail = async (req, res, next) => {
  try {
    if (!req.body.email)
      return res.send({ msg: 'សូមអភ័សទោស...! ទាមទារអ៊ីមែល...?' });
    const [user] = await Users.findByEmail(req.body.email);

    if (user.length > 0) {
      // reset check admin
      const [admin] = await Users.isAdmin(req.body.email);
      if (admin.length === 0) {
        return res.send({
          message: `${req.body.email} => អ៊ីមែលមិនមានសិទ្ធគ្រប់គ្រាន់ក្នុងការផ្លាស់ប្ដូរពាក្យសម្ងាត់...!`,
          success: false,
        });
      }
      // ================================
      const userid = user[0].id;
      const email = user[0].email;

      const token = jwt.sign({ userid }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '180s',
      });
      const links = `<h1>សួស្ដី..! ${user[0].username}</h1>
      <p>សូមមេត្តា...!​ ចុចលីងនេះដើម្បីធ្វើការដាក់នៅលើនៅពាក្យសម្ងាត់ថ្មីរបស់លោកអ្នក ==> <a href="http://localhost:5173/forgotpassword/${userid}/${token}/">ដាក់លេខសម្ងាត់ថ្មីនៅទីនេះ...!</a> ចំណាំលីងនេះមិនត្រូវបានប្រើនៅរយះពេល ៣ នាទី ។​ ហើយនៅក្នុងមួយលីងអាចប្រើដើម្បីដាក់បានតែម្ដងគត់​​ ។</p>
    `;
      const result = await sendEmail(email, 'POS reset password mail!.', links);

      if (result === true) {
        await Users.updateRefreshToken(userid, token);
        res.send({
          message:
            'Link ការផ្លាស់ប្តូរពាក្យសម្ងាត់ត្រូវបានផ្ញើទៅគណនីអ៊ីមែលរបស់អ្នក...!',
          success: true,
        });
      } else {
        res.send({ message: 'កំហុស​មួយ​បាន​កើត​ឡើង...!', success: false });
      }
    } else {
      res.send({
        message:
          '​អ៊ីមែល​អ្នក​ប្រើ​ប្រាស់ដែល​បាន​ផ្ដល់មិន​មានក្នុងប្រព័ន្ធ...!',
        success: false,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.forgotpassword = async (req, res, next) => {
  try {
    const [user] = await Users.findByTokenAndId(
      req.params.token,
      req.params.id
    );
    //console.log(user);
    if (user.length > 0) {
      jwt.verify(
        req.params.token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decode) => {
          if (err) return res.send({ success: false });
          res.send({ success: true });
        }
      );
    } else {
      return res.send({ success: false });
    }
  } catch (err) {
    next(err);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    // verify token
    jwt.verify(
      req.params.token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decode) => {
        if (err)
          return res.send({
            success: false,
            message: 'ការផ្លាស់ប្តូរពាក្យសម្ងាត់ត្រូវបានហួសម៉ោងដែលបានកំណត់...!',
          });
      }
    );

    const [user] = await Users.findByTokenAndId(
      req.params.token,
      req.params.id
    );

    //console.log(user);
    if (user.length > 0) {
      const password = await bcrypt.hash(req.body.password, 10);

      const [result] = await Users.updatePassword(password, req.params.id);

      if (result.affectedRows !== 0) {
        await Users.updateRefreshToken(req.params.id, '');
        return res.send({
          message: 'ការផ្លាស់ប្តូរពាក្យសម្ងាត់ត្រូវបានជោគជ័យ...!',
          success: true,
        });
      }

      return res.send({
        message: 'ការផ្លាស់ប្តូរពាក្យសម្ងាត់ត្រូវបានបរាជ័យ...!',
        success: false,
      });
    } else {
      res.send({
        message:
          'ការផ្លាស់ប្តូរពាក្យសម្ងាត់ត្រូវបានផុតកំណត់កំណត់. សូម! ផ្ញើរសារម្តងទៀត...!',
        success: false,
      });
    }
  } catch (err) {
    //next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    //console.log(req.body);
    const newPassword = await bcrypt.hash(req.body.newPassword, 10);

    const [user] = await Users.findById(req.params.id);

    //console.log(user[0].password);
    const match = await bcrypt.compare(req.body.password, user[0].password);

    //console.log(match);
    if (!match) {
      return res.send({
        message: 'លេខសម្ងាត់របស់អ្នកមិនត្រូវ!',
        success: false,
      });
    } else {
      // check update duplicate
      const exist = await bcrypt.compare(
        req.body.newPassword,
        user[0].password
      );

      //console.log(exist);
      if (exist) {
        return res.send({
          message: 'ពាក្យសម្ងាត់មានម្ដងរួចហើយ!',
          success: false,
        });
      }

      const [re_update] = await Users.updatePassword(
        newPassword,
        req.params.id
      );
      if (re_update.affectedRows > 0) {
        return res.send({
          message: 'លេខសសម្ងាត់របស់អ្នកត្រូបានផ្លាស់ប្ដូរដោយជោគជ័យ!',
          success: true,
        });
      } else {
        return res.send({
          message: 'ការផ្លាស់ប្ដូរលេខសម្ងាត់ត្រូវបានបរាជ័យ!',
          success: false,
        });
      }
    }
  } catch (err) {
    next();
  }
};

module.exports.findById = async (req, res, next) => {
  try {
    const [user] = await Users.findById(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteById = async (req, res, next) => {
  try {
    const [result] = await Users.deleteById(req.params.id);
    if (result.affectedRows > 0) {
      res.send({
        message: 'អ្នកប្រើប្រាស់ត្រូវបានលុបដោយជោគជ័យ!',
        success: true,
      });
    } else {
      res.send({ message: 'ការលុបត្រូវបានបរាជ័យ!', success: false });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.updateOne = async (req, res, next) => {
  try {
    // console.log(req.body.username);
    if (req.body.username === '') {
      return res.send({
        message: 'សូម! បញ្ជូលឈ្មោះអ្នកប្រើប្រាស់!',
        success: false,
      });
    }

    const [user] = await Users.update_duplicate(
      req.params.id,
      req.body.username
    );

    if (user.length > 0) {
      return res.send({
        message: 'អ្នកប្រើប្រាស់មាននៅក្នុងប្រព័ន្ធរួចរាល់ហើយ!',
        success: false,
      });
    }

    const [email] = await Users.duplicate_email(req.params.id, req.body.email);
    if (email.length > 0) {
      return res.send({
        message: 'អុីមែលមាននៅក្នុងប្រព័ន្ធរួចហើយ!',
        success: false,
      });
    }

    console.log(email);

    const [result] = await Users.updateOne(
      req.body.username,
      req.body.email,
      req.body.phone_number,
      req.body.role_id,
      req.body.status_id,
      req.params.id
    );

    if (result.affectedRows > 0) {
      res.send({
        message: 'អ្នកប្រើប្រាស់ត្រូវបានកែប្រែដដោយជោគជ័យ!',
        success: true,
      });
    } else {
      res.send({ message: 'ការកែប្រែបរាជ័យ!', success: false });
    }
  } catch (err) {
    next(err);
  }
};

// change user password
module.exports.change_user_pwd = async (req, res, next) => {
  try {
    const { password, cpassword } = req.body;
    if (password === '') {
      return res.send({ message: 'សូម! បញ្ជូលពាក្យសម្ងាត់ថ្មី' });
    } else if (cpassword === '') {
      return res.send({ message: 'សូម! ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់' });
    } else if (password !== cpassword) {
      return res.send({ message: 'ពាក្យសម្ងាត់មិនផ្ទៀងផ្ទាត់' });
    }

    const newpwd = await bcrypt.hash(password, 10);
    const [result] = await Users.updatePassword(newpwd, req.params.id);

    if (result.affectedRows > 0) {
      res.send({
        message: 'ពាក្យសម្ងាត់ត្រូវបានផ្លាស់ប្ដូរដោយជោគជ័យ!',
        success: true,
      });
    } else {
      res.send({
        message: 'ពាក្យសម្ងាត់ផ្លាស់ប្ដូរបរាជោគជ័យ!',
        success: false,
      });
    }
  } catch (err) {
    next(err);
  }
};
