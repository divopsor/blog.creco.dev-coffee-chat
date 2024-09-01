"use client";

import { useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Spacing } from "../components/Spacing";

interface Applicant {
  githubId: string;
  queueNumber: number;
  totalCount: number;
  completedCount: number;
  inProgressCount: number;
  waitingCount:number;
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
  const searchParams = useSearchParams();
  const githubId = searchParams.get("githubId");
  const applicant = useApplicant(githubId);

  if (applicant === undefined) {
    return null;
  }

  if (applicant === null) {
    return (
      <div>
        <Title>Not Found</Title>
      </div>
    );
  }

  const { queueNumber, totalCount, completedCount, inProgressCount, waitingCount } = applicant;
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        height: "100%",
        color: "white",
      }}
    >
      <Spacing size={20} />

      <h1
        style={{
          fontSize: "48px",
          whiteSpace: "nowrap",
        }}
      >
        ☕ Coffee Chat 순서를 알려드려요!
      </h1>

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

      <Spacing size={20} />

      <div style={{ display: 'flex' }}>
        <table style={{ backgroundColor: 'white', color: 'black', borderRadius: '10px', padding: '10px' }}>
          <tr>
            <th style={{ width: '80px', textAlign: 'center'}}>유형</th>
            <th style={{ width: '80px', textAlign: 'center'}}>인원 수</th>
          </tr>
          <tr>
            <td style={{ width: '80px', textAlign: 'center'}}>총 신청자</td>
            <td style={{ width: '80px', textAlign: 'center'}}>{totalCount}명</td>
          </tr>
          <tr>
            <td style={{ width: '80px', textAlign: 'center'}}>대기 중</td>
            <td style={{ width: '80px', textAlign: 'center'}}>{waitingCount}명</td>
          </tr>
          <tr>
            <td style={{ width: '80px', textAlign: 'center'}}>진행 중</td>
            <td style={{ width: '80px', textAlign: 'center'}}>{inProgressCount}명</td>
          </tr>
          <tr>
            <td style={{ width: '80px', textAlign: 'center'}}>완료</td>
            <td style={{ width: '80px', textAlign: 'center'}}>{completedCount}명</td>
          </tr>
        </table>

        <code style={{
          fontSize: '1.2rem',
          padding: '0 20px',
        }}>
        현재 {githubId}님 께서는, 총 대기열 {totalCount}명 중 {queueNumber}번째 순서입니다.<br />
        순차적으로 연락드리고 있어 늦어지더라도 조금만 기다려주시면 감사하겠습니다. 😅<br />

        궁금하신 사항이 있다면 언제든지 nodejsdeveloper@kakao.com 로 연락주세요, 감사합니다!<br />

        연락처: nodejsdeveloper@kakao.com
        </code>
      </div>
    </div>
  );
}
