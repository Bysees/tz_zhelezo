import{r as g,u as _,a as E,j as p,b as I}from"./index-CrzlR7HF.js";import{u as A,P as B,F as C}from"./use.scroll.restoration-DXcjKtfW.js";var w=new Map,m=new WeakMap,S=0,V=void 0;function $(t){return t?(m.has(t)||(S+=1,m.set(t,S.toString())),m.get(t)):"0"}function F(t){return Object.keys(t).sort().filter(e=>t[e]!==void 0).map(e=>`${e}_${e==="root"?$(t.root):t[e]}`).toString()}function M(t){const e=F(t);let r=w.get(e);if(!r){const i=new Map;let n;const a=new IntersectionObserver(o=>{o.forEach(s=>{var c;const l=s.isIntersecting&&n.some(u=>s.intersectionRatio>=u);t.trackVisibility&&typeof s.isVisible>"u"&&(s.isVisible=l),(c=i.get(s.target))==null||c.forEach(u=>{u(l,s)})})},t);n=a.thresholds||(Array.isArray(t.threshold)?t.threshold:[t.threshold||0]),r={id:e,observer:a,elements:i},w.set(e,r)}return r}function N(t,e,r={},i=V){if(typeof window.IntersectionObserver>"u"&&i!==void 0){const c=t.getBoundingClientRect();return e(i,{isIntersecting:i,target:t,intersectionRatio:typeof r.threshold=="number"?r.threshold:0,time:0,boundingClientRect:c,intersectionRect:c,rootBounds:c}),()=>{}}const{id:n,observer:a,elements:o}=M(r),s=o.get(t)||[];return o.has(t)||o.set(t,s),s.push(e),a.observe(t),function(){s.splice(s.indexOf(e),1),s.length===0&&(o.delete(t),a.unobserve(t)),o.size===0&&(a.disconnect(),w.delete(n))}}function O({threshold:t,delay:e,trackVisibility:r,rootMargin:i,root:n,triggerOnce:a,skip:o,initialInView:s,fallbackInView:c,onChange:l}={}){var u;const[f,d]=g.useState(null),P=g.useRef(),[b,L]=g.useState({inView:!!s,entry:void 0});P.current=l,g.useEffect(()=>{if(o||!f)return;let v;return v=N(f,(y,x)=>{L({inView:y,entry:x}),P.current&&P.current(y,x),x.isIntersecting&&a&&v&&(v(),v=void 0)},{root:n,rootMargin:i,threshold:t,trackVisibility:r,delay:e},c),()=>{v&&v()}},[Array.isArray(t)?t.toString():t,f,n,i,a,o,r,c,e]);const R=(u=b.entry)==null?void 0:u.target,j=g.useRef();!f&&R&&!a&&!o&&j.current!==R&&(j.current=R,L({inView:!!s,entry:void 0}));const h=[d,b.inView,b.entry];return h.ref=h[0],h.inView=h[1],h.entry=h[2],h}const T=t=>t.reduce((e,r)=>{const i=r.match(/_page=(\d+)/),n=r.match(/rel="([^"]+)"/);if(i&&n){const a=parseInt(i[1],10),o=n[1];e[o]=a}return e},{}),q="https://jsonplaceholder.typicode.com",z=async t=>{var d;const{limit:e=10,page:r,signal:i}=t,n=await fetch(`${q}/albums/1/photos/?_page=${r}_limit=${e}`,{signal:i}),a=await n.json(),o=+(n==null?void 0:n.headers.get("x-total-count")),s=(d=n==null?void 0:n.headers.get("Link"))==null?void 0:d.split(","),{last:c,first:l,next:u,prev:f}=T(s);return{photoList:a,totalCount:o,firstPage:l,prevPage:f,nextPage:u,lastPage:c}},H="_intersect_15l3q_1",U={intersect:H},W=()=>{const{photoList:t,lastPage:e,page:r}=_(),{addPhotos:i,setLastPage:n,setPage:a}=E(),[o,s]=g.useState("init"),c=g.useRef(new AbortController),l=async d=>{try{s("loading");const{photoList:P,lastPage:b}=await z({page:d,signal:c.current.signal});a(d+1),n(b),i(P)}catch{s("error")}s("success")},u=d=>{d&&r-1<e&&l(r)},[f]=O({onChange:u});return A(W.name),g.useEffect(()=>()=>{c.current.abort()},[]),p.jsxs(p.Fragment,{children:[p.jsx(B,{photoList:t,FavoriteButton:C}),o==="loading"&&p.jsx(I,{center:r===1}),o==="error"&&p.jsx("div",{children:"Произошла ошибка при загрузке фотографий, попробуйте позже..."}),o!=="loading"&&p.jsx("div",{className:U.intersect,ref:f,"aria-description":"intersection element"})]})};export{W as default};