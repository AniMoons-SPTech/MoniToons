// function enviarEmail(email) {

  const nodeMailer = require("nodemailer")

  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "animoons.contato@gmail.com",
      pass: "jmdq nbaa pfsq wyrz"
    }
  })

  layoutEmail = `
    <h1>Recuperação de senha</h1>
    <p>Olá, tudo bem?</p>
    <p>Recebemos uma solicitação de recuperação de senha para a sua conta.</p>
    <p>Para alterar sua senha, clique no botão abaixo:</p>
    <button href="http://localhost:3000/alterar-senha">Alterar senha</button>
  `;

  let mailOptions = {
    from: "Suporte AniMoons <animoons.contato@gmail.com>",
    to: "mat.587263@gmail.com",
    subject: "Recuperação de senha",
    text: "Email para recuperação de senha",
    html: layoutEmail
  }

  transporter.sendMail(mailOptions)
    .then((info) => {
      console.log(info)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      console.log("Email enviado com sucesso!")
    })
// }

// module.exports = {
//   enviarEmail
// }
