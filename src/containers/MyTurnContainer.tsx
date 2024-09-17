"use client";

import { useSearchParams } from "next/navigation";
import { ReactNode, Suspense, useEffect, useState } from "react";
import { Spacing } from "../components/Spacing";

interface Applicant {
  githubId: string;
  queueNumber: number;
  totalCount: number;
  completedCount: number;
  inProgressCount: number;
  waitingCount: number;
  status: string;
}

function InfoButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button style={{ fontSize: "2rem" }} onClick={onClick}>
      {children}
    </button>
  );
}

function useApplicant(githubId?: string | null) {
  const [applicant, setApplicant] = useState<null | Applicant>();

  useEffect(() => {
    if (githubId == null || githubId === "") {
      setApplicant(null);
      return;
    }

    const fetchApplicant = async () => {
      const response = await fetch(
        `/api/blog-creco-dev/applicant?githubId=${githubId}`
      );
      const data = await response.json();

      if (data.message === "Not Found") {
        setApplicant(null);
        return;
      }

      setApplicant(data);
    };

    fetchApplicant();
  }, [githubId]);

  return applicant;
}

function Title({ children }: { children?: ReactNode }) {
  return <h1 style={{ margin: 0 }}>{children}</h1>;
}

// https://blog.creco.dev/api/blog-creco-dev/applicant?githubId=eunseo9808
export function MyTurnContainer() {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        height: "100%",
        color: "white",
        padding: "10px",
      }}
    >
      <Spacing size={20} />

      <span
        style={{
          fontSize: "48px",
          wordBreak: "keep-all",
        }}
      >
        ☕ Coffee Chat 순서를 알려드려요!
      </span>

      <Spacing size={20} />

      <Suspense>
        <Information />
      </Suspense>
    </div>
  );
}

function LoadingSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width="50"
      height="50"
      style={{
        background: "0 0",
        display: "block",
        shapeRendering: "auto",
        margin: "0 auto",
      }}
    >
      <g>
        <circle
          strokeDasharray="164.93361431346415 56.97787143782138"
          r="35"
          strokeWidth="10"
          stroke="#5bd4e1"
          fill="none"
          cy="50"
          cx="50"
        >
          <animateTransform
            keyTimes="0;1"
            values="0 50 50;360 50 50"
            dur="1s"
            repeatCount="indefinite"
            type="rotate"
            attributeName="transform"
          ></animateTransform>
        </circle>
        <g></g>
      </g>
    </svg>
  );
}
function Information() {
  const searchParams = useSearchParams();
  const githubId = searchParams.get("githubId");
  const applicant = useApplicant(githubId);
  const [inputedGitHubId, setGitHubId] = useState<string>();

  if (applicant === undefined) {
    return (
      <div>
        <LoadingSVG />
      </div>
    );
  }

  if (githubId == null) {
    return (
      <>
        <h2>
          <span>안녕하세요!</span>
        </h2>

        <p>GitHub 아이디를 입력해서 확인해보세요!</p>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <p
            style={{
              fontSize: "1.2rem",
              wordBreak: "keep-all",
            }}
          >
            <p>
              <input
                style={{
                  borderRadius: "4px",
                  border: "2px solid black",
                  padding: "4px",
                  outline: "none",
                  fontSize: "2rem",
                  marginRight: "8px",
                }}
                type="text"
                onChange={(e) => setGitHubId(e.target.value)}
              />
              <br />
              <br />
              <InfoButton
                onClick={() => {
                  if (inputedGitHubId === undefined || inputedGitHubId === "") {
                    alert("GitHub 아이디를 입력해주세요!");
                    return;
                  }

                  window.location.href = `/coffee-chat/my-turn?githubId=${inputedGitHubId}`;
                }}
              >
                보러가기
              </InfoButton>
            </p>

            <br />
            <span>
              궁금하신 사항이 있다면 언제든지 편하게 연락주세요, 감사합니다!
            </span>
            <br />
            <br />
            <span>이메일: nodejsdeveloper@kakao.com</span>
          </p>
        </div>
      </>
    );
  }

  if (applicant === null) {
    return (
      <div>
        <h1>{`Not Found`}</h1>
        <h2>{`"${githubId}"로 신청된 커피챗이 없거나, 아직 제출된 신청을 확인 중에 있어요! (조만간 자동화 예정입니다.)`}</h2>
        <h2>{`만약 신청하신 내역이 조회되지 않고 있다면, 조금 기다려주시거나 nodejsdeveloper@kakao.com 으로 연락주세요!`}</h2>
        <InfoButton
          onClick={() => {
            window.history.back();
          }}
        >
          돌아가기
        </InfoButton>
      </div>
    );
  }

  const {
    completedCount,
    inProgressCount,
    queueNumber,
    totalCount,
    waitingCount,
    status,
  } = applicant;

  if (status === "done") {
    return (
      <div>
        <h2>{`"${githubId}"님! 커피챗이 이미 진행되었습니다.`}</h2>
        <span>재신청하려면</span>
        <a href="https://blog.creco.dev/coffee-chat">
          https://blog.creco.dev/coffee-chat
        </a>
        <span>으로 이동해주세요.</span>
        <br />
        <br />
        <InfoButton
          onClick={() => {
            window.history.back();
          }}
        >
          돌아가기
        </InfoButton>
      </div>
    );
  }

  return (
    <>
      <h2>
        <span>안녕하세요, </span>
        <span>
          <img
            src="/coffee-chat/github-icon.png"
            width="24px"
            style={{ verticalAlign: "text-top" }}
          />
        </span>
        <span> {githubId}님!</span>
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <table
          style={{
            backgroundColor: "white",
            color: "black",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <tr>
            <th style={{ width: "80px", textAlign: "center" }}>유형</th>
            <th style={{ width: "80px", textAlign: "center" }}>인원 수</th>
          </tr>
          <tr>
            <td style={{ width: "80px", textAlign: "center" }}>총 신청자</td>
            <td style={{ width: "80px", textAlign: "center" }}>
              {totalCount}명
            </td>
          </tr>
          <tr>
            <td style={{ width: "80px", textAlign: "center" }}>대기 중</td>
            <td style={{ width: "80px", textAlign: "center" }}>
              {waitingCount}명
            </td>
          </tr>
          <tr>
            <td style={{ width: "80px", textAlign: "center" }}>진행 중</td>
            <td style={{ width: "80px", textAlign: "center" }}>
              {inProgressCount}명
            </td>
          </tr>
          <tr>
            <td style={{ width: "80px", textAlign: "center" }}>완료</td>
            <td style={{ width: "80px", textAlign: "center" }}>
              {completedCount}명
            </td>
          </tr>
        </table>

        <p
          style={{
            fontSize: "1.2rem",
            padding: "0 20px",
            wordBreak: "keep-all",
          }}
        >
          현재 {githubId}님께서는, 총 대기자 {totalCount}명 중 {queueNumber}{" "}
          번째 순서입니다.
          <br />
          <br />
          순차적으로 연락드리고 있어 늦어지더라도 조금만 기다려주시면
          감사하겠습니다. 😅
          <br />
          <br />
          다른 사람의 커피챗 일정 조율이 빠르게 진행된 경우,
          순서와 관계없이 진행되어 진행 중 여부가 올바르지 않을 수 있습니다.
          <br />
          최대한 빨리 답장 주시면 좋아요!
          <br />
          <br />
          궁금하신 사항이 있다면 언제든지 편하게 연락주세요, 감사합니다!
          <br />
          <br />
          이메일: nodejsdeveloper@kakao.com
        </p>
      </div>
    </>
  );
}
