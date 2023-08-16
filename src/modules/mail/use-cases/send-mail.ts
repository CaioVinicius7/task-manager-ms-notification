import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

import type { DataToSendEmail } from "../mail.controller";

@Injectable()
export class SendMailUseCase {
  constructor(private mailerService: MailerService) {}

  async execute(dataToSendEmail: DataToSendEmail) {
    if (!dataToSendEmail.users) {
      return;
    }

    const sendMailPromise = dataToSendEmail.users.map((user) => {
      this.mailerService.sendMail({
        to: user.email,
        from: "task.manager@email.com",
        subject: "Notificação de tarefa",
        html: `
            <body>
              <h1>Olá ${user.name}</h1>

              <span>Você tem uma tarefa para hoje!</span>
              <br />
              <span>Título: ${dataToSendEmail.title}</span>
              <br />
              <span>Descrição: ${dataToSendEmail.description}</span>
              <br />
              <span>Início: ${dataToSendEmail.startAt}</span>
              <br />
              <span>Fim: ${dataToSendEmail.endAt}</span>
            </body>
            `,
        text: `Olá ${user.name}! Você tem a atividade ${dataToSendEmail.title} que se inicia em ${dataToSendEmail.startAt} e finaliza ${dataToSendEmail.endAt}.`
      });
    });

    Promise.all(sendMailPromise);
  }
}
