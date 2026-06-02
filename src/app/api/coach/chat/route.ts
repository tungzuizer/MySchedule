import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, context } = await request.json();

    // Giả lập AI suy nghĩ
    await new Promise(resolve => setTimeout(resolve, 1000));

    let reply = "Tuyệt vời! Hãy tiếp tục phát huy tinh thần học tập nhé.";
    const lowercaseMessage = message.toLowerCase();
    
    if (lowercaseMessage.includes("trễ") || lowercaseMessage.includes("lỡ") || lowercaseMessage.includes("bỏ") || lowercaseMessage.includes("chậm") || lowercaseMessage.includes("mệt") || lowercaseMessage.includes("bận")) {
      reply = "Đừng quá lo lắng về việc lỡ bài học. Điều quan trọng nhất là duy trì sự đều đặn lâu dài. Bạn có muốn tôi điều chỉnh lịch học hoặc dời việc này sang ngày mai không?";
    } else if (lowercaseMessage.includes("xong") || lowercaseMessage.includes("hoàn thành") || lowercaseMessage.includes("đạt được") || lowercaseMessage.includes("tốt")) {
      reply = "Chúc mừng bạn đã hoàn thành nhiệm vụ này! Bạn đang tiến bộ rất tốt trên lộ trình của mình đó.";
    } else if (lowercaseMessage.includes("giúp") || lowercaseMessage.includes("kẹt") || lowercaseMessage.includes("hỏi") || lowercaseMessage.includes("không hiểu") || lowercaseMessage.includes("khó")) {
      reply = "Tôi luôn ở đây để hỗ trợ. Bạn đang gặp khó khăn ở phần nào? Tôi có thể chia nhỏ nội dung đó thành các bước dễ thực hiện hơn cho bạn.";
    }

    return NextResponse.json({ 
      success: true, 
      reply: reply 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Không thể xử lý tin nhắn" }, { status: 500 });
  }
}
