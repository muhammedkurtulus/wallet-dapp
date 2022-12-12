
import { MessagesMessageType } from "primereact/messages";

  const accountMessage: MessagesMessageType = [
    {
      severity: "warn",
      summary: " ",
      detail: "Account Changed",
      sticky: true,
    },
  ];

  const chainMessage: MessagesMessageType = [
    {
      severity: "info",
      summary: " ",
      detail: "Chain Changed",
      sticky: true,
    },
  ];
  
  const balanceMessage: MessagesMessageType = [
    {
      severity: "error",
      summary: " ",
      detail: "Error: Request rejected or insufficient funds",
      sticky: true,
    },
  ];
  
export {chainMessage,accountMessage,balanceMessage};
