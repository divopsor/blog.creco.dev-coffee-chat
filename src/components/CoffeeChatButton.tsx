'use client';

export function CoffeeChatButton() {
  return (
    <button
      style={{
        backgroundColor: "#333",
        color: "#fff",
        width: "224px",
        padding: "14px 28px",
        borderRadius: "45px",
        border: "none",
        cursor: "pointer",
        fontSize: "24px",
        height: "60px",
      }}
      onClick={() => {
        // window.open(
        //   "https://forms.gle/zNty1mVJUAxrq81UA",
        //   "_blank"
        // );
      }}
    >
      커피챗 신청하기
    </button>
  )
}