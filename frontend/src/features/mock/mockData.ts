export type ReviewStatus = "Complete" | "In review" | "Ready to mark";

export type MockClass = {
  id: string;
  name: string;
  subject: string;
  year: string;
  students: number;
  institution: string;
};

export type MockStudent = {
  id: string;
  name: string;
  candidateNumber: string;
};

export type MockAnswer = {
  id: string;
  studentId: string;
  segmentationConfidence: number;
  interpretationConfirmed: boolean;
  markConfirmed: boolean;
  proposedMark: number;
  maxMark: number;
  overrideMark?: number;
  interpretedAnswer: string[];
  explanation: string[];
};

export type MockAssessment = {
  id: string;
  classId: string;
  title: string;
  subject: string;
  status: ReviewStatus;
  due: string;
  totalMarks: number;
  questions: number;
  answersMarked: number;
  needsReview: number;
  averageConfidence: number;
  question: string;
  markScheme: string[];
  answers: MockAnswer[];
};

export const mockTeacher = {
  name: "Maya Thompson",
  initials: "MT",
  institution: "Northbridge Academy",
  role: "Lead Examiner",
};

export const mockClasses: MockClass[] = [
  {
    id: "year-10-chemistry",
    name: "Year 10 Chemistry",
    subject: "Chemistry",
    year: "Year 10",
    students: 32,
    institution: "Northbridge Academy",
  },
  {
    id: "year-9-physics",
    name: "Year 9 Physics",
    subject: "Physics",
    year: "Year 9",
    students: 28,
    institution: "Northbridge Academy",
  },
  {
    id: "year-12-chemistry",
    name: "Year 12 Chemistry",
    subject: "Chemistry",
    year: "Year 12",
    students: 24,
    institution: "Northbridge Academy",
  },
];

export const mockStudents: MockStudent[] = [
  { id: "student-1", name: "Liam Vance", candidateNumber: "8042" },
  { id: "student-2", name: "Aisha Rahman", candidateNumber: "8051" },
  { id: "student-3", name: "Noah Clarke", candidateNumber: "8060" },
  { id: "student-4", name: "Sofia Bennett", candidateNumber: "8074" },
];

export const mockAssessments: MockAssessment[] = [
  {
    id: "rates-reaction-topic-test",
    classId: "year-10-chemistry",
    title: "Rates of Reaction Topic Test",
    subject: "Chemistry",
    status: "In review",
    due: "Due tomorrow",
    totalMarks: 60,
    questions: 8,
    answersMarked: 184,
    needsReview: 18,
    averageConfidence: 94,
    question: "Explain why increasing the temperature increases the rate of reaction.",
    markScheme: [
      "Particles have more kinetic energy.",
      "Particles collide more frequently.",
      "A greater proportion of collisions have energy greater than or equal to activation energy.",
    ],
    answers: [
      {
        id: "answer-1",
        studentId: "student-1",
        segmentationConfidence: 98,
        interpretationConfirmed: false,
        markConfirmed: false,
        proposedMark: 3,
        maxMark: 3,
        interpretedAnswer: [
          "[1] When the temperature is higher, particles move faster and have more kinetic energy.",
          "[2] They collide more often because they are moving around more quickly.",
          "[3] More collisions have enough energy to react successfully.",
        ],
        explanation: [
          "Reference [1] matches the kinetic energy marking point.",
          "Reference [2] matches the collision frequency marking point.",
          "Reference [3] matches the activation energy marking point.",
        ],
      },
      {
        id: "answer-2",
        studentId: "student-2",
        segmentationConfidence: 91,
        interpretationConfirmed: false,
        markConfirmed: false,
        proposedMark: 2,
        maxMark: 3,
        interpretedAnswer: [
          "[1] Heating makes particles move faster.",
          "[2] This means more collisions happen in the same time.",
          "[3] The answer does not clearly mention activation energy.",
        ],
        explanation: [
          "Reference [1] earns the kinetic energy mark.",
          "Reference [2] earns the collision frequency mark.",
          "Reference [3] identifies a missing activation energy point, so no third mark is awarded.",
        ],
      },
      {
        id: "answer-3",
        studentId: "student-3",
        segmentationConfidence: 86,
        interpretationConfirmed: false,
        markConfirmed: false,
        proposedMark: 1,
        maxMark: 3,
        interpretedAnswer: [
          "[1] The reaction gets faster because heat gives the chemicals energy.",
          "[2] The answer is unclear about collisions and activation energy.",
        ],
        explanation: [
          "Reference [1] partially matches the kinetic energy point.",
          "Reference [2] does not provide enough evidence for collision frequency or activation energy marks.",
        ],
      },
      {
        id: "answer-4",
        studentId: "student-4",
        segmentationConfidence: 96,
        interpretationConfirmed: true,
        markConfirmed: true,
        proposedMark: 3,
        maxMark: 3,
        interpretedAnswer: [
          "[1] Particles gain kinetic energy when temperature increases.",
          "[2] They collide more frequently.",
          "[3] More particles reach activation energy, so more collisions are successful.",
        ],
        explanation: [
          "Reference [1] satisfies mark point 1.",
          "Reference [2] satisfies mark point 2.",
          "Reference [3] satisfies mark point 3.",
        ],
      },
    ],
  },
  {
    id: "forces-and-motion",
    classId: "year-9-physics",
    title: "Forces and Motion",
    subject: "Physics",
    status: "Complete",
    due: "Completed",
    totalMarks: 45,
    questions: 6,
    answersMarked: 168,
    needsReview: 0,
    averageConfidence: 97,
    question: "Explain how resultant force affects acceleration.",
    markScheme: ["Resultant force causes acceleration.", "Greater force produces greater acceleration.", "Mass affects acceleration."],
    answers: [],
  },
  {
    id: "organic-chemistry-quiz",
    classId: "year-12-chemistry",
    title: "Organic Chemistry Quiz",
    subject: "Chemistry",
    status: "Ready to mark",
    due: "Due Friday",
    totalMarks: 30,
    questions: 5,
    answersMarked: 72,
    needsReview: 5,
    averageConfidence: 89,
    question: "Describe the mechanism for electrophilic addition.",
    markScheme: ["Correct curly arrows.", "Carbocation intermediate shown.", "Nucleophile attack shown."],
    answers: [],
  },
];

export function getClassById(classId?: string) {
  return mockClasses.find((classItem) => classItem.id === classId);
}

export function getAssessmentById(assessmentId?: string) {
  return mockAssessments.find((assessment) => assessment.id === assessmentId);
}

export function getAssessmentsForClass(classId?: string) {
  return mockAssessments.filter((assessment) => assessment.classId === classId);
}

export function getStudentById(studentId: string) {
  return mockStudents.find((student) => student.id === studentId);
}
