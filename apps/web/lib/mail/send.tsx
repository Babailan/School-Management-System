import nodemailer from "nodemailer";

export const sendEmail = async (
  text: string,
  subject: string,
  html: string
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "babailanxx@gmail.com",
      pass: "susu xaqg oqnv jjcg",
    },
  });

  // Send the email
  await transporter.sendMail({
    from: "babailanxx@gmail.com",
    to: "babailan.ronnel.dilao@gmail.com",
    text,
    subject,
    html,
  });
};
