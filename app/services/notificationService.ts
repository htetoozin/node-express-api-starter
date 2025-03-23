import axios from "axios";
import { oneSignal } from "../config/app";

export const sendNoti = async (
  title: string,
  message: string,
  userIds: string[]
) => {
  try {
    const response = await axios.post(
      "https://onesignal.com/api/v1/notifications",
      {
        app_id: oneSignal.appId,
        include_external_user_ids: userIds,
        headings: {
          en: title,
        },
        contents: {
          en: message,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${oneSignal.appToken}`,
        },
      }
    );

    console.log("Notification sent successfully:", response.data);
  } catch (error: any) {
    console.error(
      "Error one Signal push noti:",
      error.response ? error.response.data : error.message
    );
  }
};
