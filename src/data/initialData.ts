import { Profile, Project, Certificate, Skill, Education, Achievement } from '../types/portfolio';

export const initialProfile: Profile = {
  id: 'primary-profile',
  fullName: 'Jayaraj A',
  headline: 'BCA Student | Data Analytics | Python | AI | Cyber Security',
  bio: 'Undergraduate student pursuing Bachelor of Computer Applications (BCA) at Shree Devi College of Information Science. Driven by a deep curiosity for Artificial Intelligence, Exploratory Data Analysis, Big Data architectures, and Cyber Security fundamentals. Focused on building pragmatic data pipelines, writing clean Python systems, and applying predictive models to solve real-world problems.',
  email: 'jayaraj.contact@gmail.com',
  phone: '+91 (Contact via Email / LinkedIn)',
  location: 'Karnataka, India',
  linkedinUrl: 'https://linkedin.com/in/jayaraj-a',
  githubUrl: 'https://github.com/jayaraj-a',
  resumeUrl: '/resume.pdf',
  avatarUrl: '/profile.jpg',
  updatedAt: new Date().toISOString(),
};

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Customer Churn & Behavioral Analytics System',
    description: 'Developed an end-to-end data analytics workflow analyzing transactional and engagement patterns using Python, Pandas, and Scikit-Learn. Evaluated churn indicators and visualized retention cohorts.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Matplotlib', 'Jupyter'],
    category: 'Data Analytics',
    githubUrl: 'https://github.com/jayaraj-a/customer-churn-analytics',
    liveDemoUrl: '',
    imageUrl: '',
    status: 'Completed',
    featured: true,
    date: '2024',
    displayOrder: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'proj-2',
    title: 'Network Traffic Anomaly & Intrusion Classifier',
    description: 'An academic cyber security research implementation exploring automated packet pattern classification to identify abnormal port scans and signature mismatches using feature extraction and supervised ML algorithms.',
    technologies: ['Python', 'Cyber Security', 'Scapy', 'Scikit-Learn', 'Network Analysis'],
    category: 'Cyber Security',
    githubUrl: 'https://github.com/jayaraj-a/network-anomaly-classifier',
    liveDemoUrl: '',
    imageUrl: '',
    status: 'Completed',
    featured: true,
    date: '2024',
    displayOrder: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'proj-3',
    title: 'Exploratory Big Data Processing Pipeline',
    description: 'Exploration project demonstrating distributed dataset partitioning and transformation principles for large-scale relational schemas, comparing performance characteristics between batch processing and SQL indexing.',
    technologies: ['Python', 'PostgreSQL', 'Big Data Concepts', 'SQL', 'Data Pipelines'],
    category: 'AI/ML',
    githubUrl: 'https://github.com/jayaraj-a/bigdata-processing-pipeline',
    liveDemoUrl: '',
    imageUrl: '',
    status: 'In Progress',
    featured: true,
    date: '2024',
    displayOrder: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'proj-4',
    title: 'Automated Vulnerability Scan Parser & Reporter',
    description: 'A modular security utility script that ingests target scan logs, identifies severity hierarchies according to CVSS standards, and outputs formatted executive summaries for audit reviews.',
    technologies: ['Python', 'JSON/XML Parsing', 'Cyber Security', 'CLI'],
    category: 'Cyber Security',
    githubUrl: 'https://github.com/jayaraj-a/vuln-scan-reporter',
    liveDemoUrl: '',
    imageUrl: '',
    status: 'Completed',
    featured: false,
    date: '2023',
    displayOrder: 4,
    createdAt: new Date().toISOString(),
  }
];

export const initialCertificates: Certificate[] = [
  {
    id: 'cert-1',
    name: 'Python for Data Science & Machine Learning',
    issuingOrganization: 'Verified Learning Partner',
    issueDate: '2024',
    credentialId: 'PY-DS-2024-JA',
    verificationUrl: 'https://example.com/verify/credential-id',
    fileUrl: '',
    displayOrder: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cert-2',
    name: 'Foundations of Cyber Security & Threat Analysis',
    issuingOrganization: 'Security Training Academy',
    issueDate: '2024',
    credentialId: 'SEC-FND-8891',
    verificationUrl: 'https://example.com/verify/credential-id',
    fileUrl: '',
    displayOrder: 2,
    createdAt: new Date().toISOString(),
  }
];

export const initialSkills: Skill[] = [
  // Programming
  { id: 'sk-1', name: 'Python', category: 'Programming', proficiencyLevel: 'Advanced', displayOrder: 1 },
  { id: 'sk-2', name: 'SQL / Relational DBs', category: 'Programming', proficiencyLevel: 'Intermediate', displayOrder: 2 },
  { id: 'sk-3', name: 'C / C++ Basics', category: 'Programming', proficiencyLevel: 'Intermediate', displayOrder: 3 },
  { id: 'sk-4', name: 'JavaScript', category: 'Programming', proficiencyLevel: 'Intermediate', displayOrder: 4 },

  // Data Analytics
  { id: 'sk-5', name: 'Pandas & NumPy', category: 'Data Analytics', proficiencyLevel: 'Advanced', displayOrder: 5 },
  { id: 'sk-6', name: 'Exploratory Data Analysis (EDA)', category: 'Data Analytics', proficiencyLevel: 'Advanced', displayOrder: 6 },
  { id: 'sk-7', name: 'Data Visualization (Matplotlib, Seaborn)', category: 'Data Analytics', proficiencyLevel: 'Intermediate', displayOrder: 7 },
  { id: 'sk-8', name: 'Power BI & Dashboards', category: 'Data Analytics', proficiencyLevel: 'Intermediate', displayOrder: 8 },

  // AI/ML
  { id: 'sk-9', name: 'Machine Learning Algorithms', category: 'AI/ML', proficiencyLevel: 'Intermediate', displayOrder: 9 },
  { id: 'sk-10', name: 'Scikit-Learn', category: 'AI/ML', proficiencyLevel: 'Intermediate', displayOrder: 10 },
  { id: 'sk-11', name: 'Big Data Fundamentals', category: 'AI/ML', proficiencyLevel: 'Intermediate', displayOrder: 11 },
  { id: 'sk-12', name: 'Model Evaluation & Metrics', category: 'AI/ML', proficiencyLevel: 'Intermediate', displayOrder: 12 },

  // Cyber Security
  { id: 'sk-13', name: 'Network Security Fundamentals', category: 'Cyber Security', proficiencyLevel: 'Intermediate', displayOrder: 13 },
  { id: 'sk-14', name: 'Vulnerability Assessment Basics', category: 'Cyber Security', proficiencyLevel: 'Intermediate', displayOrder: 14 },
  { id: 'sk-15', name: 'Linux Command Line & Security', category: 'Cyber Security', proficiencyLevel: 'Intermediate', displayOrder: 15 },
  { id: 'sk-16', name: 'Cryptography Concepts', category: 'Cyber Security', proficiencyLevel: 'Intermediate', displayOrder: 16 },

  // Web Development
  { id: 'sk-17', name: 'React & TypeScript', category: 'Web Development', proficiencyLevel: 'Intermediate', displayOrder: 17 },
  { id: 'sk-18', name: 'Tailwind CSS', category: 'Web Development', proficiencyLevel: 'Intermediate', displayOrder: 18 },
  { id: 'sk-19', name: 'RESTful API Integration', category: 'Web Development', proficiencyLevel: 'Intermediate', displayOrder: 19 },

  // Tools
  { id: 'sk-20', name: 'Git & GitHub', category: 'Tools', proficiencyLevel: 'Advanced', displayOrder: 20 },
  { id: 'sk-21', name: 'Jupyter Notebooks', category: 'Tools', proficiencyLevel: 'Advanced', displayOrder: 21 },
  { id: 'sk-22', name: 'VS Code & PyCharm', category: 'Tools', proficiencyLevel: 'Advanced', displayOrder: 22 },
  { id: 'sk-23', name: 'Supabase / Postman', category: 'Tools', proficiencyLevel: 'Intermediate', displayOrder: 23 },
];

export const initialEducation: Education[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Shree Devi College of Information Science',
    startYear: '2023',
    endYear: '2026',
    description: 'Comprehensive undergraduate curriculum in computer science, software engineering principles, algorithm design, relational database systems, and modern computing paradigms.',
    grade: 'Undergraduate Program',
    displayOrder: 1,
  },
  {
    id: 'edu-2',
    degree: 'Pre-University Course (Computer Science & Mathematics)',
    institution: 'Pre-University College',
    startYear: '2021',
    endYear: '2023',
    description: 'Rigorous foundation in mathematics, physics, and introductory programming fundamentals.',
    grade: 'Completed',
    displayOrder: 2,
  }
];

export const initialAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Department Academic Coding & Analytics Workshop',
    description: 'Participated in hands-on departmental analytics challenges focusing on rapid Python data parsing and predictive model building.',
    date: '2024',
    linkUrl: '',
    imageUrl: '',
    displayOrder: 1,
  },
  {
    id: 'ach-2',
    title: 'Technical Symposium Project Presentation',
    description: 'Presented a working prototype on machine learning methods for network anomaly detection during inter-college technical events.',
    date: '2024',
    linkUrl: '',
    imageUrl: '',
    displayOrder: 2,
  }
];
