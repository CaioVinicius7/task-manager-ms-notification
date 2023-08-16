import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";

import { MailController } from "./mail.controller";
import { SendMailUseCase } from "./use-cases/send-mail";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: "fidel14@ethereal.email",
          pass: "edBdQYQp4UDZKp1JRU"
        }
      }
    })
  ],
  controllers: [MailController],
  providers: [SendMailUseCase]
})
export class MailModule {}
