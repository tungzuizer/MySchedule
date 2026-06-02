import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { goal, experience, timeCommitment } = await request.json();

    // Giả lập API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const goalLabels: Record<string, string> = {
      leadership: "Lãnh đạo & Quản lý",
      teamwork: "Làm việc nhóm",
      community: "Kỹ năng cộng đồng",
      "ai-tech": "AI & Công nghệ",
      entrepreneurship: "Khởi nghiệp",
      communication: "Giao tiếp chuyên nghiệp",
      "product-management": "Quản lý Sản phẩm",
      "design-thinking": "Tư duy Thiết kế",
    };
    
    const expLabels: Record<string, string> = {
      Beginner: "Mới bắt đầu",
      Intermediate: "Trung cấp",
      Advanced: "Nâng cao",
    };

    const goalName = goalLabels[goal] || goal;
    const expName = expLabels[experience] || experience;

    const simulatedRoadmap = {
      title: `Lộ trình phát triển ${goalName}`,
      description: `Hành trình cá nhân hoá để thành thạo kỹ năng ${goalName} dựa trên trình độ ${expName} của bạn.`,
      phases: [
        {
          id: 1,
          title: "Giai đoạn 1: Nền tảng & Khái niệm cốt lõi",
          status: "in-progress",
          tasks: [
            { id: 101, title: `Giới thiệu cơ bản về ${goalName}`, type: "study", time: "60 phút" },
            { id: 102, title: "Thiết lập môi trường & Mục tiêu cá nhân", type: "task", time: "45 phút" },
            { id: 103, title: "Bài tập thực hành nền tảng đầu tiên", type: "task", time: "90 phút" }
          ]
        },
        {
          id: 2,
          title: "Giai đoạn 2: Ứng dụng thực tế & Nâng cao",
          status: "locked",
          tasks: [
            { id: 201, title: "Đi sâu vào các phương pháp cốt lõi", type: "study", time: "120 phút" },
            { id: 202, title: "Thực hiện dự án nhỏ giải quyết bài toán thực tế", type: "coaching", time: "180 phút" }
          ]
        }
      ]
    };

    return NextResponse.json({ success: true, roadmap: simulatedRoadmap });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Không thể tạo lộ trình" }, { status: 500 });
  }
}
