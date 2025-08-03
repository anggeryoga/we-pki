# PKI - Pecinta Kucing Indonesia

Website resmi PKI dengan sistem blog dan galeri yang aman.

## Setup Awal

### 1. Setup Database (Supabase)

1. Buat project baru di [Supabase](https://supabase.com)
2. Copy URL dan Anon Key ke file `.env`:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
3. Jalankan migrasi database di Supabase SQL Editor
4. Pastikan RLS (Row Level Security) aktif

### 2. Setup Admin Pertama

1. Buka `/setup-admin.html` di browser
2. Buat akun admin pertama dengan email dan password
3. Setelah berhasil, login di `/login.html`

### 3. Keamanan Database

#### Row Level Security (RLS)
- ✅ Semua tabel menggunakan RLS
- ✅ Admin hanya bisa akses data mereka sendiri
- ✅ Public hanya bisa baca artikel yang published
- ✅ Storage images dengan policy ketat

#### Admin Security
- ✅ Verifikasi role admin di setiap request
- ✅ Session management yang aman
- ✅ Password minimal 6 karakter
- ✅ Email validation

#### Content Security
- ✅ Markdown sanitization dengan DOMPurify
- ✅ File upload validation (type & size)
- ✅ Slug generation yang aman
- ✅ XSS protection

### 4. Fitur Utama

#### Blog Management
- ✅ Create, Read, Update, Delete artikel
- ✅ Markdown editor dengan preview
- ✅ Draft dan publish system
- ✅ SEO-friendly URLs (slug)
- ✅ Featured images
- ✅ Responsive design

#### Gallery Management
- ✅ Upload gambar dengan validasi
- ✅ Resize dan optimasi otomatis
- ✅ Metadata management
- ✅ Delete dengan cleanup storage
- ✅ Grid layout responsive

#### Dashboard Features
- ✅ Statistics overview
- ✅ Content management
- ✅ User management
- ✅ Security monitoring

### 5. Deployment

```bash
npm run build
```

Deploy folder `dist` ke hosting pilihan Anda.

### 6. Environment Variables

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 7. Security Checklist

- [x] RLS enabled pada semua tabel
- [x] Admin role verification
- [x] Content sanitization
- [x] File upload validation
- [x] Session security
- [x] HTTPS enforcement (production)
- [x] Input validation
- [x] Error handling

### 8. Troubleshooting

#### Database Issues
- Pastikan migrasi sudah dijalankan
- Check RLS policies di Supabase dashboard
- Verify admin_users table ada data

#### Auth Issues
- Clear browser cache dan cookies
- Check Supabase auth settings
- Verify email confirmation disabled

#### Upload Issues
- Check storage bucket permissions
- Verify file size limits
- Check file type restrictions

## Development

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm run preview
```

## Support

Untuk bantuan teknis, hubungi tim development PKI.

---

**PKI - Pecinta Kucing Indonesia**  
*"Satu Meong, Satu Suara"*