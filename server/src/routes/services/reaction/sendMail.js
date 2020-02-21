import nodemailer from "nodemailer";

export default async function sendMail(to, subject, content)
{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "area.teamgade@gmail.com",
            pass: "teamgade",
        }
    });
    let info = await transporter.sendMail({
        from: '"Team Gade" <area.teamgade@gmail.com>',
        to: to,
        subject: subject,
        text: content,
        html: `<p>${content}</p>`,
    });
    console.log(info);
}