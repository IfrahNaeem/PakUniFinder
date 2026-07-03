// ============================================================
// Pakistan University Finder — NEW ADDITIONS
// Append these arrays to your existing src/data/universities.js
// All IDs continue from where your existing data ends
// ============================================================

// ─────────────────────────────────────────────────────────────
// NEW UNIVERSITIES (UNI016 → UNI045)
// ─────────────────────────────────────────────────────────────
export const NEW_UNIVERSITIES = [

  // ── ISLAMABAD / RAWALPINDI ──────────────────────────────────
  {
    university_id: "UNI016",
    name: "Quaid-i-Azam University",
    short_name: "QAU",
    sector: "Government",
    city: "Islamabad",
    province: "ICT",
    hec_recognized: true,
    website: "https://qau.edu.pk",
    has_hostel: true,
    notes: "Leading research university; strong in Natural Sciences, Biosciences, Social Sciences",
  },
  {
    university_id: "UNI017",
    name: "International Islamic University Islamabad",
    short_name: "IIUI",
    sector: "Government",
    city: "Islamabad",
    province: "ICT",
    hec_recognized: true,
    website: "https://iiu.edu.pk",
    has_hostel: true,
    notes: "Federal charter; covers Engineering, CS, Medicine, Business, Islamic Studies",
  },
  {
    university_id: "UNI018",
    name: "Air University",
    short_name: "AU",
    sector: "Semi-Government",
    city: "Islamabad",
    province: "ICT",
    hec_recognized: true,
    website: "https://au.edu.pk",
    has_hostel: true,
    notes: "Established by Pakistan Air Force; strong in Engineering & CS",
  },
  {
    university_id: "UNI019",
    name: "Bahria University Islamabad",
    short_name: "BU Islamabad",
    sector: "Semi-Government",
    city: "Islamabad",
    province: "ICT",
    hec_recognized: true,
    website: "https://bahria.edu.pk",
    has_hostel: false,
    notes: "Established by Pakistan Navy; campuses in Islamabad, Karachi, Lahore; Engineering, CS, Business, Medical",
  },
  {
    university_id: "UNI020",
    name: "Riphah International University",
    short_name: "Riphah",
    sector: "Private",
    city: "Islamabad",
    province: "ICT",
    hec_recognized: true,
    website: "https://riphah.edu.pk",
    has_hostel: true,
    notes: "Multiple campuses; strong in Medical, Pharmacy, Rehabilitation Sciences, Business",
  },

  // ── LAHORE ─────────────────────────────────────────────────
  {
    university_id: "UNI021",
    name: "University of Engineering and Technology Lahore (New Campus)",
    short_name: "UET New Campus",
    sector: "Government",
    city: "Lahore",
    province: "Punjab",
    hec_recognized: true,
    website: "https://uet.edu.pk",
    has_hostel: true,
    notes: "KSK Campus, Lahore; admission via ECAT; Engineering disciplines",
  },
  {
    university_id: "UNI022",
    name: "Lahore College for Women University",
    short_name: "LCWU",
    sector: "Government",
    city: "Lahore",
    province: "Punjab",
    hec_recognized: true,
    website: "https://lcwu.edu.pk",
    has_hostel: true,
    notes: "Women only; strong in Sciences, Social Sciences, CS, Business",
  },
  {
    university_id: "UNI023",
    name: "University of Management and Technology",
    short_name: "UMT",
    sector: "Private",
    city: "Lahore",
    province: "Punjab",
    hec_recognized: true,
    website: "https://umt.edu.pk",
    has_hostel: true,
    notes: "Strong in Business, CS, Engineering; multiple campuses across Punjab",
  },
  {
    university_id: "UNI024",
    name: "Forman Christian College University",
    short_name: "FCCU",
    sector: "Private",
    city: "Lahore",
    province: "Punjab",
    hec_recognized: true,
    website: "https://fccollege.edu.pk",
    has_hostel: true,
    notes: "Chartered university; Liberal Arts, Sciences, CS, Business; historic campus",
  },
  {
    university_id: "UNI025",
    name: "King Edward Medical University",
    short_name: "KEMU",
    sector: "Government",
    city: "Lahore",
    province: "Punjab",
    hec_recognized: true,
    website: "https://kemu.edu.pk",
    has_hostel: true,
    notes: "Top medical university in Punjab; admission via MDCAT + PMC merit",
  },
  {
    university_id: "UNI026",
    name: "Allama Iqbal Medical College",
    short_name: "AIMC",
    sector: "Government",
    city: "Lahore",
    province: "Punjab",
    hec_recognized: true,
    website: "https://aimc.edu.pk",
    has_hostel: true,
    notes: "Affiliated with Jinnah Hospital; MBBS via MDCAT/PMC merit",
  },
  {
    university_id: "UNI027",
    name: "Superior University",
    short_name: "Superior",
    sector: "Private",
    city: "Lahore",
    province: "Punjab",
    hec_recognized: true,
    website: "https://superior.edu.pk",
    has_hostel: false,
    notes: "Multiple campuses in Lahore; CS, Engineering, Business, Social Sciences",
  },

  // ── KARACHI ────────────────────────────────────────────────
  {
    university_id: "UNI028",
    name: "Aga Khan University",
    short_name: "AKU",
    sector: "Private",
    city: "Karachi",
    province: "Sindh",
    hec_recognized: true,
    website: "https://aku.edu",
    has_hostel: true,
    notes: "Elite private; world-ranked Medical & Nursing; highly competitive AKU entry test",
  },
  {
    university_id: "UNI029",
    name: "Karachi Institute of Economics and Technology",
    short_name: "KIET",
    sector: "Private",
    city: "Karachi",
    province: "Sindh",
    hec_recognized: true,
    website: "https://kiet.edu",
    has_hostel: false,
    notes: "Strong in Engineering, CS, Business; NTS-NAT or own test accepted",
  },
  {
    university_id: "UNI030",
    name: "Hamdard University",
    short_name: "Hamdard",
    sector: "Private",
    city: "Karachi",
    province: "Sindh",
    hec_recognized: true,
    website: "https://hamdard.edu.pk",
    has_hostel: true,
    notes: "Strong in Pharmacy, Medical, Business, Engineering; own entry test",
  },
  {
    university_id: "UNI031",
    name: "Sir Syed University of Engineering and Technology",
    short_name: "SSUET",
    sector: "Private",
    city: "Karachi",
    province: "Sindh",
    hec_recognized: true,
    website: "https://ssuet.edu.pk",
    has_hostel: false,
    notes: "Engineering-focused private university; own admission test",
  },

  // ── FAISALABAD ─────────────────────────────────────────────
  {
    university_id: "UNI032",
    name: "Government College University Faisalabad",
    short_name: "GCUF",
    sector: "Government",
    city: "Faisalabad",
    province: "Punjab",
    hec_recognized: true,
    website: "https://gcuf.edu.pk",
    has_hostel: true,
    notes: "Chartered university; Sciences, CS, Business, Social Sciences; affordable fees",
  },
  {
    university_id: "UNI033",
    name: "National Textile University",
    short_name: "NTU",
    sector: "Government",
    city: "Faisalabad",
    province: "Punjab",
    hec_recognized: true,
    website: "https://ntu.edu.pk",
    has_hostel: true,
    notes: "Specialized in Textile Engineering, Fashion Design, CS; strong industry links",
  },

  // ── MULTAN ─────────────────────────────────────────────────
  {
    university_id: "UNI034",
    name: "Nishtar Medical University",
    short_name: "NMU",
    sector: "Government",
    city: "Multan",
    province: "Punjab",
    hec_recognized: true,
    website: "https://nmu.edu.pk",
    has_hostel: true,
    notes: "Largest medical university in South Punjab; MBBS via MDCAT/PMC merit",
  },
  {
    university_id: "UNI035",
    name: "Muhammad Nawaz Shareef University of Agriculture",
    short_name: "MNSUA",
    sector: "Government",
    city: "Multan",
    province: "Punjab",
    hec_recognized: true,
    website: "https://mnsuam.edu.pk",
    has_hostel: true,
    notes: "Agriculture, Food Technology, Agri-Engineering; merit-based admission",
  },

  // ── PESHAWAR ───────────────────────────────────────────────
  {
    university_id: "UNI036",
    name: "University of Peshawar",
    short_name: "UOP",
    sector: "Government",
    city: "Peshawar",
    province: "KPK",
    hec_recognized: true,
    website: "https://uop.edu.pk",
    has_hostel: true,
    notes: "Oldest university in KPK; Social Sciences, Natural Sciences, CS, Business",
  },
  {
    university_id: "UNI037",
    name: "University of Engineering and Technology Peshawar",
    short_name: "UET Peshawar",
    sector: "Government",
    city: "Peshawar",
    province: "KPK",
    hec_recognized: true,
    website: "https://uetpeshawar.edu.pk",
    has_hostel: true,
    notes: "Main engineering university in KPK; ECAT-KPK for admission",
  },
  {
    university_id: "UNI038",
    name: "Khyber Medical University",
    short_name: "KMU",
    sector: "Government",
    city: "Peshawar",
    province: "KPK",
    hec_recognized: true,
    website: "https://kmu.edu.pk",
    has_hostel: true,
    notes: "Regulates and affiliates medical colleges in KPK; MBBS via MDCAT/KPK merit",
  },
  {
    university_id: "UNI039",
    name: "City University of Science and Information Technology",
    short_name: "CUSIT",
    sector: "Private",
    city: "Peshawar",
    province: "KPK",
    hec_recognized: true,
    website: "https://cusit.edu.pk",
    has_hostel: false,
    notes: "Private; CS, Engineering, Business, Media; affordable fee structure for KPK students",
  },

  // ── QUETTA ─────────────────────────────────────────────────
  {
    university_id: "UNI040",
    name: "University of Balochistan",
    short_name: "UOB",
    sector: "Government",
    city: "Quetta",
    province: "Balochistan",
    hec_recognized: true,
    website: "https://uob.edu.pk",
    has_hostel: true,
    notes: "Main public university in Balochistan; Sciences, Social Sciences, CS, Business",
  },
  {
    university_id: "UNI041",
    name: "Balochistan University of Information Technology, Engineering and Management Sciences",
    short_name: "BUITEMS",
    sector: "Government",
    city: "Quetta",
    province: "Balochistan",
    hec_recognized: true,
    website: "https://buitms.edu.pk",
    has_hostel: true,
    notes: "Strong in CS, Engineering, Management; NTS-NAT based admission",
  },

  // ── OTHER MAJOR CITIES ─────────────────────────────────────
  {
    university_id: "UNI042",
    name: "University of Gujrat",
    short_name: "UOG",
    sector: "Government",
    city: "Gujrat",
    province: "Punjab",
    hec_recognized: true,
    website: "https://uog.edu.pk",
    has_hostel: true,
    notes: "Chartered university; CS, Engineering, Business, Social Sciences; sub-campuses in Sialkot and Narowal",
  },
  {
    university_id: "UNI043",
    name: "University of Sargodha",
    short_name: "UOS",
    sector: "Government",
    city: "Sargodha",
    province: "Punjab",
    hec_recognized: true,
    website: "https://uos.edu.pk",
    has_hostel: true,
    notes: "Chartered; CS, Business, Sciences, Social Sciences; 7 sub-campuses in central Punjab",
  },
  {
    university_id: "UNI044",
    name: "Islamia University of Bahawalpur",
    short_name: "IUB",
    sector: "Government",
    city: "Bahawalpur",
    province: "Punjab",
    hec_recognized: true,
    website: "https://iub.edu.pk",
    has_hostel: true,
    notes: "CS, Engineering, Business, Sciences, Islamic Studies; affordable government fees",
  },
  {
    university_id: "UNI045",
    name: "Abdul Wali Khan University Mardan",
    short_name: "AWKUM",
    sector: "Government",
    city: "Mardan",
    province: "KPK",
    hec_recognized: true,
    website: "https://awkum.edu.pk",
    has_hostel: true,
    notes: "CS, Sciences, Social Sciences, Business; serves students from Mardan, Swat, Malakand region",
  },
];

// ─────────────────────────────────────────────────────────────
// NEW CAMPUSES (CMP021 → CMP050)
// ─────────────────────────────────────────────────────────────
export const NEW_CAMPUSES = [
  { campus_id: "CMP021", university_id: "UNI016", city: "Islamabad", province: "ICT", address: "Quaid-i-Azam University, Islamabad 45320", is_test_center_only: false },
  { campus_id: "CMP022", university_id: "UNI017", city: "Islamabad", province: "ICT", address: "Sector H-10, Islamabad", is_test_center_only: false },
  { campus_id: "CMP023", university_id: "UNI018", city: "Islamabad", province: "ICT", address: "PAF Complex, E-9, Islamabad", is_test_center_only: false },
  { campus_id: "CMP024", university_id: "UNI019", city: "Islamabad", province: "ICT", address: "Shangrila Road, Sector E-8, Islamabad", is_test_center_only: false },
  { campus_id: "CMP025", university_id: "UNI020", city: "Islamabad", province: "ICT", address: "Riphah International, I-14, Islamabad", is_test_center_only: false },
  { campus_id: "CMP026", university_id: "UNI021", city: "Lahore", province: "Punjab", address: "UET KSK Campus, Lahore", is_test_center_only: false },
  { campus_id: "CMP027", university_id: "UNI022", city: "Lahore", province: "Punjab", address: "Jail Road, Lahore", is_test_center_only: false },
  { campus_id: "CMP028", university_id: "UNI023", city: "Lahore", province: "Punjab", address: "C-II, Johar Town, Lahore", is_test_center_only: false },
  { campus_id: "CMP029", university_id: "UNI024", city: "Lahore", province: "Punjab", address: "Zahoor Elahi Road, Gulberg III, Lahore", is_test_center_only: false },
  { campus_id: "CMP030", university_id: "UNI025", city: "Lahore", province: "Punjab", address: "Nila Gumbad, Lahore", is_test_center_only: false },
  { campus_id: "CMP031", university_id: "UNI026", city: "Lahore", province: "Punjab", address: "Allama Shabbir Ahmad Usmani Road, Lahore", is_test_center_only: false },
  { campus_id: "CMP032", university_id: "UNI027", city: "Lahore", province: "Punjab", address: "17-KM, Raiwind Road, Lahore", is_test_center_only: false },
  { campus_id: "CMP033", university_id: "UNI028", city: "Karachi", province: "Sindh", address: "Stadium Road, Karachi", is_test_center_only: false },
  { campus_id: "CMP034", university_id: "UNI029", city: "Karachi", province: "Sindh", address: "Korangi Creek Road, Karachi", is_test_center_only: false },
  { campus_id: "CMP035", university_id: "UNI030", city: "Karachi", province: "Sindh", address: "Madinat al-Hikmah, Muhammad Bin Qasim Ave, Karachi", is_test_center_only: false },
  { campus_id: "CMP036", university_id: "UNI031", city: "Karachi", province: "Sindh", address: "Main University Road, Karachi", is_test_center_only: false },
  { campus_id: "CMP037", university_id: "UNI032", city: "Faisalabad", province: "Punjab", address: "New Campus, Faisalabad", is_test_center_only: false },
  { campus_id: "CMP038", university_id: "UNI033", city: "Faisalabad", province: "Punjab", address: "Sheikhupura Road, Faisalabad", is_test_center_only: false },
  { campus_id: "CMP039", university_id: "UNI034", city: "Multan", province: "Punjab", address: "Nishtar Road, Multan", is_test_center_only: false },
  { campus_id: "CMP040", university_id: "UNI035", city: "Multan", province: "Punjab", address: "Multan-Vehari Road, Multan", is_test_center_only: false },
  { campus_id: "CMP041", university_id: "UNI036", city: "Peshawar", province: "KPK", address: "University Road, Peshawar", is_test_center_only: false },
  { campus_id: "CMP042", university_id: "UNI037", city: "Peshawar", province: "KPK", address: "University Campus, GT Road, Peshawar", is_test_center_only: false },
  { campus_id: "CMP043", university_id: "UNI038", city: "Peshawar", province: "KPK", address: "Peshawar Road, Peshawar", is_test_center_only: false },
  { campus_id: "CMP044", university_id: "UNI039", city: "Peshawar", province: "KPK", address: "Warsak Road, Peshawar", is_test_center_only: false },
  { campus_id: "CMP045", university_id: "UNI040", city: "Quetta", province: "Balochistan", address: "Saryab Road, Quetta", is_test_center_only: false },
  { campus_id: "CMP046", university_id: "UNI041", city: "Quetta", province: "Balochistan", address: "Takatu Road, Quetta", is_test_center_only: false },
  { campus_id: "CMP047", university_id: "UNI042", city: "Gujrat", province: "Punjab", address: "Kharian Road, Gujrat", is_test_center_only: false },
  { campus_id: "CMP048", university_id: "UNI043", city: "Sargodha", province: "Punjab", address: "University Road, Sargodha", is_test_center_only: false },
  { campus_id: "CMP049", university_id: "UNI044", city: "Bahawalpur", province: "Punjab", address: "Baghdad-ul-Jadeed Campus, Bahawalpur", is_test_center_only: false },
  { campus_id: "CMP050", university_id: "UNI045", city: "Mardan", province: "KPK", address: "Main Campus, Mardan", is_test_center_only: false },
];

// ─────────────────────────────────────────────────────────────
// NEW PROGRAMS (PRG011 → PRG040)
// ─────────────────────────────────────────────────────────────
export const NEW_PROGRAMS = [

  // QAU — Islamabad
  { program_id: "PRG011", campus_id: "CMP021", program_name: "BS Computer Science", field_category: "CS-IT", required_fsc_group: "Pre-Engineering / ICS", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 18000, total_program_fee_pkr_approx: 144000, fee_source_note: "Government subsidized — verify on qau.edu.pk" },
  { program_id: "PRG012", campus_id: "CMP021", program_name: "BS Biosciences", field_category: "Natural Sciences", required_fsc_group: "Pre-Medical", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 16000, total_program_fee_pkr_approx: 128000, fee_source_note: "Government subsidized — verify on qau.edu.pk" },
  { program_id: "PRG013", campus_id: "CMP021", program_name: "BS Economics", field_category: "Business", required_fsc_group: "Any", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 15000, total_program_fee_pkr_approx: 120000, fee_source_note: "Government subsidized — verify on qau.edu.pk" },

  // IIUI — Islamabad
  { program_id: "PRG014", campus_id: "CMP022", program_name: "BS Computer Science", field_category: "CS-IT", required_fsc_group: "Pre-Engineering / ICS", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 22000, total_program_fee_pkr_approx: 176000, fee_source_note: "Verify on iiu.edu.pk" },
  { program_id: "PRG015", campus_id: "CMP022", program_name: "MBBS", field_category: "Medical", required_fsc_group: "Pre-Medical", duration_years: "5", degree_level: "Bachelor", semester_fee_pkr_approx: 70000, total_program_fee_pkr_approx: 700000, fee_source_note: "Verify on iiu.edu.pk — IIUI has its own medical college" },
  { program_id: "PRG016", campus_id: "CMP022", program_name: "BBA (Bachelor of Business Administration)", field_category: "Business", required_fsc_group: "Any", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 20000, total_program_fee_pkr_approx: 160000, fee_source_note: "Verify on iiu.edu.pk" },

  // Air University — Islamabad
  { program_id: "PRG017", campus_id: "CMP023", program_name: "BS Electrical Engineering", field_category: "Engineering", required_fsc_group: "Pre-Engineering", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 55000, total_program_fee_pkr_approx: 440000, fee_source_note: "Semi-government — verify on au.edu.pk" },
  { program_id: "PRG018", campus_id: "CMP023", program_name: "BS Cyber Security", field_category: "CS-IT", required_fsc_group: "Pre-Engineering / ICS", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 55000, total_program_fee_pkr_approx: 440000, fee_source_note: "Verify on au.edu.pk" },

  // Riphah — Islamabad
  { program_id: "PRG019", campus_id: "CMP025", program_name: "MBBS", field_category: "Medical", required_fsc_group: "Pre-Medical", duration_years: "5", degree_level: "Bachelor", semester_fee_pkr_approx: 320000, total_program_fee_pkr_approx: 3200000, fee_source_note: "Private medical — fee approx; verify on riphah.edu.pk" },
  { program_id: "PRG020", campus_id: "CMP025", program_name: "Doctor of Pharmacy (Pharm-D)", field_category: "Medical", required_fsc_group: "Pre-Medical", duration_years: "5", degree_level: "Bachelor", semester_fee_pkr_approx: 120000, total_program_fee_pkr_approx: 1200000, fee_source_note: "Verify on riphah.edu.pk" },

  // LCWU — Lahore
  { program_id: "PRG021", campus_id: "CMP027", program_name: "BS Computer Science", field_category: "CS-IT", required_fsc_group: "Pre-Engineering / ICS", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 20000, total_program_fee_pkr_approx: 160000, fee_source_note: "Women only; government subsidized — verify on lcwu.edu.pk" },
  { program_id: "PRG022", campus_id: "CMP027", program_name: "BS Business Administration", field_category: "Business", required_fsc_group: "Any", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 18000, total_program_fee_pkr_approx: 144000, fee_source_note: "Women only — verify on lcwu.edu.pk" },

  // FCCU — Lahore
  { program_id: "PRG023", campus_id: "CMP029", program_name: "BS Computer Science", field_category: "CS-IT", required_fsc_group: "Pre-Engineering / ICS", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 65000, total_program_fee_pkr_approx: 520000, fee_source_note: "Private — verify on fccollege.edu.pk" },
  { program_id: "PRG024", campus_id: "CMP029", program_name: "BS Economics", field_category: "Business", required_fsc_group: "Any", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 60000, total_program_fee_pkr_approx: 480000, fee_source_note: "Private — verify on fccollege.edu.pk" },

  // KEMU — Lahore
  { program_id: "PRG025", campus_id: "CMP030", program_name: "MBBS", field_category: "Medical", required_fsc_group: "Pre-Medical", duration_years: "5", degree_level: "Bachelor", semester_fee_pkr_approx: 25000, total_program_fee_pkr_approx: 250000, fee_source_note: "Government medical — highly subsidized; verify on kemu.edu.pk" },

  // AKU — Karachi
  { program_id: "PRG026", campus_id: "CMP033", program_name: "MBBS", field_category: "Medical", required_fsc_group: "Pre-Medical", duration_years: "5", degree_level: "Bachelor", semester_fee_pkr_approx: 400000, total_program_fee_pkr_approx: 4000000, fee_source_note: "Elite private; financial aid available — verify on aku.edu" },
  { program_id: "PRG027", campus_id: "CMP033", program_name: "BScN (Bachelor of Nursing)", field_category: "Medical", required_fsc_group: "Pre-Medical", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 150000, total_program_fee_pkr_approx: 1200000, fee_source_note: "Verify on aku.edu" },

  // GCUF — Faisalabad
  { program_id: "PRG028", campus_id: "CMP037", program_name: "BS Computer Science", field_category: "CS-IT", required_fsc_group: "Pre-Engineering / ICS", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 17000, total_program_fee_pkr_approx: 136000, fee_source_note: "Government subsidized — verify on gcuf.edu.pk" },
  { program_id: "PRG029", campus_id: "CMP037", program_name: "BBA (Business Administration)", field_category: "Business", required_fsc_group: "Any", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 15000, total_program_fee_pkr_approx: 120000, fee_source_note: "Government subsidized — verify on gcuf.edu.pk" },

  // NTU — Faisalabad
  { program_id: "PRG030", campus_id: "CMP038", program_name: "BS Textile Engineering", field_category: "Engineering", required_fsc_group: "Pre-Engineering", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 30000, total_program_fee_pkr_approx: 240000, fee_source_note: "Specialized engineering — verify on ntu.edu.pk" },

  // Nishtar — Multan
  { program_id: "PRG031", campus_id: "CMP039", program_name: "MBBS", field_category: "Medical", required_fsc_group: "Pre-Medical", duration_years: "5", degree_level: "Bachelor", semester_fee_pkr_approx: 28000, total_program_fee_pkr_approx: 280000, fee_source_note: "Government medical South Punjab — verify on nmu.edu.pk" },

  // MNSUA — Multan
  { program_id: "PRG032", campus_id: "CMP040", program_name: "BS Agriculture", field_category: "Agriculture & Sciences", required_fsc_group: "Pre-Medical / Pre-Engineering", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 20000, total_program_fee_pkr_approx: 160000, fee_source_note: "Government subsidized — verify on mnsuam.edu.pk" },

  // UET Peshawar
  { program_id: "PRG033", campus_id: "CMP042", program_name: "BS Civil Engineering", field_category: "Engineering", required_fsc_group: "Pre-Engineering", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 22000, total_program_fee_pkr_approx: 176000, fee_source_note: "Government KPK — verify on uetpeshawar.edu.pk" },
  { program_id: "PRG034", campus_id: "CMP042", program_name: "BS Computer Systems Engineering", field_category: "Engineering", required_fsc_group: "Pre-Engineering", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 22000, total_program_fee_pkr_approx: 176000, fee_source_note: "Verify on uetpeshawar.edu.pk" },

  // KMU — Peshawar
  { program_id: "PRG035", campus_id: "CMP043", program_name: "MBBS", field_category: "Medical", required_fsc_group: "Pre-Medical", duration_years: "5", degree_level: "Bachelor", semester_fee_pkr_approx: 30000, total_program_fee_pkr_approx: 300000, fee_source_note: "Government KPK medical — verify on kmu.edu.pk" },

  // BUITEMS — Quetta
  { program_id: "PRG036", campus_id: "CMP046", program_name: "BS Computer Science", field_category: "CS-IT", required_fsc_group: "Pre-Engineering / ICS", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 18000, total_program_fee_pkr_approx: 144000, fee_source_note: "Government Balochistan — verify on buitms.edu.pk" },
  { program_id: "PRG037", campus_id: "CMP046", program_name: "BS Business Administration", field_category: "Business", required_fsc_group: "Any", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 16000, total_program_fee_pkr_approx: 128000, fee_source_note: "Verify on buitms.edu.pk" },

  // UOS — Sargodha
  { program_id: "PRG038", campus_id: "CMP048", program_name: "BS Computer Science", field_category: "CS-IT", required_fsc_group: "Pre-Engineering / ICS", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 16000, total_program_fee_pkr_approx: 128000, fee_source_note: "Government subsidized — verify on uos.edu.pk" },

  // IUB — Bahawalpur
  { program_id: "PRG039", campus_id: "CMP049", program_name: "BS Computer Science", field_category: "CS-IT", required_fsc_group: "Pre-Engineering / ICS", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 15000, total_program_fee_pkr_approx: 120000, fee_source_note: "Government subsidized — verify on iub.edu.pk" },
  { program_id: "PRG040", campus_id: "CMP049", program_name: "BS Islamic Studies / Social Sciences", field_category: "Social Sciences", required_fsc_group: "Any", duration_years: "4", degree_level: "Bachelor", semester_fee_pkr_approx: 12000, total_program_fee_pkr_approx: 96000, fee_source_note: "Verify on iub.edu.pk" },
];

// ─────────────────────────────────────────────────────────────
// NEW ADMISSION CYCLES (CYC006 → CYC018)
// ─────────────────────────────────────────────────────────────
export const NEW_ADMISSION_CYCLES = [
  { cycle_id: "CYC006", program_id: "PRG011", academic_year: "2026-2027", application_window: "Jul–Aug 2026 (typically)", entry_test_required: true, entry_test_name: "QAU Entry Test", entry_test_window: "Aug 2026", merit_list_period: "Sep 2026", classes_start: "Oct 2026", source_note: "Verify on qau.edu.pk" },
  { cycle_id: "CYC007", program_id: "PRG014", academic_year: "2026-2027", application_window: "Jun–Aug 2026", entry_test_required: true, entry_test_name: "IIUI Entry Test / NTS-NAT", entry_test_window: "Jul–Aug 2026", merit_list_period: "Aug–Sep 2026", classes_start: "Sep 2026", source_note: "Verify on iiu.edu.pk" },
  { cycle_id: "CYC008", program_id: "PRG017", academic_year: "2026-2027", application_window: "Jun–Jul 2026", entry_test_required: true, entry_test_name: "AU Entry Test / NTS-NAT", entry_test_window: "Jul 2026", merit_list_period: "Aug 2026", classes_start: "Sep 2026", source_note: "Verify on au.edu.pk" },
  { cycle_id: "CYC009", program_id: "PRG019", academic_year: "2026-2027", application_window: "Apr–Jun 2026", entry_test_required: true, entry_test_name: "MDCAT (PMC)", entry_test_window: "Aug–Sep 2026", merit_list_period: "Oct 2026", classes_start: "Nov 2026", source_note: "Medical admission via PMC national MDCAT — verify on riphah.edu.pk" },
  { cycle_id: "CYC010", program_id: "PRG021", academic_year: "2026-2027", application_window: "Jun–Aug 2026", entry_test_required: true, entry_test_name: "LCWU Entry Test / NTS-NAT", entry_test_window: "Jul–Aug 2026", merit_list_period: "Sep 2026", classes_start: "Oct 2026", source_note: "Women only — verify on lcwu.edu.pk" },
  { cycle_id: "CYC011", program_id: "PRG023", academic_year: "2026-2027", application_window: "Jun–Jul 2026", entry_test_required: true, entry_test_name: "FCCU Admission Test (SAT / own test)", entry_test_window: "Jul 2026", merit_list_period: "Aug 2026", classes_start: "Sep 2026", source_note: "Verify on fccollege.edu.pk" },
  { cycle_id: "CYC012", program_id: "PRG025", academic_year: "2026-2027", application_window: "Apr–Jun 2026", entry_test_required: true, entry_test_name: "MDCAT (PMC)", entry_test_window: "Aug–Sep 2026", merit_list_period: "Oct 2026", classes_start: "Nov 2026", source_note: "Punjab medical merit via PMC — verify on kemu.edu.pk" },
  { cycle_id: "CYC013", program_id: "PRG026", academic_year: "2026-2027", application_window: "Jan–Mar 2026", entry_test_required: true, entry_test_name: "AKU Entry Test (AKUEB)", entry_test_window: "Apr–May 2026", merit_list_period: "Jun 2026", classes_start: "Aug 2026", source_note: "AKU has own highly competitive test — verify on aku.edu" },
  { cycle_id: "CYC014", program_id: "PRG028", academic_year: "2026-2027", application_window: "Jun–Aug 2026", entry_test_required: true, entry_test_name: "GCUF Entry Test / NTS-NAT", entry_test_window: "Aug 2026", merit_list_period: "Sep 2026", classes_start: "Oct 2026", source_note: "Verify on gcuf.edu.pk" },
  { cycle_id: "CYC015", program_id: "PRG031", academic_year: "2026-2027", application_window: "Apr–Jun 2026", entry_test_required: true, entry_test_name: "MDCAT (PMC)", entry_test_window: "Aug–Sep 2026", merit_list_period: "Oct 2026", classes_start: "Nov 2026", source_note: "South Punjab medical merit — verify on nmu.edu.pk" },
  { cycle_id: "CYC016", program_id: "PRG033", academic_year: "2026-2027", application_window: "Jun–Jul 2026", entry_test_required: true, entry_test_name: "ECAT-KPK (ETEA)", entry_test_window: "Jul–Aug 2026", merit_list_period: "Aug 2026", classes_start: "Sep 2026", source_note: "KPK Engineering admission via ETEA — verify on uetpeshawar.edu.pk" },
  { cycle_id: "CYC017", program_id: "PRG035", academic_year: "2026-2027", application_window: "Apr–Jun 2026", entry_test_required: true, entry_test_name: "MDCAT (PMC)", entry_test_window: "Aug–Sep 2026", merit_list_period: "Oct 2026", classes_start: "Nov 2026", source_note: "KPK medical merit via PMC — verify on kmu.edu.pk" },
  { cycle_id: "CYC018", program_id: "PRG036", academic_year: "2026-2027", application_window: "Jun–Aug 2026", entry_test_required: true, entry_test_name: "NTS-NAT", entry_test_window: "Aug 2026", merit_list_period: "Sep 2026", classes_start: "Oct 2026", source_note: "Verify on buitms.edu.pk" },
];

// ─────────────────────────────────────────────────────────────
// NEW MERIT FORMULAS (MF006 → MF018)
// ─────────────────────────────────────────────────────────────
export const NEW_MERIT_FORMULAS = [
  { formula_id: "MF006", program_id: "PRG011", matric_weight_pct: 10, fsc_weight_pct: 40, entry_test_weight_pct: 50, min_fsc_percentage_required: 60, approx_recent_closing_merit_pct: 68.0, historical_cutoffs: [{ year: 2022, cutoff: 65.0 }, { year: 2023, cutoff: 66.5 }, { year: 2024, cutoff: 67.2 }, { year: 2025, cutoff: 68.0 }], formula_source_note: "QAU merit; verify on qau.edu.pk" },
  { formula_id: "MF007", program_id: "PRG014", matric_weight_pct: 10, fsc_weight_pct: 40, entry_test_weight_pct: 50, min_fsc_percentage_required: 60, approx_recent_closing_merit_pct: 65.0, historical_cutoffs: [{ year: 2022, cutoff: 62.0 }, { year: 2023, cutoff: 63.5 }, { year: 2024, cutoff: 64.0 }, { year: 2025, cutoff: 65.0 }], formula_source_note: "IIUI merit; verify on iiu.edu.pk" },
  { formula_id: "MF008", program_id: "PRG017", matric_weight_pct: 10, fsc_weight_pct: 30, entry_test_weight_pct: 60, min_fsc_percentage_required: 60, approx_recent_closing_merit_pct: 70.0, historical_cutoffs: [{ year: 2022, cutoff: 67.0 }, { year: 2023, cutoff: 68.0 }, { year: 2024, cutoff: 69.0 }, { year: 2025, cutoff: 70.0 }], formula_source_note: "Air University merit; verify on au.edu.pk" },
  { formula_id: "MF009", program_id: "PRG019", matric_weight_pct: 10, fsc_weight_pct: 40, entry_test_weight_pct: 50, min_fsc_percentage_required: 60, approx_recent_closing_merit_pct: 85.0, historical_cutoffs: [{ year: 2022, cutoff: 82.0 }, { year: 2023, cutoff: 83.0 }, { year: 2024, cutoff: 84.0 }, { year: 2025, cutoff: 85.0 }], formula_source_note: "Medical MDCAT merit; very competitive — verify on riphah.edu.pk" },
  { formula_id: "MF010", program_id: "PRG021", matric_weight_pct: 10, fsc_weight_pct: 40, entry_test_weight_pct: 50, min_fsc_percentage_required: 55, approx_recent_closing_merit_pct: 63.0, historical_cutoffs: [{ year: 2022, cutoff: 60.0 }, { year: 2023, cutoff: 61.0 }, { year: 2024, cutoff: 62.0 }, { year: 2025, cutoff: 63.0 }], formula_source_note: "LCWU merit; women only — verify on lcwu.edu.pk" },
  { formula_id: "MF011", program_id: "PRG023", matric_weight_pct: 10, fsc_weight_pct: 30, entry_test_weight_pct: 60, min_fsc_percentage_required: 60, approx_recent_closing_merit_pct: 71.0, historical_cutoffs: [{ year: 2022, cutoff: 68.0 }, { year: 2023, cutoff: 69.0 }, { year: 2024, cutoff: 70.0 }, { year: 2025, cutoff: 71.0 }], formula_source_note: "FCCU merit; verify on fccollege.edu.pk" },
  { formula_id: "MF012", program_id: "PRG025", matric_weight_pct: 10, fsc_weight_pct: 40, entry_test_weight_pct: 50, min_fsc_percentage_required: 60, approx_recent_closing_merit_pct: 88.5, historical_cutoffs: [{ year: 2022, cutoff: 86.0 }, { year: 2023, cutoff: 87.0 }, { year: 2024, cutoff: 87.8 }, { year: 2025, cutoff: 88.5 }], formula_source_note: "KEMU MBBS extremely competitive; top medical college Punjab" },
  { formula_id: "MF013", program_id: "PRG026", matric_weight_pct: 5, fsc_weight_pct: 25, entry_test_weight_pct: 70, min_fsc_percentage_required: 70, approx_recent_closing_merit_pct: 90.0, historical_cutoffs: [{ year: 2022, cutoff: 88.0 }, { year: 2023, cutoff: 89.0 }, { year: 2024, cutoff: 89.5 }, { year: 2025, cutoff: 90.0 }], formula_source_note: "AKU is Pakistan's most competitive medical admission" },
  { formula_id: "MF014", program_id: "PRG028", matric_weight_pct: 10, fsc_weight_pct: 40, entry_test_weight_pct: 50, min_fsc_percentage_required: 55, approx_recent_closing_merit_pct: 62.0, historical_cutoffs: [{ year: 2022, cutoff: 59.0 }, { year: 2023, cutoff: 60.0 }, { year: 2024, cutoff: 61.0 }, { year: 2025, cutoff: 62.0 }], formula_source_note: "GCUF merit; verify on gcuf.edu.pk" },
  { formula_id: "MF015", program_id: "PRG031", matric_weight_pct: 10, fsc_weight_pct: 40, entry_test_weight_pct: 50, min_fsc_percentage_required: 60, approx_recent_closing_merit_pct: 83.0, historical_cutoffs: [{ year: 2022, cutoff: 80.0 }, { year: 2023, cutoff: 81.0 }, { year: 2024, cutoff: 82.0 }, { year: 2025, cutoff: 83.0 }], formula_source_note: "Nishtar MBBS South Punjab merit — verify on nmu.edu.pk" },
  { formula_id: "MF016", program_id: "PRG033", matric_weight_pct: 10, fsc_weight_pct: 40, entry_test_weight_pct: 50, min_fsc_percentage_required: 60, approx_recent_closing_merit_pct: 67.0, historical_cutoffs: [{ year: 2022, cutoff: 64.0 }, { year: 2023, cutoff: 65.0 }, { year: 2024, cutoff: 66.0 }, { year: 2025, cutoff: 67.0 }], formula_source_note: "UET Peshawar merit via ETEA — verify on uetpeshawar.edu.pk" },
  { formula_id: "MF017", program_id: "PRG035", matric_weight_pct: 10, fsc_weight_pct: 40, entry_test_weight_pct: 50, min_fsc_percentage_required: 60, approx_recent_closing_merit_pct: 82.0, historical_cutoffs: [{ year: 2022, cutoff: 79.0 }, { year: 2023, cutoff: 80.0 }, { year: 2024, cutoff: 81.0 }, { year: 2025, cutoff: 82.0 }], formula_source_note: "KMU MBBS KPK merit — verify on kmu.edu.pk" },
  { formula_id: "MF018", program_id: "PRG036", matric_weight_pct: 10, fsc_weight_pct: 40, entry_test_weight_pct: 50, min_fsc_percentage_required: 50, approx_recent_closing_merit_pct: 58.0, historical_cutoffs: [{ year: 2022, cutoff: 55.0 }, { year: 2023, cutoff: 56.0 }, { year: 2024, cutoff: 57.0 }, { year: 2025, cutoff: 58.0 }], formula_source_note: "BUITEMS merit; Balochistan students get extra weightage — verify on buitms.edu.pk" },
];

// ─────────────────────────────────────────────────────────────
// NEW HOSTEL INFO (HST004 → HST014)
// ─────────────────────────────────────────────────────────────
export const NEW_HOSTEL_INFO = [
  { hostel_id: "HST004", campus_id: "CMP021", available_for: "Both", monthly_cost_pkr_approx: 12000, mess_included: true, seat_availability_note: "QAU hostels available; priority to outstation students — apply early", source_note: "Estimate — verify on qau.edu.pk" },
  { hostel_id: "HST005", campus_id: "CMP022", available_for: "Both", monthly_cost_pkr_approx: 10000, mess_included: true, seat_availability_note: "IIUI has separate male/female hostels; affordable; limited seats", source_note: "Estimate — verify on iiu.edu.pk" },
  { hostel_id: "HST006", campus_id: "CMP023", available_for: "Both", monthly_cost_pkr_approx: 18000, mess_included: true, seat_availability_note: "Air University hostels; limited; priority to engineering students", source_note: "Estimate — verify on au.edu.pk" },
  { hostel_id: "HST007", campus_id: "CMP027", available_for: "Female", monthly_cost_pkr_approx: 10000, mess_included: false, seat_availability_note: "LCWU female-only campus; hostel available for outstation students", source_note: "Estimate — verify on lcwu.edu.pk" },
  { hostel_id: "HST008", campus_id: "CMP029", available_for: "Both", monthly_cost_pkr_approx: 20000, mess_included: true, seat_availability_note: "FCCU has separate male/female hostels on campus; apply during admission", source_note: "Estimate — verify on fccollege.edu.pk" },
  { hostel_id: "HST009", campus_id: "CMP030", available_for: "Both", monthly_cost_pkr_approx: 8000, mess_included: false, seat_availability_note: "KEMU hostels available; very affordable; priority to MBBS students", source_note: "Estimate — verify on kemu.edu.pk" },
  { hostel_id: "HST010", campus_id: "CMP033", available_for: "Both", monthly_cost_pkr_approx: 25000, mess_included: true, seat_availability_note: "AKU on-campus residence available; well-maintained; apply with admission", source_note: "Estimate — verify on aku.edu" },
  { hostel_id: "HST011", campus_id: "CMP037", available_for: "Both", monthly_cost_pkr_approx: 8000, mess_included: false, seat_availability_note: "GCUF hostels affordable; limited seats; apply separately", source_note: "Estimate — verify on gcuf.edu.pk" },
  { hostel_id: "HST012", campus_id: "CMP039", available_for: "Both", monthly_cost_pkr_approx: 7000, mess_included: false, seat_availability_note: "Nishtar hostel available for medical students; very affordable", source_note: "Estimate — verify on nmu.edu.pk" },
  { hostel_id: "HST013", campus_id: "CMP042", available_for: "Both", monthly_cost_pkr_approx: 9000, mess_included: true, seat_availability_note: "UET Peshawar hostels on campus; limited seats for outstation KPK students", source_note: "Estimate — verify on uetpeshawar.edu.pk" },
  { hostel_id: "HST014", campus_id: "CMP046", available_for: "Both", monthly_cost_pkr_approx: 7000, mess_included: true, seat_availability_note: "BUITEMS hostels available; Balochistan students prioritized; apply early", source_note: "Estimate — verify on buitms.edu.pk" },
];

// ─────────────────────────────────────────────────────────────
// HOW TO MERGE IN YOUR src/data/universities.js
// ─────────────────────────────────────────────────────────────
//
// At the bottom of your existing universities.js, add:
//
// import {
//   NEW_UNIVERSITIES, NEW_CAMPUSES, NEW_PROGRAMS,
//   NEW_ADMISSION_CYCLES, NEW_MERIT_FORMULAS, NEW_HOSTEL_INFO
// } from './universities_new_additions.js';
//
// export const ALL_UNIVERSITIES = [...UNIVERSITIES, ...NEW_UNIVERSITIES];
// export const ALL_CAMPUSES     = [...CAMPUSES,      ...NEW_CAMPUSES];
// export const ALL_PROGRAMS     = [...PROGRAMS,      ...NEW_PROGRAMS];
// export const ALL_CYCLES       = [...ADMISSION_CYCLES, ...NEW_ADMISSION_CYCLES];
// export const ALL_MERIT        = [...MERIT_FORMULA,    ...NEW_MERIT_FORMULAS];
// export const ALL_HOSTELS      = [...HOSTEL_INFO,      ...NEW_HOSTEL_INFO];
//
// Then update your matching.js to use ALL_* arrays instead of the originals.
// ─────────────────────────────────────────────────────────────
