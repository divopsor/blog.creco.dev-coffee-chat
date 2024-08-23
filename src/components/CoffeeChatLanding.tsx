import { Spacing } from "@divops-packages/blog-creco-dev";
import React from "react";

export const CoffeeChatLanding: React.FC = () => {
  return (
    <div
      style={{
        wordBreak: "keep-all",
        fontFamily: "Noto Sans",
      }}
    >
      <Spacing size={30} />

      <h1
        style={{
          fontSize: "48px",
          color: "#eee",
          marginTop: "10px",
          whiteSpace: "nowrap",
        }}
      >
        ☕ Coffee Chat
      </h1>

      <Spacing size={30} />

      <div
        style={{
          margin: "0 auto",
          maxWidth: "800px",
        }}
      >
        <section
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            wordBreak: "keep-all",
          }}
        >
          <img
            src="https://divopsor.github.io/blog-images/profile-20240823.jpg"
            alt="Profile"
            style={{
              height: "270px",
              borderRadius: "20px",
              objectFit: "contain",
              boxShadow:
                "rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.19) 0px 2px 5px 0px",
              aspectRatio: "13 / 15",
            }}
          />
          <div style={{ textAlign: "center" }}>
            <h2
              style={{ fontSize: "38px", color: "#ddd", marginBottom: "10px" }}
            >
              <a
                style={{ color: "#ddd" }}
                href="https://2024.feconf.kr/"
                target="_blank"
              >
                FEConf 2024
              </a>
            </h2>
            <p
              style={{
                fontSize: "24px",
                color: "#ccc",
                marginBottom: "5px",
                whiteSpace: "pre",
              }}
            >
              {'"7가지 플랫폼 서버로\n프론트엔드 버프 마법 걷기"'}
            </p>
            <p style={{ fontSize: "24px", color: "#555" }}>
              <span
                style={{
                  color: "#3182f6",
                  fontWeight: "bold",
                }}
              >
                @TossTeam{" "}
              </span>
              <span
                style={{
                  color: "#eee",
                  fontWeight: "bold",
                }}
              >
                정석호
              </span>
            </p>
          </div>
        </section>
      </div>

      <Spacing size={40} />

      <button
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "14px 28px",
          borderRadius: "16px",
          border: "none",
          cursor: "pointer",
          fontSize: "24px",
        }}
      >
        커피챗 신청하기
      </button>

      <Spacing size={20} />

      <footer
        style={{
          padding: "12px",
          display: "flex",
          justifyContent: "center",
          width: "200px",
          gap: "30px",
          margin: "0 auto",
          borderRadius: "45px",
          backdropFilter: "blur(30px)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <a
          href="https://github.com/CreatiCoding"
          style={{ display: "flex" }}
          target="_blank"
        >
          <img
            width="36px"
            src="https://divopsor.github.io/blog-images/github-icon.png"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/seokho-jeong-8815b7157/"
          style={{ display: "flex" }}
          target="_blank"
        >
          <img
            width="36px"
            src="https://divopsor.github.io/blog-images/linkedin-icon.png"
          />
        </a>
      </footer>
    </div>
  );
};
