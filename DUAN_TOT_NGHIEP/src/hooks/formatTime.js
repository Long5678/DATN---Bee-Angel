import moment from "moment"
 // Định dạng thời gian gửi tin nhắn
 export const formatMessageTime = (createdAt) => {
      const now = moment();
      const messageTime = moment(createdAt);

      const difSeconds = now.diff(messageTime, "seconds");
      const diffMinutes = now.diff(messageTime, 'minutes');
      const diffHours = now.diff(messageTime, 'hours');
      const diffDays = now.diff(messageTime, 'days');
      if (difSeconds < 60) {
          return `vài giây`;
      } else if (diffMinutes < 60) {
          // Nếu tin nhắn được gửi trong vòng 60 phút
          return `${diffMinutes} phút`;
      } else if (diffHours < 24) {
          // Nếu tin nhắn được gửi trong vòng 24 giờ
          return `${diffHours} giờ`;
      } else if (diffDays === 1) {
          // Nếu tin nhắn được gửi hôm qua
          return 'Hôm qua';
      } else if (diffDays <= 7) {
          // Nếu tin nhắn được gửi trong vòng 1 tuần
          return messageTime.format('DD/MM');
      } else {
          // Nếu tin nhắn được gửi lâu hơn 1 tuần
          return messageTime.format('DD/MM');
      }
  };