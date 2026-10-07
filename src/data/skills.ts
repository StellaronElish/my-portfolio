export type Skill = {
  name: string;
  icon?: string;
  mark?: string;
};

const brand = (name: string, slug: string, color: string): Skill => ({ name, icon: `https://cdn.simpleicons.org/${slug}/${color}` });
const concept = (name: string, mark: string): Skill => ({ name, mark });

export const skillGroups = [
  { title: "Programming Languages", items: [brand("PHP", "php", "777BB4"), brand("JavaScript", "javascript", "F7DF1E"), brand("TypeScript", "typescript", "3178C6"), brand("Go", "go", "00ADD8"), brand("Java", "openjdk", "ED8B00"), brand("C#", "csharp", "239120")] },
  { title: "Frontend", items: [brand("React.js", "react", "61DAFB"), brand("Vue.js", "vuedotjs", "4FC08D"), brand("Tailwind CSS", "tailwindcss", "06B6D4"), brand("Livewire", "livewire", "4E56A6"), brand("Alpine.js", "alpinejs", "0D597F"), concept("AJAX", "AJ"), brand("Vue Router", "vuerouter", "4FC08D"), brand("Vuex", "vuex", "4FC08D"), concept("React Hooks", "RH"), brand("jQuery", "jquery", "0769AD"), brand("Figma", "figma", "F24E1E")] },
  { title: "Backend", items: [brand("Laravel", "laravel", "FF2D20"), brand("CodeIgniter", "codeigniter", "EF4223"), brand("Node.js", "nodedotjs", "5FA04E"), concept("REST API", "API"), concept("ORM", "ORM"), concept("JSON", "{}"), concept("LDAP Auth", "LDAP"), concept("Authorization", "AUTH"), concept("JWT", "JWT")] },
  { title: "Database", items: [brand("MySQL", "mysql", "4479A1"), brand("PostgreSQL", "postgresql", "4169E1"), brand("SQL Server", "microsoftsqlserver", "CC2927"), brand("Oracle", "oracle", "F80000"), brand("Firebase", "firebase", "FFCA28")] },
  { title: "Tools & Deployment", items: [brand("Docker", "docker", "2496ED"), brand("Laragon", "laragon", "0E83CD"), brand("Git", "git", "F05032"), brand("GitHub", "github", "181717"), concept("Git Bash", "GB"), brand("SSH", "openssh", "F6821F"), brand("AWS", "amazonaws", "232F3E"), brand("S3", "amazons3", "569A31"), brand("Lambda", "awslambda", "FF9900"), brand("EC2", "amazonec2", "FF9900"), brand("RDS", "amazonrds", "527FFF"), brand("Trello", "trello", "0C66E4"), brand("Notion", "notion", "000000")] },
  { title: "Development Practices", items: [concept("Scrum", "SCR"), concept("Agile", "AG"), concept("Prototype", "PRO"), concept("AI-Assisted Development", "AI"), concept("Microservices", "MS"), concept("Component-based", "CB")] },
];
