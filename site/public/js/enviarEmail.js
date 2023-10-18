function enviarEmail(id, nome, email) {

  const layoutEmailJS = require("./modeloEmail/modeloEmail.js")
  const nodeMailer = require("nodemailer")

  const nome = nome  // Nome do usuário
  const link = "http://localhost:3333/troca_senha.html"  // Link para recuperação de senha

  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "animoons.contato@gmail.com",
      pass: "jmdq nbaa pfsq wyrz"
    }
  })

  let layoutEmail = layoutEmailJS.modeloEmail(nome, link)

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
}

enviarEmail("mat.587263@gmail.com");

module.exports = {
  enviarEmail
}
