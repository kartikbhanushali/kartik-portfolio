// Portfolio constants - All data sourced from Bhanushali Kartik Resume.pdf

export const personalInfo = {
    name: "Kartik Kanti Bhanushali",
    firstName: "Kartik Bhanushali",
    location: "Chicago, IL",
    phone: "862-955-9939",
    email: "kartik.bhanushali@rutgers.edu",
    headline: "Quant Engineer",
    tagline: "Quantitative risk modeling, derivatives pricing & data-driven financial strategies",
    bio: "I'm a Quant Engineer specializing in risk analytics, derivatives pricing, and quantitative research. With a Master's in Quantitative Finance from Rutgers Business School and deep expertise in Python, stochastic calculus, and financial modeling, I build models that drive smarter risk decisions across counterparty credit risk, market risk, and portfolio optimization — currently at Bank of America.",
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
        url: "https://www.linkedin.com/in/kartik-bhanushali/",
        icon: "FaLinkedin",
    },
    {
        id: "email",
        label: "Email",
        url: "mailto:kartik.bhanushali@rutgers.edu",
        icon: "FaEnvelope",
    },
];

export const education = [
    {
        degree: "Master's in Quantitative Finance",
        school: "Rutgers Business School, Newark",
        location: "NJ, USA",
        period: "August 2023 – December 2024",
        gpa: "3.95",
        coursework: ["Stochastic Calculus", "Derivatives", "Fixed Income", "Econometrics", "Financial Time Series", "Advance Risk Management"],
    },
    {
        degree: "Bachelor of Technology in Computer Science Engineering",
        school: "University of Mumbai",
        location: "Mumbai, India",
        period: "August 2018 – May 2022",
        gpa: "3.82",
        coursework: ["Mathematics", "Financial Modelling", "Data Structures"],
    },
];

export const skills = {
    programming: {
        title: "Programming & Languages",
        items: ["Python", "C++", "R", "MATLAB", "SQL", "Base SAS"],
    },
    quantitative: {
        title: "Quantitative & Risk",
        items: ["Value at Risk (VaR)", "Monte Carlo Simulation", "Stochastic Calculus", "Derivatives Pricing", "Credit Risk (CCAR, CECL, IFRS9)", "Factor Analysis", "Mean-Variance Optimization", "Stress Testing"],
    },
    tools: {
        title: "Tools & Platforms",
        items: ["Bloomberg Terminal", "SAP", "Microsoft Excel", "PowerPoint", "Visio", "Credit Studio", "Pyrite"],
    },
    certifications: {
        title: "Certifications & Awards",
        items: ["CFA Level 3 Candidate", "Bloomberg Market Concepts", "Quantitative Trader – King's College London", "Deloitte Move-the-Dot Award", "Deloitte Applause Award"],
    },
};

export const experience = [
    {
        id: 1,
        title: "Quantitative Risk Analyst – Counterparty Credit Risk",
        company: "Bank of America",
        location: "USA",
        period: "January 2025 – Present",
        highlights: [
            "Investigated repo/reverse repo haircut exceptions using Pyrite, leveraging bespoke haircut grids and product-specific quantitative models; reduced false positives by 25%",
            "Analyzed counterparty credit risk (CCR) and Potential Exposure (PE) using Credit Studio, isolating drivers across $50B+ notional",
            "Resolved high-impact issues in collateral, funding, and triparty flows — improving exception closure efficiency by 30%",
            "Utilized Bloomberg for trade enrichment and pricing validation; delivered clean, auditable exposure data for regulatory reviews",
        ],
    },
    {
        id: 2,
        title: "Quantitative Research Analyst",
        company: "Bellwether Consulting LLC",
        location: "USA",
        period: "May 2024 – January 2025",
        highlights: [
            "Developed optimal fund line-ups using multiple asset classes; conducted manager due diligence with risk & volatility, attribution, and scenario analysis",
            "Designed alternate asset class investment strategy for a large financial client using return analysis, risk-return correlations, and stress testing",
            "Built a comprehensive factor analysis tool in Python to understand key quantitative factors (Style, Size, Quality, Momentum, Volatility) behind fund performance",
            "Collaborated with Senior Management to publish quarterly market recaps on US and International Markets",
        ],
    },
    {
        id: 3,
        title: "Senior Analyst, Risk Advisory",
        company: "Deloitte Touche Tohmatsu India LLP",
        location: "India",
        period: "June 2022 – August 2023",
        highlights: [
            "Identified, monitored, and evaluated operational, credit, and IT risks for third-party and financial audits",
            "Led a team of 4 for the TCS-EW external audit, delivering the SOC2 report in a record 4 weeks",
            "Facilitated financial risk management for TCS-BaNCS by reviewing internal controls over credit management, liquidity, and market risk",
        ],
    },
    {
        id: 4,
        title: "Quantitative Risk Model Validation Analyst",
        company: "Abhivridhi Capital Markets",
        location: "India",
        period: "June 2021 – May 2022",
        highlights: [
            "Validated market risk models for VaR calculations and trade selection, mitigating breaches under 18f-4 and FRTB regulatory frameworks",
            "Created custom libraries for automated model validations for credit, market, and liquidity risk models integrated into data processing pipelines",
            "Validated Credit Risk models using linear and logistic regression under CCAR, IFRS9, and CECL scenarios through Python",
        ],
    },
    {
        id: 5,
        title: "Counterparty & Market Risk Analyst",
        company: "MPG Associates",
        location: "India",
        period: "October 2020 – June 2021",
        highlights: [
            "Assessed Counterparty Risk through daily certification of metrics (CVaR and credit stress test) on market operations",
            "Performed detailed risk analysis using portfolio VaR, sensitivities (delta, gamma, vega), margin requirements, and P&L across Equities, IR, Commodities, FX",
            "Managed data quality issues by identifying model calculation bugs using Monte-Carlo methods and historical data analysis",
        ],
    },
];

export const projects = [
    {
        id: 1,
        title: "Stock Market Price Prediction",
        subtitle: "Machine Learning & Technical Analysis",
        description: "End-to-end stock price prediction system combining technical, statistical, and fundamental analysis with LSTM neural networks, deployed within Aishwarya Financial Services LLP.",
        highlights: [
            "Achieved 70% accuracy in predicting future trends using LSTM alongside technical and fundamental analysis",
            "Optimized the model to achieve a Sharpe ratio of 1.5 with a maximum drawdown of 8%, minimizing portfolio risks",
            "Co-authored research titled 'Stock Price Prediction using LSTM' published in the Indian Journal of AI & Neural Networking",
        ],
        tech: ["Python", "LSTM", "Machine Learning", "Technical Analysis", "Sharpe Ratio", "Risk Optimization"],
        color: "#D4A44C",
    },
    {
        id: 2,
        title: "Credit Risk Modelling – TD Bank",
        subtitle: "Merton Model Implementation",
        description: "Built a comprehensive credit risk model for TD Bank using the Merton structural model, simulating asset value changes to estimate default probabilities.",
        highlights: [
            "Estimated an 8% default probability by simulating asset value dynamics over time using the Merton model",
            "Integrated balance sheet and market data with Python, improving default risk estimation accuracy by 15%",
            "Applied quantitative analysis to predict potential default scenarios, reducing TD Bank's credit losses by 10%",
        ],
        tech: ["Python", "Merton Model", "Credit Risk", "Monte Carlo", "Balance Sheet Analysis", "Default Probability"],
        color: "#34D399",
    },
];

export const marqueeItems = [
    "Python", "C++", "R", "MATLAB", "SQL", "VaR",
    "Monte Carlo", "Derivatives", "Fixed Income", "Credit Risk",
    "Stochastic Calculus", "Bloomberg", "Factor Analysis",
    "Stress Testing", "CCAR", "FRTB",
];
