import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "sipena",
    name: "SIPENA",
    label: "Digital Employee Management System",
    year: "Apr 2026 - Sep 2026",
    description:
      "A digital employee management system for attendance, leave, overtime, approvals, verification, notifications, and reporting.",
    problem:
      "Employee attendance, leave, overtime, and approval workflows required a centralized system with consistent business rules and role-based access.",
    solution:
      "A role-aware web application that centralizes employee operations, approval workflows, leave management, overtime processing, notifications, and reporting.",
    contribution:
      "Requirement analysis, system and database design, business logic implementation, authentication, role-based authorization, responsive UI development, testing, collaborative development, and deployment.",
    architecture:
      "Laravel application with Livewire-based reactive UI, Alpine.js interactions, and a MySQL relational data model.",
    stack: [
      "Laravel",
      "PHP",
      "Livewire",
      "Tailwind CSS",
      "Alpine.js",
      "Flowbite",
      "MySQL",
      "Websockets",
    ],
    github: "https://github.com/ramadhanprinadaa/sipena-yarsi",
    accent: "coral",
    team: "3 Developers",
    duration: "6 Months",
    database:
      "Users · Employees · Attendance · Leave · Overtime · Approvals · Notifications · Reports",
    challenges:
      "Maintaining consistent role permissions, approval states, and leave balances across multiple connected employee workflows.",
    learned:
      "How requirement analysis, business rules, database design, and clear workflow states contribute to building a reliable operational system.",
    process: [
      "Requirement analysis",
      "System design",
      "Business rules",
      "Implementation",
      "Testing",
      "Deployment",
    ],
    architectureNodes: [
      "Employees",
      "Attendance",
      "Leave",
      "Overtime",
      "Approval",
      "Database",
    ],
    contributions: [
      "Requirement analysis",
      "Database design",
      "Authentication",
      "Role-based authorization",
      "Business logic",
      "Testing & debugging",
      "Approval workflow",
      "Real-time data updates (Websockets)",
      "Responsive UI",
      "Deployment",
    ],
    screenshots: [
      "Login",
      "Dashboard",
      "Employee Management",
      "Attendance Dashboard",
      "Attendance Management",
      "Overtime Dashboard",
      "Overtime Management",
      "SPL Management",
      "Leave Dashboard",
      "Leave Management",
      "Notification",
      "Approval Workspace",
    ],
  },

  {
    slug: "dini-sehat-mental",
    name: "DINI Sehat Mental",
    label: "Work Stress Questionnaire Screening System",
    year: "Aug 2025 - Oct 2025",
    description:
      "A web-based questionnaire screening system that processes 109 questions across nine categories and generates stress-level results and recapitulation reports.",
    problem:
      "Processing a large questionnaire manually made validation, scoring, result calculation, and recapitulation difficult to manage consistently.",
    solution:
      "A structured questionnaire system with React-based interactions, TypeScript validation, Laravel backend services, authentication, and automated scoring and reporting.",
    contribution:
      "Database design, API development, authentication, authorization, React UI development, TypeScript implementation, state management, API integration, testing, and debugging.",
    architecture:
      "React and TypeScript client communicating with a Laravel backend through REST APIs.",
    stack: [
      "React.js",
      "TypeScript",
      "Laravel",
      "Tailwind CSS",
      "REST API",
      "MySQL",
    ],
    github: "https://github.com/StellaronElish/DINI-Sehat-Mental",
    accent: "sky",
    team: "3 Developers",
    duration: "3 Months",
    database:
      "Users · Questions · Categories · Answers · Results · Recapitulation",
    challenges:
      "Managing 109 questionnaire items across nine categories while keeping question validation, scoring logic, state management, and result calculation consistent.",
    learned:
      "How component-based UI development, state management, API integration, and structured validation can be combined to build a questionnaire-based application.",
    process: [
      "Problem analysis",
      "Questionnaire design",
      "Database design",
      "API implementation",
      "Testing",
      "Deployment",
    ],
    architectureNodes: [
      "Questionnaire",
      "Results",
      "Doctor",
      "Rest API",
      "Recapitulation",
      "Database",
    ],
    contributions: [
      "Requirement analysis",
      "Database design",
      "API development",
      "Authentication",
      "Authorization",
      "React UI",
      "TypeScript implementation",
      "State management",
      "API integration",
      "Testing & debugging",
    ],
    screenshots: [
      "Landing page",
      "Login",
      "Dashboard & Recapitulation",
      "Respondent form",
      "Questionnaire",
      "Result page",
      "Result page (2)",
    ],
  },

  {
    slug: "pentadosen",
    name: "PentaDosen",
    label: "Lecturer Research Management System",
    year: "Oct 2024 - Apr 2025",
    description:
      "A research management system for managing lecturer research proposals, progress reports, funding, outputs, and publications.",
    problem:
      "Research documentation required a structured platform where lecturers and administrators could manage research activities and related records.",
    solution:
      "A responsive research management platform with role-based access, structured research records, REST APIs, and centralized data management.",
    contribution:
      "Database design, REST API development, authentication, role-based authorization, responsive interface development, and Scrum-based collaboration.",
    architecture:
      "CodeIgniter 4 MVC application with REST API and MySQL relational data model.",
    stack: [
      "CodeIgniter 4",
      "PHP",
      "Tailwind CSS",
      "REST API",
      "MySQL",
    ],
    github: "https://github.com/TeamFortuna/PentaDosen",
    accent: "violet",
    team: "3 Developers",
    duration: "7 Months",
    database:
      "Users · Research · Proposals · Progress Reports · Funding · Outputs · Publications",
    challenges:
      "Designing structured research records and role-based workflows while keeping the API and application data consistent.",
    learned:
      "How MVC architecture, REST API design, relational databases, and Scrum collaboration can be applied to a multi-module information system.",
    process: [
      "Problem analysis",
      "Application development",
      "Database design",
      "REST API",
      "Testing",
      "Deployment",
    ],
    architectureNodes: [
      "Users",
      "Calendar",
      "Research Proposals",
      "HKI",
      "Publications",
      "Database",
    ],
    contributions: [
      "Database design",
      "REST API",
      "Bussiness logic",
      "Authentication",
      "Role-based authorization",
      "Responsive UI",
      "CRUD implementation",
      "Scrum collaboration",
    ],
    screenshots: [
      "Login",
      "Signup",
      "Dashboard & Recapitulation",
      "Calendar",
      "Schedule Management",
      "Research Proposal Dashboard",
      "Research Proposal Management",
      "Publications Dashboard",
      "Publications Management",
      "HKI Dashboard",
      "HKI Management",
      "Dark Mode",
    ],
  },

  {
    slug: "freemeal",
    name: "FreeMeal",
    label: "Food Distribution Management System",
    year: "Jan 2026 - May 2026",
    description:
      "A web application for managing meal distribution, schools, recipients, and feedback collection.",
    problem:
      "Distribution records and recipient feedback needed a centralized and traceable system.",
    solution:
      "A Laravel-based application with authentication, CRUD workflows, responsive interfaces, and production deployment.",
    contribution:
      "Database design, authentication, CRUD implementation, backend functionality, responsive UI development, deployment, and production configuration.",
    architecture:
      "Laravel monolithic application with a MySQL relational database and Apache deployment.",
    stack: [
      "Laravel",
      "PHP",
      "MySQL",
      "Tailwind CSS",
      "Apache",
    ],
    github: "#",
    accent: "amber",
    team: "Individual Project",
    duration: "5 Months",
    database:
      "Users · Schools · Recipients · Distribution · Feedback",
    challenges:
      "Designing a simple but traceable workflow for distribution records and feedback while preparing the application for production deployment.",
    learned:
      "How to develop and deploy a complete CRUD-based web application from database design through production configuration.",
    process: [
      "Problem analysis",
      "UI implementation",
      "Database design",
      "API implementation",
      "Testing",
      "Deployment",
    ],
    architectureNodes: [
      "Authentication",
      "Schools",
      "Recipients",
      "Distribution",
      "Feedback",
      "MySQL database",
    ],
    contributions: [
      "Database design",
      "Authentication",
      "Backend development",
      "CRUD operations",
      "Responsive UI",
      "Deployment",
      "Production configuration",
    ],
    screenshots: [
      "Landing page",
      "Login",
      "Dashboard",
      "Distribution management",
      "Recipient management",
      "Feedback",
    ],
  },
];