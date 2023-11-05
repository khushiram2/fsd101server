import nodemailer from 'nodemailer';


export async function sendMail(email, res,OTP) {
    try {

        
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'OTP',
                html: `Your One Time Password (OTP) is ${OTP}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Error occurred while sending OTP');
                } else {
                    console.log('Email sent:', info.response);
                }
            });

    } catch (error) {
        console.log(error);
        res.status(500).send('Some error occurred while sending the OTP');
    }
}
