// ============================================================
// Pakistan University Finder — MEGA DATABASE
// 100+ Universities across all cities
// Save as: src/data/universitiesMega.js
// ============================================================

export const MEGA_UNIVERSITIES = [

  // ── ISLAMABAD / RAWALPINDI ──────────────────────────────────
  { university_id: "M001", name: "Quaid-i-Azam University", short_name: "QAU", sector: "Government", city: "Islamabad", province: "ICT", website: "https://qau.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Natural Sciences", "Social Sciences", "Business"] },
  { university_id: "M002", name: "International Islamic University Islamabad", short_name: "IIUI", sector: "Government", city: "Islamabad", province: "ICT", website: "https://iiu.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Engineering", "Medical", "Business", "Social Sciences"] },
  { university_id: "M003", name: "Air University", short_name: "AU", sector: "Semi-Government", city: "Islamabad", province: "ICT", website: "https://au.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Engineering"] },
  { university_id: "M004", name: "Bahria University Islamabad", short_name: "BU-ISB", sector: "Semi-Government", city: "Islamabad", province: "ICT", website: "https://www.bahria.edu.pk", has_hostel: false, field_categories: ["CS-IT", "Engineering", "Business", "Medical"] },
  { university_id: "M005", name: "Riphah International University", short_name: "Riphah", sector: "Private", city: "Islamabad", province: "ICT", website: "https://riphah.edu.pk", has_hostel: true, field_categories: ["Medical", "Business", "CS-IT"] },
  { university_id: "M006", name: "COMSATS University Islamabad", short_name: "COMSATS-ISB", sector: "Semi-Government", city: "Islamabad", province: "ICT", website: "https://comsats.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Engineering", "Business", "Natural Sciences"] },
  { university_id: "M007", name: "National University of Sciences and Technology", short_name: "NUST", sector: "Government", city: "Islamabad", province: "ICT", website: "https://nust.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Engineering", "Medical", "Business"] },
  { university_id: "M008", name: "National University of Modern Languages", short_name: "NUML", sector: "Government", city: "Islamabad", province: "ICT", website: "https://numl.edu.pk", has_hostel: true, field_categories: ["Social Sciences", "Business", "CS-IT"] },
  { university_id: "M009", name: "Federal Urdu University of Arts Science and Technology", short_name: "FUUAST", sector: "Government", city: "Islamabad", province: "ICT", website: "https://fuuast.edu.pk", has_hostel: false, field_categories: ["Natural Sciences", "Social Sciences", "CS-IT"] },
  { university_id: "M010", name: "Allama Iqbal Open University", short_name: "AIOU", sector: "Government", city: "Islamabad", province: "ICT", website: "https://aiou.edu.pk", has_hostel: false, field_categories: ["CS-IT", "Business", "Social Sciences", "Natural Sciences"] },
  { university_id: "M011", name: "Foundation University Islamabad", short_name: "FUI", sector: "Private", city: "Islamabad", province: "ICT", website: "https://fui.edu.pk", has_hostel: false, field_categories: ["Medical", "CS-IT", "Engineering", "Business"] },
  { university_id: "M012", name: "Capital University of Science and Technology", short_name: "CUST", sector: "Private", city: "Islamabad", province: "ICT", website: "https://cust.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Engineering", "Business"] },
  { university_id: "M013", name: "Rawalpindi Medical University", short_name: "RMU", sector: "Government", city: "Rawalpindi", province: "Punjab", website: "https://rmu.edu.pk", has_hostel: true, field_categories: ["Medical"] },
  { university_id: "M014", name: "University of Rawalpindi", short_name: "UR", sector: "Government", city: "Rawalpindi", province: "Punjab", website: "https://uor.edu.pk", has_hostel: false, field_categories: ["CS-IT", "Business", "Social Sciences"] },
  { university_id: "M015", name: "Arid Agriculture University Rawalpindi", short_name: "UAAR", sector: "Government", city: "Rawalpindi", province: "Punjab", website: "https://uaar.edu.pk", has_hostel: true, field_categories: ["Agriculture & Sciences", "CS-IT", "Engineering"] },

  // ── LAHORE ─────────────────────────────────────────────────
  { university_id: "M016", name: "University of the Punjab", short_name: "PU", sector: "Government", city: "Lahore", province: "Punjab", website: "https://pu.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Business", "Social Sciences", "Natural Sciences", "Engineering"] },
  { university_id: "M017", name: "Government College University Lahore", short_name: "GCU", sector: "Government", city: "Lahore", province: "Punjab", website: "https://gcu.edu.pk", has_hostel: true, field_categories: ["Natural Sciences", "Social Sciences", "CS-IT", "Business"] },
  { university_id: "M018", name: "University of Engineering and Technology Lahore", short_name: "UET Lahore", sector: "Government", city: "Lahore", province: "Punjab", website: "https://uet.edu.pk", has_hostel: true, field_categories: ["Engineering", "CS-IT"] },
  { university_id: "M019", name: "Lahore University of Management Sciences", short_name: "LUMS", sector: "Private", city: "Lahore", province: "Punjab", website: "https://lums.edu.pk", has_hostel: true, field_categories: ["Business", "CS-IT", "Social Sciences", "Natural Sciences"] },
  { university_id: "M020", name: "National University of Computer and Emerging Sciences Lahore", short_name: "FAST Lahore", sector: "Private", city: "Lahore", province: "Punjab", website: "https://nu.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Engineering", "Business"] },
  { university_id: "M021", name: "Lahore College for Women University", short_name: "LCWU", sector: "Government", city: "Lahore", province: "Punjab", website: "https://lcwu.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Natural Sciences", "Social Sciences", "Business"] },
  { university_id: "M022", name: "King Edward Medical University", short_name: "KEMU", sector: "Government", city: "Lahore", province: "Punjab", website: "https://kemu.edu.pk", has_hostel: true, field_categories: ["Medical"] },
  { university_id: "M023", name: "Allama Iqbal Medical College", short_name: "AIMC", sector: "Government", city: "Lahore", province: "Punjab", website: "https://aimc.edu.pk", has_hostel: true, field_categories: ["Medical"] },
  { university_id: "M024", name: "Forman Christian College University", short_name: "FCCU", sector: "Private", city: "Lahore", province: "Punjab", website: "https://fccollege.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Business", "Social Sciences", "Natural Sciences"] },
  { university_id: "M025", name: "University of Management and Technology", short_name: "UMT", sector: "Private", city: "Lahore", province: "Punjab", website: "https://umt.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Engineering", "Business", "Social Sciences"] },
  { university_id: "M026", name: "Superior University Lahore", short_name: "Superior", sector: "Private", city: "Lahore", province: "Punjab", website: "https://superior.edu.pk", has_hostel: false, field_categories: ["CS-IT", "Engineering", "Business"] },
  { university_id: "M027", name: "Beaconhouse National University", short_name: "BNU", sector: "Private", city: "Lahore", province: "Punjab", website: "https://bnu.edu.pk", has_hostel: true, field_categories: ["Social Sciences", "Business", "CS-IT"] },
  { university_id: "M028", name: "University of Central Punjab", short_name: "UCP", sector: "Private", city: "Lahore", province: "Punjab", website: "https://ucp.edu.pk", has_hostel: false, field_categories: ["CS-IT", "Engineering", "Business", "Medical"] },
  { university_id: "M029", name: "Minhaj University Lahore", short_name: "MUL", sector: "Private", city: "Lahore", province: "Punjab", website: "https://mul.edu.pk", has_hostel: false, field_categories: ["CS-IT", "Business", "Social Sciences"] },
  { university_id: "M030", name: "University of Health Sciences Lahore", short_name: "UHS", sector: "Government", city: "Lahore", province: "Punjab", website: "https://uhs.edu.pk", has_hostel: true, field_categories: ["Medical"] },
  { university_id: "M031", name: "Fatima Jinnah Medical University", short_name: "FJMU", sector: "Government", city: "Lahore", province: "Punjab", website: "https://fjmu.edu.pk", has_hostel: true, field_categories: ["Medical"] },
  { university_id: "M032", name: "Lahore Garrison University", short_name: "LGU", sector: "Private", city: "Lahore", province: "Punjab", website: "https://lgu.edu.pk", has_hostel: false, field_categories: ["CS-IT", "Engineering", "Business"] },
  { university_id: "M033", name: "University of Lahore", short_name: "UOL", sector: "Private", city: "Lahore", province: "Punjab", website: "https://uol.edu.pk", has_hostel: false, field_categories: ["CS-IT", "Engineering", "Business", "Medical"] },
  { university_id: "M034", name: "Hajvery University", short_name: "HU", sector: "Private", city: "Lahore", province: "Punjab", website: "https://hajvery.edu.pk", has_hostel: false, field_categories: ["CS-IT", "Business", "Social Sciences"] },
  { university_id: "M035", name: "COMSATS University Lahore Campus", short_name: "COMSATS Lahore", sector: "Semi-Government", city: "Lahore", province: "Punjab", website: "https://comsats.edu.pk/lahore", has_hostel: true, field_categories: ["CS-IT", "Engineering", "Business"] },

  // ── KARACHI ────────────────────────────────────────────────
  { university_id: "M036", name: "University of Karachi", short_name: "KU", sector: "Government", city: "Karachi", province: "Sindh", website: "https://uok.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Natural Sciences", "Social Sciences", "Business"] },
  { university_id: "M037", name: "NED University of Engineering and Technology", short_name: "NED", sector: "Government", city: "Karachi", province: "Sindh", website: "https://neduet.edu.pk", has_hostel: true, field_categories: ["Engineering", "CS-IT"] },
  { university_id: "M038", name: "Dow University of Health Sciences", short_name: "DUHS", sector: "Government", city: "Karachi", province: "Sindh", website: "https://duhs.edu.pk", has_hostel: true, field_categories: ["Medical"] },
  { university_id: "M039", name: "Institute of Business Administration Karachi", short_name: "IBA", sector: "Government-Autonomous", city: "Karachi", province: "Sindh", website: "https://iba.edu.pk", has_hostel: true, field_categories: ["Business", "CS-IT"] },
  { university_id: "M040", name: "Aga Khan University", short_name: "AKU", sector: "Private", city: "Karachi", province: "Sindh", website: "https://aku.edu", has_hostel: true, field_categories: ["Medical"] },
  { university_id: "M041", name: "Hamdard University", short_name: "Hamdard", sector: "Private", city: "Karachi", province: "Sindh", website: "https://hamdard.edu.pk", has_hostel: true, field_categories: ["Medical", "Business", "Engineering"] },
  { university_id: "M042", name: "Sir Syed University of Engineering and Technology", short_name: "SSUET", sector: "Private", city: "Karachi", province: "Sindh", website: "https://ssuet.edu.pk", has_hostel: false, field_categories: ["Engineering", "CS-IT"] },
  { university_id: "M043", name: "Karachi Institute of Economics and Technology", short_name: "KIET", sector: "Private", city: "Karachi", province: "Sindh", website: "https://kiet.edu", has_hostel: false, field_categories: ["Engineering", "CS-IT", "Business"] },
  { university_id: "M044", name: "Bahria University Karachi", short_name: "BU-KHI", sector: "Semi-Government", city: "Karachi", province: "Sindh", website: "https://www.bahria.edu.pk/buk", has_hostel: false, field_categories: ["CS-IT", "Engineering", "Business", "Medical"] },
  { university_id: "M045", name: "Indus Valley School of Art and Architecture", short_name: "IVS", sector: "Private", city: "Karachi", province: "Sindh", website: "https://ivs.edu.pk", has_hostel: false, field_categories: ["Social Sciences"] },
  { university_id: "M046", name: "University of Sindh", short_name: "USINDH", sector: "Government", city: "Jamshoro", province: "Sindh", website: "https://usindh.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Natural Sciences", "Social Sciences", "Business"] },
  { university_id: "M047", name: "Mehran University of Engineering and Technology", short_name: "MUET", sector: "Government", city: "Jamshoro", province: "Sindh", website: "https://muet.edu.pk", has_hostel: true, field_categories: ["Engineering", "CS-IT"] },
  { university_id: "M048", name: "Shaheed Zulfikar Ali Bhutto Institute of Science and Technology", short_name: "SZABIST", sector: "Private", city: "Karachi", province: "Sindh", website: "https://szabist.edu.pk", has_hostel: false, field_categories: ["CS-IT", "Business", "Social Sciences"] },
  { university_id: "M049", name: "FAST NUCES Karachi", short_name: "FAST Karachi", sector: "Private", city: "Karachi", province: "Sindh", website: "https://nu.edu.pk/karachi", has_hostel: false, field_categories: ["CS-IT", "Engineering"] },
  { university_id: "M050", name: "Jinnah Sindh Medical University", short_name: "JSMU", sector: "Government", city: "Karachi", province: "Sindh", website: "https://jsmu.edu.pk", has_hostel: true, field_categories: ["Medical"] },

  // ── FAISALABAD ─────────────────────────────────────────────
  { university_id: "M051", name: "University of Agriculture Faisalabad", short_name: "UAF", sector: "Government", city: "Faisalabad", province: "Punjab", website: "https://uaf.edu.pk", has_hostel: true, field_categories: ["Agriculture & Sciences", "CS-IT", "Engineering"] },
  { university_id: "M052", name: "Government College University Faisalabad", short_name: "GCUF", sector: "Government", city: "Faisalabad", province: "Punjab", website: "https://gcuf.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Business", "Natural Sciences", "Social Sciences"] },
  { university_id: "M053", name: "National Textile University", short_name: "NTU", sector: "Government", city: "Faisalabad", province: "Punjab", website: "https://ntu.edu.pk", has_hostel: true, field_categories: ["Engineering", "CS-IT"] },
  { university_id: "M054", name: "University of Faisalabad", short_name: "TUF", sector: "Private", city: "Faisalabad", province: "Punjab", website: "https://tuf.edu.pk", has_hostel: false, field_categories: ["CS-IT", "Engineering", "Business", "Medical"] },
  { university_id: "M055", name: "Faisalabad Medical University", short_name: "FMU", sector: "Government", city: "Faisalabad", province: "Punjab", website: "https://fmu.edu.pk", has_hostel: true, field_categories: ["Medical"] },
  { university_id: "M056", name: "COMSATS University Faisalabad", short_name: "COMSATS-FSD", sector: "Semi-Government", city: "Faisalabad", province: "Punjab", website: "https://comsats.edu.pk/faisalabad", has_hostel: true, field_categories: ["CS-IT", "Engineering", "Business"] },

  // ── MULTAN ─────────────────────────────────────────────────
  { university_id: "M057", name: "Bahauddin Zakariya University", short_name: "BZU", sector: "Government", city: "Multan", province: "Punjab", website: "https://bzu.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Business", "Social Sciences", "Natural Sciences"] },
  { university_id: "M058", name: "Nishtar Medical University", short_name: "NMU", sector: "Government", city: "Multan", province: "Punjab", website: "https://nmu.edu.pk", has_hostel: true, field_categories: ["Medical"] },
  { university_id: "M059", name: "Muhammad Nawaz Shareef University of Agriculture", short_name: "MNSUA", sector: "Government", city: "Multan", province: "Punjab", website: "https://mnsuam.edu.pk", has_hostel: true, field_categories: ["Agriculture & Sciences"] },
  { university_id: "M060", name: "The Islamia University of Bahawalpur", short_name: "IUB", sector: "Government", city: "Bahawalpur", province: "Punjab", website: "https://iub.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Engineering", "Business", "Social Sciences"] },
  { university_id: "M061", name: "Ghazi University Dera Ghazi Khan", short_name: "GU-DGK", sector: "Government", city: "Dera Ghazi Khan", province: "Punjab", website: "https://gudgk.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Business", "Social Sciences"] },

  // ── PESHAWAR / KPK ─────────────────────────────────────────
  { university_id: "M062", name: "University of Peshawar", short_name: "UOP", sector: "Government", city: "Peshawar", province: "KPK", website: "https://uop.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Natural Sciences", "Social Sciences", "Business"] },
  { university_id: "M063", name: "University of Engineering and Technology Peshawar", short_name: "UET Peshawar", sector: "Government", city: "Peshawar", province: "KPK", website: "https://uetpeshawar.edu.pk", has_hostel: true, field_categories: ["Engineering", "CS-IT"] },
  { university_id: "M064", name: "Khyber Medical University", short_name: "KMU", sector: "Government", city: "Peshawar", province: "KPK", website: "https://kmu.edu.pk", has_hostel: true, field_categories: ["Medical"] },
  { university_id: "M065", name: "City University of Science and Information Technology", short_name: "CUSIT", sector: "Private", city: "Peshawar", province: "KPK", website: "https://cusit.edu.pk", has_hostel: false, field_categories: ["CS-IT", "Engineering", "Business"] },
  { university_id: "M066", name: "Islamia College University Peshawar", short_name: "ICP", sector: "Government", city: "Peshawar", province: "KPK", website: "https://icp.edu.pk", has_hostel: true, field_categories: ["Natural Sciences", "Social Sciences", "CS-IT"] },
  { university_id: "M067", name: "COMSATS University Abbottabad", short_name: "COMSATS-ABT", sector: "Semi-Government", city: "Abbottabad", province: "KPK", website: "https://comsats.edu.pk/abbottabad", has_hostel: true, field_categories: ["CS-IT", "Engineering", "Business"] },
  { university_id: "M068", name: "Hazara University Mansehra", short_name: "HU-MNS", sector: "Government", city: "Mansehra", province: "KPK", website: "https://hu.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Natural Sciences", "Social Sciences"] },
  { university_id: "M069", name: "Abdul Wali Khan University Mardan", short_name: "AWKUM", sector: "Government", city: "Mardan", province: "KPK", website: "https://awkum.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Natural Sciences", "Social Sciences", "Business"] },
  { university_id: "M070", name: "University of Swat", short_name: "USWAT", sector: "Government", city: "Swat", province: "KPK", website: "https://uswat.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Natural Sciences", "Social Sciences"] },
  { university_id: "M071", name: "Gomal University Dera Ismail Khan", short_name: "GU-DIK", sector: "Government", city: "Dera Ismail Khan", province: "KPK", website: "https://gu.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Medical", "Business", "Social Sciences"] },
  { university_id: "M072", name: "University of Malakand", short_name: "UOM", sector: "Government", city: "Chakdara", province: "KPK", website: "https://uom.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Natural Sciences", "Social Sciences"] },
  { university_id: "M073", name: "Bacha Khan University Charsadda", short_name: "BKUC", sector: "Government", city: "Charsadda", province: "KPK", website: "https://bkuc.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Natural Sciences", "Social Sciences"] },
  { university_id: "M074", name: "FAST NUCES Peshawar", short_name: "FAST Peshawar", sector: "Private", city: "Peshawar", province: "KPK", website: "https://nu.edu.pk/peshawar", has_hostel: false, field_categories: ["CS-IT", "Engineering"] },

  // ── QUETTA / BALOCHISTAN ────────────────────────────────────
  { university_id: "M075", name: "University of Balochistan", short_name: "UOB", sector: "Government", city: "Quetta", province: "Balochistan", website: "https://uob.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Natural Sciences", "Social Sciences", "Business"] },
  { university_id: "M076", name: "Balochistan University of IT Engineering and Management Sciences", short_name: "BUITEMS", sector: "Government", city: "Quetta", province: "Balochistan", website: "https://buitms.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Engineering", "Business"] },
  { university_id: "M077", name: "University of Turbat", short_name: "UOT", sector: "Government", city: "Turbat", province: "Balochistan", website: "https://uot.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Social Sciences"] },
  { university_id: "M078", name: "Lasbela University of Agriculture Water and Marine Sciences", short_name: "LUAWMS", sector: "Government", city: "Uthal", province: "Balochistan", website: "https://luawms.edu.pk", has_hostel: true, field_categories: ["Agriculture & Sciences"] },
  { university_id: "M079", name: "Sardar Bahadur Khan Women University", short_name: "SBKWU", sector: "Government", city: "Quetta", province: "Balochistan", website: "https://sbkwu.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Natural Sciences", "Social Sciences"] },

  // ── OTHER PUNJAB CITIES ─────────────────────────────────────
  { university_id: "M080", name: "University of Gujrat", short_name: "UOG", sector: "Government", city: "Gujrat", province: "Punjab", website: "https://uog.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Engineering", "Business", "Social Sciences"] },
  { university_id: "M081", name: "University of Sargodha", short_name: "UOS", sector: "Government", city: "Sargodha", province: "Punjab", website: "https://uos.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Business", "Natural Sciences", "Social Sciences"] },
  { university_id: "M082", name: "University of Education Lahore", short_name: "UE", sector: "Government", city: "Lahore", province: "Punjab", website: "https://ue.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Social Sciences", "Natural Sciences"] },
  { university_id: "M083", name: "University of Okara", short_name: "UO", sector: "Government", city: "Okara", province: "Punjab", website: "https://uo.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Social Sciences", "Business"] },
  { university_id: "M084", name: "University of Sahiwal", short_name: "UOS-SWL", sector: "Government", city: "Sahiwal", province: "Punjab", website: "https://uosahiwal.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Business", "Social Sciences"] },
  { university_id: "M085", name: "University of Jhang", short_name: "UOJ", sector: "Government", city: "Jhang", province: "Punjab", website: "https://uoj.edu.pk", has_hostel: false, field_categories: ["CS-IT", "Business", "Social Sciences"] },
  { university_id: "M086", name: "Khwaja Fareed University of Engineering and IT", short_name: "KFUEIT", sector: "Government", city: "Rahim Yar Khan", province: "Punjab", website: "https://kfueit.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Engineering"] },
  { university_id: "M087", name: "University of Sialkot", short_name: "USKT", sector: "Private", city: "Sialkot", province: "Punjab", website: "https://uskt.edu.pk", has_hostel: false, field_categories: ["CS-IT", "Business", "Engineering"] },
  { university_id: "M088", name: "University of Narowal", short_name: "UON", sector: "Government", city: "Narowal", province: "Punjab", website: "https://uon.edu.pk", has_hostel: false, field_categories: ["CS-IT", "Social Sciences"] },
  { university_id: "M089", name: "Women University Multan", short_name: "WUM", sector: "Government", city: "Multan", province: "Punjab", website: "https://wum.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Natural Sciences", "Social Sciences", "Business"] },
  { university_id: "M090", name: "Cholistan University of Veterinary and Animal Sciences", short_name: "CUVAS", sector: "Government", city: "Bahawalpur", province: "Punjab", website: "https://cuvas.edu.pk", has_hostel: true, field_categories: ["Agriculture & Sciences"] },
  { university_id: "M091", name: "University of Veterinary and Animal Sciences", short_name: "UVAS", sector: "Government", city: "Lahore", province: "Punjab", website: "https://uvas.edu.pk", has_hostel: true, field_categories: ["Agriculture & Sciences", "Medical"] },
  { university_id: "M092", name: "Mirpur University of Science and Technology", short_name: "MUST", sector: "Government", city: "Mirpur", province: "AJK", website: "https://must.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Engineering", "Business"] },
  { university_id: "M093", name: "University of AJK Muzaffarabad", short_name: "UAJK", sector: "Government", city: "Muzaffarabad", province: "AJK", website: "https://ajku.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Natural Sciences", "Social Sciences"] },

  // ── GIKI & SPECIAL UNIVERSITIES ────────────────────────────
  { university_id: "M094", name: "Ghulam Ishaq Khan Institute", short_name: "GIKI", sector: "Private", city: "Topi", province: "KPK", website: "https://giki.edu.pk", has_hostel: true, field_categories: ["Engineering", "CS-IT"] },
  { university_id: "M095", name: "Pakistan Institute of Engineering and Applied Sciences", short_name: "PIEAS", sector: "Government", city: "Islamabad", province: "ICT", website: "https://pieas.edu.pk", has_hostel: true, field_categories: ["Engineering", "CS-IT", "Natural Sciences"] },
  { university_id: "M096", name: "Institute of Space Technology", short_name: "IST", sector: "Government", city: "Islamabad", province: "ICT", website: "https://ist.edu.pk", has_hostel: true, field_categories: ["Engineering", "CS-IT"] },
  { university_id: "M097", name: "Pakistan Institute of Fashion and Design", short_name: "PIFD", sector: "Government", city: "Lahore", province: "Punjab", website: "https://pifd.edu.pk", has_hostel: false, field_categories: ["Social Sciences"] },
  { university_id: "M098", name: "National College of Arts", short_name: "NCA", sector: "Government", city: "Lahore", province: "Punjab", website: "https://nca.edu.pk", has_hostel: false, field_categories: ["Social Sciences"] },
  { university_id: "M099", name: "Karakoram International University", short_name: "KIU", sector: "Government", city: "Gilgit", province: "GB", website: "https://kiu.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Natural Sciences", "Social Sciences"] },
  { university_id: "M100", name: "University of Baltistan", short_name: "UOBS", sector: "Government", city: "Skardu", province: "GB", website: "https://uobs.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Natural Sciences", "Social Sciences"] },
  { university_id: "M101", name: "Shaheed Benazir Bhutto University Sheringal", short_name: "SBBUS", sector: "Government", city: "Dir", province: "KPK", website: "https://sbbus.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Social Sciences"] },
  { university_id: "M102", name: "Kohat University of Science and Technology", short_name: "KUST", sector: "Government", city: "Kohat", province: "KPK", website: "https://kust.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Engineering", "Natural Sciences"] },
  { university_id: "M103", name: "Women University Swabi", short_name: "WUS", sector: "Government", city: "Swabi", province: "KPK", website: "https://wus.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Natural Sciences", "Social Sciences"] },
  { university_id: "M104", name: "University of Turbat", short_name: "UOT-BAL", sector: "Government", city: "Turbat", province: "Balochistan", website: "https://uot.edu.pk", has_hostel: true, field_categories: ["CS-IT", "Social Sciences"] },
  { university_id: "M105", name: "Shaheed Zulfikar Ali Bhutto University of Law", short_name: "SZABUL", sector: "Government", city: "Karachi", province: "Sindh", website: "https://szabul.edu.pk", has_hostel: false, field_categories: ["Social Sciences"] },
];

// ─────────────────────────────────────────────────────────────
// ALL UNIQUE CITIES (for quiz city selection)
// ─────────────────────────────────────────────────────────────
export const ALL_CITIES = [
  // Punjab
  "Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujrat",
  "Sargodha", "Bahawalpur", "Sialkot", "Rahim Yar Khan",
  "Okara", "Sahiwal", "Jhang", "Narowal",
  // Islamabad
  "Islamabad",
  // KPK
  "Peshawar", "Abbottabad", "Mardan", "Mansehra", "Swat",
  "Dera Ismail Khan", "Kohat", "Charsadda", "Swabi",
  "Chakdara", "Dir",
  // Sindh
  "Karachi", "Jamshoro",
  // Balochistan
  "Quetta", "Turbat", "Uthal",
  // AJK
  "Mirpur", "Muzaffarabad",
  // Gilgit Baltistan
  "Gilgit", "Skardu",
];
