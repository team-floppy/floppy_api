"use strict";
const nodemailer = require("nodemailer");

exports.sendMail = (userDetails, token) => {
  let tokenUrl = `http://localhost:8080/api/auth/verify/${token}`;
  return new Promise((resolve, reject) => {
    let transport = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: "vicman_854@zohomail.com",
        pass: "cQQV9ku2AeX4"
      }
    });

    transport.sendMail(
      {
        from: "vicman_854@zohomail.com",
        to: userDetails.email,
        subject: `Welcome  ${userDetails.name} please verify your account`,
        text: `Your Floppy verification code is: ${userDetails.verificationCode}`,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
        <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
        <meta content="width=device-width" name="viewport"/>
        <!--[if !mso]><!-->
        <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
        <!--<![endif]-->
        <title></title>
        <!--[if !mso]><!-->
        <!--<![endif]-->
        <style type="text/css">
            body {
              margin: 0;
              padding: 0;
            }
        
            table,
            td,
            tr {
              vertical-align: top;
              border-collapse: collapse;
            }
        
            * {
              line-height: inherit;
            }
        
            a[x-apple-data-detectors=true] {
              color: inherit !important;
              text-decoration: none !important;
            }
          </style>
        <style id="media-query" type="text/css">
            @media (max-width: 620px) {
        
              .block-grid,
              .col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
              }
        
              .block-grid {
                width: 100% !important;
              }
        
              .col {
                width: 100% !important;
              }
        
              .col>div {
                margin: 0 auto;
              }
        
              img.fullwidth,
              img.fullwidthOnMobile {
                max-width: 100% !important;
              }
        
              .no-stack .col {
                min-width: 0 !important;
                display: table-cell !important;
              }
        
              .no-stack.two-up .col {
                width: 50% !important;
              }
        
              .no-stack .col.num4 {
                width: 33% !important;
              }
        
              .no-stack .col.num8 {
                width: 66% !important;
              }
        
              .no-stack .col.num4 {
                width: 33% !important;
              }
        
              .no-stack .col.num3 {
                width: 25% !important;
              }
        
              .no-stack .col.num6 {
                width: 50% !important;
              }
        
              .no-stack .col.num9 {
                width: 75% !important;
              }
        
              .video-block {
                max-width: none !important;
              }
        
              .mobile_hide {
                min-height: 0px;
                max-height: 0px;
                max-width: 0px;
                display: none;
                overflow: hidden;
                font-size: 0px;
              }
        
              .desktop_hide {
                display: block !important;
                max-height: none !important;
              }
            }
          </style>
        </head>
        <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #B8CCE2;">
        <!--[if IE]><div class="ie-browser"><![endif]-->
        <table bgcolor="#B8CCE2" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #B8CCE2; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top;" valign="top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#B8CCE2"><![endif]-->
        <div style="background-color:transparent;">
        <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
        
        <div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
        <div style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
        <!--<![endif]-->
        <div class="mobile_hide">
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="40" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 40px; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td height="40" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </div>
        <!--<![endif]-->
        </div>
        </div>
        
        
        </div>
        </div>
        </div>
        <div style="background-color:transparent;">
        <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFA000;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFA000;">
        
        
        <div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
        <div style="width:100% !important;">
        
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 20px;">
        <!--<![endif]-->
        <div align="center" class="img-container center autowidth" style="padding-right: 0px;padding-left: 0px;">

          <a href="" style="outline:none" tabindex="-1" target="_blank"> <img align="center" alt="Image" border="0" class="center autowidth"  src="https://res.cloudinary.com/dtlceijb3/image/upload/v1572359270/floppy_assets/Layer_2.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; width: 100%; max-width: 74px; display: block;" title="Image" width="74"/></a>

        </div>
        
        </div>
        
        </div>
        </div>
        
        </div>
        </div>
        </div>
        <div style="background-color:transparent;">
        <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFFFFF;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
        
        <div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
        <div style="width:100% !important;">
        
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:35px; padding-bottom:40px; padding-right: 35px; padding-left: 35px;">
        
        <div style="color:#132F40;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="font-size: 12px; line-height: 1.2; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #132F40; mso-line-height-alt: 14px;">
        <p style="font-size: 22px; line-height: 1.2; mso-line-height-alt: 26px; margin: 0;"><span style="font-size: 22px;">Hello <strong>${userDetails.name}</strong>, registration completed</span></p>
        </div>
        </div>
        
        <div style="color:#555555;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.5;padding-top:5px;padding-right:10px;padding-bottom:30px;padding-left:10px;">
        <div style="font-size: 12px; line-height: 1.5; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #555555; mso-line-height-alt: 18px;">
        <p style="font-size: 14px; line-height: 1.5; mso-line-height-alt: 21px; margin: 0;">You are just one click away from streaming and having fun. Click on the button below to confirm your email and complete the registration.</p>
        </div>
        </div>
        <div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;">
        
        <a href="" style="outline:none" tabindex="-1" target="_blank"> <img align="center" alt="Image" border="0" class="center fixedwidth" src="https://res.cloudinary.com/dtlceijb3/image/upload/v1572353010/floppy_assets/illo.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; width: 100%; max-width: 530px; display: block;" title="Image" width="530"/></a>
        
        </div>
        
        <div style="color:#555555;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.2;padding-top:20px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="font-size: 12px; line-height: 1.2; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #555555; mso-line-height-alt: 14px;">
        <p style="font-size: 16px; line-height: 1.2; mso-line-height-alt: 19px; margin: 0;"><span style="font-size: 16px;">Thanks so much for joining our site! </span><br/><span style="font-size: 16px;">Your username is: <span style="color: #ffbf00; font-size: 16px;"><strong>${userDetails.username}</strong></span></span></p>
        </div>
        </div>
        
        </div>
        
        </div>
        </div>
        
        </div>
        </div>
        </div>
        <div style="background-image:url('https://res.cloudinary.com/dtlceijb3/image/upload/v1572353009/floppy_assets/bg_password.gif');background-position:top center;background-repeat:no-repeat;background-color:transparent;">
        <div class="block-grid no-stack" style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
        
        <div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
        <div style="width:100% !important;">
        
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:15px; padding-bottom:2px; padding-right: 35px; padding-left: 35px;">
        
        <div style="color:#555555;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.2;padding-top:15px;padding-right:10px;padding-bottom:15px;padding-left:10px;">
        <div style="font-size: 12px; line-height: 1.2; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #555555; mso-line-height-alt: 14px;">
        <p style="font-size: 16px; line-height: 1.2; mso-line-height-alt: 19px; margin: 0;"><span style="font-size: 16px;">To finish signing up and <span style="color: #132f40; font-size: 16px;"><strong>activate your account </strong></span></span></p>
        </div>
        </div>
        
        <div align="left" class="button-container" style="padding-top:5px;padding-right:10px;padding-bottom:35px;padding-left:10px;">
        
          <a href=${tokenUrl} style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #132F40; background-color: #FFA000; border-radius: 50px; -webkit-border-radius: 50px; -moz-border-radius: 50px; width: auto; width: auto; border-top: 1px solid #FFA000; border-right: 1px solid #FFA000; border-bottom: 1px solid #FFA000; border-left: 1px solid #FFA000; padding-top: 5px; padding-bottom: 5px; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;" target="_blank"><span style="padding-left:20px;padding-right:20px;font-size:15px;display:inline-block;">
        <span style="font-size: 16px; line-height: 2; mso-line-height-alt: 32px;"><span style="font-size: 15px; line-height: 30px;"><strong><span style="line-height: 30px; font-size: 15px;">ACTIVATE MY ACCOUNT &gt;</span></strong></span></span>
        </span></a>
        
        </div>
        
        </div>
        
        </div>
        </div>
        
        </div>
        </div>
        </div>
        <div style="background-color:transparent;">
        <div class="block-grid two-up no-stack" style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #212121;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:#212121;">
        
        <div class="col num6" style="max-width: 320px; min-width: 300px; display: table-cell; vertical-align: top; width: 300px;">
        <div style="width:100% !important;">
        
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:15px; padding-bottom:15px; padding-right: 0px; padding-left: 25px;">
        
        <div style="color:#F8F8F8;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="font-size: 12px; line-height: 1.2; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #F8F8F8; mso-line-height-alt: 14px;">
        <p style="font-size: 14px; line-height: 1.2; mso-line-height-alt: 17px; margin: 0;"><strong>Floppy</strong></p>
        <p style="font-size: 14px; line-height: 1.2; mso-line-height-alt: 17px; margin: 0;">Enugu Lifestyle and Goif City <br>(Centenary City) Kilometer 7, <br>Enugu/Port Harcourt Expressway Enugu, Nigeria</p>
        </div>
        </div>
        
        </div>
        
        </div>
        </div>
        
        <div class="col num6" style="max-width: 320px; min-width: 300px; display: table-cell; vertical-align: top; width: 300px;">
        <div style="width:100% !important;">
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
        <table cellpadding="0" cellspacing="0" class="social_icons" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top; padding-top: 20px; padding-right: 35px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table activate="activate" align="right" alignment="alignment" cellpadding="0" cellspacing="0" class="social_table" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;" to="to" valign="top">
        <tbody>
        <tr align="right" style="vertical-align: top; display: inline-block; text-align: right;" valign="top">
        <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 0px; padding-left: 10px;" valign="top"><a href="https://www.facebook.com/" target="_blank"><img alt="Facebook" height="32" src="https://res.cloudinary.com/dtlceijb3/image/upload/v1572353009/floppy_assets/facebook_2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="Facebook" width="32"/></a></td>
        <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 0px; padding-left: 10px;" valign="top"><a href="https://twitter.com/" target="_blank"><img alt="Twitter" height="32" src="https://res.cloudinary.com/dtlceijb3/image/upload/v1572353010/floppy_assets/twitter_2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="Twitter" width="32"/></a></td>
        <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 0px; padding-left: 10px;" valign="top"><a href="https://instagram.com/" target="_blank"><img alt="Instagram" height="32" src="https://res.cloudinary.com/dtlceijb3/image/upload/v1572353009/floppy_assets/instagram_2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="Instagram" width="32"/></a></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        
        </div>
        
        </div>
        </div>
        
        </div>
        </div>
        </div>
        <div style="background-color:transparent;">
        <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
        
        <div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
        <div style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="30" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 30px; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td height="30" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </body>
        </html>`
      },
      (error, info) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ message: info.messageId });
        }
      }
    );
  });
};
