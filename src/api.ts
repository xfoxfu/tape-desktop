import { requestGet, requestPost } from "./tauri";
import db from "./storage";
import useSWR, { Fetcher } from "swr";
import useSWRInfinite from "swr/infinite";

const API_BASE = "http://apiv4.tapechat.net/";

export interface ApiResult<T = unknown> {
  code: number;
  message: string;
  content: T;
}

export const apiGet = async <T = unknown>(
  url: string,
  params: Record<string, string | number>
): Promise<T> => {
  return await requestGet<T>(
    new URL(url, new URL(API_BASE)).toString(),
    params,
    db.data?.peerId ?? "",
    db.data?.accessToken
  );
};

export const apiPost = async <T = unknown>(
  url: string,
  params: Record<string, string | number>
): Promise<T> => {
  return await requestPost<T>(
    new URL(url, new URL(API_BASE)).toString(),
    params,
    db.data?.peerId ?? "",
    db.data?.accessToken
  );
};

const questionListFetcher: Fetcher = async (url: string) => {
  const u = new URL(url, "http://apiv4.tapechat.net/");
  let source = u.searchParams.get("source") ?? "unanswered";
  if (source === "unanswered") {
    source = "unAnswer";
  } else if (source === "answered") {
    source = "answer";
  }
  let page = Number.parseInt(u.searchParams.get("page") ?? "1");
  let res = await apiPost<any>("/question/questionList", {
    source: source,
    pageSize: 15,
    lastTimeStamp: Math.round(Date.now() / 1000),
    page: page,
  });
  return res;
};

export const useQuestions = (source: "unanswered" | "answered") => {
  const { data, error } = useSWR<any>(
    `/question/questionList?source=${source}`,
    questionListFetcher
  );

  return {
    questions: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useQuestionsInfinite = (source: "unanswered" | "answered") => {
  const { data, error, size, setSize } = useSWRInfinite<any>((size, prev) => {
    if (prev && !prev.nextPageUrl) return null; // reached the end
    return `/question/questionList?source=${source}&page=${size + 1}`;
  }, questionListFetcher);

  return {
    pages: data,
    isLoading: !error && !data,
    isError: error,
    size,
    setSize,
  };
};

const questionFetcher: Fetcher = async (url: string) => {
  let res = await apiGet<any>(url, {});
  return res;
};

export const useQuestion = (vc: string) => {
  const { data, error } = useSWR<any>(
    `/question/questionDetailByVC/${vc}`,
    questionFetcher
  );
  return {
    question: data,
    isLoading: !error && !data,
    isError: error,
  };
};
