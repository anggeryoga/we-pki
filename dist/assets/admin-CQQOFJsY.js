import"./supabase-B6KWXDKJ.js";import{A as i}from"./auth-DpkU9CxX.js";import{B as n}from"./blog-BQU-0sm6.js";import{G as c}from"./gallery-B041qNqH.js";window.addEventListener("load",async()=>{const t=await i.getCurrentUser();if(!t){i.redirectToLogin();return}if(!await i.checkAdminRole(t.id)){i.redirectToLogin();return}document.getElementById("userEmail").textContent=t.email,d(),s(),o()});document.getElementById("logoutBtn").addEventListener("click",async()=>{await i.logout(),i.redirectToLogin()});document.querySelectorAll(".tab-button").forEach(t=>{t.addEventListener("click",()=>{const l=t.dataset.tab;document.querySelectorAll(".tab-button").forEach(e=>e.classList.remove("active")),t.classList.add("active"),document.querySelectorAll(".tab-content").forEach(e=>e.classList.remove("active")),document.getElementById(l).classList.add("active")})});document.getElementById("newArticleBtn").addEventListener("click",()=>{document.getElementById("articleForm").classList.remove("hidden"),document.getElementById("formTitle").textContent="ARTIKEL BARU",document.getElementById("articleFormElement").reset(),document.getElementById("articleId").value=""});document.getElementById("cancelArticle").addEventListener("click",()=>{document.getElementById("articleForm").classList.add("hidden")});document.getElementById("articleFormElement").addEventListener("submit",async t=>{t.preventDefault();const l={title:document.getElementById("articleTitle").value,excerpt:document.getElementById("articleExcerpt").value,content:document.getElementById("articleContent").value,featured_image:document.getElementById("articleImage").value,published:document.getElementById("articlePublished").checked},e=document.getElementById("articleId").value;let a;e?a=await n.updateArticle(e,l):a=await n.createArticle(l),a.success?(document.getElementById("articleForm").classList.add("hidden"),d()):alert("Error: "+a.error)});document.getElementById("uploadImageBtn").addEventListener("click",()=>{document.getElementById("uploadForm").classList.remove("hidden")});document.getElementById("cancelUpload").addEventListener("click",()=>{document.getElementById("uploadForm").classList.add("hidden")});document.getElementById("uploadFormElement").addEventListener("submit",async t=>{t.preventDefault();const l=document.getElementById("imageFile").files[0];if(!l)return;const e=await c.uploadImage(l);if(!e.success){alert("Error uploading image: "+e.error);return}const a={name:document.getElementById("imageName").value,description:document.getElementById("imageDescription").value,image_url:e.url,image_path:e.path},r=await c.addGalleryImage(a);r.success?(document.getElementById("uploadForm").classList.add("hidden"),document.getElementById("uploadFormElement").reset(),s()):alert("Error: "+r.error)});async function d(){const t=await n.getAllArticlesForAdmin();if(t.success){const l=document.getElementById("articlesList");l.innerHTML=t.data.map(e=>`
                    <div class="border border-red-700 p-4 flex justify-between items-center">
                        <div>
                            <h3 class="font-bold">${e.title}</h3>
                            <p class="text-sm text-gray-400">${e.excerpt}</p>
                            <p class="text-xs text-amber-200">
                                ${e.published?"Terbit":"Draft"} • 
                                ${new Date(e.created_at).toLocaleDateString("id-ID")}
                            </p>
                        </div>
                        <div class="flex space-x-2">
                            <button onclick="editArticle('${e.id}')" class="px-3 py-1 bg-blue-700 text-white text-sm">
                                Edit
                            </button>
                            <button onclick="deleteArticle('${e.id}')" class="px-3 py-1 bg-red-700 text-white text-sm">
                                Hapus
                            </button>
                        </div>
                    </div>
                `).join("")}}async function s(){const t=await c.getGalleryImages();if(t.success){const l=document.getElementById("galleryGrid");l.innerHTML=t.data.map(e=>`
                    <div class="relative group">
                        <img src="${e.image_url}" alt="${e.name}" class="w-full h-48 object-cover">
                        <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button onclick="deleteGalleryImage('${e.id}')" class="px-3 py-1 bg-red-700 text-white text-sm">
                                Hapus
                            </button>
                        </div>
                        <div class="p-2 bg-gray-900">
                            <p class="text-sm font-bold">${e.name}</p>
                            <p class="text-xs text-gray-400">${e.description||""}</p>
                        </div>
                    </div>
                `).join("")}}async function o(){await n.getAllArticlesForAdmin();const t=await c.getGalleryImages(),l=await n.getArticleStats();l.success&&(document.getElementById("totalArticles").textContent=l.stats.total,document.getElementById("publishedArticles").textContent=l.stats.published,document.getElementById("draftArticles").textContent=l.stats.drafts),t.success&&(document.getElementById("totalImages").textContent=t.data.length)}window.editArticle=async t=>{const l=await n.getAllArticlesForAdmin();if(l.success){const e=l.data.find(a=>a.id===t);e&&(document.getElementById("articleId").value=e.id,document.getElementById("articleTitle").value=e.title,document.getElementById("articleExcerpt").value=e.excerpt,document.getElementById("articleContent").value=e.content,document.getElementById("articleImage").value=e.featured_image||"",document.getElementById("articlePublished").checked=e.published,document.getElementById("formTitle").textContent="EDIT ARTIKEL",document.getElementById("articleForm").classList.remove("hidden"))}};window.deleteArticle=async t=>{if(confirm("Yakin ingin menghapus artikel ini?")){const l=await n.deleteArticle(t);l.success?d():alert("Error: "+l.error)}};window.deleteGalleryImage=async t=>{if(confirm("Yakin ingin menghapus gambar ini?")){const l=await c.deleteGalleryImage(t);l.success?(s(),o()):alert("Error: "+l.error)}};
