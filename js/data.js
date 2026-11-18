/* ==========================================================
   Site content. Edit this file to update tracks, events and team
   without touching the HTML. All entries below are SAMPLE data.
   ========================================================== */

window.SITE_DATA = {
  contactEmail: "gdg@example.com", // <-- replace with your chapter email

  tracks: [
    { icon: "🌐", color: "blue",   title: "Web Development", desc: "Build modern, responsive websites and web apps.",
      topics: ["HTML, CSS & JavaScript fundamentals", "React / Next.js basics", "Deploying with Firebase Hosting"] },
    { icon: "📱", color: "red",    title: "Android & Flutter", desc: "Create mobile apps for Android and beyond.",
      topics: ["Kotlin & Jetpack Compose", "Flutter cross-platform apps", "Publishing to Play Store"] },
    { icon: "🤖", color: "yellow", title: "AI / Machine Learning", desc: "Explore ML, generative AI and Gemini APIs.",
      topics: ["Python & ML fundamentals", "TensorFlow basics", "Building with the Gemini API"] },
    { icon: "☁️", color: "green",  title: "Cloud & DevOps", desc: "Learn cloud services, containers and deployment.",
      topics: ["Google Cloud fundamentals", "Docker & CI/CD basics", "Serverless with Cloud Run"] },
    { icon: "🔥", color: "blue",   title: "Firebase & Backend", desc: "Authentication, databases and APIs made simple.",
      topics: ["Firebase Auth & Firestore", "REST APIs with Node.js", "Realtime features"] },
    { icon: "🎨", color: "red",    title: "UI/UX & Design", desc: "Design experiences people love to use.",
      topics: ["Design thinking", "Figma prototyping", "Material Design principles"] }
  ],

  // type: workshop | hackathon | talk | studyjam      status: upcoming | past
  events: [
    { title: "Intro to Web Development", type: "workshop", color: "blue", date: "2026-12-05", time: "10:00 AM", venue: "CSE Seminar Hall",
      desc: "Build and deploy your first responsive website from scratch.", status: "upcoming" },
    { title: "Campus Build-a-thon", type: "hackathon", color: "red", date: "2026-12-20", time: "9:00 AM", venue: "RIT Auditorium",
      desc: "24-hour team hackathon: solve real campus problems with technology.", status: "upcoming" },
    { title: "Gemini API Study Jam", type: "studyjam", color: "green", date: "2027-01-10", time: "2:00 PM", venue: "Computer Lab 2",
      desc: "Guided labs on building AI features with the Gemini API.", status: "upcoming" },
    { title: "Careers in Cloud: Alumni Talk", type: "talk", color: "yellow", date: "2027-01-24", time: "11:00 AM", venue: "Online (Google Meet)",
      desc: "An alumnus shares their path into cloud engineering and tips for freshers.", status: "upcoming" },
    { title: "Flutter Essentials", type: "workshop", color: "red", date: "2026-10-12", time: "10:00 AM", venue: "Computer Lab 1",
      desc: "Build a cross-platform to-do app with Flutter in one session.", status: "past" },
    { title: "Git & GitHub for Everyone", type: "workshop", color: "blue", date: "2026-09-18", time: "2:00 PM", venue: "CSE Seminar Hall",
      desc: "Version control, pull requests and collaborating on open source.", status: "past" },
    { title: "Cloud Skills Boost Study Jam", type: "studyjam", color: "green", date: "2026-09-05", time: "2:00 PM", venue: "Computer Lab 2",
      desc: "Complete hands-on cloud labs together with mentor support.", status: "past" },
    { title: "Inauguration & Community Kick-off", type: "talk", color: "yellow", date: "2026-08-22", time: "10:30 AM", venue: "RIT Auditorium",
      desc: "Meet the team, learn the roadmap and join the community.", status: "past" }
  ],

  team: [
    { name: "Faculty Advisor", role: "Faculty Mentor, CSE", color: "blue" },
    { name: "Chapter Lead", role: "Lead", color: "red" },
    { name: "Technical Lead", role: "Technical Lead", color: "yellow" },
    { name: "Design Lead", role: "Design & Creatives", color: "green" },
    { name: "Events Lead", role: "Events & Operations", color: "blue" },
    { name: "Content Lead", role: "Content & Social Media", color: "red" },
    { name: "Web Lead", role: "Website & Open Source", color: "yellow" },
    { name: "Outreach Lead", role: "Outreach & Partnerships", color: "green" }
  ]
};
