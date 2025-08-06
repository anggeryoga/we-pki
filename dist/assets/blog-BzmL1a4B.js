import"./supabase-B6KWXDKJ.js";import{B as i}from"./blog-BQU-0sm6.js";let l=0;const n=9;window.addEventListener("load",()=>{d()});document.getElementById("loadMoreBtn").addEventListener("click",()=>{l++,d(!1)});document.getElementById("closeModal").addEventListener("click",()=>{document.getElementById("articleModal").classList.add("hidden"),document.body.style.overflow="auto"});document.getElementById("articleModal").addEventListener("click",s=>{s.target.id==="articleModal"&&(document.getElementById("articleModal").classList.add("hidden"),document.body.style.overflow="auto")});async function d(s=!0){const r=l*n,t=await i.getArticles(n,r);if(t.success&&t.data.length>0){const a=document.getElementById("blogPosts"),o=t.data.map(e=>`
                    <article class="bg-black border-2 border-red-700 hover-blink">
                        ${e.featured_image?`
                            <img src="${e.featured_image}" alt="${e.title}" class="w-full h-48 object-cover filter grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition">
                        `:`
                            <div class="w-full h-48 bg-red-900 flex items-center justify-center">
                                <span class="text-6xl">🐾</span>
                            </div>
                        `}
                        <div class="p-6">
                            <h3 class="text-xl font-bold mb-2 font-['Press_Start_2P'] text-red-600 leading-tight">
                                ${e.title}
                            </h3>
                            <p class="text-sm mb-4 font-['IBM_Plex_Mono'] text-amber-200">
                                ${e.excerpt}
                            </p>
                            <div class="flex justify-between items-center text-xs text-gray-400 font-['IBM_Plex_Mono']">
                                <span>${new Date(e.created_at).toLocaleDateString("id-ID",{year:"numeric",month:"long",day:"numeric"})}</span>
                                <a href="/article.html?slug=${e.slug}" class="text-red-600 hover:text-amber-200 transition">BACA SELENGKAPNYA →</a>
                            </div>
                        </div>
                    </article>
                `).join("");s?a.innerHTML=o:a.innerHTML+=o,t.data.length<n&&(document.getElementById("loadMoreBtn").style.display="none")}else l===0&&(document.getElementById("blogPosts").innerHTML=`
                    <div class="col-span-full text-center py-12">
                        <div class="text-6xl mb-4">🐾</div>
                        <h3 class="text-2xl font-bold mb-2 font-['Press_Start_2P'] text-red-600">
                            BELUM ADA ARTIKEL
                        </h3>
                        <p class="font-['IBM_Plex_Mono'] text-amber-200">
                            Revolusi sedang dipersiapkan. Pantau terus!
                        </p>
                    </div>
                `,document.getElementById("loadMoreBtn").style.display="none")}
