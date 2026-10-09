import { useEffect, useState } from 'react';
import {
  FiArrowRight, FiCalendar, FiCheck, FiDownload, FiFileText,
  FiMessageCircle, FiPlus, FiSend, FiTrash2, FiUpload, FiVideo,
} from 'react-icons/fi';

const STORE = 'ittat-workspace';
const words = {
  uz: {
    monthly: 'Oylik', create: 'Yangi yaratish', add: 'Yangi qo‘shish', courseSelect: 'Kursni tanlang', allCourses: 'Barcha kurslar',
    lessonHint: 'ta dars · tugallanganni belgilang, jarayon yangilanadi', complete: 'Darsni tugatish',
    done: 'Tugallangan', submit: 'Topshiriq topshirish', start: 'Testni boshlash', join: 'Darsga qo‘shilish',
    joined: 'Dars xonasiga kirdingiz', detail: 'Tafsilot', download: 'Yuklab olish', receipt: 'Chek',
    confirm: 'To‘lovni tasdiqlash', read: 'O‘qildi', question: 'HTML sahifasining asosiy tuzilmasini qaysi teg belgilaydi?',
    answer: 'Javobni tekshirish', cancel: 'Bekor qilish', passed: 'Muvaffaqiyatli', retry: 'Qayta topshirish mumkin',
    send: 'Yuborish', writeToTeacher: 'O‘qituvchiga xabar yozish', writeMessage: 'Xabar yozish',
    messagePlaceholder: 'Xabaringizni yozing...', personal: 'Shaxsiy ma’lumotlar', name: 'Ism familiya',
    phone: 'Telefon raqami', email: 'Email', prefs: 'Bildirishnoma sozlamalari',
    emailUpdates: 'Email orqali yangiliklar', reminders: 'Dars eslatmalari', publicProfile: 'Profilni boshqalarga ko‘rsatish',
    platform: 'Platforma parametrlari', platformName: 'Platforma nomi', defaultLanguage: 'Standart til',
    currency: 'Valyuta', openRegistration: 'Ochiq ro‘yxatdan o‘tish', website: 'Sayt ma’lumotlarini tahrirlash',
    banner: 'Bosh sahifa banneri', about: 'Markaz haqida', contact: 'Aloqa telefoni', preview: 'SAHIFA PREVIEW',
    translations: 'Asosiy interfeys tarjimalari', translationHint: 'Tarjimalar saqlanadi. To‘liq interfeys tarjimasini boshqarish uchun server integratsiyasi kerak.',
    saveRoles: 'Rollarni saqlash', issueCertificate: 'Sertifikat berish', totalPaid: 'Jami to‘langan',
    demoPayment: 'Demo to‘lov tarixi · haqiqiy to‘lov amalga oshirilmaydi', room: 'IT TAT jonli dars xonasi',
    demoRoom: 'Demo rejim · haqiqiy video aloqa uchun server kerak', leave: 'Xonadan chiqish',
    csv: 'CSV hisobotni yuklab olish', uploadLimit: 'Faylni tanlang (512 KB gacha)', noRecords: 'Hozircha ma’lumot yo‘q. Yangi element qo‘shing.',
    submittedAssignments: 'O‘quvchilar topshiriqlari', downloadFile: 'Faylni yuklash',
  },
  ru: {
    monthly: 'За месяц', create: 'Создать', add: 'Добавить', courseSelect: 'Выберите курс', allCourses: 'Все курсы',
    lessonHint: 'уроков · отметьте завершённые, прогресс обновится', complete: 'Завершить урок',
    done: 'Завершено', submit: 'Сдать задание', start: 'Начать тест', join: 'Присоединиться',
    joined: 'Вы в комнате занятия', detail: 'Подробнее', download: 'Скачать', receipt: 'Квитанция',
    confirm: 'Подтвердить оплату', read: 'Прочитано', question: 'Какой тег задаёт основную структуру HTML-страницы?',
    answer: 'Проверить ответ', cancel: 'Отмена', passed: 'Успешно', retry: 'Можно пройти ещё раз',
    send: 'Отправить', writeToTeacher: 'Написать преподавателю', writeMessage: 'Написать сообщение',
    messagePlaceholder: 'Введите сообщение...', personal: 'Личные данные', name: 'Имя и фамилия',
    phone: 'Номер телефона', email: 'Эл. почта', prefs: 'Настройки уведомлений',
    emailUpdates: 'Новости по почте', reminders: 'Напоминания о занятиях', publicProfile: 'Публичный профиль',
    platform: 'Параметры платформы', platformName: 'Название платформы', defaultLanguage: 'Язык по умолчанию',
    currency: 'Валюта', openRegistration: 'Открытая регистрация', website: 'Редактировать сайт',
    banner: 'Баннер главной страницы', about: 'О центре', contact: 'Телефон для связи', preview: 'ПРЕДПРОСМОТР',
    translations: 'Переводы интерфейса', translationHint: 'Переводы сохраняются. Для полной настройки переводов нужен сервер.',
    saveRoles: 'Сохранить роли', issueCertificate: 'Выдать сертификат', totalPaid: 'Всего оплачено',
    demoPayment: 'Демо-история платежей · реальные платежи недоступны', room: 'Комната IT TAT',
    demoRoom: 'Демо-режим · для видеосвязи нужен сервер', leave: 'Выйти из комнаты',
    csv: 'Скачать CSV-отчёт', uploadLimit: 'Выберите файл (до 512 КБ)', noRecords: 'Пока нет данных. Добавьте новый элемент.',
    submittedAssignments: 'Задания учеников', downloadFile: 'Скачать файл',
  },
  en: {
    monthly: 'Monthly', create: 'Create new', add: 'Add new', courseSelect: 'Select course', allCourses: 'All courses',
    lessonHint: 'lessons · mark completed lessons to update progress', complete: 'Complete lesson',
    done: 'Completed', submit: 'Submit assignment', start: 'Start test', join: 'Join class',
    joined: 'Joined the class room', detail: 'Details', download: 'Download', receipt: 'Receipt',
    confirm: 'Confirm payment', read: 'Mark as read', question: 'Which tags define the basic structure of an HTML page?',
    answer: 'Check answer', cancel: 'Cancel', passed: 'Passed', retry: 'You can try again',
    send: 'Send', writeToTeacher: 'Message your instructor', writeMessage: 'Write a message',
    messagePlaceholder: 'Type your message...', personal: 'Personal details', name: 'Full name',
    phone: 'Phone number', email: 'Email', prefs: 'Notification preferences',
    emailUpdates: 'Email updates', reminders: 'Lesson reminders', publicProfile: 'Show public profile',
    platform: 'Platform settings', platformName: 'Platform name', defaultLanguage: 'Default language',
    currency: 'Currency', openRegistration: 'Open registration', website: 'Edit website content',
    banner: 'Home page banner', about: 'About the academy', contact: 'Contact phone', preview: 'PAGE PREVIEW',
    translations: 'Interface translations', translationHint: 'Translations are saved. Full interface translation management requires a server.',
    saveRoles: 'Save roles', issueCertificate: 'Issue certificate', totalPaid: 'Total paid',
    demoPayment: 'Demo payment history · real payments are not available', room: 'IT TAT live-class room',
    demoRoom: 'Demo mode · real video calls need a server', leave: 'Leave room',
    csv: 'Download CSV report', uploadLimit: 'Choose a file (up to 512 KB)', noRecords: 'No data yet. Add a new item.',
    submittedAssignments: 'Student submissions', downloadFile: 'Download file',
  },
};

const quizContent = {
  uz: [
    { question: 'HTML hujjatining to‘g‘ri boshlanishi qaysi?', options: ['<body>', '<!DOCTYPE html> va <html>', '<style>'], correct: 1 },
    { question: 'HTML sahifasidagi eng katta sarlavha qaysi teg?', options: ['<h1>', '<h6>', '<title>'], correct: 0 },
    { question: 'CSS da matn rangini qaysi xususiyat o‘zgartiradi?', options: ['font-size', 'background', 'color'], correct: 2 },
    { question: 'JavaScript da qayta qiymat berilmaydigan o‘zgaruvchi qaysi?', options: ['var', 'const', 'let'], correct: 1 },
    { question: 'React komponenti odatda nimani qaytaradi?', options: ['UI elementlarini', 'SQL jadvalini', 'CSS faylini'], correct: 0 },
  ],
  ru: [
    { question: 'Как начинается корректный HTML-документ?', options: ['<body>', '<!DOCTYPE html> и <html>', '<style>'], correct: 1 },
    { question: 'Какой тег задаёт самый крупный заголовок?', options: ['<h1>', '<h6>', '<title>'], correct: 0 },
    { question: 'Какое CSS-свойство меняет цвет текста?', options: ['font-size', 'background', 'color'], correct: 2 },
    { question: 'Какая переменная JavaScript не переназначается?', options: ['var', 'const', 'let'], correct: 1 },
    { question: 'Что обычно возвращает React-компонент?', options: ['Элементы интерфейса', 'Таблицу SQL', 'CSS-файл'], correct: 0 },
  ],
  en: [
    { question: 'How does a valid HTML document start?', options: ['<body>', '<!DOCTYPE html> and <html>', '<style>'], correct: 1 },
    { question: 'Which HTML tag creates the largest heading?', options: ['<h1>', '<h6>', '<title>'], correct: 0 },
    { question: 'Which CSS property changes text color?', options: ['font-size', 'background', 'color'], correct: 2 },
    { question: 'Which JavaScript variable cannot be reassigned?', options: ['var', 'const', 'let'], correct: 1 },
    { question: 'What does a React component typically return?', options: ['UI elements', 'An SQL table', 'A CSS file'], correct: 0 },
  ],
};

const seeds = {
  students: [['Sarvinoz Akramova', '+998 90 123 45 67', 'Frontend Development', 'Faol'], ['Muhammad Karimov', '+998 91 234 56 78', 'Python dasturlash', 'Faol'], ['Dilorom Ismoilova', '+998 93 345 67 89', 'Grafik dizayn', 'Faol']],
  teachers: [['Azizbek Karimov', 'Frontend Development', '+998 90 111 22 33', 'Faol'], ['Malika Saidova', 'Grafik dizayn', '+998 91 222 33 44', 'Faol'], ['Dilshod Rahimov', 'Backend Development', '+998 93 333 44 55', 'Faol']],
  lessons: [['HTML asoslari', 'Frontend Development · 01:24:00', 'Ochiq'], ['CSS va responsive dizayn', 'Frontend Development · 01:12:00', 'Ochiq'], ['JS asoslari', 'JavaScript va React · 00:48:00', 'Ochiq'], ['React komponentlari', 'JavaScript va React · 01:05:00', 'Ochiq']],
  assignments: [['Portfolio sahifasi', 'Frontend Development · 20 oktabrgacha', 'Topshirilmagan'], ['CSS layout mashqi', 'Frontend Development · 22 oktabrgacha', 'Topshirilgan'], ['API bilan ishlash', 'Backend Development · 24 oktabrgacha', 'Topshirilmagan']],
  tests: [['HTML va CSS bilimlari', 'Frontend Development · 10 savol', 'Ochiq'], ['JavaScript asoslari', 'JavaScript va React · 15 savol', 'Ochiq'], ['Python boshlang‘ich test', 'Python dasturlash · 12 savol', 'Ochiq']],
  certificates: [['Frontend Development', 'Sarvinoz Akramova · ITTAT-2025-001', 'Berilgan'], ['Kompyuter savodxonligi', 'Muhammad Karimov · ITTAT-2025-002', 'Berilgan']],
  live: [['React: State va Props', 'Bugun · 18:30 · Azizbek Karimov', 'Rejalashtirilgan'], ['Dizayn portfolio tahlili', 'Ertaga · 16:00 · Malika Saidova', 'Rejalashtirilgan']],
  orders: [['ORD-1042', 'Sarvinoz Akramova · Frontend Development · 1 200 000 so‘m', 'To‘langan'], ['ORD-1043', 'Muhammad Karimov · Python dasturlash · 950 000 so‘m', 'Kutilmoqda'], ['ORD-1044', 'Dilorom Ismoilova · Grafik dizayn · 1 000 000 so‘m', 'To‘langan']],
  payments: [['PAY-1042', 'Frontend Development · 1 200 000 so‘m · 01.10.2025', 'To‘langan'], ['PAY-1038', 'Python dasturlash · 950 000 so‘m · 01.09.2025', 'To‘langan']],
  notifications: [['Yangi o‘quvchi ro‘yxatdan o‘tdi', 'Sarvinoz Akramova · Bugun 09:25', 'Yangi'], ['To‘lov qabul qilindi', 'ORD-1042 · Bugun 10:10', 'Yangi'], ['Yangi topshiriq topshirildi', 'Portfolio sahifasi · Kecha', 'O‘qilgan']],
  messages: [['Azizbek Karimov', 'Ertangi jonli dars uchun materiallar tayyor.', 'O‘qituvchi'], ['IT TAT Support', 'Xush kelibsiz! Savollaringiz bo‘lsa yozing.', 'Yordam']],
  calendar: [['React: State va Props', 'Bugun · 18:30 · Jonli dars', 'Rejalashtirilgan'], ['CSS topshirig‘i muddati', 'Ertaga · 23:59 · Topshiriq', 'Rejalashtirilgan'], ['JavaScript testi', 'Juma · 15:00 · Imtihon', 'Rejalashtirilgan']],
  resources: [['Frontend qo‘llanmasi.pdf', 'PDF · 2.4 MB · Frontend Development', 'Yuklab olish'], ['HTML elementlari.pdf', 'PDF · 1.1 MB · Boshlang‘ich', 'Yuklab olish'], ['React cheat sheet.pdf', 'PDF · 850 KB · JavaScript va React', 'Yuklab olish']],
};

const fieldsByPage = {
  students: ['Ism familiya', 'Telefon raqami', 'Biriktirilgan kurs', 'Holat'],
  teachers: ['Ism familiya', 'Mutaxassislik', 'Telefon raqami', 'Holat'],
  lessons: ['Dars nomi', 'Kurs · davomiylik', 'Video havolasi', 'Holat'],
  assignments: ['Topshiriq nomi', 'Kurs · muddat', 'Holat'],
  tests: ['Test nomi', 'Kurs · savollar soni', 'Holat'],
  certificates: ['Sertifikat kursi', 'O‘quvchi · sertifikat ID', 'Holat'],
  live: ['Dars nomi', 'Sana · vaqt · o‘qituvchi', 'Holat'],
  orders: ['Buyurtma ID', 'O‘quvchi · kurs · summa', 'Holat'],
  notifications: ['Bildirishnoma sarlavhasi', 'Tafsilot', 'Holat'],
  messages: ['Qabul qiluvchi', 'Xabar matni', 'Tur'],
  calendar: ['Tadbir nomi', 'Sana · vaqt · turi', 'Holat'],
  resources: ['Material nomi', 'Turi · hajmi · kurs', 'Yuklab olish'],
};

const fieldTranslations = {
  ru: {
    students: ['ФИО', 'Номер телефона', 'Назначенный курс', 'Статус'],
    teachers: ['ФИО', 'Специализация', 'Номер телефона', 'Статус'],
    lessons: ['Название урока', 'Курс · длительность', 'Ссылка на видео', 'Статус'],
    assignments: ['Название задания', 'Курс · срок', 'Статус'],
    tests: ['Название теста', 'Курс · количество вопросов', 'Статус'],
    certificates: ['Курс сертификата', 'Ученик · ID сертификата', 'Статус'],
    live: ['Название занятия', 'Дата · время · преподаватель', 'Статус'],
    orders: ['ID заказа', 'Ученик · курс · сумма', 'Статус'],
    notifications: ['Заголовок уведомления', 'Подробности', 'Статус'],
    messages: ['Получатель', 'Текст сообщения', 'Тип'],
    calendar: ['Название события', 'Дата · время · тип', 'Статус'],
    resources: ['Название материала', 'Тип · размер · курс', 'Скачать'],
  },
  en: {
    students: ['Full name', 'Phone number', 'Assigned course', 'Status'],
    teachers: ['Full name', 'Specialization', 'Phone number', 'Status'],
    lessons: ['Lesson title', 'Course · duration', 'Video URL', 'Status'],
    assignments: ['Assignment title', 'Course · due date', 'Status'],
    tests: ['Test title', 'Course · question count', 'Status'],
    certificates: ['Certificate course', 'Student · certificate ID', 'Status'],
    live: ['Class title', 'Date · time · instructor', 'Status'],
    orders: ['Order ID', 'Student · course · amount', 'Status'],
    notifications: ['Notification title', 'Details', 'Status'],
    messages: ['Recipient', 'Message text', 'Type'],
    calendar: ['Event title', 'Date · time · type', 'Status'],
    resources: ['Resource title', 'Type · size · course', 'Download'],
  },
};

function getFields(active, language) {
  return fieldTranslations[language]?.[active] || fieldsByPage[active] || ['Nomi', 'Tafsilot', 'Holat'];
}

function load(key, fallback) {
  try {
    const value = localStorage.getItem(`${STORE}-${key}`);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function loadBrowserValue(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveDownload(filename, contents, type = 'text/plain;charset=utf-8') {
  const url = URL.createObjectURL(new Blob([contents], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function normalize(records, page) {
  return records.map((record, index) => {
    if (page === 'students') {
      const [name, phone, detail, status] = record;
      return { id: index + 1, name, phone, detail, status };
    }
    if (page === 'teachers') {
      const [name, detail, phone, status] = record;
      return { id: index + 1, name, detail, phone, status };
    }
    const [name, detail, status] = record;
    return { id: index + 1, name, detail, status };
  });
}

function safeCsv(value) {
  return `"${String(value || '').replace(/"/g, '""')}"`;
}

function amountFromDetail(value) {
  const match = String(value).match(/[\d ]+(?= so‘m)/);
  return match ? Number(match[0].replace(/\s/g, '')) || 0 : 0;
}

function openExternalUrl(value) {
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) return false;
    window.open(url.href, '_blank', 'noopener,noreferrer');
    return true;
  } catch {
    return false;
  }
}

function readFileData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Tanlangan faylni o‘qib bo‘lmadi.'));
    reader.readAsDataURL(file);
  });
}

function downloadSubmission(file) {
  const link = document.createElement('a');
  link.href = file.data;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export default function Workspace({ active, isAdmin, user, t, language, courses, onProgress, notify }) {
  const copy = words[language] || words.uz;
  const key = active === 'profile' ? `${active}-${user.phone || user.role}` : active === 'payments' ? 'orders' : active;
  const profileStorageKey = `profile-${String(user.phone || user.role).replace(/\D/g, '') || user.role}`;
  const [records, setRecords] = useState(() => load(key, normalize(active === 'payments' ? seeds.orders : seeds[active] || [], active)));
  const [modal, setModal] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const quizQuestions = quizContent[language] || quizContent.uz;
  const [selectedCourse, setSelectedCourse] = useState('');
  const [quizResult, setQuizResult] = useState(() => load(`${key}-result`, null));
  const [profile, setProfile] = useState(() => load(profileStorageKey, { name: user.phone ? `O‘quvchi ${user.phone.slice(-4)}` : 'IT TAT Admin', email: '', phone: user.phone || '' }));
  const [settings, setSettings] = useState(() => load('settings', { emailUpdates: true, reminders: true, publicProfile: false }));
  const [content, setContent] = useState(() => load('content', { banner: 'IT TAT Academy — kelajagingizni bugun yarating', about: 'Professional IT ta’lim markazi', phone: '+998 71 200 00 00' }));
  const [translation, setTranslation] = useState(() => load('translations', { uz: 'Boshqaruv paneli', ru: 'Панель управления', en: 'Dashboard' }));
  const [roles, setRoles] = useState(() => load('roles', [{ name: 'Admin IT TAT', phone: '+998 93 725 16 84', role: 'Admin' }, { name: 'Aziza Student', phone: '+998 90 123 45 67', role: 'O‘quvchi' }]));
  const [joined, setJoined] = useState(() => load(`${key}-joined`, []));
  const [submissions, setSubmissions] = useState(() => load(`${key}-submissions`, []));

  useEffect(() => localStorage.setItem(`${STORE}-${key}`, JSON.stringify(records)), [key, records]);
  useEffect(() => localStorage.setItem(`${STORE}-${profileStorageKey}`, JSON.stringify(profile)), [profileStorageKey, profile]);
  useEffect(() => localStorage.setItem(`${STORE}-settings`, JSON.stringify(settings)), [settings]);
  useEffect(() => localStorage.setItem(`${STORE}-content`, JSON.stringify(content)), [content]);
  useEffect(() => localStorage.setItem(`${STORE}-translations`, JSON.stringify(translation)), [translation]);
  useEffect(() => localStorage.setItem(`${STORE}-roles`, JSON.stringify(roles)), [roles]);
  useEffect(() => localStorage.setItem(`${STORE}-${key}-joined`, JSON.stringify(joined)), [key, joined]);
  useEffect(() => localStorage.setItem(`${STORE}-${key}-submissions`, JSON.stringify(submissions)), [key, submissions]);
  useEffect(() => localStorage.setItem(`${STORE}-${key}-result`, JSON.stringify(quizResult)), [key, quizResult]);

  const adminRecords = ['students', 'teachers', 'lessons', 'assignments', 'tests', 'certificates', 'live', 'orders', 'notifications', 'messages', 'calendar', 'resources'].includes(active) && isAdmin;
  const recordKey = (item) => item.id || `${item.name}-${item.detail}`;

  const saveRecord = (event) => {
    event.preventDefault();
    const values = [...event.currentTarget.querySelectorAll('[data-field]')].map((input) => input.value.trim());
    if (!values[0]) return;
    const [name, detail, maybeMedia, maybeStatus = 'Faol'] = values;
    const hasMediaField = active === 'lessons';
    const hasSeparateStatus = ['students', 'teachers', 'lessons'].includes(active);
    const status = hasSeparateStatus ? maybeStatus : maybeMedia || 'Faol';
    const videoUrl = hasMediaField ? maybeMedia : '';
    const recordDetail = active === 'students' ? maybeMedia : detail;
    const phone = active === 'students' || active === 'teachers' ? (active === 'students' ? detail : maybeMedia) : undefined;
    const courseId = hasMediaField ? courses.find((course) => course.title === selectedCourse)?.id : undefined;
    if (modal?.id) {
      setRecords((current) => current.map((item) => item.id === modal.id ? { ...item, name, detail: recordDetail, phone, status, videoUrl, courseId } : item));
      notify(t('saved'));
    } else {
      setRecords((current) => [...current, { id: Date.now(), name, detail: recordDetail, phone, status, videoUrl, courseId }]);
      notify(t('added'));
    }
    setModal(null);
  };

  const assignStudentCourse = (event) => {
    event.preventDefault();
    const courseId = Number(event.currentTarget.elements.courseId.value);
    const course = courses.find((item) => item.id === courseId);
    if (!course) return;
    setRecords((current) => current.map((student) => student.id === modal.student.id
      ? { ...student, detail: course.title, courseId }
      : student));
    const phoneDigits = String(modal.student.phone || '').replace(/\D/g, '').slice(-9);
    if (phoneDigits) {
      const storageKey = `ittat-platform-enrollment-${phoneDigits}`;
      const current = loadBrowserValue(storageKey, [1, 2, 3, 4]);
      if (!current.includes(course.id)) localStorage.setItem(storageKey, JSON.stringify([...current, course.id]));
      const progressKey = `ittat-platform-progress-${phoneDigits}`;
      const currentProgress = loadBrowserValue(progressKey, {});
      localStorage.setItem(progressKey, JSON.stringify({ ...currentProgress, [course.id]: currentProgress[course.id] || 0 }));
    }
    setModal(null);
    notify(`Kurs biriktirildi: ${course.title}`);
  };

  const removeRecord = (item) => {
    if (!window.confirm(t('deleteConfirm'))) return;
    setRecords((current) => current.filter((row) => recordKey(row) !== recordKey(item)));
    notify(t('deleted'));
  };

  const updateStatus = (item, status) => {
    setRecords((current) => current.map((row) => recordKey(row) === recordKey(item) ? { ...row, status } : row));
    notify(t('saved'));
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const input = event.currentTarget.elements.message;
    if (!input.value.trim()) return;
    setRecords((current) => [...current, { id: Date.now(), name: isAdmin ? 'Admin IT TAT' : profile.name, detail: input.value.trim(), status: 'Yangi' }]);
    input.value = '';
    notify(t('saved'));
  };

  const startQuiz = (item) => { setQuiz(item); setQuizAnswers({}); };
  const submitQuiz = (event) => {
    event.preventDefault();
    const correct = quizQuestions.filter((question, index) => Number(quizAnswers[index]) === question.correct).length;
    const score = Math.round((correct / quizQuestions.length) * 100);
    const result = { title: quiz.name, score, passed: score >= 60, date: new Date().toLocaleDateString() };
    setQuizResult(result);
    setRecords((current) => current.map((row) => row.id === quiz.id ? { ...row, status: result.passed ? 'Topshirildi' : 'Qayta topshirish' } : row));
    setQuiz(null);
    notify(`${copy.passed}: ${score}%`);
  };

  const submitAssignment = async (event) => {
    event.preventDefault();
    const file = event.currentTarget.elements.assignment.files[0];
    if (!file) return;
    if (file.size > 512 * 1024) {
      notify('Demo yuklash limiti 512 KB. Kichikroq fayl tanlang.');
      return;
    }
    try {
      const data = await readFileData(file);
      setSubmissions((current) => [...current, { id: Date.now(), name: `${modal.item.name}: ${file.name}`, fileName: file.name, size: file.size, data, date: new Date().toLocaleString() }]);
      setRecords((current) => current.map((row) => row.id === modal.item.id ? { ...row, status: 'Topshirilgan' } : row));
      setModal(null);
      notify('Topshiriq fayli saqlandi va muvaffaqiyatli topshirildi.');
    } catch (error) {
      notify(error.message);
    }
  };

  const titleKeys = {
    students: 'students', teachers: 'teachers', lessons: 'lessons', assignments: 'assignments', tests: 'tests',
    certificates: 'certificates', live: 'live', orders: 'orders', notifications: 'notifications', messages: 'messages',
    calendar: 'calendar', resources: 'resources', payments: 'payments', reports: 'reports', profile: 'profile',
    content: 'content', translations: 'translations', roles: 'roles', systemSettings: 'systemSettings',
  };
  const heading = t(titleKeys[active] || active);
  const fields = getFields(active, language);
  const activeCourse = courses.find((course) => course.title === selectedCourse);
  const visibleRecords = active === 'lessons' && selectedCourse
    ? records.filter((record) => record.courseId ? record.courseId === activeCourse?.id : record.detail.startsWith(selectedCourse))
    : records;
  const completedLessons = records.filter((record) => record.status === 'Tugallangan').length;

  const actionButton = (item) => {
    if (active === 'lessons' && !isAdmin) return <div className="workspace-actions">{item.videoUrl && <button className="secondary-action" onClick={() => { if (!openExternalUrl(item.videoUrl)) notify('Video havolasi yaroqsiz.'); }}><FiVideo /> Videoni ko‘rish</button>}<button className="primary-action" disabled={item.status === 'Tugallangan'} onClick={() => { onProgress(item); updateStatus(item, 'Tugallangan'); }}><FiCheck /> {item.status === 'Tugallangan' ? copy.done : copy.complete}</button></div>;
    if (active === 'assignments' && !isAdmin) return <button className="primary-action" onClick={() => setModal({ type: 'submit', item })}><FiUpload /> {copy.submit}</button>;
    if (active === 'tests' && !isAdmin) return <button className="primary-action" onClick={() => startQuiz(item)}>{copy.start} <FiArrowRight /></button>;
    if (active === 'live' && !isAdmin) return <button className={`secondary-action ${joined.includes(item.id) ? 'is-joined' : ''}`} onClick={() => { setJoined((current) => [...current, item.id]); notify(copy.joined); }}><FiVideo />{joined.includes(item.id) ? copy.joined : copy.join}</button>;
    if (active === 'calendar' && !isAdmin) return <button className="secondary-action" onClick={() => notify(`${item.name} · ${item.detail}`)}><FiCalendar /> {copy.detail}</button>;
    if (active === 'notifications' && !isAdmin) return <button className="secondary-action" disabled={item.status === 'O‘qilgan'} onClick={() => updateStatus(item, 'O‘qilgan')}>{item.status === 'O‘qilgan' ? copy.read : copy.read}</button>;
    if (active === 'resources' && !isAdmin) return <button className="secondary-action" onClick={() => saveDownload(`${item.name.replace(/\.pdf$/i, '')}.txt`, `${item.name}\n${item.detail}\n\nIT TAT demo o‘quv materiali`)}><FiDownload /> {copy.download}</button>;
    if (active === 'certificates' && !isAdmin) return <button className="secondary-action" onClick={() => saveDownload(`${item.name}-sertifikat.txt`, `IT TAT O‘QUV MARKAZI\nSERTIFIKAT\n\n${profile.name}\n${item.name}\n${item.detail}\n\nDemo sertifikat`)}><FiDownload /> {copy.download}</button>;
    if (active === 'payments' && !isAdmin) return <button className="secondary-action" onClick={() => saveDownload(`${item.name}-chek.txt`, `IT TAT · Demo to‘lov cheki\n${item.name}\n${item.detail}\nHolat: ${item.status}`)}><FiDownload /> {copy.receipt}</button>;
    if (adminRecords) return <div className="workspace-actions">{active === 'students' && <button className="secondary-action" onClick={() => setModal({ type: 'assign', student: item })}>Kurs biriktirish</button>}<button className="simple-icon" aria-label={`${t('edit')} ${item.name}`} onClick={() => setModal(item)}><FiFileText /></button>{active === 'orders' && item.status !== 'To‘langan' && <button className="secondary-action" onClick={() => updateStatus(item, 'To‘langan')}>{copy.confirm}</button>}{active === 'notifications' && item.status !== 'O‘qilgan' && <button className="secondary-action" onClick={() => updateStatus(item, 'O‘qilgan')}>{copy.read}</button>}<button className="simple-icon danger-icon" aria-label={`${t('delete')} ${item.name}`} onClick={() => removeRecord(item)}><FiTrash2 /></button></div>;
    return null;
  };

  return <section className="section-page workspace-page">
    <div className="section-title-row"><div><span className="eyebrow">{isAdmin ? 'IT TAT · ADMIN' : 'IT TAT · LEARNING'}</span><h2>{heading}</h2><p>{workspaceIntro(active, isAdmin, language)}</p></div>{adminRecords && <button className="primary-action" onClick={() => setModal({})}><FiPlus />{['students', 'teachers'].includes(active) ? copy.add : copy.create}</button>}</div>

    {active === 'lessons' && <div className="workspace-course-select"><label>{copy.courseSelect}<select id="lesson-course" value={selectedCourse} onChange={(event) => setSelectedCourse(event.target.value)}><option value="">{copy.allCourses}</option>{courses.map((course) => <option key={course.id}>{course.title}</option>)}</select></label>{!isAdmin && <span>{completedLessons}/{visibleRecords.length} {copy.lessonHint}</span>}</div>}

    {active === 'tests' && !isAdmin && quiz && <form className="panel quiz-panel" onSubmit={submitQuiz}><span className="eyebrow">{quiz.name} · {Object.keys(quizAnswers).length}/{quizQuestions.length}</span>{quizQuestions.map((question, questionIndex) => <fieldset className="quiz-question" key={question.question}><legend>{questionIndex + 1}. {question.question}</legend>{question.options.map((option, optionIndex) => <label className="quiz-option" key={option}><input type="radio" name={`question-${questionIndex}`} value={optionIndex} checked={Number(quizAnswers[questionIndex]) === optionIndex} onChange={() => setQuizAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))} /><span>{option}</span></label>)}</fieldset>)}<div className="workspace-button-row"><button type="button" className="secondary-action" onClick={() => setQuiz(null)}>{copy.cancel}</button><button className="primary-action" type="submit" disabled={Object.keys(quizAnswers).length !== quizQuestions.length}>{copy.answer} <FiArrowRight /></button></div></form>}

    {active === 'tests' && !isAdmin && quizResult && !quiz && <div className={`result-banner ${quizResult.passed ? 'result-pass' : ''}`}><FiCheck /><span><strong>{quizResult.title}</strong> · {t('progress')}: {quizResult.score}% · {quizResult.passed ? copy.passed : copy.retry}</span><button className="simple-icon" aria-label={t('delete')} onClick={() => setQuizResult(null)}><FiTrash2 /></button></div>}

    {active === 'messages' && <form className="panel message-compose" onSubmit={sendMessage}><label htmlFor="message-input">{isAdmin ? copy.writeMessage : copy.writeToTeacher}</label><div><input id="message-input" name="message" placeholder={copy.messagePlaceholder} required /><button className="primary-action" type="submit"><FiSend /> {copy.send}</button></div></form>}

    {active === 'reports' && <ReportPanel records={load(`${STORE}-orders`, normalize(seeds.orders, 'orders'))} />}

    {active === 'profile' && <form className="panel workspace-form" onSubmit={(event) => { event.preventDefault(); notify(t('saved')); }}><h3>{copy.personal}</h3><label>{copy.name}<input value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} required /></label><label>{copy.phone}<input value={profile.phone} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} /></label><label>{copy.email}<input type="email" value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} placeholder="email@example.com" /></label><h3>{copy.prefs}</h3>{[['emailUpdates', copy.emailUpdates], ['reminders', copy.reminders], ['publicProfile', copy.publicProfile]].map(([id, label]) => <label className="setting-line" key={id}>{label}<input type="checkbox" checked={profile[id] ?? settings[id]} onChange={(event) => setProfile({ ...profile, [id]: event.target.checked })} /></label>)}<button className="primary-action" type="submit"><FiCheck /> {t('save')}</button></form>}

    {active === 'systemSettings' && isAdmin && <form className="panel workspace-form" onSubmit={(event) => { event.preventDefault(); notify(t('saved')); }}><h3>{copy.platform}</h3><label>{copy.platformName}<input value={settings.platformName || 'IT TAT Online Learning'} onChange={(event) => setSettings({ ...settings, platformName: event.target.value })} /></label><label>{copy.defaultLanguage}<select value={settings.defaultLanguage || 'uz'} onChange={(event) => setSettings({ ...settings, defaultLanguage: event.target.value })}><option value="uz">O‘zbekcha</option><option value="ru">Русский</option><option value="en">English</option></select></label><label>{copy.currency}<select value={settings.currency || 'UZS'} onChange={(event) => setSettings({ ...settings, currency: event.target.value })}><option>UZS</option><option>USD</option></select></label>{[['emailUpdates', copy.emailUpdates], ['reminders', copy.reminders], ['publicProfile', copy.openRegistration]].map(([id, label]) => <label className="setting-line" key={id}>{label}<input type="checkbox" checked={settings[id]} onChange={(event) => setSettings({ ...settings, [id]: event.target.checked })} /></label>)}<button className="primary-action" type="submit"><FiCheck /> {t('save')}</button></form>}

    {active === 'content' && isAdmin && <form className="panel workspace-form" onSubmit={(event) => { event.preventDefault(); notify(t('saved')); }}><h3>{copy.website}</h3><label>{copy.banner}<input value={content.banner} onChange={(event) => setContent({ ...content, banner: event.target.value })} /></label><label>{copy.about}<textarea rows="4" value={content.about} onChange={(event) => setContent({ ...content, about: event.target.value })} /></label><label>{copy.contact}<input value={content.phone} onChange={(event) => setContent({ ...content, phone: event.target.value })} /></label><div className="content-preview"><span className="eyebrow">{copy.preview}</span><strong>{content.banner}</strong><p>{content.about}</p><span>{content.phone}</span></div><button className="primary-action" type="submit"><FiCheck /> {t('save')}</button></form>}

    {active === 'translations' && isAdmin && <form className="panel workspace-form" onSubmit={(event) => { event.preventDefault(); notify(t('saved')); }}><h3>{copy.translations}</h3>{[['uz', 'O‘zbekcha'], ['ru', 'Русский'], ['en', 'English']].map(([lang, label]) => <label key={lang}>{label}<input value={translation[lang]} onChange={(event) => setTranslation({ ...translation, [lang]: event.target.value })} /></label>)}<p className="workspace-hint">{copy.translationHint}</p><button className="primary-action" type="submit"><FiCheck /> {t('save')}</button></form>}

    {active === 'roles' && isAdmin && <div className="panel management-panel workspace-table"><div className="table-scroll"><table><thead><tr><th>Foydalanuvchi</th><th>{copy.phone}</th><th>Rol</th></tr></thead><tbody>{roles.map((person, index) => <tr key={person.phone}><td>{person.name}</td><td>{person.phone}</td><td><select aria-label={`${person.name} roli`} value={person.role} onChange={(event) => setRoles((current) => current.map((row, rowIndex) => rowIndex === index ? { ...row, role: event.target.value } : row))}><option>O‘quvchi</option><option>O‘qituvchi</option><option>Admin</option></select></td></tr>)}</tbody></table></div><button className="primary-action workspace-save" onClick={() => notify(t('saved'))}><FiCheck /> {copy.saveRoles}</button></div>}

    {active === 'reports' && <button className="primary-action export-report" onClick={() => { const reportRows = load(`${STORE}-orders`, normalize(seeds.orders, 'orders')); const rows = [['Buyurtma', 'Tafsilot', 'Holat'], ...reportRows.map((item) => [item.name, item.detail, item.status])]; saveDownload('ittat-hisobot.csv', rows.map((row) => row.map(safeCsv).join(',')).join('\n'), 'text/csv;charset=utf-8'); notify('Hisobot CSV formatida yuklandi.'); }}><FiDownload /> {copy.csv}</button>}

    {active === 'certificates' && isAdmin && <button className="secondary-action issue-certificate" onClick={() => { setRecords((current) => [...current, { id: Date.now(), name: 'Yangi sertifikat', detail: 'Admin tomonidan berildi · ITTAT-2025-' + String(current.length + 1).padStart(3, '0'), status: 'Berilgan' }]); notify('Sertifikat berildi.'); }}><FiPlus /> {copy.issueCertificate}</button>}

    {active === 'payments' && !isAdmin && <div className="payment-summary"><span>{copy.totalPaid}</span><strong>{records.filter((row) => row.status === 'To‘langan').length ? records.filter((row) => row.status === 'To‘langan').length * 1000000 : 0} so‘m</strong><small>{copy.demoPayment}</small></div>}

    {active === 'live' && !isAdmin && joined.length > 0 && <div className="live-room"><div className="live-room-screen"><FiVideo /><strong>{copy.room}</strong><span>{copy.demoRoom}</span></div><button className="secondary-action" onClick={() => { setJoined([]); notify('Dars xonasidan chiqdingiz.'); }}>{copy.leave}</button></div>}

    {active === 'calendar' && !isAdmin && <div className="calendar-quick panel"><strong>Bugungi jadval</strong><div className="calendar-week">{['Du 12', 'Se 13', 'Cho 14', 'Pa 15', 'Ju 16', 'Sha 17', 'Ya 18'].map((day, index) => <button key={day} className={index === 3 ? 'calendar-current' : ''} onClick={() => notify(`${day}: ${records[index % records.length]?.name || 'Dars rejalashtirilmagan'}`)}>{day}</button>)}</div></div>}

    {visibleRecords.length > 0 && <div className="workspace-records">{visibleRecords.map((item) => <article className="panel workspace-record" key={recordKey(item)}><div className="workspace-record-icon">{iconFor(active)}</div><div className="workspace-record-body"><strong>{item.name}</strong><span>{item.detail}</span></div><span className={`workspace-status status-${String(item.status).toLowerCase().replace(/[^a-zа-я0-9]+/gi, '-')}`}>{item.status}</span>{actionButton(item)}</article>)}</div>}
    {visibleRecords.length === 0 && <div className="panel empty-state"><FiFileText /><h3>{t('noResults')}</h3><p>{copy.noRecords}</p>{adminRecords && <button className="primary-action" onClick={() => setModal({})}><FiPlus /> {copy.create}</button>}</div>}

    {active === 'assignments' && !isAdmin && submissions.length > 0 && <section className="panel submission-list"><h3>{copy.submittedAssignments}</h3>{submissions.map((submission) => <p key={submission.id}><FiCheck /> {submission.name} <span>{submission.date}</span><button className="simple-icon" aria-label={`${copy.download} ${submission.fileName}`} onClick={() => downloadSubmission(submission)}><FiDownload /></button></p>)}</section>}
    {active === 'assignments' && isAdmin && submissions.length > 0 && <section className="panel submission-list"><h3>{copy.submittedAssignments}</h3>{submissions.map((submission) => <p key={submission.id}><FiCheck /> {submission.name} <span>{submission.date}</span><button className="secondary-action" onClick={() => downloadSubmission(submission)}><FiDownload /> {copy.downloadFile}</button></p>)}</section>}

    {modal && modal.type === 'assign' && <div className="modal-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setModal(null); }}><form className="course-modal" onSubmit={assignStudentCourse}><div className="modal-heading"><h2>Kursga biriktirish</h2><button type="button" className="simple-icon" onClick={() => setModal(null)}>×</button></div><p>{modal.student.name}</p><label>Kursni tanlang<select name="courseId" required defaultValue={modal.student.courseId || ''}><option value="" disabled>Kurs tanlang</option>{courses.map((course) => <option value={course.id} key={course.id}>{course.title}</option>)}</select></label><div className="modal-actions"><button type="button" className="secondary-action" onClick={() => setModal(null)}>{copy.cancel}</button><button className="primary-action"><FiCheck />{t('save')}</button></div></form></div>}

    {modal && modal.type === 'submit' && <div className="modal-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setModal(null); }}><form className="course-modal" onSubmit={submitAssignment}><div className="modal-heading"><h2>{copy.submit}</h2><button type="button" className="simple-icon" onClick={() => setModal(null)}>×</button></div><p>{modal.item.name}</p><label>{copy.uploadLimit}<input name="assignment" type="file" required /></label><div className="modal-actions"><button type="button" className="secondary-action" onClick={() => setModal(null)}>{copy.cancel}</button><button className="primary-action"><FiUpload /> {copy.send}</button></div></form></div>}

    {modal && !modal.type && <div className="modal-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setModal(null); }}><form className="course-modal" onSubmit={saveRecord}><div className="modal-heading"><h2>{modal.id ? t('edit') : copy.create}</h2><button type="button" className="simple-icon" onClick={() => setModal(null)}>×</button></div>{fields.map((field, index) => { const statusField = ['students', 'teachers', 'lessons', 'assignments', 'tests', 'certificates', 'live', 'orders', 'notifications', 'calendar'].includes(active) && index === fields.length - 1; const valueKeys = active === 'students' ? ['name', 'phone', 'detail'] : active === 'teachers' ? ['name', 'detail', 'phone'] : active === 'lessons' ? ['name', 'detail', 'videoUrl'] : ['name', 'detail']; return <label key={field}>{field}{statusField ? <select data-field defaultValue={modal.status || 'Faol'}><option>Faol</option><option>Ochiq</option><option>Rejalashtirilgan</option><option>Kutilmoqda</option><option>To‘langan</option></select> : <input data-field defaultValue={modal[valueKeys[index]] || ''} placeholder={field} required={index === 0} />}</label>; })}<div className="modal-actions"><button type="button" className="secondary-action" onClick={() => setModal(null)}>{copy.cancel}</button><button className="primary-action" type="submit"><FiCheck />{t('save')}</button></div></form></div>}
  </section>;
}

function ReportPanel({ records }) {
  const paid = records.filter((row) => row.status === 'To‘langan').length;
  const revenue = records.filter((row) => row.status === 'To‘langan').reduce((sum, row) => sum + amountFromDetail(row.detail), 0);
  return <div className="report-cards"><article className="panel"><span>Jami buyurtmalar</span><strong>{records.length}</strong></article><article className="panel"><span>To‘langan</span><strong>{paid}</strong></article><article className="panel"><span>Kutilayotgan</span><strong>{records.length - paid}</strong></article><article className="panel"><span>Daromad</span><strong>{revenue.toLocaleString()} so‘m</strong></article></div>;
}

function workspaceIntro(active, isAdmin, language) {
  const text = {
    uz: {
      students: 'O‘quvchilar ro‘yxati, kursga biriktirish va holatini boshqarish.',
      teachers: 'O‘qituvchilar va mutaxassislik yo‘nalishlarini boshqaring.',
      lessons: isAdmin ? 'Kurslar bo‘yicha darslarni yarating va tahrirlang.' : 'Videodarslarni ko‘ring va tugatgach jarayonni belgilang.',
      assignments: isAdmin ? 'Topshiriqlarni yarating va topshirilgan ishlarni kuzating.' : 'Vazifani ko‘rib, tayyor faylni topshiring.',
      tests: isAdmin ? 'Testlarni yarating va o‘quvchilar natijalarini kuzating.' : 'Bilimingizni test bilan tekshirib, natijangizni saqlang.',
      certificates: isAdmin ? 'Sertifikatlar bering va ro‘yxatni boshqaring.' : 'Sertifikatlaringizni ko‘ring va yuklab oling.',
      live: isAdmin ? 'Jonli dars jadvalini yarating va boshqaring.' : 'Dars jadvaliga qo‘shiling. Uchrashuv xonasi demo ko‘rinishida.',
      orders: 'Buyurtmalar va to‘lov holatlarini boshqaring.', notifications: 'Bildirishnomalarni o‘qing va holatini yangilang.',
      messages: 'Xabarlarni ko‘ring va yangisini yuboring.', calendar: 'Darslar va tadbirlar jadvali.',
      resources: 'O‘quv materiallarini yuklab oling.', payments: 'To‘lovlar tarixi va cheklarni ko‘ring. Haqiqiy to‘lov demo rejimida mavjud emas.',
      reports: 'Buyurtmalarga asoslangan hisobotni ko‘ring va CSV eksport qiling.', profile: 'Shaxsiy ma’lumot va bildirishnoma sozlamalarini saqlang.',
      content: 'Sayt matnlari va aloqa ma’lumotlarini tahrirlang.', translations: 'Interfeys tarjima qiymatlarini tahrirlang.',
      roles: 'Foydalanuvchilarning demo rollarini boshqaring.', systemSettings: 'Platforma konfiguratsiyasini saqlang.',
    },
    ru: {
      students: 'Список учеников, назначение на курсы и изменение статуса.',
      teachers: 'Управление преподавателями и их специализациями.',
      lessons: isAdmin ? 'Создавайте и редактируйте уроки курсов.' : 'Открывайте уроки и отмечайте завершённые для обновления прогресса.',
      assignments: isAdmin ? 'Создавайте задания и проверяйте отправленные работы.' : 'Просмотрите задание и загрузите готовый файл.',
      tests: isAdmin ? 'Создавайте тесты и отслеживайте результаты учеников.' : 'Проверьте знания и сохраните результат теста.',
      certificates: isAdmin ? 'Выдавайте сертификаты и управляйте списком.' : 'Просматривайте и скачивайте сертификаты.',
      live: isAdmin ? 'Создавайте расписание живых занятий.' : 'Присоединяйтесь к расписанию. Комната работает в демо-режиме.',
      orders: 'Управляйте заказами и статусами оплаты.', notifications: 'Читайте уведомления и обновляйте их статус.',
      messages: 'Просматривайте и отправляйте сообщения.', calendar: 'Расписание уроков и мероприятий.',
      resources: 'Скачивайте учебные материалы.', payments: 'История платежей и чеки. Реальные платежи недоступны в демо.',
      reports: 'Просмотр отчётов по заказам и экспорт в CSV.', profile: 'Сохраняйте личные данные и настройки уведомлений.',
      content: 'Редактируйте тексты сайта и контактные данные.', translations: 'Редактируйте значения переводов интерфейса.',
      roles: 'Управляйте демонстрационными ролями пользователей.', systemSettings: 'Сохраняйте настройки платформы.',
    },
    en: {
      students: 'Manage student records, course assignments, and their status.',
      teachers: 'Manage instructors and their specializations.',
      lessons: isAdmin ? 'Create and edit lessons for courses.' : 'Open lessons and mark them complete to update your progress.',
      assignments: isAdmin ? 'Create assignments and track student submissions.' : 'Review the task and upload your finished file.',
      tests: isAdmin ? 'Create tests and review student results.' : 'Take an interactive quiz and save your result.',
      certificates: isAdmin ? 'Issue certificates and manage the list.' : 'View and download your certificates.',
      live: isAdmin ? 'Create and manage live-class schedules.' : 'Join a scheduled class. The meeting room is a demo.',
      orders: 'Manage orders and payment statuses.', notifications: 'Read notifications and update their status.',
      messages: 'View and send messages.', calendar: 'Schedule of lessons and events.',
      resources: 'Download learning materials.', payments: 'Payment history and receipts. Real payments are not available in this demo.',
      reports: 'Review order reports and export a CSV file.', profile: 'Save your personal details and notification preferences.',
      content: 'Edit website copy and contact details.', translations: 'Edit interface translation values.',
      roles: 'Manage demonstration user roles.', systemSettings: 'Save platform configuration.',
    },
  };
  return text[language]?.[active] || text.uz[active] || 'Bo‘lim ma’lumotlarini ko‘ring va boshqaring.';
}

function iconFor(active) {
  if (active === 'live') return <FiVideo />;
  if (active === 'messages') return <FiMessageCircle />;
  if (active === 'resources' || active === 'certificates' || active === 'payments') return <FiDownload />;
  return <FiFileText />;
}
