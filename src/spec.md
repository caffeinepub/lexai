# Specification

## Summary
**Goal:** Build LexAI, a legal case analyzer that accepts PDF/DOCX document uploads, supports Tamil and English languages with voice input, and provides structured legal analysis with visual strength comparisons.

**Planned changes:**
- Create document upload interface accepting PDF and DOCX files
- Implement language toggle between English and Tamil throughout the UI
- Add text input field for legal questions in both languages
- Integrate voice input capability for Tamil and English speech-to-text
- Display structured analysis results: Case Summary, Legal Issues, Law Sections, Evidence Evaluation, Plaintiff/Defendant Strength percentages, Strong/Weak Points, Risk Assessment, Neutral Opinion, and Legal Disclaimer
- Add interactive charts visualizing plaintiff vs defendant strength percentages
- Build backend endpoint to receive and extract text from uploaded documents
- Implement language detection for user input
- Create translation system maintaining legal terminology accuracy
- Generate AI-powered legal analysis with all required components
- Structure backend JSON responses with all analysis fields
- Include prominent legal disclaimer emphasizing probability-based estimation and professional consultation recommendation
- Design professional legal-tech interface with trustworthy visual theme

**User-visible outcome:** Users can upload legal documents, ask questions in Tamil or English via text or voice, toggle between languages, and receive comprehensive legal analysis with visual strength charts and clear disclaimers.
