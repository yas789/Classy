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
  segmentationConfirmed?: boolean;
  markConfirmed: boolean;
  proposedMark: number;
  maxMark: number;
  overrideMark?: number;
  interpretedAnswer: string[];
  explanation: string[];
  paperSections?: MockPaperSection[];
  markingBreakdown?: MockMarkingDecision[];
};

export type MockPaperSection = {
  id: string;
  question: string;
  topic: string;
  page: number;
  confidence: number;
  bounds: string;
  text: string;
};

export type MockMarkingDecision = {
  id: string;
  question: string;
  awarded: number;
  max: number;
  evidenceSectionId: string;
  rubricPoint: string;
  rationale: string;
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
        segmentationConfirmed: false,
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
        paperSections: [
          {
            id: "q1-1",
            question: "Question 1.1",
            topic: "Cells and Organelles",
            page: 1,
            confidence: 98,
            bounds: "p1 x120 y184 w640 h92",
            text: "The nucleus contains genetic material (DNA) which controls cellular activities and codes for protein synthesis during transcription.",
          },
          {
            id: "q2-4",
            question: "Question 2.4",
            topic: "Enzymes and Substrates",
            page: 1,
            confidence: 96,
            bounds: "p1 x116 y344 w660 h106",
            text: "At higher temperatures, enzyme active sites denature due to excessive kinetic energy disrupting hydrogen bonds holding the tertiary structure.",
          },
          {
            id: "q3-2",
            question: "Question 3.2",
            topic: "Osmosis and Water Potential",
            page: 2,
            confidence: 94,
            bounds: "p2 x118 y130 w682 h156",
            text: "Water passes from a higher water potential to a lower water potential through tiny microscopic pores in the membrane. This process is passive because it does not require chemical energy (ATP) to take place down the concentration gradient.",
          },
          {
            id: "q4-1",
            question: "Question 4.1",
            topic: "Mitosis and Cell Cycle",
            page: 2,
            confidence: 97,
            bounds: "p2 x112 y408 w648 h96",
            text: "During metaphase, chromosomes align along the equatorial plate and spindle fibers attach firmly to the centromere regions.",
          },
          {
            id: "q5-3",
            question: "Question 5.3",
            topic: "Gas Exchange Surfaces",
            page: 3,
            confidence: 95,
            bounds: "p3 x124 y188 w654 h118",
            text: "Alveoli provide a large surface area with a very short diffusion distance, maintained by continuous capillary blood flow and ventilation.",
          },
          {
            id: "q6-2",
            question: "Question 6.2",
            topic: "Circulatory Systems",
            page: 3,
            confidence: 93,
            bounds: "p3 x120 y374 w650 h104",
            text: "Double circulation ensures high pressure is maintained to body tissues while lower pressure protects delicate pulmonary capillary networks.",
          },
          {
            id: "q7-1",
            question: "Question 7.1",
            topic: "Plant Transport",
            page: 4,
            confidence: 97,
            bounds: "p4 x118 y156 w664 h106",
            text: "Transpiration pull creates a negative pressure tension in xylem vessels, drawing continuous columns of water upwards from roots.",
          },
          {
            id: "q8-3",
            question: "Question 8.3",
            topic: "Immunology and Pathogens",
            page: 4,
            confidence: 96,
            bounds: "p4 x116 y346 w676 h124",
            text: "Phagocytes engulf pathogens into a vacuole called a phagosome, which then fuses with lysosomes containing hydrolytic enzymes to destroy invaders.",
          },
        ],
        markingBreakdown: [
          {
            id: "m1",
            question: "Question 1.1",
            awarded: 2,
            max: 2,
            evidenceSectionId: "q1-1",
            rubricPoint: "Identifies nucleus as containing DNA and controlling cell activity.",
            rationale: "The interpreted answer explicitly states DNA is in the nucleus and links it to cellular control.",
          },
          {
            id: "m2",
            question: "Question 2.4",
            awarded: 2,
            max: 3,
            evidenceSectionId: "q2-4",
            rubricPoint: "Explains denaturation using active site shape and bond disruption.",
            rationale: "The answer names denaturation and hydrogen bond disruption, but does not clearly state substrate fit is lost.",
          },
          {
            id: "m3",
            question: "Question 3.2",
            awarded: 3,
            max: 3,
            evidenceSectionId: "q3-2",
            rubricPoint: "Defines osmosis direction, membrane route, and passive movement.",
            rationale: "The response covers water potential direction, membrane passage, and lack of ATP requirement.",
          },
          {
            id: "m4",
            question: "Question 4.1",
            awarded: 2,
            max: 2,
            evidenceSectionId: "q4-1",
            rubricPoint: "Describes metaphase chromosome alignment and spindle attachment.",
            rationale: "Both required metaphase features are present in the segmented answer.",
          },
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
