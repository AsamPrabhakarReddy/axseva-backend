
const userModel = require('../Models/userModel.js');
const tokenModel = require('../Models/tokenModel.js');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
// const ApiError = require("../utils/ApiError.js");
const sendMail = require('../helpers/sendMail.js');


exports.register = async (req, res) => {
    try {
        const { fullname, email, jobtitle, phoneNumber, companyName, lookingFor, message } = req.body;

        // Validate required fields
        if (!fullname || !email) {
            return res.status(400).json({ error: "Required fields missing" });
        }

        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User already exists" });
        }
        // const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            fullname,
            email,
            jobtitle,
            phoneNumber,
            companyName,
            lookingFor,
            message
        });

        await newUser.save();

        // Generate a token for the user
        // const token = new tokenModel({
        //     userId: newUser._id,
        //     token: crypto.randomBytes(16).toString("hex")
        // });

        // await token.save();
        res.status(200).json({"message": "User registered successfully"});

    //   const link = `https://backend-syndeo.onrender.com/api/v1/confirm/${token.token}`;
      const link = "#"
      const transporter = nodemailer.createTransport({
        host: "mail.clouddatanetworks.com",
        port: 465,
        secure: true,
        auth: {
          user: "syndrome-noreply@clouddatanetworks.com",
          pass: "CDN@Syndeo@",
        },
      });
      var mailOptions = {
        from: "noreply-axseva@axseva.com",
        to: email,
        subject: "Welcome to AxSeva Application!!! 🎉 🎉. Thank you for registering with us",
        html: `<!DOCTYPE html>
      <html>
        <head>
          <style>
          body {
            font-family: Arial, sans-serif;
            height: 100%;
            width: 100%;
          }
    
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
      
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
      
            .header h1 {
              color: #333;
              font-size: 22px;
              font-weight: 600;
              text-align: center;
            }
      
            .content {
              margin-bottom: 30px;
            }
      
            .content p {
              margin: 0 0 10px;
              line-height: 1.5;
            }
      
            .content #para p {
              margin-top: 20px;
            }
      
            .content .button {
              text-align: center;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 20px;
              margin-bottom: 20px;
            }
      
            .content .button a {
              border-radius: 40px;
              padding-top: 16px;
              padding-bottom: 16px;
              padding-left: 100px;
              padding-right: 100px;
              background-color: #007ae1;
              text-decoration: none;
              color: white;
              font-weight: 600;
            }
      
            /* .footer {
              text-align: center;
            } */
      
            .footer p {
              color: #999;
              font-size: 14px;
              margin: 0;
              margin-top: 8px;
              margin-bottom: 8px;
            }
          </style>
        </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Verify your email address to complete registration</h1>
              </div>
              <div class="content">
                <p id="para">Greetings, <span style="font-weight: bold">${fullname}!</span></p>
                <p>
                  Thank you for your interest in joining AXSeva! To complete your
                  registration, we need you to verify your email address.
                </p>
                <p>
                  As part of our ongoing efforts to promote trust and protect your
                  security, we now require you to obtain an Identity Verification which
                  is done by verifying your email.
                </p>
                <div class="button">
                   <a href="${link}">Verify Email</a>
                </div>
              </div>
              <p>Thanks for helping to keep AXSeva secure!</p>
              <div class="footer">
                <p>Best regards,</p>
                <p>Team AXSeva</p>
              </div>
            </div>
          </body>
      </html>
        `,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.json({ status: false, message: "Error in sending mail" });
        } else {
          console.log("This is for the testing purposes");
          return res.status(201).json(newUser);
        }
      });
    } catch (error) {
      // next(error);
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
      // throw new ApiError(500, "Internal Server Error");
    }
  };
  