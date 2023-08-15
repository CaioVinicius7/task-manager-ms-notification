import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";

@Controller()
export class AppController {
  @EventPattern("task_notification")
  taskNotification(data: { message: string }) {
    console.log("New Message!");
    console.log(JSON.stringify(data, null, 2));
  }
}
