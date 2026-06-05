import type { ApplicationPack, ExperienceCard, JobPost, LensFrame } from "@/types/skillproof";

export const experiences: ExperienceCard[] = [
  {
    id: "exp-grabfood",
    sourceType: "Coursework",
    title: "GrabFood Student Behaviour Project",
    institution: "Sunway University",
    date: "Apr 2026",
    messyWording: "Did group assignment about GrabFood.",
    rawDescription:
      "Worked with a team to survey students about food delivery habits, cleaned responses, found patterns, and presented marketing recommendations.",
    extractedSignals: ["Survey research", "Pattern finding", "Presentation", "Marketing recommendations"],
    evidenceNotes: ["120 student survey responses", "Google Forms and Sheets", "Final presentation deck"],
    tags: ["Research", "Data", "Presentation"]
  },
  {
    id: "exp-cafe",
    sourceType: "Part-time",
    title: "Weekend Cafe Service Crew",
    institution: "Bean & Butter Cafe",
    date: "Jan 2025 - Sep 2025",
    messyWording: "Worked part-time at cafe.",
    rawDescription:
      "Handled counter orders, customer requests, payment accuracy, and shift handovers during weekend rush periods.",
    extractedSignals: ["Customer handling", "Transaction accuracy", "Fast-paced service", "Shift communication"],
    evidenceNotes: ["Weekend peak shifts", "POS handling", "Customer complaint resolution"],
    tags: ["Customer", "Operations", "Communication"]
  },
  {
    id: "exp-event",
    sourceType: "Club",
    title: "Business Society Orientation Event",
    institution: "Student Business Society",
    date: "Feb 2026",
    messyWording: "Helped with club event.",
    rawDescription:
      "Coordinated vendor messages, volunteer briefing, room setup, registration flow, and post-event feedback for an orientation activity.",
    extractedSignals: ["Event logistics", "Vendor communication", "Volunteer coordination", "Feedback collection"],
    evidenceNotes: ["80 participant registration list", "Vendor chat screenshots", "Post-event feedback form"],
    tags: ["Leadership", "Coordination", "Communication"]
  }
];

export const jobs: JobPost[] = [
  {
    id: "marketing-intern",
    title: "Marketing Intern",
    company: "Loop Commerce",
    location: "Kuala Lumpur",
    description:
      "Support campaign research, customer insight work, social content planning, and clear presentation of recommendations.",
    requirements: [
      {
        id: "mkt-research",
        label: "Conduct customer or market research",
        category: "Research",
        sourcePhrase: "Assist with customer research and campaign insight."
      },
      {
        id: "mkt-present",
        label: "Present recommendations clearly",
        category: "Communication",
        sourcePhrase: "Summarise findings into practical recommendations."
      },
      {
        id: "mkt-coordinate",
        label: "Coordinate simple campaign tasks",
        category: "Coordination",
        sourcePhrase: "Help coordinate timelines, assets, and stakeholders."
      },
      {
        id: "mkt-content",
        label: "Create social media content",
        category: "Communication",
        sourcePhrase: "Support content drafting for campaign channels."
      }
    ]
  },
  {
    id: "business-analyst-intern",
    title: "Business Analyst Intern",
    company: "Axiata Digital Labs",
    location: "Kuala Lumpur",
    description:
      "Support requirement gathering, data interpretation, stakeholder documentation, and structured business recommendations.",
    requirements: [
      {
        id: "ba-data",
        label: "Interpret data and identify patterns",
        category: "Analysis",
        sourcePhrase: "Analyse data to surface trends and insights."
      },
      {
        id: "ba-requirements",
        label: "Document stakeholder requirements",
        category: "Communication",
        sourcePhrase: "Capture user needs and translate them into requirements."
      },
      {
        id: "ba-tools",
        label: "Use spreadsheets or reporting tools",
        category: "Analysis",
        sourcePhrase: "Comfortable using Excel, Sheets, or reporting tools."
      },
      {
        id: "ba-problem",
        label: "Structure ambiguous problems",
        category: "Problem solving",
        sourcePhrase: "Break down ambiguous business problems."
      }
    ]
  },
  {
    id: "management-trainee",
    title: "Management Trainee",
    company: "Sime Darby",
    location: "Petaling Jaya",
    description:
      "Rotational trainee role requiring communication, operational discipline, coordination, and structured problem solving.",
    requirements: [
      {
        id: "mt-coordinate",
        label: "Coordinate people and tasks",
        category: "Coordination",
        sourcePhrase: "Work with teams to coordinate daily priorities."
      },
      {
        id: "mt-customer",
        label: "Handle customer-facing situations",
        category: "Customer",
        sourcePhrase: "Demonstrate service mindset in customer-facing settings."
      },
      {
        id: "mt-communicate",
        label: "Communicate across stakeholders",
        category: "Communication",
        sourcePhrase: "Communicate clearly with different stakeholders."
      },
      {
        id: "mt-improve",
        label: "Suggest process improvements",
        category: "Problem solving",
        sourcePhrase: "Identify simple ways to improve process outcomes."
      }
    ]
  }
];

export const applicationPacks: Record<string, ApplicationPack> = {
  "marketing-intern": {
    jobId: "marketing-intern",
    proofBackedBullets: [
      {
        id: "bullet-mkt-1",
        text: "Conducted student survey research on food delivery behaviour and translated 120 responses into campaign recommendations.",
        sourceExperienceIds: ["exp-grabfood"],
        linkedRequirementIds: ["mkt-research", "mkt-present"]
      },
      {
        id: "bullet-mkt-2",
        text: "Coordinated vendor communication and registration flow for an 80-participant business society orientation event.",
        sourceExperienceIds: ["exp-event"],
        linkedRequirementIds: ["mkt-coordinate"]
      },
      {
        id: "bullet-mkt-3",
        text: "Handled customer requests during weekend rush periods while maintaining payment accuracy and clear shift handovers.",
        sourceExperienceIds: ["exp-cafe"],
        linkedRequirementIds: ["mkt-coordinate"]
      }
    ],
    skillProofCards: [
      {
        id: "proof-mkt-research",
        skillLabel: "Customer Research",
        sourceExperienceId: "exp-grabfood",
        proofDetail: "Surveyed 120 students, grouped food delivery behaviours, and presented recommendations for a coursework marketing brief.",
        generatedBulletId: "bullet-mkt-1",
        interviewQuestion: "How did you turn survey responses into a campaign recommendation?",
        tags: ["Survey", "Marketing", "Presentation"],
        status: "Direct match"
      },
      {
        id: "proof-mkt-coordination",
        skillLabel: "Event Coordination",
        sourceExperienceId: "exp-event",
        proofDetail: "Managed vendor messages, volunteer briefing, registration flow, and post-event feedback for 80 participants.",
        generatedBulletId: "bullet-mkt-2",
        interviewQuestion: "What changed in the event plan because of your coordination work?",
        tags: ["Stakeholders", "Logistics", "Feedback"],
        status: "Direct match"
      },
      {
        id: "proof-mkt-service",
        skillLabel: "Customer Handling",
        sourceExperienceId: "exp-cafe",
        proofDetail: "Handled counter orders, payments, and customer requests during high-volume weekend shifts.",
        generatedBulletId: "bullet-mkt-3",
        interviewQuestion: "Tell me about a customer request you had to resolve under time pressure.",
        tags: ["Service", "Accuracy", "Operations"],
        status: "Possible match"
      }
    ],
    claimProofChains: [
      {
        id: "chain-mkt-1",
        generatedBulletId: "bullet-mkt-1",
        sourceExperienceId: "exp-grabfood",
        linkedRequirementId: "mkt-research",
        proofDetail: "The source work includes survey design, response review, pattern grouping, and recommendation slides.",
        clarificationQuestion: "What were the top three behaviour patterns you found?",
        defenseQuestion: "How would you explain the recommendation if the interviewer challenges the sample size?"
      },
      {
        id: "chain-mkt-2",
        generatedBulletId: "bullet-mkt-2",
        sourceExperienceId: "exp-event",
        linkedRequirementId: "mkt-coordinate",
        proofDetail: "The student can show vendor messages, a registration list, and feedback form as evidence.",
        clarificationQuestion: "Which coordination task did you personally own from start to finish?",
        defenseQuestion: "What would have gone wrong if you had not coordinated that task?"
      }
    ],
    requirementCoverage: [
      {
        requirementId: "mkt-research",
        matchedExperienceIds: ["exp-grabfood"],
        status: "Direct match",
        explanation: "Coursework survey research directly maps to customer research."
      },
      {
        requirementId: "mkt-present",
        matchedExperienceIds: ["exp-grabfood"],
        status: "Direct match",
        explanation: "Final recommendations presentation supports communication of findings."
      },
      {
        requirementId: "mkt-coordinate",
        matchedExperienceIds: ["exp-event", "exp-cafe"],
        status: "Possible match",
        explanation: "Event and cafe work show coordination, but campaign-specific context is missing."
      },
      {
        requirementId: "mkt-content",
        matchedExperienceIds: [],
        status: "Needs detail",
        explanation: "No direct social content example is shown yet."
      }
    ],
    interrogationPrompts: [
      {
        experienceId: "exp-grabfood",
        prompts: [
          "What questions did you ask in the survey?",
          "How many responses were usable after cleaning?",
          "What recommendation did your team make from the data?"
        ]
      },
      {
        experienceId: "exp-event",
        prompts: [
          "What did you personally coordinate?",
          "How many participants, vendors, or volunteers were involved?",
          "What proof can you show: checklist, chat screenshots, or feedback results?"
        ]
      }
    ],
    beforeAfter: {
      weak: ["Did group assignment about GrabFood.", "Helped with club event.", "Worked part-time at cafe."],
      improved: [
        {
          id: "bullet-mkt-1",
          text: "Conducted student survey research on food delivery behaviour and translated 120 responses into campaign recommendations.",
          sourceExperienceIds: ["exp-grabfood"],
          linkedRequirementIds: ["mkt-research"]
        },
        {
          id: "bullet-mkt-2",
          text: "Coordinated vendor communication and registration flow for an 80-participant business society orientation event.",
          sourceExperienceIds: ["exp-event"],
          linkedRequirementIds: ["mkt-coordinate"]
        },
        {
          id: "bullet-mkt-3",
          text: "Handled customer requests during weekend rush periods while maintaining payment accuracy and clear shift handovers.",
          sourceExperienceIds: ["exp-cafe"],
          linkedRequirementIds: ["mkt-coordinate"]
        }
      ]
    },
    recruiterReview: {
      candidateSummary:
        "Fresh graduate profile with evidence for customer research, event coordination, and service communication. Some content creation evidence still needs detail.",
      bulletEvidenceLinks: [
        {
          bulletId: "bullet-mkt-1",
          sourceExperienceId: "exp-grabfood",
          requirementId: "mkt-research",
          reviewerNote: "Supported by survey volume, method, and recommendation output."
        },
        {
          bulletId: "bullet-mkt-2",
          sourceExperienceId: "exp-event",
          requirementId: "mkt-coordinate",
          reviewerNote: "Supported by event logistics and stakeholder communication."
        }
      ],
      signalSummary: {
        strongestSupportedSkills: ["Customer research", "Presentation", "Event coordination"],
        skillsNeedingClarification: ["Social content creation", "Campaign asset drafting"],
        experienceSourcesUsed: ["Coursework project", "Student society event", "Part-time service work"],
        requirementsCoveredByEvidence: ["Customer research", "Recommendations", "Coordination"]
      }
    }
  },
  "business-analyst-intern": {
    jobId: "business-analyst-intern",
    proofBackedBullets: [
      {
        id: "bullet-ba-1",
        text: "Analysed 120 student survey responses to identify food delivery behaviour patterns and present practical recommendations.",
        sourceExperienceIds: ["exp-grabfood"],
        linkedRequirementIds: ["ba-data", "ba-tools"]
      },
      {
        id: "bullet-ba-2",
        text: "Documented event registration issues and post-event feedback to improve the orientation flow for future sessions.",
        sourceExperienceIds: ["exp-event"],
        linkedRequirementIds: ["ba-requirements", "ba-problem"]
      }
    ],
    skillProofCards: [
      {
        id: "proof-ba-analysis",
        skillLabel: "Data Interpretation",
        sourceExperienceId: "exp-grabfood",
        proofDetail: "Cleaned survey responses in Sheets, grouped common behaviours, and linked patterns to recommendations.",
        generatedBulletId: "bullet-ba-1",
        interviewQuestion: "What pattern was most important, and how did you decide it mattered?",
        tags: ["Sheets", "Analysis", "Insight"],
        status: "Direct match"
      },
      {
        id: "proof-ba-requirements",
        skillLabel: "Requirement Documentation",
        sourceExperienceId: "exp-event",
        proofDetail: "Captured registration issues and feedback after the event, then converted them into setup improvements.",
        generatedBulletId: "bullet-ba-2",
        interviewQuestion: "How did feedback change the next event plan?",
        tags: ["Feedback", "Documentation", "Process"],
        status: "Possible match"
      }
    ],
    claimProofChains: [
      {
        id: "chain-ba-1",
        generatedBulletId: "bullet-ba-1",
        sourceExperienceId: "exp-grabfood",
        linkedRequirementId: "ba-data",
        proofDetail: "Survey responses, spreadsheet grouping, and recommendation deck make the analysis traceable.",
        clarificationQuestion: "What columns or categories did you use to group behaviour?",
        defenseQuestion: "How did you avoid overclaiming from a student survey sample?"
      }
    ],
    requirementCoverage: [
      {
        requirementId: "ba-data",
        matchedExperienceIds: ["exp-grabfood"],
        status: "Direct match",
        explanation: "Survey data analysis directly maps to pattern identification."
      },
      {
        requirementId: "ba-requirements",
        matchedExperienceIds: ["exp-event"],
        status: "Possible match",
        explanation: "Feedback documentation is adjacent to requirement gathering."
      },
      {
        requirementId: "ba-tools",
        matchedExperienceIds: ["exp-grabfood"],
        status: "Direct match",
        explanation: "Google Sheets was used for response cleanup and grouping."
      },
      {
        requirementId: "ba-problem",
        matchedExperienceIds: ["exp-event", "exp-cafe"],
        status: "Needs detail",
        explanation: "Problem-solving examples exist, but need clearer before/after outcomes."
      }
    ],
    interrogationPrompts: [
      {
        experienceId: "exp-grabfood",
        prompts: [
          "What fields did your survey collect?",
          "What cleaning or grouping did you perform in Sheets?",
          "What decision did the analysis support?"
        ]
      },
      {
        experienceId: "exp-cafe",
        prompts: [
          "What recurring customer issue did you notice?",
          "Did you suggest any process change?",
          "How did you know the handover or accuracy improved?"
        ]
      }
    ],
    beforeAfter: {
      weak: ["Did group assignment about GrabFood.", "Helped with club event."],
      improved: [
        {
          id: "bullet-ba-1",
          text: "Analysed 120 student survey responses to identify food delivery behaviour patterns and present practical recommendations.",
          sourceExperienceIds: ["exp-grabfood"],
          linkedRequirementIds: ["ba-data"]
        },
        {
          id: "bullet-ba-2",
          text: "Documented event registration issues and post-event feedback to improve the orientation flow for future sessions.",
          sourceExperienceIds: ["exp-event"],
          linkedRequirementIds: ["ba-requirements"]
        }
      ]
    },
    recruiterReview: {
      candidateSummary:
        "Evidence supports basic analysis and documentation habits. More detail is needed before claiming formal stakeholder requirement work.",
      bulletEvidenceLinks: [
        {
          bulletId: "bullet-ba-1",
          sourceExperienceId: "exp-grabfood",
          requirementId: "ba-data",
          reviewerNote: "Supported by spreadsheet analysis and presentation output."
        },
        {
          bulletId: "bullet-ba-2",
          sourceExperienceId: "exp-event",
          requirementId: "ba-requirements",
          reviewerNote: "Adjacent evidence; interviewer should ask how feedback was captured."
        }
      ],
      signalSummary: {
        strongestSupportedSkills: ["Spreadsheet analysis", "Pattern finding", "Recommendation writing"],
        skillsNeedingClarification: ["Stakeholder requirement gathering", "Formal reporting tools"],
        experienceSourcesUsed: ["Coursework project", "Student society event"],
        requirementsCoveredByEvidence: ["Data interpretation", "Spreadsheet use", "Structured problem solving"]
      }
    }
  },
  "management-trainee": {
    jobId: "management-trainee",
    proofBackedBullets: [
      {
        id: "bullet-mt-1",
        text: "Coordinated volunteers, vendors, registration flow, and participant feedback for an 80-person student orientation event.",
        sourceExperienceIds: ["exp-event"],
        linkedRequirementIds: ["mt-coordinate", "mt-communicate"]
      },
      {
        id: "bullet-mt-2",
        text: "Handled customer requests and shift handovers in a fast-paced cafe environment while maintaining transaction accuracy.",
        sourceExperienceIds: ["exp-cafe"],
        linkedRequirementIds: ["mt-customer", "mt-communicate"]
      }
    ],
    skillProofCards: [
      {
        id: "proof-mt-coordination",
        skillLabel: "People Coordination",
        sourceExperienceId: "exp-event",
        proofDetail: "Coordinated volunteer briefing, vendors, room setup, and participant registration for 80 attendees.",
        generatedBulletId: "bullet-mt-1",
        interviewQuestion: "How did you keep different people aligned before the event?",
        tags: ["People", "Logistics", "Planning"],
        status: "Direct match"
      },
      {
        id: "proof-mt-service",
        skillLabel: "Service Discipline",
        sourceExperienceId: "exp-cafe",
        proofDetail: "Handled rush-hour customer requests, payment accuracy, and handovers across weekend shifts.",
        generatedBulletId: "bullet-mt-2",
        interviewQuestion: "What did you do when service speed and accuracy were both under pressure?",
        tags: ["Customer", "Accuracy", "Shift handover"],
        status: "Direct match"
      }
    ],
    claimProofChains: [
      {
        id: "chain-mt-1",
        generatedBulletId: "bullet-mt-1",
        sourceExperienceId: "exp-event",
        linkedRequirementId: "mt-coordinate",
        proofDetail: "The source experience includes people, vendors, room setup, and registration workflow coordination.",
        clarificationQuestion: "How many volunteers did you brief, and what was your responsibility during the event?",
        defenseQuestion: "What trade-off did you make when something changed on the event day?"
      }
    ],
    requirementCoverage: [
      {
        requirementId: "mt-coordinate",
        matchedExperienceIds: ["exp-event"],
        status: "Direct match",
        explanation: "Event coordination directly demonstrates people and task coordination."
      },
      {
        requirementId: "mt-customer",
        matchedExperienceIds: ["exp-cafe"],
        status: "Direct match",
        explanation: "Cafe work shows customer-facing service discipline."
      },
      {
        requirementId: "mt-communicate",
        matchedExperienceIds: ["exp-event", "exp-cafe"],
        status: "Direct match",
        explanation: "Both event and cafe experiences require clear handovers and stakeholder messages."
      },
      {
        requirementId: "mt-improve",
        matchedExperienceIds: ["exp-event"],
        status: "Needs detail",
        explanation: "Post-event feedback suggests improvement, but the concrete change needs detail."
      }
    ],
    interrogationPrompts: [
      {
        experienceId: "exp-event",
        prompts: [
          "What changed because of your coordination?",
          "Who depended on your updates?",
          "What feedback did you collect after the event?"
        ]
      },
      {
        experienceId: "exp-cafe",
        prompts: [
          "What was the busiest shift you handled?",
          "How did you keep payment accuracy under pressure?",
          "What handover process did you follow?"
        ]
      }
    ],
    beforeAfter: {
      weak: ["Helped with club event.", "Worked part-time at cafe."],
      improved: [
        {
          id: "bullet-mt-1",
          text: "Coordinated volunteers, vendors, registration flow, and participant feedback for an 80-person student orientation event.",
          sourceExperienceIds: ["exp-event"],
          linkedRequirementIds: ["mt-coordinate"]
        },
        {
          id: "bullet-mt-2",
          text: "Handled customer requests and shift handovers in a fast-paced cafe environment while maintaining transaction accuracy.",
          sourceExperienceIds: ["exp-cafe"],
          linkedRequirementIds: ["mt-customer"]
        }
      ]
    },
    recruiterReview: {
      candidateSummary:
        "Evidence supports coordination, service discipline, and stakeholder communication. Process improvement claim should be clarified before interview.",
      bulletEvidenceLinks: [
        {
          bulletId: "bullet-mt-1",
          sourceExperienceId: "exp-event",
          requirementId: "mt-coordinate",
          reviewerNote: "Supported by event logistics, people coordination, and participant count."
        },
        {
          bulletId: "bullet-mt-2",
          sourceExperienceId: "exp-cafe",
          requirementId: "mt-customer",
          reviewerNote: "Supported by customer-facing service and transaction accuracy."
        }
      ],
      signalSummary: {
        strongestSupportedSkills: ["People coordination", "Customer-facing service", "Stakeholder communication"],
        skillsNeedingClarification: ["Process improvement", "Measured operational result"],
        experienceSourcesUsed: ["Student society event", "Part-time service work"],
        requirementsCoveredByEvidence: ["Coordination", "Customer handling", "Communication"]
      }
    }
  }
};

export const switchLensFrames: LensFrame[] = [
  {
    lensJobId: "marketing-intern",
    roleLabel: "Marketing Intern",
    sourceExperienceId: "exp-grabfood",
    reframedClaim:
      "Translated student food delivery survey insights into practical campaign recommendations for a coursework marketing brief.",
    emphasis: ["Customer insight", "Campaign recommendation", "Presentation"]
  },
  {
    lensJobId: "business-analyst-intern",
    roleLabel: "Business Analyst Intern",
    sourceExperienceId: "exp-grabfood",
    reframedClaim:
      "Grouped 120 survey responses to identify behaviour patterns and support a clearer recommendation process.",
    emphasis: ["Data interpretation", "Pattern finding", "Structured recommendation"]
  },
  {
    lensJobId: "management-trainee",
    roleLabel: "Management Trainee",
    sourceExperienceId: "exp-grabfood",
    reframedClaim:
      "Worked in a student project team to turn ambiguous survey findings into a structured presentation outcome.",
    emphasis: ["Team coordination", "Problem structuring", "Communication"]
  }
];
