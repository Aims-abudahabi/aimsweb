export interface Course {
    id: string;
    title: string;
    category: string;
    duration: string;
    level: string;
    seats: string;
    description: string;
    curriculum: string[];
    popular?: boolean;
}

export const coursesData: { [key: string]: Course } = {
    // ── Signature Categories (Featured on Home) ──
    'language-courses': {
        id: 'language-courses',
        title: 'Language Courses',
        category: 'Language Courses',
        duration: 'Immersive',
        level: 'All Levels',
        seats: 'Available',
        description: 'Master English and Arabic for professional and academic success in the UAE.',
        curriculum: ['IELTS Preparation', 'OET for Healthcare', 'Spoken English', 'Spoken Arabic']
    },
    'finance-accounting': {
        id: 'finance-accounting',
        title: 'Finance & Accounting',
        category: 'Finance & Accounting',
        duration: 'Multiple Tracks',
        level: 'Professional',
        seats: 'Available',
        description: 'Elite training in Tally, QuickBooks, SAP FICO, and VAT compliance for modern accounting.',
        curriculum: ['Tally Prime & QuickBooks', 'SAP FICO Modules', 'Peachtree Training', 'UAE VAT Compliance']
    },
    'office-administration': {
        id: 'office-administration',
        title: 'Office Administration',
        category: 'Office Administration',
        duration: 'Comprehensive',
        level: 'Corporate',
        seats: 'Available',
        description: 'Master MS Office, Advanced Excel, and Executive Secretarial skills for elite administration.',
        curriculum: ['Advanced Excel & MS Office', 'ICDL Certification', 'Document Control', 'Executive Secretarial Prep']
    },
    'engineering-cad': {
        id: 'engineering-cad',
        title: 'Engineering & CAD',
        category: 'Engineering and CAD',
        duration: 'Specialized',
        level: 'Professional',
        seats: 'Available',
        description: 'World-class CAD training including AutoCAD, Revit, BIM, and 3D Visualization.',
        curriculum: ['AutoCAD 2D/3D', 'BIM & Autodesk ACC', 'Revit Architecture/Structure', 'Civil 3D & Solidworks']
    },
    'graphic-design-animation': {
        id: 'graphic-design-animation',
        title: 'Graphic Design & Animation',
        category: 'Graphic Design and Animation',
        duration: 'Creative',
        level: 'Artist',
        seats: 'Available',
        description: 'Professional visual communication using Adobe Suite, 3D Animation, and Motion Graphics.',
        curriculum: ['Graphic Design & Multimedia', '2D/3D Animation', 'Product Modeling', 'Motion Graphics After Effects']
    },
    'network-it': {
        id: 'network-it',
        title: 'IT & Networking',
        category: 'IT & Networking',
        duration: 'High-Tech',
        level: 'Specialist',
        seats: 'Available',
        description: 'Master Cisco networking, CompTIA security, and modern cloud infrastructure for the IT industry.',
        curriculum: ['Cisco CCNA/CCNP', 'CompTIA A+/N+/S+', 'Cloud Computing Basics', 'Network Security']
    },

    // 1. Finance & Accounting
    'tally': {
        id: 'tally',
        title: 'Tally Prime',
        category: 'Finance & Accounting',
        duration: '4 Weeks',
        level: 'Beginner',
        seats: '15 Remaining',
        description: 'Comprehensive training on Tally Prime for business accounting and inventory management.',
        curriculum: ['Accounting Principles', 'Voucher Entry', 'GST Compliance', 'Financial Statements']
    },
    'quickbooks': {
        id: 'quickbooks',
        title: 'QuickBooks',
        category: 'Finance & Accounting',
        duration: '4 Weeks',
        level: 'Intermediate',
        seats: '12 Remaining',
        description: 'Master cloud-based accounting with QuickBooks for small to medium enterprises.',
        curriculum: ['Company Setup', 'Banking Integration', 'Invoicing', 'Expense Tracking']
    },
    'peachtree': {
        id: 'peachtree',
        title: 'Peachtree (Sage 50)',
        category: 'Finance & Accounting',
        duration: '4 Weeks',
        level: 'Intermediate',
        seats: '10 Remaining',
        description: 'Learn robust accounting features with Peachtree/Sage 50 professional software.',
        curriculum: ['General Ledger', 'Accounts Payable/Receivable', 'Inventory', 'Payroll']
    },
    'sap-fico': {
        id: 'sap-fico',
        title: 'SAP FICO',
        category: 'Finance & Accounting',
        duration: '12 Weeks',
        level: 'Advanced',
        seats: '8 Remaining',
        description: 'Elite training in SAP Financial Accounting (FI) and Controlling (CO) modules.',
        curriculum: ['FI Global Settings', 'Asset Accounting', 'Cost Center Accounting', 'Internal Orders'],
        popular: true
    },
    'vat-training': {
        id: 'vat-training',
        title: 'VAT Training',
        category: 'Finance & Accounting',
        duration: '2 Weeks',
        level: 'Intermediate',
        seats: '20 Remaining',
        description: 'Specialize in UAE VAT compliance, laws, and practical return filing.',
        curriculum: ['VAT Framework', 'Output/Input VAT', 'Exemptions', 'Filing Returns']
    },

    // 2. Office Administration
    'ms-office': {
        id: 'ms-office',
        title: 'MS Office',
        category: 'Office Administration',
        duration: '6 Weeks',
        level: 'Beginner',
        seats: '25 Remaining',
        description: 'Essential mastery of Word, PowerPoint, and Outlook for modern office work.',
        curriculum: ['Word Formatting', 'PowerPoint Design', 'Outlook Management', 'File Systems']
    },
    'advanced-excel': {
        id: 'advanced-excel',
        title: 'Advanced Excel',
        category: 'Office Administration',
        duration: '4 Weeks',
        level: 'Advanced',
        seats: '15 Remaining',
        description: 'Power user training in Excel formulas, data analysis, and automation.',
        curriculum: ['VLOOKUP/XLOOKUP', 'Pivot Tables', 'Power Query', 'Macros & VBA Intro'],
        popular: true
    },
    'icdl': {
        id: 'icdl',
        title: 'ICDL',
        category: 'Office Administration',
        duration: '8 Weeks',
        level: 'Beginner',
        seats: '18 Remaining',
        description: 'Prepare for the Internationally recognized Computer Driving License certification.',
        curriculum: ['Computer Essentials', 'Online Collaboration', 'IT Security', 'Digital Citizen']
    },
    'document-controller': {
        id: 'document-controller',
        title: 'Document Controller',
        category: 'Office Administration',
        duration: '4 Weeks',
        level: 'Professional',
        seats: '10 Remaining',
        description: 'Strategic document management and workflow handling for corporate environments.',
        curriculum: ['Electronic Document Systems', 'Coding Standards', 'Revision Control', 'Distribution Logs']
    },
    'secretarial-courses': {
        id: 'secretarial-courses',
        title: 'Secretarial Courses',
        category: 'Office Administration',
        duration: '4 Weeks',
        level: 'Beginner',
        seats: '15 Remaining',
        description: 'Foundation skills for administrative assistants and junior secretaries.',
        curriculum: ['Business Etiquette', 'Call Handling', 'Scheduling', 'Meeting Coordination']
    },
    'executive-secretary': {
        id: 'executive-secretary',
        title: 'Executive Secretary',
        category: 'Office Administration',
        duration: '6 Weeks',
        level: 'Expert',
        seats: '12 Remaining',
        description: 'High-level training for C-suite executive support and office management.',
        curriculum: ['Crisis Management', 'Public Speaking', 'Complex Travel Logistics', 'High-Level Reporting']
    },

    // 4. Engineering & CAD
    'autocad': {
        id: 'autocad',
        title: 'AutoCAD',
        category: 'Engineering and CAD',
        duration: '6 Weeks',
        level: 'Beginner to Intermediate',
        seats: '14 Remaining',
        description: 'The industry-standard training for 2D drafting and basic 3D modeling.',
        curriculum: ['Drawing Tools', 'Layers & Blocks', 'Dimensions', 'Plotting & Publishing'],
        popular: true
    },
    'bim-acc': {
        id: 'bim-acc',
        title: 'BIM / Autodesk Construction Cloud (ACC)',
        category: 'Engineering and CAD',
        duration: '8 Weeks',
        level: 'Advanced',
        seats: '10 Remaining',
        description: 'Master Building Information Modeling (BIM) and cloud collaboration for large-scale projects.',
        curriculum: ['BIM Standards', 'ACC Workflows', 'Model Coordination', 'Conflict Management']
    },
    'revit-architecture': {
        id: 'revit-architecture',
        title: 'Autodesk Revit Architecture',
        category: 'Engineering and CAD',
        duration: '8 Weeks',
        level: 'Intermediate',
        seats: '12 Remaining',
        description: 'Specialized Revit training for residential and commercial architectural design.',
        curriculum: ['Conceptual Modeling', 'Walls/Doors/Windows', 'Families Creation', 'Rendering']
    },
    'revit-structure': {
        id: 'revit-structure',
        title: 'Autodesk Revit Structure',
        category: 'Engineering and CAD',
        duration: '8 Weeks',
        level: 'Intermediate',
        seats: '10 Remaining',
        description: 'Structural modeling and detailing for concrete and steel structures using Revit.',
        curriculum: ['Framing Systems', 'Foundations', 'Reinforcement', 'Structural Analysis Integration']
    },
    'revit-mep': {
        id: 'revit-mep',
        title: 'Autodesk Revit MEP',
        category: 'Engineering and CAD',
        duration: '8 Weeks',
        level: 'Intermediate',
        seats: '10 Remaining',
        description: 'Mechanical, Electrical, and Plumbing (MEP) design and modeling in BIM.',
        curriculum: ['HVAC Systems', 'Electrical Circuits', 'Plumbing Networks', 'Clash Detection']
    },
    'civil-3d': {
        id: 'civil-3d',
        title: 'Autodesk Civil 3D',
        category: 'Engineering and CAD',
        duration: '10 Weeks',
        level: 'Advanced',
        seats: '8 Remaining',
        description: 'Civil engineering design and documentation for transportation and land development.',
        curriculum: ['Surfaces & Grading', 'Alignments & Profiles', 'Pipe Networks', 'Quantity Takeoff']
    },
    'navisworks': {
        id: 'navisworks',
        title: 'Autodesk Navisworks',
        category: 'Engineering and CAD',
        duration: '4 Weeks',
        level: 'Advanced',
        seats: '12 Remaining',
        description: 'Project review and clash detection software for construction professionals.',
        curriculum: ['4D/5D Simulation', 'Clash Detective', 'Quantity Takeoff', 'Animate Models']
    },
    '3ds-max': {
        id: '3ds-max',
        title: 'Autodesk 3ds Max',
        category: 'Engineering and CAD',
        duration: '10 Weeks',
        level: 'Professional',
        seats: '9 Remaining',
        description: 'Unmatched 3D modeling, rendering, and animation for high-end visualization.',
        curriculum: ['Polygon Modeling', 'Materials & Shaders', 'V-Ray Rendering', 'Lighting']
    },
    'lumion': {
        id: 'lumion',
        title: 'Lumion',
        category: 'Engineering and CAD',
        duration: '4 Weeks',
        level: 'Intermediate',
        seats: '15 Remaining',
        description: 'Learn to create stunning architectural visualizations and walkthroughs in real-time.',
        curriculum: ['Landscape Design', 'Material Mapping', 'Cinematic Effects', 'High-Res Rendering']
    },
    'sketchup': {
        id: 'sketchup',
        title: 'SketchUp',
        category: 'Engineering and CAD',
        duration: '4 Weeks',
        level: 'Beginner',
        seats: '18 Remaining',
        description: 'Easy-to-learn 3D modeling for architects and interior designers.',
        curriculum: ['Entity Creation', 'Component Management', 'Extensions/Plugins', 'V-Ray for SketchUp']
    },
    'fusion-360': {
        id: 'fusion-360',
        title: 'Autodesk Fusion 360',
        category: 'Engineering and CAD',
        duration: '6 Weeks',
        level: 'Intermediate',
        seats: '10 Remaining',
        description: 'Cloud-based CAD/CAM/CAE tool for product development.',
        curriculum: ['Parametric Modeling', 'PCB Design', 'Simulations', 'Manufacturing Workflows']
    },
    'inventor': {
        id: 'inventor',
        title: 'Autodesk Inventor',
        category: 'Engineering and CAD',
        duration: '8 Weeks',
        level: 'Advanced',
        seats: '10 Remaining',
        description: 'Professional-grade mechanical design and 3D CAD software.',
        curriculum: ['Assembly Design', 'Sheet Metal Design', 'iLogic Automation', 'Stress Analysis']
    },
    'solidworks': {
        id: 'solidworks',
        title: 'SOLIDWORKS',
        category: 'Engineering and CAD',
        duration: '8 Weeks',
        level: 'Intermediate to Advanced',
        seats: '12 Remaining',
        description: 'Universal standard for 3D mechanical CAD design and simulation.',
        curriculum: ['Parts Modeling', 'Assemblies', 'Detail Drawings', 'Simulation & Validation']
    },

    // 5. Graphic Design & Animation
    'graphic-multimedia': {
        id: 'graphic-multimedia',
        title: 'Graphic Design & Multimedia',
        category: 'Graphic Design and Animation',
        duration: '12 Weeks',
        level: 'Beginner',
        seats: '15 Remaining',
        description: 'Master Photoshop, Illustrator, and InDesign for print and digital design.',
        curriculum: ['Typography', 'Color Theory', 'Layout Design', 'Logo Creation'],
        popular: true
    },
    '2d-animation': {
        id: '2d-animation',
        title: '2D Modeling & Animation',
        category: 'Graphic Design and Animation',
        duration: '16 Weeks',
        level: 'Entry / Professional',
        seats: '10 Remaining',
        description: 'Character design and storytelling using top 2D animation tools.',
        curriculum: ['Character Rigging', 'Principles of Animation', 'Background Art', 'Storyboarding']
    },
    'product-animation': {
        id: 'product-animation',
        title: 'Product Modeling & Animation',
        category: 'Graphic Design and Animation',
        duration: '12 Weeks',
        level: 'Professional',
        seats: '8 Remaining',
        description: 'Visualize products in 3D for advertising and digital marketing.',
        curriculum: ['High-Poly Modeling', 'Texture Mapping', 'Lighting & VFX', 'Commercial Rendering']
    },
    'social-media-design': {
        id: 'social-media-design',
        title: 'Social Media Design',
        category: 'Graphic Design and Animation',
        duration: '4 Weeks',
        level: 'Beginner',
        seats: '20 Remaining',
        description: 'Create engaging content for Instagram, Facebook, and LinkedIn.',
        curriculum: ['Reels & TikTok Editing', 'Static Posts', 'Brand Consistency', 'Engagement Hacks']
    },
    '3d-character-animation': {
        id: '3d-character-animation',
        title: '3D Character Animation',
        category: 'Graphic Design and Animation',
        duration: '24 Weeks',
        level: 'Advanced',
        seats: '6 Remaining',
        description: 'Master the art of 3D performance and character-driven storytelling.',
        curriculum: ['Lip Syncing', 'Body Mechanics', 'Weight & Balance', 'Facial Expressions']
    },
    'motion-graphics': {
        id: 'motion-graphics',
        title: 'Motion Graphics & Animation',
        category: 'Graphic Design and Animation',
        duration: '12 Weeks',
        level: 'Professional',
        seats: '12 Remaining',
        description: 'Learn After Effects to create high-impact motion graphics and VFX.',
        curriculum: ['Keyframing', 'Masking & Rotoscoping', '3D Camera Tracking', 'Compositing']
    },
    'publishing': {
        id: 'publishing',
        title: 'Publishing',
        category: 'Graphic Design and Animation',
        duration: '6 Weeks',
        level: 'Intermediate',
        seats: '15 Remaining',
        description: 'Advanced print production and digital publishing workflows.',
        curriculum: ['Editorial Layout', 'Pre-flight Prep', 'Kindle/E-pub Formats', 'Multi-page Documents']
    },

    // 6. Project Management
    'contract-management': {
        id: 'contract-management',
        title: 'Contract Management',
        category: 'Project Management',
        duration: '4 Weeks',
        level: 'Professional',
        seats: '10 Remaining',
        description: 'Master the legal and operational aspects of project contracts.',
        curriculum: ['FIDIC Standards', 'Procurement Laws', 'Risk Mitigation', 'Claim Management']
    },
    'pmp': {
        id: 'pmp',
        title: 'PMP Certification',
        category: 'Project Management',
        duration: '6 Weeks',
        level: 'Expert',
        seats: '20 Remaining',
        description: 'The world (PMI) standard for project leadership and execution.',
        curriculum: ['Process Groups', 'Knowledge Areas', 'Agile Methodology', 'Exam Prep'],
        popular: true
    },
    'primavera': {
        id: 'primavera',
        title: 'Primavera P6',
        category: 'Project Management',
        duration: '6 Weeks',
        level: 'Professional',
        seats: '12 Remaining',
        description: 'Enterprise-level project scheduling and resource management.',
        curriculum: ['EPS/OBS Structure', 'WBS Creation', 'Gantt Charts', 'Critical Path Method']
    },
    'ms-project': {
        id: 'ms-project',
        title: 'Microsoft Project',
        category: 'Project Management',
        duration: '4 Weeks',
        level: 'Intermediate',
        seats: '15 Remaining',
        description: 'Plan, track, and manage projects effectively with MS Project.',
        curriculum: ['Task Sequencing', 'Leveling Resources', 'Baselining', 'Status Tracking']
    },

    // 7. IT & Networking
    'ccent': {
        id: 'ccent',
        title: 'CCENT',
        category: 'IT & Networking',
        duration: '4 Weeks',
        level: 'Beginner',
        seats: '15 Remaining',
        description: 'Foundational Cisco networking for entry-level professionals.',
        curriculum: ['Network Fundamentals', 'IPv4 Addressing', 'Switching Basics', 'Security Essentials']
    },
    'ccna': {
        id: 'ccna',
        title: 'Cisco CCNA',
        category: 'IT & Networking',
        duration: '8 Weeks',
        level: 'Intermediate',
        seats: '12 Remaining',
        description: 'The most comprehensive networking certification for modern infrastructure.',
        curriculum: ['Routing Protocols', 'WLAN Access', 'Automation & Programmability', 'IP Services']
    },
    'ccnp': {
        id: 'ccnp',
        title: 'Cisco CCNP',
        category: 'IT & Networking',
        duration: '12 Weeks',
        level: 'Advanced',
        seats: '8 Remaining',
        description: 'Enterprise-grade networking and troubleshooting for high-level engineers.',
        curriculum: ['Core Networking (ENCOR)', 'Advanced Routing (ENARSI)', 'Virtualization', 'Network Security']
    },
    'comptia-s-plus': {
        id: 'comptia-s-plus',
        title: 'CompTIA S+',
        category: 'IT & Networking',
        duration: '4 Weeks',
        level: 'Intermediate',
        seats: '20 Remaining',
        description: 'Industry-standard baseline for digital and network security.',
        curriculum: ['Threat Detection', 'Identity Management', 'Cryptography', 'Risk Management']
    },
    'comptia-n-plus': {
        id: 'comptia-n-plus',
        title: 'CompTIA N+',
        category: 'IT & Networking',
        duration: '4 Weeks',
        level: 'Beginner',
        seats: '20 Remaining',
        description: 'Vendor-neutral networking foundation for IT technicians.',
        curriculum: ['Network Design', 'Operations & Support', 'Troubleshooting', 'Connectivity']
    },
    'comptia-a-plus': {
        id: 'comptia-a-plus',
        title: 'CompTIA A+',
        category: 'IT & Networking',
        duration: '6 Weeks',
        level: 'Beginner',
        seats: '25 Remaining',
        description: 'The essential certification for PC hardware and software support.',
        curriculum: ['Hardware Repair', 'OS Configuration', 'Cloud Computing', 'Help Desk Soft Skills']
    },
    'flutter': {
        id: 'flutter',
        title: 'Flutter Development',
        category: 'IT & Networking',
        duration: '12 Weeks',
        level: 'Intermediate',
        seats: '10 Remaining',
        description: 'Cross-platform mobile app development with Dart and Flutter.',
        curriculum: ['Widget Architecture', 'State Management', 'API Integration', 'App Store Deployment']
    },
    'digital-marketing': {
        id: 'digital-marketing',
        title: 'Digital Marketing',
        category: 'IT & Networking',
        duration: '8 Weeks',
        level: 'Intermediate',
        seats: '20 Remaining',
        description: 'Modern marketing strategies including SEO, SEM, and Content Strategy.',
        curriculum: ['SEO Optimization', 'Google Ads', 'Email Marketing', 'Analytics & Reporting']
    },

    // 8. Language Courses
    'ielts': {
        id: 'ielts',
        title: 'IELTS',
        category: 'Language Courses',
        duration: '6 Weeks',
        level: 'Beginner to Advanced',
        seats: '30 Remaining',
        description: 'World-renowned English proficiency for study and migration.',
        curriculum: ['Academic Reading', 'General Writing', 'Mock Tests', 'Speaking Interview Prep'],
        popular: true
    },
    'oet': {
        id: 'oet',
        title: 'OET',
        category: 'Language Courses',
        duration: '8 Weeks',
        level: 'Professional',
        seats: '30 Remaining',
        description: 'Specific English training for Healthcare professionals (Doctors/Nurses).',
        curriculum: ['Medical Vocabulary', 'Patient Consultations', 'Letter Writing', 'Professional Rapport']
    },
    'det': {
        id: 'det',
        title: 'DET (DUOLINGO ENGLISH TEST)',
        category: 'Language Courses',
        duration: '6 Weeks',
        level: 'Beginner to Advanced',
        seats: '30 Remaining',
        description: 'World-renowned English proficiency for study and migration.',
        curriculum: ['Academic Reading', 'General Writing', 'Mock Tests', 'Speaking Interview Prep'],
        popular: true
    },
    'spoken-english': {
        id: 'spoken-english',
        title: 'Spoken English',
        category: 'Language Courses',
        duration: '8 Weeks',
        level: 'Beginner',
        seats: '40 Remaining',
        description: 'Focus on fluency, pronunciation, and confident conversation.',
        curriculum: ['Phonetics', 'Common Idioms', 'Group Discussions', 'Phone Etiquette']
    },
    'spoken-arabic': {
        id: 'spoken-arabic',
        title: 'Spoken Arabic',
        category: 'Language Courses',
        duration: '12 Weeks',
        level: 'Beginner',
        seats: '30 Remaining',
        description: 'Basic to intermediate conversational Arabic for work and life in UAE.',
        curriculum: ['Daily Greetings', 'Local Phrases', 'Business Arabic', 'Arabic Culture Intro']
    },
    'spoken-spanish': {
        id: 'spoken-spanish',
        title: 'Spoken Spanish',
        category: 'Language Courses',
        duration: '8 Weeks',
        level: 'Beginner',
        seats: '40 Remaining',
        description: 'Focus on fluency, pronunciation, and confident conversation.',
        curriculum: ['Phonetics', 'Common Idioms', 'Group Discussions', 'Phone Etiquette']
    },
    'spoken-french': {
        id: 'spoken-french',
        title: 'Spoken French',
        category: 'Language Courses',
        duration: '8 Weeks',
        level: 'Beginner',
        seats: '40 Remaining',
        description: 'Focus on fluency, pronunciation, and confident conversation.',
        curriculum: ['Phonetics', 'Common Idioms', 'Group Discussions', 'Phone Etiquette']
    },


    // 3. Soft Skills (Moved to end for consistency)
    'change-management': { id: 'change-management', title: 'Change Management', category: 'Soft Skills', duration: '2 Weeks', level: 'Corporate', seats: 'Open', description: 'Strategies for leading organizations through transition.', curriculum: ['Stakeholder Mapping', 'ADKAR Model', 'Resistance Management'] },
    'stress-management': { id: 'stress-management', title: 'Stress Management', category: 'Soft Skills', duration: '1 Week', level: 'General', seats: 'Open', description: 'Workplace techniques for mental clarity and productivity.', curriculum: ['Deep Breathing', 'Work-Life Balance', 'Boundary Setting'] },
    'time-management': { id: 'time-management', title: 'Time Management', category: 'Soft Skills', duration: '1 Week', level: 'General', seats: 'Open', description: 'Maximized efficiency and intentional scheduling.', curriculum: ['Eisenhower Matrix', 'Pomodoro Method', 'Priority Setting'] },
    'communication-strategies': { id: 'communication-strategies', title: 'Communication Strategies', category: 'Soft Skills', duration: '2 Weeks', level: 'Intermediate', seats: 'Open', description: 'Advanced tactics for organizational clarity.', curriculum: ['Internal Communication', 'External Branding', 'Storytelling'] },
    'conflict-resolution': { id: 'conflict-resolution', title: 'Conflict Resolution', category: 'Soft Skills', duration: '2 Weeks', level: 'Intermediate', seats: 'Open', description: 'Navigating disagreements with emotional intelligence.', curriculum: ['Mediation', 'Active Listening', 'De-escalation'] },
    'customer-happiness': { id: 'customer-happiness', title: 'Customer Happiness', category: 'Soft Skills', duration: '1 Week', level: 'Service', seats: 'Open', description: 'Exceeding expectations in every interaction.', curriculum: ['Empathy Training', 'Complaint Handling', 'Loyalty Building'] },
    'communication-skills': { id: 'communication-skills', title: 'Communication Skills', category: 'Soft Skills', duration: '1 Week', level: 'Beginner', seats: 'Open', description: 'Core principles of effective verbal and non-verbal exchange.', curriculum: ['Clarity', 'Tone', 'Body Language'] },
    'influencing-skills': { id: 'influencing-skills', title: 'Influencing Skills', category: 'Soft Skills', duration: '2 Weeks', level: 'Professional', seats: 'Open', description: 'Ethical persuasion and stakeholder buy-in.', curriculum: ['Reciprocity', 'Authority', 'Social Proof'] },
    'leadership-skills': { id: 'leadership-skills', title: 'Leadership Skills', category: 'Soft Skills', duration: '4 Weeks', level: 'Expert', seats: 'Open', description: 'Empowering teams and strategic decision making.', curriculum: ['Visionary Leadership', 'Servant Leadership', 'Coaching Teams'] },
    'interpersonal-skills': { id: 'interpersonal-skills', title: 'Interpersonal Skills', category: 'Soft Skills', duration: '2 Weeks', level: 'General', seats: 'Open', description: 'Building meaning relationship in team environments.', curriculum: ['Trust Building', 'Teamwork', 'Social Awareness'] },
    'creativity': { id: 'creativity', title: 'Creativity', category: 'Soft Skills', duration: '1 Week', level: 'General', seats: 'Open', description: 'Unlocking lateral thinking and innovation.', curriculum: ['Brainstorming', 'Mind Mapping', 'Design Thinking'] },
    'work-ethic': { id: 'work-ethic', title: 'Work Ethic', category: 'Soft Skills', duration: '1 Week', level: 'Corporate', seats: 'Open', description: 'The mindset of excellence and professional accountability.', curriculum: ['Punctuality', 'Diligence', 'Integrity'] },
}
