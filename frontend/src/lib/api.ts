import {
  getAssessmentById,
  getAssessmentsForClass,
  getClassById,
  getStudentById,
  mockAssessments,
  mockClasses,
  type MockAssessment,
  type MockClass,
  type MockStudent,
} from "@/features/mock/mockData";

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export async function listClasses(): Promise<MockClass[]> {
  return mockClasses;
}

export async function readClass(classId?: string): Promise<MockClass | undefined> {
  return getClassById(classId);
}

export async function listAssessments(): Promise<MockAssessment[]> {
  return mockAssessments;
}

export async function readAssessment(assessmentId?: string): Promise<MockAssessment | undefined> {
  return getAssessmentById(assessmentId);
}

export async function listAssessmentsForClass(classId?: string): Promise<MockAssessment[]> {
  return getAssessmentsForClass(classId);
}

export async function readStudent(studentId: string): Promise<MockStudent | undefined> {
  return getStudentById(studentId);
}

export async function requestJson<TResponse>(path: string, options: RequestInit = {}): Promise<TResponse> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: options.body === undefined ? options.headers : { "Content-Type": "application/json", ...options.headers },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<TResponse>;
}

export async function postJson<TResponse>(path: string, body?: unknown): Promise<TResponse> {
  return requestJson<TResponse>(path, {
    method: body === undefined ? "GET" : "POST",
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

export async function patchJson<TResponse>(path: string, body: unknown): Promise<TResponse> {
  return requestJson<TResponse>(path, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}
