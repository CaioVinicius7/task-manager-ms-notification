import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { SendMailUseCase } from "./use-cases/send-mail";

export interface DataToSendEmail {
  title: string;
  description: string;
  startAt: Date;
  endAt: Date;
  priority: "low" | "medium" | "high";
  status: "todo" | "doing" | "done";
  users: {
    name: string;
    email: string;
  }[];
}

@Controller()
export class MailController {
  constructor(private readonly sendMailUseCase: SendMailUseCase) {}

  @MessagePattern("tp_task_notification")
  async taskNotification(dataToSendEmail: DataToSendEmail) {
    return this.sendMailUseCase.execute(dataToSendEmail);
  }
}
