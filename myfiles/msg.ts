
import { MessagesMessageType } from "primereact/messages";

  const accountMessage: MessagesMessageType = [
    {
      severity: "warn",
      summary: " ",
      detail: "Account Changed",
      sticky: false,
      life: 30000,
    },
  ];

  const chainMessage: MessagesMessageType = [
    {
      severity: "info",
      summary: " ",
      detail: "Chain Changed",
      sticky: false,
      life: 30000,
    },
  ];
  
  const balanceMessage: MessagesMessageType = [
    {
      severity: "error",
      summary: " ",
      detail: "Error: Request rejected or insufficient funds",
      sticky: false,
      life: 30000,
    },
  ];
  
export {chainMessage,accountMessage,balanceMessage};
