export interface BlogPost {
    id: number;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    category: string;
    image: string;
    author: {
        name: string;
        avatar: string;
        socials?: {
            facebook?: string;
            twitter?: string;
            linkedin?: string;
            instagram?: string;
        };
    };
}

export const blogPosts: BlogPost[] = [
    { 
        id: 1, 
        title: "Mastering the OET: Tips from Top Instructors", 
        date: "Oct 12, 2025", 
        excerpt: "Learn the secrets to scoring high on the Occupational English Test with our expert guide.", 
        content: `
            <p>The Occupational English Test (OET) is a critical milestone for healthcare professionals looking to practice in English-speaking environments. Unlike general English exams, the OET focuses specifically on healthcare scenarios, making it both more relevant and more challenging.</p>
            <h3>1. Understand the Healthcare Context</h3>
            <p>Success in the OET isn't just about grammar; it's about communication in a clinical setting. Practice explaining complex medical conditions in simple terms that a patient would understand.</p>
            <h3>2. Mastering the Listening Sub-test</h3>
            <p>The listening section often features consultations or lectures. Train your ear to catch specific medical terminology while also understanding the emotional tone of the speaker.</p>
            <h3>3. Writing with Precision</h3>
            <p>In the writing sub-test, you're often asked to write a referral letter. Focus on clarity, conciseness, and selecting only the most relevant patient information.</p>
        `,
        category: "Exam Prep",
        image: "/images/course-finance.png",
        author: {
            name: "Dr. Sarah Jenkins",
            avatar: "https://i.pravatar.cc/150?img=47",
            socials: {
                facebook: "https://facebook.com",
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com"
            }
        }
    },
    { 
        id: 2, 
        title: "Why Dubai is the Best Global Training Hub", 
        date: "Nov 05, 2025", 
        excerpt: "Exploring the growth of professional training centers in the UAE's most vibrant city.", 
        content: `
            <p>Dubai has rapidly transformed into one of the world's leading centers for professional development and vocational training. This growth is driven by a combination of strategic location, world-class infrastructure, and a visionary government.</p>
            <h3>A Hub for Innovation</h3>
            <p>Training centers in Dubai are at the forefront of adopting new technologies. From AI-driven language learning to advanced engineering simulations, students here get hands-on experience with the future of their industries.</p>
            <h3>Global Networking Opportunities</h3>
            <p>Studying in Dubai means you're part of a multicultural environment. The connections you make here span continents, providing an invaluable network for your future career.</p>
        `,
        category: "Education",
        image: "/images/course-office.png",
        author: {
            name: "Ahmed Al Mansoori",
            avatar: "https://i.pravatar.cc/150?img=11",
            socials: {
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com",
                instagram: "https://instagram.com"
            }
        }
    },
    { 
        id: 3, 
        title: "IELTS Speaking: Five Common Mistakes to Avoid", 
        date: "Dec 01, 2025", 
        excerpt: "Avoid these frequent errors to boost your confidence and band score in IELTS Speaking.", 
        content: `
            <p>The Speaking component of the IELTS can be intimidating, but avoiding these common pitfalls can significantly improve your band score.</p>
            <ul>
                <li><strong>Over-memorization:</strong> Examiners can tell when you've memorized an answer. It sounds unnatural and often results in lower scores.</li>
                <li><strong>Short Answers:</strong> Don't just say "Yes" or "No." Always elaborate and provide reasons or examples.</li>
                <li><strong>Worrying Too Much About Accent:</strong> Clarity is more important than sounding like a native speaker. Focus on pronunciation and intonation.</li>
            </ul>
        `,
        category: "IELTS",
        image: "/images/excellence.png",
        author: {
            name: "Emma Robertson",
            avatar: "https://i.pravatar.cc/150?img=5",
            socials: {
                facebook: "https://facebook.com",
                instagram: "https://instagram.com"
            }
        }
    },
    { 
        id: 4, 
        title: "The Future of Professional Career Development", 
        date: "Jan 15, 2026", 
        excerpt: "Staying ahead in 2026 with the most in-demand vocational and language skills.", 
        content: `
            <p>As we move further into 2026, the landscape of professional development continues to shift. Understanding these trends is key to staying competitive.</p>
            <h3>Hybrid Skills are Key</h3>
            <p>The most successful professionals today are those who couple technical mastery (like IT or Engineering) with strong soft skills (like communication and project management).</p>
        `,
        category: "Career",
        image: "/images/course-pm.png",
        author: {
            name: "Michael Chen",
            avatar: "https://i.pravatar.cc/150?img=33",
            socials: {
                linkedin: "https://linkedin.com",
                twitter: "https://twitter.com"
            }
        }
    },
];



