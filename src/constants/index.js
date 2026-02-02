// Portfolio constants - All data sourced from Harsh_Resume.pdf

export const personalInfo = {
    name: "Harsh Anilkumar Ramani",
    firstName: "Harsh Ramani",
    location: "Chicago, IL",
    phone: "+1 469-316-1500",
    email: "harshramani76@gmail.com",
    headline: "Software Engineer",
    tagline: "Building exceptional digital experiences with modern web technologies",
    bio: "I'm a passionate software engineer specializing in building scalable web applications with React, Node.js, and cloud technologies. Currently pursuing my Master's in Computer Science at Stony Brook University, I bring experience from building real-time systems, LMS platforms, and telemedicine applications.",
};

export const navLinks = [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "experience", label: "Experience", href: "#experience" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "contact", label: "Contact", href: "#contact" },
];

export const socialLinks = [
    {
        id: "linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/ramani-harsh/",
        icon: "FaLinkedin",
    },
    {
        id: "github",
        label: "GitHub",
        url: "https://github.com/harshramani00",
        icon: "FaGithub",
    },

    {
        id: "email",
        label: "Email",
        url: "mailto:harshramani76@gmail.com",
        icon: "FaEnvelope",
    },
];

export const education = [
    {
        degree: "Master of Science in Computer Science",
        school: "Stony Brook University",
        location: "New York, USA",
        period: "August 2023 – May 2025",
        coursework: ["Theory of Database Systems", "Data Science Fundamentals", "Machine Learning"],
    },
    {
        degree: "Bachelor of Technology in Information Technology",
        school: "University Of Mumbai",
        location: "Mumbai, India",
        period: "August 2019 – July 2023",
        coursework: ["Data Structures & Algorithms", "Database Systems", "Operating System"],
    },
];

export const skills = {
    languages: {
        title: "Languages & Frameworks",
        items: ["Python", "Java", "JavaScript", "TypeScript", "React", "Node.js", "Express.js", "D3.js"],
    },
    databases: {
        title: "Databases & Caching",
        items: ["SQL", "PostgreSQL", "MongoDB", "Redis"],
    },
    cloud: {
        title: "Cloud & DevOps",
        items: ["AWS (EC2, S3, Lambda)", "Docker", "Terraform", "Jenkins", "GitHub Actions", "CI/CD", "Packer"],
    },
    tools: {
        title: "Tools & APIs",
        items: ["Git", "REST", "GraphQL", "WebSockets", "Postman", "Jira", "Linux"],
    },
};

export const experience = [
    {
        id: 1,
        title: "Software Engineer",
        company: "Verveware",
        location: "IL, USA",
        period: "October 2025 – Present",
        highlights: [
            "Designed and implemented a production real-time support chat system using room-based WebSocket routing, supporting concurrent employee and admin interactions",
            "Developed an LMS module to track caregiver course completion, reducing manual onboarding effort by 20%",
            "Added role-based permissions and feature access rules to ensure proper visibility and secure usage across users",
            "Improved release reliability by validating features in beta environments and adding unit and integration tests before production rollout",
        ],
    },
    {
        id: 2,
        title: "Research Project Assistant",
        company: "Stony Brook University",
        location: "NY, USA",
        period: "August 2024 – December 2024",
        highlights: [
            "Deployed a BERT Attention Visualizer to help researchers interpret transformer attention patterns at token level",
            "Reduced latency by 20% by applying input-level caching with lru_cache and enabling response compression",
            "Automated testing and versioned rollouts to enable faster and more stable production deployments",
            "Achieved 99% uptime by containerizing services and setting up CI/CD with Vercel and Hugging Face Spaces",
        ],
    },
    {
        id: 3,
        title: "Software Engineer Intern",
        company: "DTPPL",
        location: "Mumbai, India",
        period: "June 2022 – July 2023",
        highlights: [
            "Reduced API latency by 15% by integrating Redis, redesigning RESTful endpoints, and optimizing database calls",
            "Improved report generation by 40% by profiling and optimizing SQL joins, adding indexes, and removing subqueries",
            "Built CI/CD pipelines using Jenkins and GitLab to enable consistent releases and faster rollback mechanisms",
            "Streamlined backend performance in MIS system by eliminating bottlenecks in data-heavy routes and query layers",
        ],
    },
];

export const projects = [
    {
        id: 1,
        title: "DailyLog",
        subtitle: "A Cloud-Native Personal Logging App",
        description: "A secure and scalable cloud-native backend for personal journaling with zero-downtime deployments.",
        highlights: [
            "Provisioned AWS infrastructure using Terraform and Packer, deploying EC2, IAM roles, and network configurations",
            "Implemented blue-green deployments using AWS Load Balancer, RDS, and CloudWatch alarms",
            "Built RESTful APIs with Express.js to handle user authentication, journal entries, and file uploads",
            "Reduced deployment time by 80% by automating pipelines through GitHub Actions and CI/CD",
        ],
        tech: ["AWS", "Terraform", "Packer", "Express.js", "GitHub Actions", "RDS", "CloudWatch"],
        color: "#22d3ee",
    },
    {
        id: 2,
        title: "Sparrow-Health",
        subtitle: "Telemedicine Platform",
        description: "A secure telemedicine platform enabling real-time chat, video consultations, and appointment scheduling.",
        highlights: [
            "Built secure platform with JWT/OAuth2 authentication for real-time chat and video consultations",
            "Improved MongoDB performance by 70% with Redis caching and optimized indexes for 15K+ concurrent users",
            "Designed RESTful backend APIs using Express.js for users, appointments, messages, and medical records",
            "Automated billing operations with modular Stripe integration for invoices, refunds, and secure payments",
        ],
        tech: ["MongoDB", "Redis", "Express.js", "JWT", "OAuth2", "Stripe", "WebSockets"],
        color: "#a855f7",
    },
    {
        id: 3,
        title: "ShareEdu",
        subtitle: "Learning Management System",
        description: "A scalable LMS platform delivering uninterrupted access to learning tools for 10K+ students.",
        highlights: [
            "Built scalable LMS using MERN stack and microservices with AWS-based horizontal scaling",
            "Improved responsiveness by 35% through CDN caching, real-time collaboration via WebSockets",
            "Reduced AWS costs by 20% by deploying auto-scaling EC2 and optimizing S3 storage",
        ],
        tech: ["MERN Stack", "Microservices", "AWS", "WebSockets", "CDN", "S3", "EC2"],
        color: "#ec4899",
    },
];

export const marqueeItems = [
    "React", "Node.js", "TypeScript", "Python", "AWS", "Docker",
    "MongoDB", "PostgreSQL", "Redis", "GraphQL", "WebSockets",
    "Terraform", "CI/CD", "Express.js", "JavaScript", "Git"
];
