import"./supabase-B6KWXDKJ.js";import{G as r}from"./gallery-B041qNqH.js";window.addEventListener("load",async()=>{const e=await r.getGalleryImages();if(e.success&&e.data.length>0){const t=document.querySelector("#galeri .grid");t.innerHTML=e.data.slice(0,8).map(a=>`
                    <div class="hover-blink">
                        <img src="${a.image_url}" alt="${a.name}" class="w-full h-48 object-cover filter grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition">
                        <div class="p-2 bg-gray-900 text-center">
                            <p class="text-sm font-bold text-amber-200">${a.name}</p>
                        </div>
                    </div>
                `).join("")}});
