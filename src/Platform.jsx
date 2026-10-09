import { useEffect, useState } from 'react';
import {
  FiActivity, FiArrowRight, FiArrowUpRight, FiBell,
  FiBookOpen, FiCalendar, FiCheck, FiChevronDown, FiClock, FiDownload,
  FiEdit2, FiFilter, FiGrid, FiLayers, FiLogOut, FiMenu, FiMessageCircle,
  FiMoreHorizontal, FiPlus, FiSearch, FiSettings, FiShield,
  FiSun, FiTarget, FiTrash2, FiUsers, FiX,
} from 'react-icons/fi';
import './Platform.css';
import Workspace from './Workspace';

const STORAGE_KEY = 'ittat-platform-courses';
const LANGUAGE_KEY = 'ittat-platform-language';
const THEME_KEY = 'ittat-platform-theme';

const initialCourses = [
  { id: 1, title: 'Frontend Development', category: 'Dasturlash', teacher: 'Azizbek Karimov', lessons: 32, duration: '12 hafta', progress: 68, color: 'blue', icon: '</>' },
  { id: 2, title: 'Backend Development', category: 'Dasturlash', teacher: 'Dilshod Rahimov', lessons: 28, duration: '14 hafta', progress: 24, color: 'purple', icon: '{ }' },
  { id: 3, title: 'Kompyuter savodxonligi', category: 'Boshlang‘ich', teacher: 'Madina Islomova', lessons: 18, duration: '8 hafta', progress: 100, color: 'orange', icon: '⌘' },
  { id: 4, title: 'Grafik dizayn', category: 'Dizayn', teacher: 'Malika Saidova', lessons: 24, duration: '10 hafta', progress: 42, color: 'pink', icon: '✳' },
  { id: 5, title: 'SMM va marketing', category: 'Marketing', teacher: 'Javohir Umarov', lessons: 20, duration: '8 hafta', progress: 0, color: 'green', icon: '↗' },
  { id: 6, title: 'Foundation', category: 'Boshlang‘ich', teacher: 'Azizbek Karimov', lessons: 16, duration: '6 hafta', progress: 0, color: 'cyan', icon: '✦' },
  { id: 7, title: 'Robototexnika', category: 'Texnologiya', teacher: 'Shahzod Aliyev', lessons: 26, duration: '12 hafta', progress: 0, color: 'orange', icon: '◉' },
  { id: 8, title: 'JavaScript va React', category: 'Dasturlash', teacher: 'Dilshod Rahimov', lessons: 30, duration: '12 hafta', progress: 0, color: 'blue', icon: 'JS' },
  { id: 9, title: 'Python dasturlash', category: 'Dasturlash', teacher: 'Shahzod Aliyev', lessons: 27, duration: '11 hafta', progress: 0, color: 'purple', icon: 'Py' },
  { id: 10, title: 'UI/UX dizayn', category: 'Dizayn', teacher: 'Malika Saidova', lessons: 22, duration: '9 hafta', progress: 0, color: 'pink', icon: '◩' },
  { id: 11, title: 'Mobil ilovalar', category: 'Texnologiya', teacher: 'Javohir Umarov', lessons: 25, duration: '12 hafta', progress: 0, color: 'green', icon: '▣' },
  { id: 12, title: 'Data analytics', category: 'Texnologiya', teacher: 'Madina Islomova', lessons: 24, duration: '10 hafta', progress: 0, color: 'cyan', icon: '⌁' },
];

const dictionaries = {
  uz: {
    dashboard: 'Boshqaruv paneli', courses: 'Mening kurslarim', lessons: 'Video darslar', live: 'Jonli darslar',
    assignments: 'Topshiriqlar', tests: 'Testlar va imtihonlar', resources: 'O‘quv materiallari', calendar: 'Kalendar',
    messages: 'Xabarlar', notifications: 'Bildirishnomalar', certificates: 'Sertifikatlar', payments: 'To‘lovlar tarixi', profile: 'Profil va sozlamalar',
    students: 'O‘quvchilar', courseManagement: 'Kurslarni boshqarish', teachers: 'O‘qituvchilar',
    orders: 'To‘lovlar va buyurtmalar', reports: 'Daromadlar hisoboti', content: 'Sayt kontenti',
    translations: 'Tarjimalar', roles: 'Foydalanuvchi rollari', systemSettings: 'Tizim sozlamalari',
    home: 'Bosh sahifa', search: 'Kurslar, darslar yoki o‘qituvchini qidiring...',
    student: 'O‘quvchi', director: 'Direktor / Admin', welcome: 'Xush kelibsiz!',
    loginSuccess: 'IT TAT platformasiga muvaffaqiyatli kirdingiz.', continue: 'O‘qishni davom ettirish',
    allCourses: 'Barcha kurslar', myProgress: 'Mening natijalarim', upcoming: 'Yaqinlashayotgan darslar',
    recent: 'So‘nggi faoliyat', enrolled: 'Faol kurslar', completed: 'Tugallangan darslar',
    certificatesCount: 'Sertifikatlar', weekly: 'Haftalik faollik', goal: 'Haftalik maqsad',
    explore: 'Kurslarni ko‘rish', lessonsLabel: 'dars', weeks: 'hafta', progress: 'Jarayon',
    addCourse: 'Kurs qo‘shish', edit: 'Tahrirlash', delete: 'O‘chirish', save: 'Saqlash',
    cancel: 'Bekor qilish', title: 'Kurs nomi', teacher: 'O‘qituvchi', duration: 'Davomiyligi',
    category: 'Yo‘nalish', deleteConfirm: 'Ushbu kursni o‘chirishni xohlaysizmi?',
    saved: 'O‘zgarishlar saqlandi', deleted: 'Kurs o‘chirildi', added: 'Yangi kurs qo‘shildi',
    enrolledNotice: 'Kurs ro‘yxatingizga qo‘shildi', continueLesson: 'Darsni davom ettirish',
    enrolledAction: 'Kursga yozilish', viewAll: 'Barchasini ko‘rish', activeStudents: 'Faol o‘quvchilar',
    totalStudents: 'Jami o‘quvchilar', instructors: 'O‘qituvchilar', monthlyRevenue: 'Oylik daromad',
    courseOverview: 'Kurslar bo‘yicha holat', studentActivity: 'O‘quvchilar faolligi',
    latestStudents: 'Yangi o‘quvchilar', course: 'Kurs', status: 'Holat', actions: 'Amallar',
    active: 'Faol', open: 'Ochiq', completedStatus: 'Tugallangan', searchResults: 'Qidiruv natijalari',
    noResults: 'Hech narsa topilmadi', logout: 'Chiqish', theme: 'Ko‘rinish', light: 'Yorug‘',
    dark: 'Qorong‘i', system: 'Tizim', language: 'Til', menu: 'Menyu', seeSchedule: 'Jadvalni ko‘rish',
    all: 'Hammasi', lessonsLeft: 'keyingi dars', deletePrompt: 'Tasdiqlash', joined: 'Bugun qo‘shildi',
    activityText: 'React komponentlarini o‘rgandingiz', activityTask: 'Topshiriq muvaffaqiyatli topshirildi',
    activityQuiz: 'JavaScript testidan 92% oldingiz', today: 'Bugun, 18:30', tomorrow: 'Ertaga, 16:00',
    monday: 'Du', tuesday: 'Se', wednesday: 'Cho', thursday: 'Pa', friday: 'Ju', saturday: 'Sha', sunday: 'Ya',
    points: 'ball', coursesCount: 'ta kurs', menuOpen: 'Menyuni ochish', selectTheme: 'Mavzuni tanlash',
  },
  ru: {
    dashboard: 'Панель управления', courses: 'Мои курсы', lessons: 'Видеоуроки', live: 'Живые занятия',
    assignments: 'Задания', tests: 'Тесты и экзамены', resources: 'Учебные материалы', calendar: 'Календарь',
    messages: 'Сообщения', notifications: 'Уведомления', certificates: 'Сертификаты', payments: 'История платежей', profile: 'Профиль и настройки',
    students: 'Ученики', courseManagement: 'Управление курсами', teachers: 'Преподаватели',
    orders: 'Платежи и заказы', reports: 'Отчёт о доходах', content: 'Контент сайта',
    translations: 'Переводы', roles: 'Роли пользователей', systemSettings: 'Настройки системы',
    home: 'Главная', search: 'Поиск курсов, уроков и преподавателей...',
    student: 'Ученик', director: 'Директор / Админ', welcome: 'Добро пожаловать!',
    loginSuccess: 'Вы успешно вошли на платформу IT TAT.', continue: 'Продолжить обучение',
    allCourses: 'Все курсы', myProgress: 'Мой прогресс', upcoming: 'Ближайшие занятия',
    recent: 'Последняя активность', enrolled: 'Активные курсы', completed: 'Завершённые уроки',
    certificatesCount: 'Сертификаты', weekly: 'Активность за неделю', goal: 'Цель на неделю',
    explore: 'Смотреть курсы', lessonsLabel: 'уроков', weeks: 'нед.', progress: 'Прогресс',
    addCourse: 'Добавить курс', edit: 'Изменить', delete: 'Удалить', save: 'Сохранить',
    cancel: 'Отмена', title: 'Название курса', teacher: 'Преподаватель', duration: 'Длительность',
    category: 'Направление', deleteConfirm: 'Удалить этот курс?',
    saved: 'Изменения сохранены', deleted: 'Курс удалён', added: 'Новый курс добавлен',
    enrolledNotice: 'Курс добавлен в ваш список', continueLesson: 'Продолжить урок',
    enrolledAction: 'Записаться', viewAll: 'Смотреть все', activeStudents: 'Активные ученики',
    totalStudents: 'Всего учеников', instructors: 'Преподаватели', monthlyRevenue: 'Доход за месяц',
    courseOverview: 'Обзор курсов', studentActivity: 'Активность учеников',
    latestStudents: 'Новые ученики', course: 'Курс', status: 'Статус', actions: 'Действия',
    active: 'Активен', open: 'Открыт', completedStatus: 'Завершён', searchResults: 'Результаты поиска',
    noResults: 'Ничего не найдено', logout: 'Выйти', theme: 'Оформление', light: 'Светлая',
    dark: 'Тёмная', system: 'Системная', language: 'Язык', menu: 'Меню', seeSchedule: 'Расписание',
    all: 'Все', lessonsLeft: 'следующий урок', deletePrompt: 'Подтвердить', joined: 'Добавлен сегодня',
    activityText: 'Вы изучили компоненты React', activityTask: 'Задание успешно отправлено',
    activityQuiz: 'Вы набрали 92% в тесте JavaScript', today: 'Сегодня, 18:30', tomorrow: 'Завтра, 16:00',
    monday: 'Пн', tuesday: 'Вт', wednesday: 'Ср', thursday: 'Чт', friday: 'Пт', saturday: 'Сб', sunday: 'Вс',
    points: 'баллов', coursesCount: 'курсов', menuOpen: 'Открыть меню', selectTheme: 'Выбрать тему',
  },
  en: {
    dashboard: 'Dashboard', courses: 'My courses', lessons: 'Video lessons', live: 'Live classes',
    assignments: 'Assignments', tests: 'Tests & exams', resources: 'Learning resources', calendar: 'Calendar',
    messages: 'Messages', notifications: 'Notifications', certificates: 'Certificates', payments: 'Payment history', profile: 'Profile & settings',
    students: 'Students', courseManagement: 'Course management', teachers: 'Instructors',
    orders: 'Payments & orders', reports: 'Revenue reports', content: 'Website content',
    translations: 'Translations', roles: 'User roles', systemSettings: 'System settings',
    home: 'Home', search: 'Search courses, lessons or instructors...',
    student: 'Student', director: 'Director / Admin', welcome: 'Welcome back!',
    loginSuccess: 'You have successfully signed in to IT TAT.', continue: 'Continue learning',
    allCourses: 'All courses', myProgress: 'My progress', upcoming: 'Upcoming classes',
    recent: 'Recent activity', enrolled: 'Active courses', completed: 'Lessons completed',
    certificatesCount: 'Certificates', weekly: 'Weekly activity', goal: 'Weekly goal',
    explore: 'Explore courses', lessonsLabel: 'lessons', weeks: 'weeks', progress: 'Progress',
    addCourse: 'Add course', edit: 'Edit', delete: 'Delete', save: 'Save',
    cancel: 'Cancel', title: 'Course title', teacher: 'Instructor', duration: 'Duration',
    category: 'Category', deleteConfirm: 'Delete this course?',
    saved: 'Changes saved', deleted: 'Course deleted', added: 'New course added',
    enrolledNotice: 'Course added to your list', continueLesson: 'Continue lesson',
    enrolledAction: 'Enroll now', viewAll: 'View all', activeStudents: 'Active students',
    totalStudents: 'Total students', instructors: 'Instructors', monthlyRevenue: 'Monthly revenue',
    courseOverview: 'Course overview', studentActivity: 'Student activity',
    latestStudents: 'Latest students', course: 'Course', status: 'Status', actions: 'Actions',
    active: 'Active', open: 'Open', completedStatus: 'Completed', searchResults: 'Search results',
    noResults: 'No results found', logout: 'Sign out', theme: 'Appearance', light: 'Light',
    dark: 'Dark', system: 'System', language: 'Language', menu: 'Menu', seeSchedule: 'View schedule',
    all: 'All', lessonsLeft: 'next lesson', deletePrompt: 'Confirm', joined: 'Joined today',
    activityText: 'You learned React components', activityTask: 'Assignment submitted successfully',
    activityQuiz: 'You scored 92% on the JavaScript quiz', today: 'Today, 6:30 PM', tomorrow: 'Tomorrow, 4:00 PM',
    monday: 'Mo', tuesday: 'Tu', wednesday: 'We', thursday: 'Th', friday: 'Fr', saturday: 'Sa', sunday: 'Su',
    points: 'points', coursesCount: 'courses', menuOpen: 'Open menu', selectTheme: 'Select theme',
  },
};

const studentNav = [
  ['dashboard', FiGrid], ['courses', FiBookOpen], ['lessons', FiLayers], ['live', FiActivity],
  ['assignments', FiCheck], ['tests', FiTarget], ['resources', FiDownload], ['calendar', FiCalendar],
  ['messages', FiMessageCircle], ['certificates', FiShield], ['payments', FiActivity], ['profile', FiSettings],
];
const adminNav = [
  ['dashboard', FiGrid], ['students', FiUsers], ['courseManagement', FiBookOpen], ['lessons', FiLayers],
  ['teachers', FiUsers], ['tests', FiTarget], ['certificates', FiShield], ['live', FiActivity],
  ['orders', FiActivity], ['reports', FiArrowUpRight], ['messages', FiMessageCircle], ['notifications', FiBell],
  ['content', FiLayers], ['translations', FiGrid], ['roles', FiShield], ['systemSettings', FiSettings],
];
const titles = {
  uz: initialCourses.map((course) => course.title),
  ru: ['Frontend-разработка', 'Backend-разработка', 'Компьютерная грамотность', 'Графический дизайн', 'SMM и маркетинг', 'Foundation', 'Робототехника', 'JavaScript и React', 'Программирование на Python', 'UI/UX-дизайн', 'Мобильные приложения', 'Аналитика данных'],
  en: ['Frontend development', 'Backend development', 'Computer literacy', 'Graphic design', 'SMM & marketing', 'Foundation', 'Robotics', 'JavaScript & React', 'Python programming', 'UI/UX design', 'Mobile apps', 'Data analytics'],
};

function loadCourses() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialCourses;
  } catch {
    return initialCourses;
  }
}

function loadPlatformData(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function validExternalUrl(value) {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

function accountKey(phone) {
  const digits = String(phone || '').replace(/\D/g, '').slice(-9);
  return digits || 'demo-account';
}

function loadEnrollment(phone) {
  try {
    const value = localStorage.getItem(`ittat-platform-enrollment-${accountKey(phone)}`);
    return value ? JSON.parse(value) : [1, 2, 3, 4];
  } catch {
    return [1, 2, 3, 4];
  }
}

export default function Platform({ user, onBack }) {
  const isAdmin = user.role === 'director';
  const [language, setLanguage] = useState(() => localStorage.getItem(LANGUAGE_KEY) || 'uz');
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || (isAdmin ? 'dark' : 'light'));
  const [courses, setCourses] = useState(loadCourses);
  const [active, setActive] = useState('dashboard');
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [editing, setEditing] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [enrolled, setEnrolled] = useState(() => loadEnrollment(user.phone));
  const [studentProgress, setStudentProgress] = useState(() => loadPlatformData(`ittat-platform-progress-${accountKey(user.phone)}`, {}));
  const studentCourses = courses.map((course) => ({ ...course, progress: studentProgress[course.id] ?? course.progress }));
  const t = (key) => {
    if (key === 'dashboard') {
      const overrides = loadPlatformData('ittat-workspace-translations', {});
      if (overrides[language]) return overrides[language];
    }
    return dictionaries[language][key] || key;
  };
  const navItems = isAdmin ? adminNav : studentNav;
  const currentNav = navItems.find(([key]) => key === active) || navItems[0];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  }, [courses]);
  useEffect(() => localStorage.setItem(LANGUAGE_KEY, language), [language]);
  useEffect(() => localStorage.setItem(THEME_KEY, theme), [theme]);
  useEffect(() => localStorage.setItem(`ittat-platform-enrollment-${accountKey(user.phone)}`, JSON.stringify(enrolled)), [enrolled, user.phone]);
  useEffect(() => localStorage.setItem(`ittat-platform-progress-${accountKey(user.phone)}`, JSON.stringify(studentProgress)), [studentProgress, user.phone]);
  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const needle = query.trim().toLocaleLowerCase();
  const visibleCourses = courses.filter((course) => {
    const title = titles[language][course.id - 1] || course.title;
    return !needle || `${title} ${course.teacher} ${course.category}`.toLocaleLowerCase().includes(needle);
  });

  const chooseSection = (key) => {
    setActive(key);
    setMobileOpen(false);
    setQuery('');
  };

  const saveCourse = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get('title') || '').trim();
    if (!title) return;
    const imageInput = String(data.get('imageUrl') || '').trim();
    const videoInput = String(data.get('videoUrl') || '').trim();
    const imageUrl = validExternalUrl(imageInput);
    const videoUrl = validExternalUrl(videoInput);
    if ((imageInput && !imageUrl) || (videoInput && !videoUrl)) {
      setToast('Rasm va video havolalari http yoki https manzil bo‘lishi kerak.');
      return;
    }
    const values = {
      title,
      teacher: String(data.get('teacher') || '').trim() || 'IT TAT Academy',
      category: String(data.get('category') || '').trim() || 'Dasturlash',
      duration: String(data.get('duration') || '').trim() || '8 hafta',
      lessons: Math.max(1, Number(data.get('lessons')) || 12),
      imageUrl,
      videoUrl,
      progress: editing?.progress || 0,
      color: editing?.color || 'blue',
      icon: editing?.icon || '</>',
    };
    if (editing?.id) {
      setCourses((items) => items.map((course) => course.id === editing.id ? { ...course, ...values } : course));
      setToast(t('saved'));
    } else {
      setCourses((items) => [...items, { ...values, id: Math.max(0, ...items.map((course) => course.id)) + 1 }]);
      setToast(t('added'));
    }
    setEditing(null);
  };

  const deleteCourse = (course) => {
    if (!window.confirm(t('deleteConfirm'))) return;
    setCourses((items) => items.filter((item) => item.id !== course.id));
    setEnrolled((items) => items.filter((id) => id !== course.id));
    setToast(t('deleted'));
  };

  const adminStudents = loadPlatformData('ittat-workspace-students', [
    { id: 1, name: 'Sarvinoz Akramova', phone: '+998 90 123 45 67', detail: 'Frontend Development', status: 'Faol' },
    { id: 2, name: 'Muhammad Karimov', phone: '+998 91 234 56 78', detail: 'Python dasturlash', status: 'Faol' },
    { id: 3, name: 'Dilorom Ismoilova', phone: '+998 93 345 67 89', detail: 'Grafik dizayn', status: 'Faol' },
  ]);
  const adminOrders = loadPlatformData('ittat-workspace-orders', [
    { id: 1, name: 'ORD-1042', detail: 'Sarvinoz Akramova · Frontend Development · 1 200 000 so‘m', status: 'To‘langan' },
    { id: 2, name: 'ORD-1043', detail: 'Muhammad Karimov · Python dasturlash · 950 000 so‘m', status: 'Kutilmoqda' },
  ]);
  const revenue = adminOrders
    .filter((order) => order.status === 'To‘langan')
    .reduce((sum, order) => sum + (Number((order.detail.match(/[\d ]+(?= so‘m)/) || ['0'])[0].replace(/\s/g, '')) || 0), 0);

  const toggleEnrollment = (course) => {
    if (!enrolled.includes(course.id)) {
      setEnrolled((items) => [...items, course.id]);
      setStudentProgress((items) => ({ ...items, [course.id]: 0 }));
      setToast(t('enrolledNotice'));
    } else {
      chooseSection('lessons');
    }
  };

  const completeLesson = (lesson) => {
    const lessonCourse = lesson.courseId ? studentCourses.find((item) => item.id === lesson.courseId)?.title : lesson.detail.split(' · ')[0];
    const course = studentCourses.find((item) => enrolled.includes(item.id) && item.progress < 100
      && (item.title === lessonCourse || !courses.some((candidate) => candidate.title === lessonCourse)));
    if (!course) {
      setToast('Barcha darslar tugallangan.');
      return;
    }
    setStudentProgress((items) => ({ ...items, [course.id]: Math.min(100, course.progress + Math.max(1, Math.ceil(100 / course.lessons))) }));
  };

  return (
    <div className={`lms-app ${theme === 'dark' ? 'theme-dark' : ''} ${theme === 'system' ? 'theme-system' : ''} ${isAdmin ? 'admin-mode' : 'student-mode'}`}>
      {mobileOpen && <button className="lms-scrim" aria-label={t('menuOpen')} onClick={() => setMobileOpen(false)} />}
      <aside className={`lms-sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="lms-brand">
          <img src={`${process.env.PUBLIC_URL}/ittat-logo.png`} alt="IT TAT" />
          <span><b>IT TAT</b><small>O‘QUV MARKAZI</small></span>
          <button className="icon-button sidebar-close" aria-label={t('menuOpen')} onClick={() => setMobileOpen(false)}><FiX /></button>
        </div>
        <div className="sidebar-label">{t('menu')}</div>
        <nav className="lms-nav" aria-label={t('menu')}>
          {navItems.map(([key, Icon]) => (
            <button key={key} className={`nav-item ${active === key ? 'nav-active' : ''}`} onClick={() => chooseSection(key)}>
              <Icon /><span>{t(key)}</span>{key === 'messages' && <i className="nav-count">2</i>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-help"><div className="help-icon"><FiTarget /></div><strong>{t('goal')}</strong><p>4 / 5 soat</p><div className="mini-progress"><i style={{ width: '78%' }} /></div></div>
          <button className="nav-item logout-item" onClick={onBack}><FiLogOut /><span>{t('logout')}</span></button>
          <div className="sidebar-foot">© 2025 IT TAT · Demo LMS</div>
        </div>
      </aside>

      <main className="lms-main">
        <header className="lms-topbar">
          <button className="icon-button mobile-menu" aria-label={t('menuOpen')} onClick={() => setMobileOpen(true)}><FiMenu /></button>
          <div className="breadcrumbs">{t('home')} <FiArrowRight /> <b>{t(currentNav[0])}</b></div>
          <div className="topbar-tools">
            <label className="global-search"><FiSearch /><input aria-label={t('search')} placeholder={t('search')} value={query} onChange={(event) => { setQuery(event.target.value); if (event.target.value) setActive(isAdmin ? 'courseManagement' : 'courses'); }} /><kbd>⌘ K</kbd></label>
            <div className="top-select"><FiSun /><select aria-label={t('selectTheme')} value={theme} onChange={(event) => setTheme(event.target.value)}><option value="light">{t('light')}</option><option value="dark">{t('dark')}</option><option value="system">{t('system')}</option></select><FiChevronDown /></div>
            <select className="language-select" aria-label={t('language')} value={language} onChange={(event) => setLanguage(event.target.value)}><option value="uz">UZ</option><option value="ru">RU</option><option value="en">EN</option></select>
            <div className="notification-wrap">
              <button className="icon-button notification-button" aria-label={t('notifications')} onClick={() => setNotificationOpen((open) => !open)}><FiBell /><i /></button>
              {notificationOpen && <div className="notification-popover"><strong>{t('notifications')}</strong><p><span className="notice-dot" />{t('activityTask')}</p><p><span className="notice-dot notice-green" />{t('activityText')}</p></div>}
            </div>
            <div className="profile-chip"><div className="avatar">{isAdmin ? 'AD' : 'AS'}</div><span><b>{isAdmin ? 'Admin IT TAT' : user.phone ? user.phone.slice(-9) : 'Aziza Student'}</b><small>{t(isAdmin ? 'director' : 'student')}</small></span><FiChevronDown className="profile-chevron" /></div>
          </div>
        </header>

        <div className="lms-content">
          <div className="legacy-welcome">
            <p className="welcome-eyebrow">{t(isAdmin ? 'director' : 'student')}</p>
            <div><h1>{t('welcome')}</h1><p>{t('loginSuccess')}</p></div>
            <button className="legacy-back" onClick={onBack}><FiLogOut /> Orqaga</button>
          </div>
          {active === 'dashboard' ? (
            isAdmin ? <AdminDashboard courses={courses} students={adminStudents} revenue={revenue} t={t} onAdd={() => setEditing({})} onEdit={setEditing} onDelete={deleteCourse} onOpenCourses={() => chooseSection('courseManagement')} onOpenStudents={() => chooseSection('students')} />
              : <StudentDashboard courses={studentCourses} enrolled={enrolled} t={t} onContinue={() => chooseSection('lessons')} onExplore={() => chooseSection('courses')} onSchedule={() => chooseSection('calendar')} onMessages={() => chooseSection('messages')} />
          ) : (
            active === 'courses' || active === 'courseManagement'
              ? <SectionContent active={active} isAdmin={isAdmin} courses={visibleCourses} totalCourses={courses.length} query={query} t={t} onAdd={() => setEditing({})} onEdit={setEditing} onDelete={deleteCourse} onCourse={(course) => enrolled.includes(course.id) ? chooseSection('lessons') : toggleEnrollment(course)} enrolled={enrolled} />
              : <Workspace
                key={`${user.role}-${active}`}
                active={active}
                isAdmin={isAdmin}
                user={user}
                t={t}
                language={language}
                courses={isAdmin ? courses : studentCourses.filter((course) => enrolled.includes(course.id))}
                onProgress={completeLesson}
                notify={setToast}
              />
          )}
        </div>
      </main>

      {toast && <div role="status" className="lms-toast"><FiCheck />{toast}</div>}
      {editing && <div className="modal-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setEditing(null); }}>
        <form className="course-modal" onSubmit={saveCourse}>
          <div className="modal-heading"><div><span className="eyebrow">{t(isAdmin ? 'courseManagement' : 'courses')}</span><h2>{editing.id ? t('edit') : t('addCourse')}</h2></div><button type="button" className="icon-button" aria-label={t('cancel')} onClick={() => setEditing(null)}><FiX /></button></div>
          <label>{t('title')}<input name="title" defaultValue={editing.title || ''} required autoFocus /></label>
          <div className="modal-columns"><label>{t('teacher')}<input name="teacher" defaultValue={editing.teacher || ''} /></label><label>{t('category')}<input name="category" defaultValue={editing.category || ''} /></label></div>
          <div className="modal-columns"><label>{t('duration')}<input name="duration" defaultValue={editing.duration || ''} /></label><label>{t('lessonsLabel')}<input name="lessons" type="number" min="1" defaultValue={editing.lessons || 12} /></label></div>
          <div className="modal-columns"><label>Muqova rasmi URL<input name="imageUrl" type="url" defaultValue={editing.imageUrl || ''} placeholder="https://..." /></label><label>Video kurs URL<input name="videoUrl" type="url" defaultValue={editing.videoUrl || ''} placeholder="https://..." /></label></div>
          <div className="modal-actions"><button type="button" className="secondary-action" onClick={() => setEditing(null)}>{t('cancel')}</button><button className="primary-action" type="submit"><FiCheck />{t('save')}</button></div>
        </form>
      </div>}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, change, color }) {
  return <article className="stat-card"><div className={`stat-icon ${color}`}><Icon /></div><span className="stat-change"><FiArrowUpRight />{change}</span><p>{label}</p><strong>{value}</strong><small>↑ 12.8% {label === 'Monthly revenue' ? 'this month' : 'this week'}</small></article>;
}

function StudentDashboard({ courses, enrolled, t, onContinue, onExplore, onSchedule, onMessages }) {
  const current = courses.find((course) => course.progress > 0 && enrolled.includes(course.id)) || courses[0];
  const weekdays = [t('monday'), t('tuesday'), t('wednesday'), t('thursday'), t('friday'), t('saturday'), t('sunday')];
  const enrolledCourses = courses.filter((course) => enrolled.includes(course.id));
  const completedLessons = enrolledCourses.reduce((sum, course) => sum + (course.progress === 100 ? course.lessons : Math.floor(course.lessons * course.progress / 100)), 0);
  const learningProgress = enrolledCourses.length ? Math.round(enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length) : 0;
  const [period, setPeriod] = useState('week');
  const chartValues = period === 'month' ? [25, 42, 61, 73, 54, 88, 68] : [44, 68, 54, 82, 61, 94, 73];
  return <>
    <section className="student-hero"><div><span className="eyebrow">IT TAT ACADEMY <span className="hero-dot" /></span><h2>{t('welcome')} <span>👋</span></h2><p>Yangi bilimlar sari yana bir qadam. Bugun o‘qishni davom ettiring!</p><button className="hero-cta" onClick={onContinue}>{t('continue')} <FiArrowRight /></button></div><div className="hero-art"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-code">01<br /><b>{'</>'}</b><br />11</div><div className="hero-caption">KELAJAKNI<br /><strong>KODLANG</strong></div></div></section>
    <section className="stats-grid">
      <StatCard icon={FiBookOpen} label={t('enrolled')} value={enrolled.length} change="+2" color="blue" />
      <StatCard icon={FiCheck} label={t('completed')} value={completedLessons} change={t('lessonsLabel')} color="green" />
      <StatCard icon={FiShield} label={t('certificatesCount')} value="2" change="+1" color="purple" />
      <StatCard icon={FiActivity} label={t('myProgress')} value={`${learningProgress}%`} change={t('progress')} color="orange" />
    </section>
    <div className="dashboard-grid student-grid">
      <section className="panel course-panel"><div className="panel-heading"><div><span className="eyebrow">{t('allCourses')}</span><h3>{t('courses')}</h3></div><button className="quiet-link" onClick={onExplore}>{t('viewAll')} <FiArrowRight /></button></div>
        <div className="course-card-grid">{enrolledCourses.slice(0, 4).map((course) => <CourseCard key={course.id} course={course} t={t} onAction={onContinue} enrolled />)}</div>
        <button className="browse-courses" onClick={onExplore}><FiPlus /> {t('explore')}</button>
      </section>
      <section className="panel schedule-panel"><div className="panel-heading"><div><span className="eyebrow">{t('calendar')}</span><h3>{t('upcoming')}</h3></div><span className="eyebrow">2</span></div><div className="calendar-strip">{weekdays.map((day, index) => <div className={index === 3 ? 'today' : ''} key={day}><small>{day}</small><b>{12 + index}</b></div>)}</div><div className="schedule-item"><div className="schedule-date"><FiClock /><span>18:30</span></div><div className="schedule-info"><strong>React: State va Props</strong><span>Frontend Development · Azizbek ustoz</span></div><span className="live-tag">{t('live')}</span></div><div className="schedule-item"><div className="schedule-date"><FiClock /><span>16:00</span></div><div className="schedule-info"><strong>Komponentlar va dizayn</strong><span>Grafik dizayn · Malika ustoz</span></div><span className="upcoming-tag">{t('tomorrow').split(',')[0]}</span></div><button className="quiet-link schedule-link" onClick={onSchedule}>{t('seeSchedule')} <FiArrowRight /></button></section>
      <section className="panel progress-panel"><div className="panel-heading"><div><span className="eyebrow">{t('weekly')}</span><h3>{t('myProgress')}</h3></div><select className="period-select" aria-label={t('weekly')} value={period} onChange={(event) => setPeriod(event.target.value)}><option value="week">{t('weekly')}</option><option value="month">{t('monthly')}</option></select></div><div className="chart-legend"><span><i className="legend-blue" /> O‘qish soatlari</span><span><i className="legend-violet" /> Maqsad</span></div><div className="bar-chart">{chartValues.map((height, index) => <div className="bar-column" key={weekdays[index]}><div className="bar-pair"><i style={{ height: `${height}%` }} /><i style={{ height: `${Math.min(height + 10, 100)}%` }} /></div><small>{weekdays[index]}</small></div>)}</div><div className="goal-note"><span className="goal-badge"><FiTarget /></span><div><strong>{t('goal')}</strong><small>4 soat 20 daqiqa / 5 soat</small></div><b>86%</b></div></section>
      <section className="panel activity-panel"><div className="panel-heading"><div><span className="eyebrow">{t('recent')}</span><h3>{t('recent')}</h3></div><button className="quiet-link" onClick={onMessages}>{t('viewAll')} <FiArrowRight /></button></div><ActivityRow icon="▶" color="blue" title={t('activityText')} time="2 soat oldin" /><ActivityRow icon="✓" color="green" title={t('activityTask')} time="Kecha" /><ActivityRow icon="★" color="orange" title={t('activityQuiz')} time="2 kun oldin" /><div className="continue-card"><div><span className="eyebrow">{t('lessonsLeft')}</span><h4>{current?.title}</h4><p>{t('progress')}: {current?.progress || 0}%</p></div><button aria-label={t('continueLesson')} onClick={onContinue}><FiArrowRight /></button></div></section>
    </div>
  </>;
}

function AdminDashboard({ courses, students, revenue, t, onAdd, onEdit, onDelete, onOpenCourses, onOpenStudents }) {
  return <>
    <div className="admin-welcome-row"><div><span className="eyebrow">ADMINISTRATOR OVERVIEW</span><h2>{t('dashboard')}</h2><p>Akademiyangiz faoliyatini bir joydan boshqaring.</p></div><button className="primary-action" onClick={onAdd}><FiPlus />{t('addCourse')}</button></div>
    <section className="stats-grid admin-stats">
      <StatCard icon={FiUsers} label={t('totalStudents')} value={students.length.toLocaleString()} change={`${students.filter((student) => student.status === 'Faol').length} ${t('active')}`} color="blue" />
      <StatCard icon={FiActivity} label={t('activeStudents')} value={students.filter((student) => student.status === 'Faol').length.toLocaleString()} change={t('active')} color="green" />
      <StatCard icon={FiBookOpen} label={t('courseManagement')} value={courses.length} change="+3" color="purple" />
      <StatCard icon={FiArrowUpRight} label={t('monthlyRevenue')} value={`${revenue.toLocaleString()} so‘m`} change={t('orders')} color="orange" />
    </section>
    <div className="dashboard-grid admin-grid">
      <section className="panel admin-chart-panel"><div className="panel-heading"><div><span className="eyebrow">{t('studentActivity')}</span><h3>12,480 <small>+14.2%</small></h3></div><select className="period-select" aria-label={t('all')}><option>{t('all')}</option><option>7 kun</option><option>30 kun</option></select></div><div className="chart-legend"><span><i className="legend-blue" /> O‘quvchilar</span><span><i className="legend-violet" /> Darslar</span></div><div className="line-chart"><div className="chart-y"><span>1.2k</span><span>900</span><span>600</span><span>300</span><span>0</span></div><svg viewBox="0 0 700 190" preserveAspectRatio="none" aria-label={t('studentActivity')}><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#477cff" stopOpacity=".25" /><stop offset="1" stopColor="#477cff" stopOpacity="0" /></linearGradient></defs><path className="chart-area" d="M0 158 C45 132 55 144 92 120 S148 136 190 99 S252 120 294 78 S355 103 398 67 S460 91 500 50 S560 76 602 42 S661 60 700 22 L700 190 L0 190Z" /><path className="chart-line" d="M0 158 C45 132 55 144 92 120 S148 136 190 99 S252 120 294 78 S355 103 398 67 S460 91 500 50 S560 76 602 42 S661 60 700 22" /></svg></div><div className="chart-x"><span>01 Oct</span><span>05 Oct</span><span>10 Oct</span><span>15 Oct</span><span>20 Oct</span><span>25 Oct</span><span>31 Oct</span></div></section>
      <section className="panel category-panel"><div className="panel-heading"><div><span className="eyebrow">{t('courseOverview')}</span><h3>{t('courseManagement')}</h3></div><span className="eyebrow">{courses.length}</span></div>{courses.slice(0, 5).map((course, index) => <div className="category-row" key={course.id}><span className={`category-dot dot-${course.color}`} /><div><strong>{course.title}</strong><small>{[286, 214, 176, 128, 94][index] || 64} o‘quvchi</small></div><b>{[78, 64, 53, 41, 32][index] || 24}%</b><div className="category-progress"><i style={{ width: `${[78, 64, 53, 41, 32][index] || 24}%` }} /></div></div>)}<button className="quiet-link" onClick={onOpenCourses}>{t('viewAll')} <FiArrowRight /></button></section>
      <section className="panel management-panel"><div className="panel-heading"><div><span className="eyebrow">{t('courseManagement')}</span><h3>{t('allCourses')} <span className="table-count">{courses.length}</span></h3></div><button className="quiet-link" onClick={onOpenCourses}>{t('viewAll')} <FiArrowRight /></button></div><div className="table-scroll"><table><thead><tr><th>{t('course')}</th><th>{t('teacher')}</th><th>{t('students')}</th><th>{t('status')}</th><th>{t('actions')}</th></tr></thead><tbody>{courses.slice(0, 5).map((course, index) => <tr key={course.id}><td><span className={`table-icon ${course.color}`}>{course.icon}</span><strong>{course.title}</strong></td><td>{course.teacher}</td><td>{[286, 214, 176, 128, 94][index] || 64}</td><td><span className="status-pill"><i />{t('active')}</span></td><td><div className="table-actions"><button aria-label={`${t('edit')} ${course.title}`} onClick={() => onEdit(course)}><FiEdit2 /></button><button aria-label={`${t('delete')} ${course.title}`} onClick={() => onDelete(course)}><FiTrash2 /></button></div></td></tr>)}</tbody></table></div></section>
      <section className="panel students-panel"><div className="panel-heading"><div><span className="eyebrow">{t('latestStudents')}</span><h3>{t('students')}</h3></div><button className="quiet-link" onClick={onOpenStudents}>{t('viewAll')} <FiArrowRight /></button></div>{students.slice(-4).reverse().map((student, index) => { const initials = student.name.split(' ').map((part) => part[0]).join('').slice(0, 2); const colors = ['blue', 'purple', 'orange', 'green']; return <div className="student-row" key={student.id || student.name}><div className={`avatar avatar-${colors[index % colors.length]}`}>{initials}</div><div><strong>{student.name}</strong><span>{student.detail}</span></div><small>{student.status}</small></div>; })}</section>
    </div>
  </>;
}

function CourseCard({ course, t, onAction, enrolled, admin, onEdit, onDelete }) {
  const color = course.color || 'blue';
  const coverStyle = course.imageUrl ? {
    backgroundImage: `linear-gradient(135deg, rgba(17,32,64,.45), rgba(35,49,90,.65)), url("${course.imageUrl}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : undefined;
  return <article className="course-card"><div className={`course-cover cover-${color}`} style={coverStyle}><span className="course-glyph">{course.icon}</span><span className="cover-label">IT TAT · ACADEMY</span><button className="course-menu" aria-label={t('actions')} onClick={admin ? onEdit : onAction}><FiMoreHorizontal /></button><span className="cover-orb orb-a" /><span className="cover-orb orb-b" /></div><div className="course-body"><span className="course-category">{course.category}</span><h4>{course.title}</h4><p className="course-teacher"><span className="tiny-avatar">{course.teacher.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span>{course.teacher}</p><div className="course-meta"><span><FiBookOpen /> {course.lessons} {t('lessonsLabel')}</span><span><FiClock /> {course.duration}</span></div>{enrolled && <div className="course-progress"><div><span>{t('progress')}</span><b>{course.progress}%</b></div><i><span style={{ width: `${course.progress}%` }} /></i></div>}{course.videoUrl && <button className="course-video-link" onClick={() => window.open(course.videoUrl, '_blank', 'noopener,noreferrer')}>Kurs videosini ochish <FiArrowRight /></button>}<div className="course-actions">{admin ? <><button className="secondary-action" onClick={onEdit}><FiEdit2 />{t('edit')}</button><button className="delete-action" aria-label={`${t('delete')} ${course.title}`} onClick={onDelete}><FiTrash2 /></button></> : <button className="course-cta" onClick={onAction}>{enrolled ? t('continueLesson') : t('enrolledAction')} <FiArrowRight /></button>}</div></div></article>;
}

function SectionContent({ active, isAdmin, courses, totalCourses, query, t, onAdd, onEdit, onDelete, onCourse, enrolled }) {
  const title = t(active);
  if (active === 'courses' || active === 'courseManagement') {
    return <section className="section-page"><div className="section-title-row"><div><span className="eyebrow">{isAdmin ? t('courseManagement') : t('allCourses')}</span><h2>{query ? t('searchResults') : title}</h2><p>{isAdmin ? `${totalCourses} ${t('coursesCount')}` : 'Yangi ko‘nikmalarni bugun o‘rganishni boshlang.'}</p></div>{isAdmin && <button className="primary-action" onClick={onAdd}><FiPlus />{t('addCourse')}</button>}</div>{query && <div className="filter-chip"><FiFilter /> “{query}” <span>{courses.length} / {totalCourses}</span></div>}{courses.length ? <div className="course-card-grid section-course-grid">{courses.map((course) => <CourseCard key={course.id} course={course} t={t} enrolled={isAdmin || enrolled.includes(course.id)} admin={isAdmin} onAction={() => onCourse(course)} onEdit={() => onEdit(course)} onDelete={() => onDelete(course)} />)}</div> : <div className="empty-state"><FiSearch /><h3>{t('noResults')}</h3><p>{query || t('courses')}</p>{isAdmin && <button className="primary-action" onClick={onAdd}><FiPlus />{t('addCourse')}</button>}</div>}</section>;
  }
  const Icon = (isAdmin ? adminNav : studentNav).find(([key]) => key === active)?.[1] || FiGrid;
  const rows = active === 'students' ? [['SA', 'Sarvinoz Akramova', 'Frontend Development'], ['MK', 'Muhammad Karimov', 'Python dasturlash'], ['DI', 'Dilorom Ismoilova', 'Grafik dizayn'], ['JB', 'Jasur Boboyev', 'JavaScript va React']] : [];
  return <section className="section-page"><div className="section-title-row"><div><span className="eyebrow">{isAdmin ? 'IT TAT · ADMIN' : 'IT TAT · LEARNING'}</span><h2>{title}</h2><p>{isAdmin ? 'Platforma ma’lumotlari va boshqaruv amallari.' : 'O‘quv jarayoningiz uchun barcha kerakli ma’lumotlar.'}</p></div>{isAdmin && active === 'students' && <button className="secondary-action"><FiFilter />{t('all')}</button>}</div>{rows.length ? <section className="panel management-panel standalone-table"><div className="table-scroll"><table><thead><tr><th>{t('students')}</th><th>{t('course')}</th><th>{t('status')}</th><th>{t('actions')}</th></tr></thead><tbody>{rows.map(([initials, name, course]) => <tr key={name}><td><span className="table-avatar">{initials}</span><strong>{name}</strong></td><td>{course}</td><td><span className="status-pill"><i />{t('active')}</span></td><td><button className="simple-icon" aria-label={t('edit')}><FiEdit2 /></button></td></tr>)}</tbody></table></div></section> : <div className="section-cards"><article className="panel section-feature"><div className="section-feature-icon"><Icon /></div><span className="eyebrow">{title}</span><h3>{active === 'calendar' || active === 'live' ? t('upcoming') : title}</h3><p>{active === 'assignments' ? t('activityTask') : active === 'tests' ? t('activityQuiz') : active === 'certificates' ? `2 ${t('certificatesCount')}` : active === 'messages' ? t('activityText') : t('loginSuccess')}</p><button className="primary-action"><FiArrowRight />{active === 'resources' ? t('explore') : t('viewAll')}</button></article><section className="panel section-list"><div className="panel-heading"><div><span className="eyebrow">{t('recent')}</span><h3>{active === 'calendar' ? t('upcoming') : title}</h3></div><button className="icon-button"><FiMoreHorizontal /></button></div>{[t('activityText'), t('activityTask'), t('activityQuiz')].map((text, index) => <ActivityRow key={text} icon={['▶', '✓', '★'][index]} color={['blue', 'green', 'orange'][index]} title={text} time={`${index + 1} soat oldin`} />)}<div className="section-progress"><span>{t('progress')}</span><div><i style={{ width: '72%' }} /></div><b>72%</b></div></section></div>}</section>;
}

function ActivityRow({ icon, color, title, time }) {
  return <div className="activity-row"><span className={`activity-icon ${color}`}>{icon}</span><div><strong>{title}</strong><small>{time}</small></div><FiArrowUpRight className="activity-arrow" /></div>;
}
