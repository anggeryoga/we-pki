import"./supabase-B6KWXDKJ.js";import{A as l}from"./auth-DpkU9CxX.js";import{B as s}from"./blog-BQU-0sm6.js";import{G as i,M as c}from"./members-DHMXKi-M.js";window.addEventListener("load",async()=>{const t=await l.getCurrentUser();if(!t){l.redirectToLogin();return}if(!await l.checkAdminRole(t.id)){l.redirectToLogin();return}document.getElementById("userEmail").textContent=t.email,r(),o(),m(),d()});document.getElementById("logoutBtn").addEventListener("click",async()=>{await l.logout(),l.redirectToLogin()});document.querySelectorAll(".tab-button").forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.tab;document.querySelectorAll(".tab-button").forEach(e=>e.classList.remove("active")),t.classList.add("active"),document.querySelectorAll(".tab-content").forEach(e=>e.classList.remove("active")),document.getElementById(a).classList.add("active")})});document.getElementById("newArticleBtn").addEventListener("click",()=>{document.getElementById("articleForm").classList.remove("hidden"),document.getElementById("formTitle").textContent="ARTIKEL BARU",document.getElementById("articleFormElement").reset(),document.getElementById("articleId").value=""});document.getElementById("cancelArticle").addEventListener("click",()=>{document.getElementById("articleForm").classList.add("hidden")});document.getElementById("articleFormElement").addEventListener("submit",async t=>{t.preventDefault();const a={title:document.getElementById("articleTitle").value,excerpt:document.getElementById("articleExcerpt").value,content:document.getElementById("articleContent").value,featured_image:document.getElementById("articleImage").value,published:document.getElementById("articlePublished").checked},e=document.getElementById("articleId").value;let n;e?n=await s.updateArticle(e,a):n=await s.createArticle(a),n.success?(document.getElementById("articleForm").classList.add("hidden"),r()):alert("Error: "+n.error)});document.getElementById("uploadImageBtn").addEventListener("click",()=>{document.getElementById("uploadForm").classList.remove("hidden")});document.getElementById("cancelUpload").addEventListener("click",()=>{document.getElementById("uploadForm").classList.add("hidden")});document.getElementById("uploadFormElement").addEventListener("submit",async t=>{t.preventDefault();const a=document.getElementById("imageFile").files[0];if(!a)return;const e=await i.uploadImage(a);if(!e.success){alert("Error uploading image: "+e.error);return}const n={name:document.getElementById("imageName").value,description:document.getElementById("imageDescription").value,image_url:e.url,image_path:e.path},u=await i.addGalleryImage(n);u.success?(document.getElementById("uploadForm").classList.add("hidden"),document.getElementById("uploadFormElement").reset(),o()):alert("Error: "+u.error)});async function r(){const t=await s.getAllArticlesForAdmin();if(t.success){const a=document.getElementById("articlesList");a.innerHTML=t.data.map(e=>`
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
                `).join("")}}async function o(){const t=await i.getGalleryImages();if(t.success){const a=document.getElementById("galleryGrid");a.innerHTML=t.data.map(e=>`
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
                `).join("")}}async function m(){const t=await c.getAllMemberForms();if(t.success){const a=document.getElementById("membersList");a.innerHTML=t.data.map(e=>`
                    <div class="border border-red-700 p-4">
                        <div class="flex justify-between items-start mb-2">
                            <div class="flex-1">
                                <h3 class="font-bold text-amber-200">${e.name}</h3>
                                <p class="text-sm text-gray-400">📍 ${e.region}</p>
                                <p class="text-sm text-gray-400">🐱 ${e.cat_info}</p>
                            </div>
                            <div class="flex items-center space-x-2">
                                <span class="px-2 py-1 text-xs rounded ${e.status==="approved"?"bg-green-700 text-green-200":e.status==="rejected"?"bg-red-700 text-red-200":"bg-yellow-700 text-yellow-200"}">
                                    ${e.status==="approved"?"DISETUJUI":e.status==="rejected"?"DITOLAK":"MENUNGGU"}
                                </span>
                            </div>
                        </div>
                        <p class="text-sm mb-3 font-['IBM_Plex_Mono'] text-amber-100">
                            "${e.reason}"
                        </p>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500">
                                ${new Date(e.created_at).toLocaleDateString("id-ID")}
                            </span>
                            <div class="flex space-x-2">
                                ${e.status==="pending"?`
                                    <button onclick="updateMemberStatus('${e.id}', 'approved')" class="px-3 py-1 bg-green-700 text-white text-sm">
                                        Setujui
                                    </button>
                                    <button onclick="updateMemberStatus('${e.id}', 'rejected')" class="px-3 py-1 bg-red-700 text-white text-sm">
                                        Tolak
                                    </button>
                                `:""}
                                <button onclick="deleteMember('${e.id}')" class="px-3 py-1 bg-gray-700 text-white text-sm">
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                `).join("")}}async function d(){await s.getAllArticlesForAdmin();const t=await i.getGalleryImages(),a=await s.getArticleStats(),e=await c.getMemberStats();a.success&&(document.getElementById("totalArticles").textContent=a.stats.total,document.getElementById("publishedArticles").textContent=a.stats.published,document.getElementById("draftArticles").textContent=a.stats.drafts),t.success&&(document.getElementById("totalImages").textContent=t.data.length),e.success&&(document.getElementById("totalMembers").textContent=e.stats.total,document.getElementById("pendingMembers").textContent=e.stats.pending)}window.editArticle=async t=>{const a=await s.getAllArticlesForAdmin();if(a.success){const e=a.data.find(n=>n.id===t);e&&(document.getElementById("articleId").value=e.id,document.getElementById("articleTitle").value=e.title,document.getElementById("articleExcerpt").value=e.excerpt,document.getElementById("articleContent").value=e.content,document.getElementById("articleImage").value=e.featured_image||"",document.getElementById("articlePublished").checked=e.published,document.getElementById("formTitle").textContent="EDIT ARTIKEL",document.getElementById("articleForm").classList.remove("hidden"))}};window.deleteArticle=async t=>{if(confirm("Yakin ingin menghapus artikel ini?")){const a=await s.deleteArticle(t);a.success?r():alert("Error: "+a.error)}};window.deleteGalleryImage=async t=>{if(confirm("Yakin ingin menghapus gambar ini?")){const a=await i.deleteGalleryImage(t);a.success?(o(),d()):alert("Error: "+a.error)}};window.updateMemberStatus=async(t,a)=>{const e=await c.updateMemberFormStatus(t,a);e.success?(m(),d()):alert("Error: "+e.error)};window.deleteMember=async t=>{if(confirm("Yakin ingin menghapus data anggota ini?")){const a=await c.deleteMemberForm(t);a.success?(m(),d()):alert("Error: "+a.error)}};
