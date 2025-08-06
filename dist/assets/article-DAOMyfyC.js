import"./supabase-B6KWXDKJ.js";import{B as s}from"./blog-BQU-0sm6.js";class l{static updatePageMeta(e){document.title=e.title||"PKI - Pecinta Kucing Indonesia",this.updateMetaTag("description",e.description||"Situs resmi PKI - Pecinta Kucing Indonesia. Satu Meong, Satu Suara."),this.updateMetaTag("og:title",e.title||"PKI - Pecinta Kucing Indonesia"),this.updateMetaTag("og:description",e.description||"Situs resmi PKI - Pecinta Kucing Indonesia. Satu Meong, Satu Suara."),this.updateMetaTag("og:image",e.image||"/assets/pki-logo.jpg"),this.updateMetaTag("og:url",e.url||window.location.href),this.updateMetaTag("og:type",e.type||"website"),this.updateMetaTag("twitter:card","summary_large_image"),this.updateMetaTag("twitter:title",e.title||"PKI - Pecinta Kucing Indonesia"),this.updateMetaTag("twitter:description",e.description||"Situs resmi PKI - Pecinta Kucing Indonesia. Satu Meong, Satu Suara."),this.updateMetaTag("twitter:image",e.image||"/assets/pki-logo.jpg"),this.updateCanonicalUrl(e.url||window.location.href),e.type==="article"&&this.addArticleStructuredData(e)}static updateMetaTag(e,n){let i=document.querySelector(`meta[property="${e}"]`)||document.querySelector(`meta[name="${e}"]`);i||(i=document.createElement("meta"),e.startsWith("og:")||e.startsWith("twitter:")?i.setAttribute("property",e):i.setAttribute("name",e),document.head.appendChild(i)),i.setAttribute("content",n)}static updateCanonicalUrl(e){let n=document.querySelector('link[rel="canonical"]');n||(n=document.createElement("link"),n.setAttribute("rel","canonical"),document.head.appendChild(n)),n.setAttribute("href",e)}static addArticleStructuredData(e){const n={"@context":"https://schema.org","@type":"Article",headline:e.title,description:e.description,image:e.image,author:{"@type":"Organization",name:"PKI - Pecinta Kucing Indonesia"},publisher:{"@type":"Organization",name:"PKI - Pecinta Kucing Indonesia",logo:{"@type":"ImageObject",url:"/assets/pki-logo.jpg"}},datePublished:e.publishedDate,dateModified:e.modifiedDate||e.publishedDate};let i=document.querySelector('script[type="application/ld+json"]');i||(i=document.createElement("script"),i.setAttribute("type","application/ld+json"),document.head.appendChild(i)),i.textContent=JSON.stringify(n)}}let o=null;window.addEventListener("load",()=>{c()});async function c(){const e=new URLSearchParams(window.location.search).get("slug");if(!e){a();return}try{const n=await s.getArticleBySlug(e);n.success?(o=n.data,d(o),m()):a()}catch(n){console.error("Error loading article:",n),a()}}function d(t){l.updatePageMeta({title:`${t.title} - PKI Blog`,description:t.excerpt,image:t.featured_image,url:`${window.location.origin}/article.html?slug=${t.slug}`,type:"article",publishedDate:t.created_at,modifiedDate:t.updated_at}),document.getElementById("articleTitle").textContent=`${t.title} - PKI Blog`,document.getElementById("articleDescription").setAttribute("content",t.excerpt),document.getElementById("articleContent").innerHTML=`
                <header class="mb-8">
                    <h1 class="text-3xl md:text-4xl font-bold mb-4 font-['Press_Start_2P'] text-red-600 leading-tight">
                        ${t.title}
                    </h1>
                    <div class="flex flex-wrap items-center gap-4 text-sm text-amber-200 font-['IBM_Plex_Mono'] mb-6">
                        <span class="flex items-center">
                            📅 ${new Date(t.created_at).toLocaleDateString("id-ID",{year:"numeric",month:"long",day:"numeric"})}
                        </span>
                        <span class="flex items-center">
                            👁️ Artikel PKI
                        </span>
                        <span class="flex items-center">
                            🏷️ Revolusi Meong
                        </span>
                    </div>
                    ${t.featured_image?`
                        <img src="${t.featured_image}" alt="${t.title}" class="w-full h-64 md:h-96 object-cover mb-8 border-2 border-red-700 rounded">
                    `:""}
                    <div class="bg-red-900 p-4 border-l-4 border-red-600 mb-8">
                        <p class="text-amber-200 font-['IBM_Plex_Mono'] italic">
                            ${t.excerpt}
                        </p>
                    </div>
                </header>
                <div class="article-content">
                    ${t.content_html}
                </div>
            `,document.getElementById("loadingState").classList.add("hidden"),document.getElementById("articleContent").classList.remove("hidden"),document.getElementById("shareSection").classList.remove("hidden"),u(t)}function u(t){const e=`${window.location.origin}/article.html?slug=${t.slug}`,n=`${t.title} - PKI Blog`;document.getElementById("shareTwitter").addEventListener("click",()=>{const i=`https://twitter.com/intent/tweet?text=${encodeURIComponent(n)}&url=${encodeURIComponent(e)}`;window.open(i,"_blank","width=600,height=400")}),document.getElementById("shareFacebook").addEventListener("click",()=>{const i=`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(e)}`;window.open(i,"_blank","width=600,height=400")}),document.getElementById("copyLink").addEventListener("click",()=>{navigator.clipboard.writeText(e).then(()=>{const i=document.getElementById("copyLink"),r=i.textContent;i.textContent="✅ TERSALIN!",setTimeout(()=>{i.textContent=r},2e3)})})}async function m(){try{const t=await s.getArticles(4,0);if(t.success&&t.data.length>0){const e=t.data.filter(n=>n.slug!==o.slug).slice(0,3);e.length>0&&(document.getElementById("relatedList").innerHTML=e.map(n=>`
                            <a href="/article.html?slug=${n.slug}" class="block p-4 border border-red-700 hover:bg-red-900 transition">
                                <div class="flex items-start space-x-4">
                                    ${n.featured_image?`
                                        <img src="${n.featured_image}" alt="${n.title}" class="w-16 h-16 object-cover border border-red-700">
                                    `:`
                                        <div class="w-16 h-16 bg-red-900 flex items-center justify-center border border-red-700">
                                            <span class="text-2xl">🐾</span>
                                        </div>
                                    `}
                                    <div class="flex-1">
                                        <h4 class="font-bold text-amber-200 mb-1 font-['IBM_Plex_Mono']">
                                            ${n.title}
                                        </h4>
                                        <p class="text-sm text-gray-400 font-['IBM_Plex_Mono']">
                                            ${n.excerpt.substring(0,100)}...
                                        </p>
                                    </div>
                                </div>
                            </a>
                        `).join(""),document.getElementById("relatedArticles").classList.remove("hidden"))}}catch(t){console.error("Error loading related articles:",t)}}function a(){document.getElementById("loadingState").classList.add("hidden"),document.getElementById("errorState").classList.remove("hidden")}
