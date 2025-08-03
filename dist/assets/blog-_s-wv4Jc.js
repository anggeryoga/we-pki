import"./supabase-B6KWXDKJ.js";import{B as c}from"./blog-BQU-0sm6.js";class u{static updatePageMeta(e){document.title=e.title||"PKI - Pecinta Kucing Indonesia",this.updateMetaTag("description",e.description||"Situs resmi PKI - Pecinta Kucing Indonesia. Satu Meong, Satu Suara."),this.updateMetaTag("og:title",e.title||"PKI - Pecinta Kucing Indonesia"),this.updateMetaTag("og:description",e.description||"Situs resmi PKI - Pecinta Kucing Indonesia. Satu Meong, Satu Suara."),this.updateMetaTag("og:image",e.image||"/assets/pki-logo.jpg"),this.updateMetaTag("og:url",e.url||window.location.href),this.updateMetaTag("og:type",e.type||"website"),this.updateMetaTag("twitter:card","summary_large_image"),this.updateMetaTag("twitter:title",e.title||"PKI - Pecinta Kucing Indonesia"),this.updateMetaTag("twitter:description",e.description||"Situs resmi PKI - Pecinta Kucing Indonesia. Satu Meong, Satu Suara."),this.updateMetaTag("twitter:image",e.image||"/assets/pki-logo.jpg"),this.updateCanonicalUrl(e.url||window.location.href),e.type==="article"&&this.addArticleStructuredData(e)}static updateMetaTag(e,t){let i=document.querySelector(`meta[property="${e}"]`)||document.querySelector(`meta[name="${e}"]`);i||(i=document.createElement("meta"),e.startsWith("og:")||e.startsWith("twitter:")?i.setAttribute("property",e):i.setAttribute("name",e),document.head.appendChild(i)),i.setAttribute("content",t)}static updateCanonicalUrl(e){let t=document.querySelector('link[rel="canonical"]');t||(t=document.createElement("link"),t.setAttribute("rel","canonical"),document.head.appendChild(t)),t.setAttribute("href",e)}static addArticleStructuredData(e){const t={"@context":"https://schema.org","@type":"Article",headline:e.title,description:e.description,image:e.image,author:{"@type":"Organization",name:"PKI - Pecinta Kucing Indonesia"},publisher:{"@type":"Organization",name:"PKI - Pecinta Kucing Indonesia",logo:{"@type":"ImageObject",url:"/assets/pki-logo.jpg"}},datePublished:e.publishedDate,dateModified:e.modifiedDate||e.publishedDate};let i=document.querySelector('script[type="application/ld+json"]');i||(i=document.createElement("script"),i.setAttribute("type","application/ld+json"),document.head.appendChild(i)),i.textContent=JSON.stringify(t)}}let l=0;const s=9;window.addEventListener("load",()=>{d()});document.getElementById("loadMoreBtn").addEventListener("click",()=>{l++,d(!1)});document.getElementById("closeModal").addEventListener("click",()=>{document.getElementById("articleModal").classList.add("hidden"),document.body.style.overflow="auto"});document.getElementById("articleModal").addEventListener("click",n=>{n.target.id==="articleModal"&&(document.getElementById("articleModal").classList.add("hidden"),document.body.style.overflow="auto")});async function d(n=!0){const e=l*s,t=await c.getArticles(s,e);if(t.success&&t.data.length>0){const i=document.getElementById("blogPosts"),o=t.data.map(a=>`
                    <article class="bg-black border-2 border-red-700 hover-blink cursor-pointer" onclick="openArticle('${a.slug}')">
                        ${a.featured_image?`
                            <img src="${a.featured_image}" alt="${a.title}" class="w-full h-48 object-cover filter grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition">
                        `:`
                            <div class="w-full h-48 bg-red-900 flex items-center justify-center">
                                <span class="text-6xl">🐾</span>
                            </div>
                        `}
                        <div class="p-6">
                            <h3 class="text-xl font-bold mb-2 font-['Press_Start_2P'] text-red-600 leading-tight">
                                ${a.title}
                            </h3>
                            <p class="text-sm mb-4 font-['IBM_Plex_Mono'] text-amber-200">
                                ${a.excerpt}
                            </p>
                            <div class="flex justify-between items-center text-xs text-gray-400 font-['IBM_Plex_Mono']">
                                <span>${new Date(a.created_at).toLocaleDateString("id-ID",{year:"numeric",month:"long",day:"numeric"})}</span>
                                <span class="text-red-600">BACA SELENGKAPNYA →</span>
                            </div>
                        </div>
                    </article>
                `).join("");n?i.innerHTML=o:i.innerHTML+=o,t.data.length<s&&(document.getElementById("loadMoreBtn").style.display="none")}else l===0&&(document.getElementById("blogPosts").innerHTML=`
                    <div class="col-span-full text-center py-12">
                        <div class="text-6xl mb-4">🐾</div>
                        <h3 class="text-2xl font-bold mb-2 font-['Press_Start_2P'] text-red-600">
                            BELUM ADA ARTIKEL
                        </h3>
                        <p class="font-['IBM_Plex_Mono'] text-amber-200">
                            Revolusi sedang dipersiapkan. Pantau terus!
                        </p>
                    </div>
                `,document.getElementById("loadMoreBtn").style.display="none")}window.openArticle=async n=>{const e=await c.getArticleBySlug(n);if(e.success){const t=e.data;u.updatePageMeta({title:`${t.title} - PKI Blog`,description:t.excerpt,image:t.featured_image,url:`${window.location.origin}/blog.html?article=${n}`,type:"article",publishedDate:t.created_at,modifiedDate:t.updated_at}),document.getElementById("articleContent").innerHTML=`
                    <div class="mb-6">
                        <h1 class="text-3xl md:text-4xl font-bold mb-4 font-['Press_Start_2P'] text-red-600 leading-tight">
                            ${t.title}
                        </h1>
                        <div class="flex items-center text-sm text-amber-200 font-['IBM_Plex_Mono'] mb-6">
                            <span>📅 ${new Date(t.created_at).toLocaleDateString("id-ID",{year:"numeric",month:"long",day:"numeric"})}</span>
                            <span class="mx-4">•</span>
                            <span>👁️ Artikel PKI</span>
                        </div>
                        ${t.featured_image?`
                            <img src="${t.featured_image}" alt="${t.title}" class="w-full h-64 md:h-96 object-cover mb-6 border-2 border-red-700">
                        `:""}
                    </div>
                    <div class="prose prose-invert max-w-none font-['IBM_Plex_Mono'] leading-relaxed">
                        ${t.content_html}
                    </div>
                    <div class="mt-8 pt-6 border-t border-red-700">
                        <div class="flex items-center justify-between">
                            <div class="text-sm text-amber-200 font-['IBM_Plex_Mono']">
                                Bagikan revolusi ini:
                            </div>
                            <div class="flex space-x-4">
                                <button onclick="shareArticle('twitter', '${t.title}', '${n}')" class="px-3 py-1 bg-blue-600 text-white text-sm hover:bg-blue-700 transition">
                                    Twitter
                                </button>
                                <button onclick="shareArticle('facebook', '${t.title}', '${n}')" class="px-3 py-1 bg-blue-800 text-white text-sm hover:bg-blue-900 transition">
                                    Facebook
                                </button>
                                <button onclick="copyArticleLink('${n}')" class="px-3 py-1 bg-gray-700 text-white text-sm hover:bg-gray-800 transition">
                                    Copy Link
                                </button>
                            </div>
                        </div>
                    </div>
                `,document.getElementById("articleModal").classList.remove("hidden"),document.body.style.overflow="hidden",window.history.pushState({},"",`/blog.html?article=${n}`)}};window.shareArticle=(n,e,t)=>{const i=`${window.location.origin}/blog.html?article=${t}`,o=`${e} - PKI Blog`;let a;n==="twitter"?a=`https://twitter.com/intent/tweet?text=${encodeURIComponent(o)}&url=${encodeURIComponent(i)}`:n==="facebook"&&(a=`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(i)}`),a&&window.open(a,"_blank","width=600,height=400")};window.copyArticleLink=n=>{const e=`${window.location.origin}/blog.html?article=${n}`;navigator.clipboard.writeText(e).then(()=>{alert("Link berhasil disalin!")})};const m=new URLSearchParams(window.location.search),r=m.get("article");r&&setTimeout(()=>{openArticle(r)},500);
