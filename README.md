# IT TAT kirish sahifasi

Frontend GitHub Pages'da, OTP va direktor autentifikatsiya API'si Render'da ishlaydi.

## Joylashtirish

1. GitHub Pages manbasi **GitHub Actions** ekanini tekshiring. `master` branch'ga yuborilgan o'zgarishlar frontend'ni build va deploy qiladi.
2. Render'da **New + → Blueprint** orqali ushbu repozitoriyani tanlab, `render.yaml` xizmatini yarating.
3. Render so'ragan maxfiy environment variable'larga Eskiz hisobingizdagi `ESKIZ_EMAIL`, `ESKIZ_PASSWORD` va direktor uchun tanlangan `DIRECTOR_CODE` qiymatlarini kiriting. `JWT_SECRET` avtomatik yaratiladi. Maxfiy qiymatlarni GitHub'ga yoki chatga yubormang.
4. Render'dagi `ittat-auth-api` xizmatining public URL manzilini oling. GitHub repozitoriyasida **Settings → Secrets and variables → Actions → Variables** bo'limida `AUTH_API_URL` nomli repository variable yarating va qiymatiga Render URL'ini kiriting (`https://` bilan, oxirida `/` qo'ymasdan).
5. GitHub Actions workflow'ni qayta ishga tushiring. Frontend API URL'siz build qilingan bo'lsa, `AUTH_API_URL` qo'shgach workflow'ni qayta ishga tushirish shart.
6. Eskiz akkauntingizda `4546` SMS yuboruvchi nomi faolligini tekshiring. Boshqa tasdiqlangan sender kerak bo'lsa, Render'dagi `ESKIZ_FROM` qiymatini yangilang.

Mahalliy frontend uchun `.env.local` faylida `REACT_APP_AUTH_API_URL=https://<render-service-url>` belgilang va `npm start` ni ishga tushiring. Backend'ni alohida terminalda `cd server; npm install; npm start` bilan ishga tushirish mumkin. Render sozlamalarini lokal ishlatishda environment variable sifatida kiriting.

## Autentifikatsiya

- Foydalanuvchi O'zbekiston telefon raqamini kiritadi, SMS kod 5 daqiqa amal qiladi va bir marta ishlatiladi.
- SMS qayta yuborish kamida 60 soniyadan keyin ochiladi. Telefon va IP bo'yicha urinishlar ham cheklangan.
- Foydalanuvchi sifatida istalgan tasdiqlangan `+998` raqami kira oladi.
- Direktor kodi faqat backend environment variable'da saqlanadi, frontend bundle'ga qo'shilmaydi.
- Kirish tokeni 8 soatda tugaydi. OTP kodlari backend xotirasida saqlanadi; API qayta ishga tushsa, yuborilgan kodlar bekor bo'ladi va yangisini so'rash kerak.

## Tekshiruv

- Frontend: `npm test -- --watchAll=false`, `npm run build`
- Backend: `cd server; npm test`
