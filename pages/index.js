import { useState, useEffect, useRef } from "react";
import Head from "next/head";

const C = {
  bg: "#f7f5f0", bgWarm: "#efeadf", surf: "#f2efe8", surfD: "#e8e3d8",
  accent: "#34d399", accentD: "#059669", accentLight: "#ecfdf5",
  tx: "#1a1814", txM: "#5c5647", txD: "#8a8377",
  waBg: "#efeae2", waIn: "#ffffff", waOut: "#d9fdd3", waH: "#008069", waTime: "#667781",
};

/* ─── SMALL COMPONENTS ─── */
const TypingDots = () => (
  <div style={{display:"inline-flex",alignItems:"center",gap:4,padding:"10px 16px",background:C.waIn,borderRadius:"8px 8px 8px 0",maxWidth:"fit-content",boxShadow:"0 1px 1px rgba(0,0,0,0.06)"}}>
    {[0,1,2].map(i=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:"#8696a0",animation:"tb 1.4s ease-in-out "+i*0.2+"s infinite"}}/>)}
  </div>
);

const Bubble = ({text,time,out,bot,delay=0,children}) => {
  const [vis,setVis] = useState(false);
  const [typ,setTyp] = useState(false);
  useEffect(()=>{
    if(!out && delay>0){
      const t1=setTimeout(()=>setTyp(true),Math.max(0,delay-800));
      const t2=setTimeout(()=>{setTyp(false);setVis(true)},delay);
      return()=>{clearTimeout(t1);clearTimeout(t2)};
    } else {
      const t=setTimeout(()=>setVis(true),delay);
      return()=>clearTimeout(t);
    }
  },[delay,out]);
  if(typ&&!vis) return <div style={{display:"flex",justifyContent:"flex-start",marginBottom:4}}><TypingDots/></div>;
  if(!vis) return null;
  return (
    <div style={{display:"flex",justifyContent:out?"flex-end":"flex-start",marginBottom:4,animation:"bp 0.3s cubic-bezier(0.175,0.885,0.32,1.275)"}}>
      <div style={{maxWidth:"82%",padding:"6px 8px 4px",background:out?C.waOut:C.waIn,borderRadius:out?"8px 8px 0 8px":"8px 8px 8px 0",color:"#111b21",fontSize:13.5,lineHeight:1.4,boxShadow:"0 1px 1px rgba(0,0,0,0.06)"}}>
        {bot&&<div style={{fontSize:11.5,color:C.accentD,fontWeight:600,marginBottom:1}}>Qondo</div>}
        {children||<span style={{whiteSpace:"pre-wrap"}}>{text}</span>}
        <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",gap:3,marginTop:1}}>
          <span style={{fontSize:10.5,color:C.waTime}}>{time}</span>
          {out&&<svg width="16" height="11" viewBox="0 0 16 11" fill="none"><path d="M11.071 0.929L4.5 7.5L1.929 4.929" stroke="#53bdeb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M14.071 0.929L7.5 7.5L6.5 6.5" stroke="#53bdeb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
      </div>
    </div>
  );
};

const WAButtons = ({buttons,delay=0}) => {
  const [vis,setVis] = useState(false);
  useEffect(()=>{const t=setTimeout(()=>setVis(true),delay);return()=>clearTimeout(t)},[delay]);
  if(!vis) return null;
  return (
    <div style={{display:"flex",justifyContent:"flex-start",marginBottom:4,animation:"bp 0.3s cubic-bezier(0.175,0.885,0.32,1.275)"}}>
      <div style={{maxWidth:"82%",display:"flex",flexDirection:"column",gap:1}}>
        {buttons.map((b,i)=>(
          <div key={i} style={{background:C.waIn,padding:"8px 12px",borderRadius:i===0?"8px 8px 0 0":i===buttons.length-1?"0 0 8px 8px":"0",textAlign:"center",fontSize:13.5,color:"#008069",fontWeight:500,borderTop:i>0?"1px solid #e9e5de":"none",boxShadow:i===0?"0 1px 1px rgba(0,0,0,0.06)":"none"}}>{b}</div>
        ))}
      </div>
    </div>
  );
};

const WAHeader = ({name="Torre Palma Dorada"}) => (
  <div style={{background:C.waH,padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
    <div style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,"+C.accentD+","+C.accent+")",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:700}}>Q</div>
    <div style={{flex:1}}>
      <div style={{color:"#fff",fontSize:14,fontWeight:500}}>{name}</div>
      <div style={{color:"rgba(255,255,255,0.7)",fontSize:11.5}}>en linea</div>
    </div>
  </div>
);

const MiniStatusBar = ({time="10:13"}) => (
  <div style={{background:"#fff",padding:"4px 14px 0",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:11,fontWeight:600,color:"#000"}}>
    <span>{time}</span>
    <div style={{display:"flex",alignItems:"center",gap:3}}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#000"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
      <div style={{width:18,height:9,borderRadius:2,border:"1.3px solid #000",display:"flex",alignItems:"center",padding:1}}><div style={{height:"100%",width:"65%",borderRadius:1,background:"#000"}}/></div>
    </div>
  </div>
);

const StatusBar = ({battery=73,speaker=false,bluetooth=false,lowBat=false,time="10:13"}) => (
  <div style={{background:"#fff",padding:"4px 16px 0",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,fontWeight:600,color:"#000"}}>
    <span>{time}</span>
    <div style={{display:"flex",alignItems:"center",gap:4}}>
      {speaker&&<svg width="14" height="14" viewBox="0 0 24 24" fill="#000"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>}
      {bluetooth&&<svg width="12" height="14" viewBox="0 0 24 24" fill="#2196F3"><path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"/></svg>}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#000"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
      <div style={{width:22,height:11,borderRadius:2,border:"1.5px solid #000",position:"relative",display:"flex",alignItems:"center",padding:1}}>
        <div style={{height:"100%",width:lowBat?"18%":(battery+"%"),borderRadius:1,background:lowBat?"#ff3b30":"#000"}}/>
      </div>
    </div>
  </div>
);

const HoyBadge = () => (
  <div style={{textAlign:"center",marginBottom:10}}>
    <span style={{fontSize:11,color:C.waTime,background:"#e1ddd4",padding:"4px 12px",borderRadius:6,fontWeight:500}}>HOY</span>
  </div>
);

const PhotoBubble = ({caption,time,out,delay=0}) => {
  const [vis,setVis] = useState(false);
  useEffect(()=>{const t=setTimeout(()=>setVis(true),delay);return()=>clearTimeout(t)},[delay]);
  if(!vis) return null;
  return (
    <div style={{display:"flex",justifyContent:out?"flex-end":"flex-start",marginBottom:4,animation:"bp 0.3s cubic-bezier(0.175,0.885,0.32,1.275)"}}>
      <div style={{maxWidth:"72%",background:out?C.waOut:C.waIn,borderRadius:out?"8px 8px 0 8px":"8px 8px 8px 0",overflow:"hidden",boxShadow:"0 1px 1px rgba(0,0,0,0.06)"}}>
        <div style={{width:"100%",height:100,background:"linear-gradient(135deg,#d1d5db,#9ca3af)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
        </div>
        <div style={{padding:"4px 8px 4px"}}>
          {caption&&<div style={{fontSize:13,color:"#111b21",marginBottom:2}}>{caption}</div>}
          <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",gap:3}}>
            <span style={{fontSize:10.5,color:C.waTime}}>{time}</span>
            {out&&<svg width="16" height="11" viewBox="0 0 16 11" fill="none"><path d="M11.071 0.929L4.5 7.5L1.929 4.929" stroke="#53bdeb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M14.071 0.929L7.5 7.5L6.5 6.5" stroke="#53bdeb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── HERO PHONE ─── */
const HeroPhone = () => {
  const [phase, setPhase] = useState(0);
  useEffect(()=>{
    const t1=setTimeout(()=>setPhase(1),1200);
    const t2=setTimeout(()=>setPhase(2),3500);
    return()=>{clearTimeout(t1);clearTimeout(t2)};
  },[]);
  if(phase<2) return (
    <div style={{width:310,borderRadius:20,overflow:"hidden",background:"linear-gradient(160deg,#0f172a 0%,#1e293b 50%,#0f172a 100%)",boxShadow:"0 8px 40px rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.08)",flexShrink:0,animation:"fp 6s ease-in-out infinite"}}>
      <div style={{padding:"12px 20px 0",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,fontWeight:600,color:"#fff"}}>
        <span>3:02</span>
        <div style={{display:"flex",alignItems:"center",gap:4}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
          <div style={{width:22,height:11,borderRadius:2,border:"1.5px solid #fff",display:"flex",alignItems:"center",padding:1}}><div style={{height:"100%",width:"73%",borderRadius:1,background:"#fff"}}/></div>
        </div>
      </div>
      <div style={{textAlign:"center",padding:"50px 0 10px"}}>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:64,fontWeight:300,color:"#fff",lineHeight:1}}>3:02</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,0.5)",marginTop:6}}>martes, 4 de marzo</div>
      </div>
      {phase>=1&&(
        <div style={{padding:"20px 14px",animation:"bp 0.4s cubic-bezier(0.175,0.885,0.32,1.275)"}}>
          <div style={{background:"rgba(255,255,255,0.12)",backdropFilter:"blur(20px)",borderRadius:16,padding:"12px 14px",display:"flex",gap:10,alignItems:"flex-start"}}>
            <div style={{width:36,height:36,borderRadius:10,background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
            </div>
            <div style={{flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}>
                <span style={{fontSize:13,fontWeight:600,color:"#fff"}}>WHATSAPP</span>
                <span style={{fontSize:11,color:"rgba(255,255,255,0.5)"}}>ahora</span>
              </div>
              <div style={{fontSize:13,fontWeight:600,color:"#fff",marginBottom:1}}>Torre Palma Dorada</div>
              <div style={{fontSize:12.5,color:"rgba(255,255,255,0.8)",lineHeight:1.4}}>Qondo: Se activo la alarma en el edificio. Estamos verificando...</div>
            </div>
          </div>
        </div>
      )}
      <div style={{padding:"60px 0 16px",display:"flex",justifyContent:"center"}}><div style={{width:120,height:4,borderRadius:2,background:"rgba(255,255,255,0.3)"}}/></div>
    </div>
  );
  return (
    <div style={{width:310,borderRadius:20,overflow:"hidden",background:C.waBg,boxShadow:"0 8px 40px rgba(0,0,0,0.12)",border:"1px solid rgba(0,0,0,0.08)",flexShrink:0,animation:"fp 6s ease-in-out infinite"}}>
      <StatusBar battery={73} time="3:02"/>
      <WAHeader/>
      <div style={{padding:"10px 10px",minHeight:340,display:"flex",flexDirection:"column",background:C.waBg}}>
        <HoyBadge/>
        <Bubble time="3:02 a.m." bot out={false} delay={400}><div>Se activo la alarma de incendios en el edificio. Estamos verificando con Carlos de operaciones. Les informamos en breve.</div></Bubble>
        <Bubble text="Es real? Que hago??" time="3:02 a.m." out delay={2200}/>
        <Bubble time="3:03 a.m." bot out={false} delay={3800}><div>Maria, Carlos confirma: <strong>falsa alarma</strong>. Fue una prueba del sistema de humo en el piso 6. No es necesario evacuar.</div></Bubble>
        <Bubble text="Uff que alivio, gracias!" time="3:04 a.m." out delay={5600}/>
        <Bubble time="3:04 a.m." bot out={false} delay={7000}><div>De nada, Maria! Nos avisan si necesitan algo mas.</div></Bubble>
      </div>
    </div>
  );
};

/* ─── PAIN SECTION ─── */
const chaosMessages = [
  {name:"Sra. Martinez",text:"Buenos dias! Bendiciones para todos \u2600\ufe0f\ud83d\ude4f",time:"7:02 a.m.",color:"#e67e22"},
  {name:"Roberto 2A",text:"DE QUIEN ES EL CARRO ROJO MAL ESTACIONADO??? LLEVO 20 MIN ESPERANDO",time:"7:15 a.m.",color:"#e74c3c"},
  {name:"Lucia 5B",text:"alguien tiene el numero de un plomero bueno?",time:"7:18 a.m.",color:"#9b59b6"},
  {name:"Pedro 11A",text:null,time:"7:22 a.m.",color:"#3498db",isAudio:true,audioDur:"3:47"},
  {name:"Maria 8C",text:"Admin cuando arreglan el ascensor?? Ya van 3 dias",time:"7:31 a.m.",color:"#16a085"},
  {name:"Jorge 1B",text:"Vendo empanadas! Carne, pollo y queso. 3x$5 \ud83e\udd5f",time:"7:45 a.m.",color:"#e67e22"},
  {name:"Admin",text:"Buenos dias a todos, el tema del ascensor ya estamos en eso, el tecnico viene el lunes o martes",time:"8:02 a.m.",color:"#27ae60"},
  {name:"Carlos 4B",text:"el lunes o martes?? Eso dijeron la semana pasada",time:"8:05 a.m.",color:"#2980b9"},
  {name:"Sra. Martinez",text:"\ud83d\ude4f\ud83d\ude4f\ud83d\ude4f",time:"8:06 a.m.",color:"#e67e22"},
  {name:"Ana 7A",text:"Oigan mañana fumigan?? Vi un papel en el ascensor pero no se lee bien",time:"8:15 a.m.",color:"#8e44ad"},
  {name:"Roberto 2A",text:"SIGO ESPERANDO LO DEL CARRO",time:"8:22 a.m.",color:"#e74c3c"},
  {name:"Lucia 5B",text:"lo del plomero alguien??",time:"8:30 a.m.",color:"#9b59b6"},
];

const PainChaos = () => {
  const [count, setCount] = useState(247);
  useEffect(()=>{
    const i=setInterval(()=>setCount(c=>c+1),4000);
    return()=>clearInterval(i);
  },[]);
  return (
    <div style={{background:"#fff",borderRadius:20,overflow:"hidden",border:"1px solid "+C.surfD,boxShadow:"0 4px 24px rgba(0,0,0,0.08)",maxWidth:340}}>
      <div style={{background:"#008069",padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        <div style={{width:34,height:34,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
        </div>
        <div style={{flex:1}}>
          <div style={{color:"#fff",fontSize:14,fontWeight:500}}>Vecinos Torre Palma Dorada</div>
          <div style={{color:"rgba(255,255,255,0.7)",fontSize:11}}>48 participantes</div>
        </div>
      </div>
      <div style={{padding:"8px 8px",background:C.waBg,maxHeight:320,overflow:"hidden",position:"relative"}}>
        <HoyBadge/>
        {chaosMessages.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"flex-start",marginBottom:3}}>
            <div style={{maxWidth:"85%",padding:"4px 8px 3px",background:C.waIn,borderRadius:"8px 8px 8px 0",fontSize:13,lineHeight:1.35,boxShadow:"0 1px 1px rgba(0,0,0,0.04)"}}>
              <div style={{fontSize:11.5,fontWeight:600,color:m.color,marginBottom:1}}>{m.name}</div>
              {m.isAudio ? (
                <div style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0"}}>
                  <div style={{width:0,height:0,borderLeft:"8px solid #8696a0",borderTop:"5px solid transparent",borderBottom:"5px solid transparent"}}/>
                  <div style={{flex:1,height:3,background:"#8696a0",borderRadius:2,position:"relative"}}>
                    <div style={{position:"absolute",left:"30%",top:-3,width:8,height:8,borderRadius:"50%",background:"#8696a0"}}/>
                  </div>
                  <span style={{fontSize:11,color:C.waTime}}>{m.audioDur}</span>
                </div>
              ) : (
                <span style={{color:"#111b21"}}>{m.text}</span>
              )}
              <div style={{display:"flex",justifyContent:"flex-end",marginTop:1}}>
                <span style={{fontSize:10,color:C.waTime}}>{m.time}</span>
              </div>
            </div>
          </div>
        ))}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:60,background:"linear-gradient(transparent,"+C.waBg+")"}}/>
      </div>
      <div style={{padding:"10px 14px",background:C.waBg,borderTop:"1px solid #e1ddd4",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{background:"#e74c3c",color:"#fff",padding:"4px 14px",borderRadius:20,fontSize:13,fontWeight:700,animation:"pulse 2s ease-in-out infinite"}}>
          {count} mensajes sin leer
        </div>
      </div>
    </div>
  );
};

const PainAdmin = () => {
  const chats = [
    {name:"Roberto 2A",msg:"ADMIN CONTESTA",time:"11:43 p.m.",badge:5,color:"#e74c3c"},
    {name:"Maria 8C",msg:"Hola, lo del ascensor...",time:"11:38 p.m.",badge:3,color:"#9b59b6"},
    {name:"Lucia 5B",msg:"Me esta goteando el techo",time:"11:12 p.m.",badge:2,color:"#3498db"},
    {name:"Carlos 4B",msg:"audio (0:45)",time:"10:55 p.m.",badge:1,color:"#16a085"},
    {name:"Vecinos Torre Palma",msg:"Jorge: alguien sabe si...",time:"10:30 p.m.",badge:47,color:"#27ae60"},
    {name:"Pedro 11A",msg:"La musica del 12B...",time:"10:15 p.m.",badge:1,color:"#e67e22"},
    {name:"Proveedor fumigacion",msg:"Confirmar para el viernes?",time:"9:30 p.m.",badge:1,color:"#8e44ad"},
  ];
  return (
    <div style={{background:"#fff",borderRadius:20,overflow:"hidden",border:"1px solid "+C.surfD,boxShadow:"0 4px 24px rgba(0,0,0,0.08)",maxWidth:340}}>
      <div style={{background:"#fff",padding:"4px 16px 0",display:"flex",justifyContent:"space-between",fontSize:12,fontWeight:600,color:"#000"}}>
        <span>11:43 PM</span>
        <div style={{display:"flex",alignItems:"center",gap:3}}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#000"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
          <div style={{width:18,height:9,borderRadius:2,border:"1.3px solid #000",display:"flex",alignItems:"center",padding:1}}><div style={{height:"100%",width:"18%",borderRadius:1,background:"#ff3b30"}}/></div>
        </div>
      </div>
      <div style={{padding:"8px 16px 4px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:22,fontWeight:700,color:"#000"}}>Chats</span>
      </div>
      <div style={{padding:"0 0 8px"}}>
        {chats.map((c,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",borderBottom:"1px solid #f0ede6"}}>
            <div style={{width:40,height:40,borderRadius:"50%",background:c.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:600,color:c.color,flexShrink:0}}>{c.name[0]}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:14,fontWeight:500,color:"#000"}}>{c.name}</span>
                <span style={{fontSize:11,color:c.badge>3?"#e74c3c":C.waTime}}>{c.time}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:2}}>
                <span style={{fontSize:13,color:C.waTime,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:180}}>{c.msg}</span>
                <div style={{background:"#25D366",color:"#fff",fontSize:11,fontWeight:700,borderRadius:10,minWidth:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 5px",flexShrink:0}}>{c.badge}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PainSection = () => (
  <section style={{padding:"100px 24px",background:C.bg,overflow:"hidden"}}>
    <div style={{maxWidth:1100,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:64}}>
        <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:C.tx,marginBottom:16,lineHeight:1.2}}>{"Asi se administra hoy \ud83d\ude2c"}</h2>
      </div>
      {/* Block 1 & 2 side by side */}
      <div style={{display:"flex",gap:40,justifyContent:"center",flexWrap:"wrap",marginBottom:64,alignItems:"flex-start"}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
          <PainChaos/>
          <p style={{fontSize:15,color:C.txM,maxWidth:320,textAlign:"center",lineHeight:1.5}}>El grupo donde nadie lee, todos escriben, y lo importante se pierde entre stickers y cadenas.</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
          <PainAdmin/>
          <p style={{fontSize:15,color:C.txM,maxWidth:320,textAlign:"center",lineHeight:1.5}}>El admin: una persona contra 50 apartamentos. A las 11pm. Con el telefono al 18%.</p>
        </div>
      </div>
      {/* Block 3 & 4 */}
      <div style={{display:"flex",gap:40,justifyContent:"center",flexWrap:"wrap",alignItems:"flex-start"}}>
        <div style={{maxWidth:400,textAlign:"center",padding:"40px 32px",background:"#fff",borderRadius:20,border:"1px solid "+C.surfD,boxShadow:"0 4px 24px rgba(0,0,0,0.06)"}}>
          <div style={{fontSize:64,marginBottom:16}}>{"\ud83e\uddd1\u200d\ud83e\uddd1\u200d\ud83e\uddd2"}</div>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:48,fontWeight:700,color:"#e74c3c",marginBottom:4}}>8 <span style={{fontSize:20,color:C.txD,fontWeight:500}}>de 50</span></div>
          <p style={{fontSize:15,color:C.txM,lineHeight:1.5}}>fueron a la asamblea. Se aprobó una cuota extra de $200. Los otros 42 se enteraron por el grupo que nadie lee.</p>
        </div>
        <div style={{maxWidth:400,textAlign:"center",padding:"40px 32px",background:"#fff",borderRadius:20,border:"1px solid "+C.surfD,boxShadow:"0 4px 24px rgba(0,0,0,0.06)",position:"relative"}}>
          <div style={{background:"#fffde7",border:"1px solid #f0e68c",borderRadius:4,padding:"20px 24px",transform:"rotate(-1.5deg)",boxShadow:"0 2px 8px rgba(0,0,0,0.08)",position:"relative"}}>
            <div style={{position:"absolute",top:-8,left:"50%",marginLeft:-16,width:32,height:16,background:"#d4a574",borderRadius:"2px 2px 0 0",opacity:0.7}}/>
            <p style={{fontFamily:"'Courier New',monospace",fontSize:14,color:"#333",lineHeight:1.6,textAlign:"left"}}>
              SE INFORMA A LOS RESIDENTES QUE EL DIA <span style={{fontWeight:700}}>LUNES 3 DE MARZO</span> SE REALIZARA CORTE DE AGUA DE 8AM A 2PM POR MANTENIMIENTO DE BOMBA.
              <br/><br/>
              DISCULPEN LAS MOLESTIAS.
              <br/><br/>
              <span style={{fontSize:12,color:"#999"}}>— La Administracion</span>
            </p>
          </div>
          <p style={{fontSize:15,color:C.txM,lineHeight:1.5,marginTop:20}}>Hoy es jueves. El papel lleva ahi desde el viernes pasado. La mitad del edificio no usa el ascensor donde esta pegado.</p>
        </div>
      </div>
    </div>
  </section>
);

/* ─── FEATURES ─── */
const convos = {
  reglamento: {
    sb:{battery:12,lowBat:true,speaker:true,bluetooth:true,time:"9:14"},
    messages:[
      {text:"asta que hora puedo hacer ruido? tengo visita",out:true,time:"9:14 p.m."},
      {text:"Hola Pedro! Segun el reglamento, el horario de silencio comienza a las 10:00 PM. Despues de esa hora les pedimos mantener el volumen bajo.\n\nSi quieres te comparto la seccion completa de ruido y convivencia.",out:false,time:"9:14 p.m.",bot:true},
    ]
  },
  reservas: {
    sb:{battery:54,time:"2:30"},
    messages:[
      {text:"Hola quiero reservar el salon de fiestas",out:true,time:"2:30 p.m."},
      {text:"Hola Ana! Con gusto. Para que fecha lo necesitas?",out:false,time:"2:30 p.m.",bot:true},
      {text:"El sabado que viene, es el cumple de mi hija",out:true,time:"2:31 p.m."},
      {text:"Que lindo! Cuantas personas y en que horario?",out:false,time:"2:31 p.m.",bot:true},
      {text:"Unas 25 personas. De 6 a 11pm",out:true,time:"2:32 p.m."},
      {text:"El salon esta disponible! Para confirmar necesitamos un deposito de $50, que se reembolsa una vez verificamos que el area quede en orden.\n\nTe comparto los requisitos del salon. Los prefieres por aqui, por correo, o ambos?",out:false,time:"2:33 p.m.",bot:true},
      {text:"Por correo porfa!",out:true,time:"2:34 p.m."},
      {text:null,out:false,time:"2:34 p.m.",bot:true,isVendors:true},
    ]
  },
  votaciones: {
    sb:{battery:88,time:"7:00"},
    messages:[
      {text:null,out:false,time:"7:00 p.m.",bot:true,isVoteAnnounce:true},
      {text:null,out:false,time:"7:00 p.m.",isVoteButtons:true},
      {text:"cuanto sale?",out:true,time:"7:12 p.m."},
      {text:"Son $2,500 por apartamento, cuota unica. Hay dos opciones de proveedor con diferentes precios. Te las busco?",out:false,time:"7:12 p.m.",bot:true},
      {text:"dale, a favor",out:true,time:"7:15 p.m."},
      {text:"Registrado! Van 24 de 50 votos. Gracias por participar, Gabriel.",out:false,time:"7:15 p.m.",bot:true},
    ]
  },
  paquetes: {
    sb:{battery:91,time:"12:15"},
    messages:[
      {text:"Hola Sofia! Llego un paquete a tu nombre a recepcion. Lo recibio Jose en porteria a las 11:38am.\n\nRemitente: Amazon\nTracking: 1Z999AA1234567\n\nPuedes recogerlo en recepcion.",out:false,time:"11:42 a.m.",bot:true},
      {text:"Ahh estoy de vacaciones! Regreso el martes",out:true,time:"12:15 p.m."},
      {text:"Entendido! Lo guardamos en el deposito hasta que regreses.\n\nQuieres que te recuerde el martes que tienes paquetes esperando, o prefieres escribirnos cuando estes lista?",out:false,time:"12:15 p.m.",bot:true},
      {text:"Recordame el martes porfa!",out:true,time:"12:16 p.m."},
      {text:"Listo, te escribo el martes! Si llega algo mas de aqui alla, lo guardamos directamente. Feliz viaje de regreso!",out:false,time:"12:16 p.m.",bot:true},
    ]
  },
  reportes: {
    sb:{battery:45,time:"7:45"},
    messages:[
      {text:null,out:true,time:"7:45 a.m.",isPhoto:true,photoCaption:"Este carro esta en mi puesto OTRA VEZ"},
      {text:"Recibimos tu reporte con la foto. Ya se lo pasamos al equipo de operaciones para que gestionen que lo muevan. Te mantenemos al tanto.",out:false,time:"7:46 a.m.",bot:true},
      {text:"Nos confirman que el dueno del vehiculo ya fue notificado y lo mueve en unos minutos.",out:false,time:"7:52 a.m.",bot:true},
      {text:"Gracias!! Ya era la tercera vez",out:true,time:"7:53 a.m."},
      {text:"Lo tenemos registrado. Si vuelve a pasar nos escribes y lo escalamos directamente a administracion.",out:false,time:"7:53 a.m.",bot:true},
    ]
  },
  comunidad: {
    sb:{battery:67,time:"5:22"},
    messages:[
      {text:"Torneo de padel del edificio!\n\nSabado 22 de marzo, 10am\nCancha nivel 2\n\nCategorias: principiantes y avanzados\nPremios: trofeos + dia gratis de parrillera",out:false,time:"5:00 p.m.",bot:true},
      {text:"quiero participar!",out:true,time:"5:22 p.m."},
      {text:"Genial, Luis! Principiante o avanzado?",out:false,time:"5:22 p.m.",bot:true},
      {text:"Principiante jaja recien empiezo",out:true,time:"5:23 p.m."},
      {text:"Inscrito en principiantes! Participante #8.\n\nPor cierto, un vecino reporto un gato gris perdido con collar azul por el piso 5. Si lo ves por ahi, nos avisas y lo conectamos con su dueno!",out:false,time:"5:23 p.m.",bot:true},
    ]
  },
};

const tabList = [
  {id:"reglamento",icon:"\ud83d\udccb",label:"Reglamento",who:"Pedro, el fiestero"},
  {id:"reservas",icon:"\ud83c\udf89",label:"Reservas",who:"Ana, la mama organizada"},
  {id:"votaciones",icon:"\ud83d\uddf3\ufe0f",label:"Votaciones",who:"Gabriel, el que nunca participa"},
  {id:"paquetes",icon:"\ud83d\udce6",label:"Paquetes",who:"Sofia, la compradora online"},
  {id:"reportes",icon:"\ud83d\udcf8",label:"Reportes",who:"Diego, el que madruga"},
  {id:"comunidad",icon:"\ud83c\udfd3",label:"Comunidad",who:"Luis, el vecino entusiasta"},
];

const VendorMessage = ({delay=0}) => {
  const [vis,setVis] = useState(false);
  const [typ,setTyp] = useState(false);
  useEffect(()=>{
    const t1=setTimeout(()=>setTyp(true),Math.max(0,delay-800));
    const t2=setTimeout(()=>{setTyp(false);setVis(true)},delay);
    return()=>{clearTimeout(t1);clearTimeout(t2)};
  },[delay]);
  if(typ&&!vis) return <div style={{display:"flex",justifyContent:"flex-start",marginBottom:4}}><TypingDots/></div>;
  if(!vis) return null;
  return (
    <div style={{display:"flex",justifyContent:"flex-start",marginBottom:4,animation:"bp 0.3s cubic-bezier(0.175,0.885,0.32,1.275)"}}>
      <div style={{maxWidth:"82%",padding:"6px 8px 4px",background:C.waIn,borderRadius:"8px 8px 8px 0",color:"#111b21",fontSize:13.5,lineHeight:1.4,boxShadow:"0 1px 1px rgba(0,0,0,0.06)"}}>
        <div style={{fontSize:11.5,color:C.accentD,fontWeight:600,marginBottom:1}}>Qondo</div>
        <span style={{whiteSpace:"pre-wrap"}}>{"Listo, te los enviamos al correo!\n\nPor cierto, algunos vecinos ofrecen servicios para eventos:\n\n\ud83c\udf55 Familia Lopez 3B - Pizzas artesanales\n\ud83e\uddc1 Do\u00f1a Carmen 6A - Postres hondure\u00f1os\n\ud83c\udf2e Los Hernandez 8B - Tacos y fajitas\n\nQuieres que te conectemos con alguno?"}</span>
        <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",gap:3,marginTop:1}}>
          <span style={{fontSize:10.5,color:C.waTime}}>2:34 p.m.</span>
        </div>
      </div>
    </div>
  );
};

const VoteAnnounce = ({delay=0}) => {
  const [vis,setVis] = useState(false);
  const [typ,setTyp] = useState(false);
  useEffect(()=>{
    const t1=setTimeout(()=>setTyp(true),Math.max(0,delay-800));
    const t2=setTimeout(()=>{setTyp(false);setVis(true)},delay);
    return()=>{clearTimeout(t1);clearTimeout(t2)};
  },[delay]);
  if(typ&&!vis) return <div style={{display:"flex",justifyContent:"flex-start",marginBottom:4}}><TypingDots/></div>;
  if(!vis) return null;
  return (
    <div style={{display:"flex",justifyContent:"flex-start",marginBottom:4,animation:"bp 0.3s cubic-bezier(0.175,0.885,0.32,1.275)"}}>
      <div style={{maxWidth:"82%",padding:"6px 8px 4px",background:C.waIn,borderRadius:"8px 8px 8px 0",color:"#111b21",fontSize:13.5,lineHeight:1.4,boxShadow:"0 1px 1px rgba(0,0,0,0.06)"}}>
        <div style={{fontSize:11.5,color:C.accentD,fontWeight:600,marginBottom:1}}>Qondo</div>
        <span style={{whiteSpace:"pre-wrap"}}>{"Hola Gabriel, buen dia! Se creo una votacion para renovar el sistema de camaras de seguridad. Las actuales tienen mas de 8 a\u00f1os y varias ya no graban.\n\nTienen hasta el viernes 21 de marzo para votar. Van 23 de 50.\n\nAqui puedes ver la propuesta completa: bit.ly/camaras-tpd\n\nSi tienes alguna duda, me dices y te ayudo."}</span>
        <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",gap:3,marginTop:1}}>
          <span style={{fontSize:10.5,color:C.waTime}}>7:00 p.m.</span>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const [tab,setTab] = useState("reglamento");
  const [k,setK] = useState(0);
  const data = convos[tab];
  const msgs = data.messages;
  const sb = data.sb||{};
  const currentTab = tabList.find(t=>t.id===tab);
  return (
    <section style={{padding:"100px 24px",background:C.bgWarm}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:C.tx,marginBottom:16,lineHeight:1.2}}>
            Todo por <span style={{color:C.accentD}}>WhatsApp.</span>
          </h2>
          <p style={{fontSize:18,color:C.txM,maxWidth:540,margin:"0 auto",lineHeight:1.6}}>
            Sin descargar nada. Sin crear cuentas. Sin tutoriales.<br/>
            <span style={{color:C.txD,fontStyle:"italic"}}>Sin que tu mama te llame a preguntar como se usa.</span>
          </p>
        </div>
        <div style={{textAlign:"center",marginBottom:14}}>
          <span style={{fontSize:13,color:C.txD,fontStyle:"italic"}}>{"Toca un escenario para verlo en accion \ud83d\udc47"}</span>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:12}}>
          {tabList.map(t=>(
            <button key={t.id} onClick={()=>{setTab(t.id);setK(x=>x+1)}} style={{
              padding:"12px 20px",borderRadius:14,
              border:tab===t.id?"2px solid "+C.accentD:"1.5px solid "+C.surfD,
              background:tab===t.id?C.accentLight:"#fff",
              color:tab===t.id?C.accentD:C.txM,
              fontSize:14,fontWeight:tab===t.id?600:500,cursor:"pointer",transition:"all 0.25s",
              display:"flex",alignItems:"center",gap:8,whiteSpace:"nowrap",fontFamily:"inherit",
              boxShadow:tab===t.id?"0 2px 8px rgba(5,150,105,0.15)":"0 1px 3px rgba(0,0,0,0.04)",
            }}>
              <span style={{fontSize:17}}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
        <div style={{textAlign:"center",marginBottom:32}}>
          <span style={{fontSize:12,color:C.txD}}>{currentTab.who}</span>
        </div>
        <div style={{maxWidth:340,margin:"0 auto",borderRadius:20,overflow:"hidden",background:C.waBg,boxShadow:"0 8px 40px rgba(0,0,0,0.1)",border:"1px solid rgba(0,0,0,0.08)"}}>
          <StatusBar battery={sb.battery||73} lowBat={sb.lowBat} speaker={sb.speaker} bluetooth={sb.bluetooth} time={sb.time||"10:13"}/>
          <WAHeader name={data.headerName||"Torre Palma Dorada"}/>
          <div key={k} style={{padding:"10px 10px",minHeight:280,display:"flex",flexDirection:"column",background:C.waBg}}>
            <HoyBadge/>
            {msgs.map((m,i)=>{
              const d=i*900+300;
              if(m.isVendors) return <VendorMessage key={k+"-"+i} delay={d}/>;
              if(m.isVoteAnnounce) return <VoteAnnounce key={k+"-"+i} delay={d}/>;
              if(m.isVoteButtons) return <WAButtons key={k+"-"+i} buttons={["\u2705 A favor","\u274c En contra"]} delay={d}/>;
              if(m.isPhoto) return <PhotoBubble key={k+"-"+i} caption={m.photoCaption} time={m.time} out={m.out} delay={d}/>;
              return <Bubble key={k+"-"+i} text={m.text} time={m.time} out={m.out} bot={m.bot} delay={d}/>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── DEMO ─── */
const DemoSection = () => (
  <section style={{padding:"100px 24px",background:C.bg}}>
    <div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}>
      <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(26px,4vw,40px)",fontWeight:700,color:C.tx,marginBottom:16,lineHeight:1.2}}>{"Pruebalo tu mismo \ud83d\udcf1"}</h2>
      <p style={{fontSize:17,color:C.txM,maxWidth:500,margin:"0 auto 40px",lineHeight:1.6}}>Escanea el QR o escribe al numero y conversa con Qondo como si fueras residente de un edificio de prueba.</p>
      <div style={{display:"inline-flex",flexDirection:"column",alignItems:"center",gap:20,padding:"40px 48px",background:"#fff",borderRadius:24,border:"1px solid "+C.surfD,boxShadow:"0 4px 24px rgba(0,0,0,0.06)"}}>
        <div style={{width:180,height:180,borderRadius:16,background:C.surf,border:"1px solid "+C.surfD,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{textAlign:"center",color:C.txD}}>
            <div style={{fontSize:40,marginBottom:8}}>{"\ud83d\udd1c"}</div>
            <div style={{fontSize:13}}>QR del demo</div>
            <div style={{fontSize:11}}>Proximamente</div>
          </div>
        </div>
        <div style={{fontSize:14,color:C.txM}}>o escribe a</div>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 24px",background:C.accentLight,borderRadius:12,border:"1px solid "+C.accent+"40"}}>
          <div style={{width:28,height:28,borderRadius:8,background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
          </div>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:16,fontWeight:600,color:C.accentD}}>+1 (XXX) XXX-XXXX</span>
        </div>
      </div>
    </div>
  </section>
);

/* ─── DASHBOARD ─── */
const metrics = [
  {label:"Tickets abiertos",value:"3",color:"#e67e22",sub:"1 tuyo, 2 esperando proveedor",icon:"\ud83d\udee0\ufe0f"},
  {label:"Pagos pendientes",value:"12",color:"#e74c3c",sub:"$18,450 total",icon:"\ud83d\udcb0"},
  {label:"Votacion activa",value:"1",color:C.accentD,sub:"24/50 votos",icon:"\ud83d\uddf3\ufe0f"},
  {label:"Reservas hoy",value:"2",color:"#8b5cf6",sub:"Piscina, Salon",icon:"\ud83d\udcc5"},
  {label:"Paquetes sin recoger",value:"4",color:"#f59e0b",sub:"1 tiene mas de 24hrs",icon:"\ud83d\udce6"},
  {label:"Residentes activos",value:"43",color:"#3b82f6",sub:"de 50 aptos",icon:"\ud83d\udc65"},
  {label:"Mensajes hoy",value:"67",color:"#06b6d4",sub:"+12% vs ayer",icon:"\ud83d\udcac"},
  {label:"Amenidades libres",value:"5",color:"#a855f7",sub:"de 6 totales",icon:"\ud83c\udfca"},
];
const agendaItems = [
  {time:"9:00 AM",event:"Tecnico de ascensor",color:"#e67e22"},
  {time:"11:30 AM",event:"Reunion proveedor fumigacion",color:C.accentD},
  {time:"2:00 PM",event:"Fumigacion pisos 1-5",color:C.accentD},
  {time:"6:00 PM",event:"Salon reservado - Apto 7A",color:"#8b5cf6"},
];
const recentTickets = [
  {id:"#127",title:"Filtracion bano apto 3B",priority:"Alta",time:"Hace 2h",avatar:"MR"},
  {id:"#126",title:"Luz pasillo piso 8",priority:"Media",time:"Hace 5h",avatar:"JL"},
  {id:"#125",title:"Ruido excesivo apto 11A",priority:"Baja",time:"Ayer",avatar:"CP"},
];
const notifs = [
  {type:"broadcast",text:"Piscina cerrada por mantenimiento hasta manana 2pm",time:"Hace 1h",sent:"48 notificados"},
  {type:"resolved",text:"Gimnasio reparado, ya esta abierto",time:"Hace 3h",sent:"Aviso automatico"},
  {type:"reminder",text:"Recordatorio de pago a 12 aptos",time:"Ayer",sent:"12 mensajes enviados"},
];

/* ─── SHARE BUTTON ─── */
const ShareButton = () => {
  const shareUrl = "https://wa.me/?text="+encodeURIComponent("Mira esto, creo que nos serviría en el edificio: https://qondo.boqa.ai");
  return (
    <a href={shareUrl} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:10,padding:"14px 28px",borderRadius:100,background:"#25D366",color:"#fff",fontSize:15,fontWeight:600,textDecoration:"none",boxShadow:"0 4px 16px rgba(37,211,102,0.3)",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
      {"Env\u00edaselo a tu administrador"}
    </a>
  );
};

/* ─── MAIN ─── */
export default function QondoLanding() {
  const [hv,setHv] = useState(false);
  useEffect(()=>{setTimeout(()=>setHv(true),200)},[]);
  return (
    <div style={{background:C.bg,minHeight:"100vh",fontFamily:"'DM Sans',-apple-system,sans-serif",color:C.tx,overflowX:"hidden"}}>
      <Head>
        <title>Qondo - Gestion de edificios por WhatsApp</title>
        <meta name="description" content="Qondo conecta tu edificio por WhatsApp. Sin apps, sin complicaciones." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>
      <style>{[
        "@keyframes tb{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}",
        "@keyframes bp{0%{transform:scale(0.8);opacity:0}100%{transform:scale(1);opacity:1}}",
        "@keyframes fu{0%{transform:translateY(30px);opacity:0}100%{transform:translateY(0);opacity:1}}",
        "@keyframes fp{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}",
        "@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}",
        "*{margin:0;padding:0;box-sizing:border-box}","html{scroll-behavior:smooth}",
      ].join("\n")}</style>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"14px 24px",background:"rgba(247,245,240,0.88)",backdropFilter:"blur(16px)",borderBottom:"1px solid rgba(0,0,0,0.05)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:24,fontWeight:700,color:C.tx,letterSpacing:"-0.02em"}}><span style={{color:C.accentD}}>q</span>ondo</div>
          <button style={{padding:"10px 28px",borderRadius:100,border:"none",background:C.accentD,color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Agenda un demo</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"120px 24px 80px",background:"linear-gradient(180deg,"+C.bg+" 0%,"+C.bgWarm+" 100%)"}}>
        <div style={{maxWidth:1200,width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",gap:80,flexWrap:"wrap"}}>
          <div style={{flex:"1 1 500px",animation:hv?"fu 0.8s ease forwards":"none",opacity:hv?1:0}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:10,padding:"10px 18px",borderRadius:14,background:"#fff",border:"1px solid "+C.surfD,boxShadow:"0 4px 16px rgba(0,0,0,0.06)",marginBottom:28}}>
              <div style={{width:36,height:36,borderRadius:10,background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
              </div>
              <div>
                <div style={{fontSize:11,color:C.txD,fontWeight:500}}>WHATSAPP</div>
                <div style={{fontSize:13,fontWeight:600,color:C.tx}}>Torre Palma Dorada</div>
                <div style={{fontSize:12,color:C.txD}}>Qondo: Falsa alarma confirmada. Todo en orden.</div>
              </div>
              <div style={{fontSize:11,color:C.txD,alignSelf:"flex-start",marginLeft:8}}>ahora</div>
            </div>
            <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(32px,5vw,56px)",fontWeight:700,lineHeight:1.08,color:C.tx,marginBottom:28,letterSpacing:"-0.03em"}}>
              <span style={{fontWeight:400,display:"block",fontSize:"clamp(22px,3.2vw,34px)",marginBottom:10}}>
                <span style={{color:C.accentD}}>3am.</span>{" "}
                <span style={{color:C.txM}}>Alarma de incendios. {"\ud83d\udd25"}</span>
              </span>
              Ahora sabes que Don Carlos del 4B duerme en pijama de{" "}
              <span style={{color:C.accentD}}>Pikachu.</span>
            </h1>
            <p style={{fontSize:"clamp(16px,1.8vw,19px)",color:C.txM,lineHeight:1.6,maxWidth:520,marginBottom:40}}>
              Qondo te avisa que era falsa alarma sin salir de tu cama.{" "}
              <span style={{color:C.txD}}>Y el secreto de Don Carlos seguiria a salvo.</span>
            </p>
            <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
              <button style={{padding:"16px 36px",borderRadius:100,border:"none",background:C.accentD,color:"#fff",fontSize:16,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",boxShadow:"0 4px 20px rgba(5,150,105,0.25)"}}>{"Cont\u00e1ctanos \u2192"}</button>
              <button style={{padding:"16px 28px",borderRadius:100,border:"1.5px solid "+C.surfD,background:"#fff",color:C.txM,fontSize:16,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Ver demo</button>
            </div>
          </div>
          <div style={{flex:"0 0 auto",animation:hv?"fu 1s ease 0.3s forwards":"none",opacity:hv?1:0}}><HeroPhone/></div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{padding:"36px 24px",borderTop:"1px solid "+C.surfD,borderBottom:"1px solid "+C.surfD,background:"#fff"}}>
        <div style={{maxWidth:800,margin:"0 auto",display:"flex",justifyContent:"center",alignItems:"center",gap:48,flexWrap:"wrap"}}>
          {[{n:"95%",l:"de LATAM usa WhatsApp"},{n:"0",l:"apps que instalar"},{n:"24/7",l:"respuestas automaticas"},{n:"24hrs",l:"para estar activo"}].map((s,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:24,fontWeight:700,color:C.accentD}}>{s.n}</div>
              <div style={{fontSize:13,color:C.txD,marginTop:4}}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <PainSection/>
      <Features/>
      <DemoSection/>

      {/* ADMIN */}
      <section style={{padding:"100px 24px",background:C.bgWarm}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:56}}>
            <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:700,color:C.tx,marginBottom:12,lineHeight:1.2,maxWidth:700,margin:"0 auto 12px"}}>
              Qondo va a hacer que te quieras postular de administrador.
            </h2>
            <p style={{fontSize:17,color:C.txM,maxWidth:620,margin:"0 auto",lineHeight:1.6}}>
              Bueno, no tanto. Pero con Qondo, el cargo mas ingrato del edificio por fin tiene un asistente a la altura.
            </p>
          </div>
          <div style={{background:"#fff",borderRadius:20,border:"1px solid "+C.surfD,overflow:"hidden",boxShadow:"0 8px 40px rgba(0,0,0,0.06)"}}>
            <div style={{padding:"16px 24px",borderBottom:"1px solid "+C.surfD,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:18,fontWeight:600,color:C.tx}}><span style={{color:C.accentD}}>q</span>ondo</span>
                <span style={{fontSize:13,color:C.txD,padding:"3px 10px",background:C.surf,borderRadius:6}}>Torre Palma Dorada</span>
              </div>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:C.accentD}}/>
                <span style={{fontSize:12,color:C.txD}}>Todo en orden</span>
                <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#ec4899,#f59e0b)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"#fff",fontWeight:600,marginLeft:8}}>CM</div>
              </div>
            </div>
            <div style={{padding:24}}>
              <div style={{marginBottom:24}}>
                <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:600,color:C.tx,marginBottom:3}}>Buenos dias, Carmen</h3>
                <p style={{fontSize:13,color:C.txD}}>Martes 4 de marzo, 2026</p>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:20}}>
                {metrics.map((m,i)=>(
                  <div key={i} style={{background:C.surf,borderRadius:12,padding:"12px 14px",border:"1px solid "+C.surfD}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                      <span style={{fontSize:11,color:C.txD}}>{m.label}</span><span style={{fontSize:13}}>{m.icon}</span>
                    </div>
                    <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:24,fontWeight:700,color:m.color}}>{m.value}</div>
                    <div style={{fontSize:10.5,color:C.txD,marginTop:2}}>{m.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
                <div style={{background:C.surf,borderRadius:12,padding:"14px 16px",border:"1px solid "+C.surfD}}>
                  <div style={{fontSize:13,fontWeight:600,color:C.tx,marginBottom:12}}>Agenda de hoy</div>
                  {agendaItems.map((a,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"6px 0",borderBottom:i<agendaItems.length-1?"1px solid "+C.surfD:"none"}}>
                      <div style={{width:3,height:28,borderRadius:2,background:a.color,flexShrink:0,marginTop:2}}/>
                      <div style={{flex:1}}>
                        <div style={{fontSize:12,color:C.tx,lineHeight:1.3}}>{a.event}</div>
                        <div style={{fontSize:10.5,color:C.txD,marginTop:2}}>{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{background:C.surf,borderRadius:12,padding:"14px 16px",border:"1px solid "+C.surfD}}>
                  <div style={{fontSize:13,fontWeight:600,color:C.tx,marginBottom:12}}>Tickets recientes</div>
                  {recentTickets.map((t,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"6px 0",borderBottom:i<recentTickets.length-1?"1px solid "+C.surfD:"none"}}>
                      <div style={{width:24,height:24,borderRadius:"50%",background:t.priority==="Alta"?"#fef2f2":t.priority==="Media"?"#fff7ed":"#f0fdf4",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:600,color:t.priority==="Alta"?"#dc2626":t.priority==="Media"?"#ea580c":"#16a34a",flexShrink:0,marginTop:2}}>{t.avatar}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:12,color:C.tx,lineHeight:1.3}}>{t.id} {t.title}</div>
                        <div style={{fontSize:10.5,color:C.txD,marginTop:2}}>{t.time} {"\u00b7"} {t.priority}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{background:C.surf,borderRadius:12,padding:"14px 16px",border:"1px solid "+C.surfD}}>
                  <div style={{fontSize:13,fontWeight:600,color:C.tx,marginBottom:12}}>Notificaciones enviadas</div>
                  {notifs.map((n,i)=>(
                    <div key={i} style={{padding:"6px 0",borderBottom:i<notifs.length-1?"1px solid "+C.surfD:"none"}}>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                        <div style={{width:6,height:6,borderRadius:"50%",background:n.type==="broadcast"?"#3b82f6":n.type==="resolved"?C.accentD:"#f59e0b"}}/>
                        <span style={{fontSize:12,color:C.tx,lineHeight:1.3}}>{n.text}</span>
                      </div>
                      <div style={{fontSize:10.5,color:C.txD,paddingLeft:12}}>{n.time} {"\u00b7"} {n.sent}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:"100px 24px",textAlign:"center",background:C.bg}}>
        <div style={{maxWidth:640,margin:"0 auto"}}>
          <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(28px,4.5vw,48px)",fontWeight:700,color:C.tx,lineHeight:1.15,marginBottom:4,letterSpacing:"-0.02em"}}>Ya sabes usar Qondo.</h2>
          <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(20px,3vw,28px)",fontWeight:500,color:C.accentD,lineHeight:1.3,marginBottom:40}}>Un contacto mas en tu WhatsApp.</h2>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:20}}>
            <button style={{padding:"18px 44px",borderRadius:100,border:"none",background:C.accentD,color:"#fff",fontSize:17,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",boxShadow:"0 4px 24px rgba(5,150,105,0.25)"}}>{"Cont\u00e1ctanos \u2192"}</button>
            <div style={{fontSize:14,color:C.txD}}>{"o"}</div>
            <ShareButton/>
            <p style={{fontSize:13,color:C.txD,maxWidth:380}}>{"Te gustaria tener esto en tu edificio? Compartelo con tu administrador o junta directiva."}</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:"36px 24px",borderTop:"1px solid "+C.surfD,textAlign:"center",background:C.bg}}>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:18,fontWeight:700,color:C.txD,marginBottom:8}}><span style={{color:C.accentD}}>q</span>ondo</div>
        <p style={{fontSize:13,color:C.txD}}>2026 Qondo.</p>
      </footer>
    </div>
  );
}
