import { useState, useEffect } from "react";
import Head from "next/head";

const C = {
  bg: "#f7f5f0",
  bgWarm: "#efeadf",
  surf: "#f2efe8",
  surfD: "#e8e3d8",
  accent: "#34d399",
  accentD: "#059669",
  accentLight: "#ecfdf5",
  tx: "#1a1814",
  txM: "#5c5647",
  txD: "#8a8377",
  waBg: "#efeae2",
  waIn: "#ffffff",
  waOut: "#d9fdd3",
  waH: "#008069",
  waTime: "#667781",
};

/* ─── small components ─── */
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

const WAHeader = ({name="Torre Palma Dorada"}) => (
  <div style={{background:C.waH,padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
    <div style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,"+C.accentD+","+C.accent+")",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:700}}>Q</div>
    <div style={{flex:1}}>
      <div style={{color:"#fff",fontSize:14,fontWeight:500}}>{name}</div>
      <div style={{color:"rgba(255,255,255,0.7)",fontSize:11.5}}>en linea</div>
    </div>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
  </div>
);

const StatusBar = ({battery=73,speaker=false,bluetooth=false,lowBat=false}) => (
  <div style={{background:"#fff",padding:"4px 16px 0",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,fontWeight:600,color:"#000"}}>
    <span>3:02</span>
    <div style={{display:"flex",alignItems:"center",gap:4}}>
      {speaker&&<svg width="14" height="14" viewBox="0 0 24 24" fill="#000"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>}
      {bluetooth&&<svg width="12" height="14" viewBox="0 0 24 24" fill="#2196F3"><path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"/></svg>}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#000"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
      <div style={{display:"flex",alignItems:"center",gap:2}}>
        <div style={{width:22,height:11,borderRadius:2,border:"1.5px solid #000",position:"relative",display:"flex",alignItems:"center",padding:1}}>
          <div style={{height:"100%",width:lowBat?"18%":(battery+"%"),borderRadius:1,background:lowBat?"#ff3b30":"#000"}}/>
        </div>
      </div>
    </div>
  </div>
);

const HoyBadge = () => (
  <div style={{textAlign:"center",marginBottom:10}}>
    <span style={{fontSize:11,color:C.waTime,background:"#e1ddd4",padding:"4px 12px",borderRadius:6,fontWeight:500}}>HOY</span>
  </div>
);

/* ─── HERO PHONE: Lock screen → unlock → proactive conversation ─── */
const HeroPhone = () => {
  const [phase, setPhase] = useState(0); // 0=lock, 1=notification, 2=unlock/chat
  useEffect(()=>{
    const t1 = setTimeout(()=>setPhase(1), 1200);
    const t2 = setTimeout(()=>setPhase(2), 3500);
    return()=>{clearTimeout(t1);clearTimeout(t2)};
  },[]);

  // Lock screen
  if(phase < 2) return (
    <div style={{width:310,borderRadius:20,overflow:"hidden",background:"linear-gradient(160deg,#0f172a 0%,#1e293b 50%,#0f172a 100%)",boxShadow:"0 8px 40px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.08)",border:"1px solid rgba(255,255,255,0.08)",flexShrink:0,animation:"fp 6s ease-in-out infinite"}}>
      {/* Status bar dark */}
      <div style={{padding:"12px 20px 0",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,fontWeight:600,color:"#fff"}}>
        <span>3:02</span>
        <div style={{display:"flex",alignItems:"center",gap:4}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
          <div style={{width:22,height:11,borderRadius:2,border:"1.5px solid #fff",display:"flex",alignItems:"center",padding:1}}>
            <div style={{height:"100%",width:"73%",borderRadius:1,background:"#fff"}}/>
          </div>
        </div>
      </div>
      {/* Time */}
      <div style={{textAlign:"center",padding:"50px 0 10px"}}>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:64,fontWeight:300,color:"#fff",lineHeight:1,letterSpacing:"-0.02em"}}>3:02</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,0.5)",marginTop:6}}>martes, 4 de marzo</div>
      </div>
      {/* Notification */}
      {phase >= 1 && (
        <div style={{padding:"20px 14px",animation:"bp 0.4s cubic-bezier(0.175,0.885,0.32,1.275)"}}>
          <div style={{background:"rgba(255,255,255,0.12)",backdropFilter:"blur(20px)",borderRadius:16,padding:"12px 14px",display:"flex",gap:10,alignItems:"flex-start"}}>
            <div style={{width:36,height:36,borderRadius:10,background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
            </div>
            <div style={{flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}>
                <span style={{fontSize:13,fontWeight:600,color:"#fff"}}>Torre Palma Dorada</span>
                <span style={{fontSize:11,color:"rgba(255,255,255,0.5)"}}>ahora</span>
              </div>
              <div style={{fontSize:12.5,color:"rgba(255,255,255,0.8)",lineHeight:1.4}}>
                <strong>Qondo:</strong> Se activo la alarma en el edificio. Estamos verificando con operaciones...
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Bottom bar */}
      <div style={{padding:"60px 0 16px",display:"flex",justifyContent:"center"}}>
        <div style={{width:120,height:4,borderRadius:2,background:"rgba(255,255,255,0.3)"}}/>
      </div>
    </div>
  );

  // Unlocked - WhatsApp chat (proactive)
  return (
    <div style={{width:310,borderRadius:20,overflow:"hidden",background:C.waBg,boxShadow:"0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",border:"1px solid rgba(0,0,0,0.08)",flexShrink:0,animation:"fp 6s ease-in-out infinite"}}>
      <StatusBar battery={73}/>
      <WAHeader/>
      <div style={{padding:"10px 10px",minHeight:340,display:"flex",flexDirection:"column",background:C.waBg}}>
        <HoyBadge/>
        <Bubble time="3:02 a.m." bot={true} out={false} delay={400}>
          <div>Se activo la alarma de incendios en el edificio. Estamos verificando con Carlos de operaciones. Les informamos en breve.</div>
        </Bubble>
        <Bubble text="Es real? Que hago??" time="3:02 a.m." out={true} delay={2200}/>
        <Bubble time="3:03 a.m." bot={true} out={false} delay={3800}>
          <div>Maria, Carlos confirma: <strong>falsa alarma</strong>. Fue una prueba del sistema de humo en el piso 6. No es necesario evacuar.</div>
        </Bubble>
        <Bubble text="Uff que alivio, gracias!" time="3:04 a.m." out={true} delay={5600}/>
        <Bubble time="3:04 a.m." bot={true} out={false} delay={7000}>
          <div>De nada, Maria! Te puedo ayudar en algo mas?</div>
        </Bubble>
      </div>
    </div>
  );
};

/* ─── FEATURES CONVERSATIONS ─── */
const convos = {
  reglamento: {
    sb: {battery:12,lowBat:true,speaker:true,bluetooth:true},
    messages: [
      {text:"Hasta que hora puedo hacer ruido? Tengo visita",out:true,time:"9:14 p.m."},
      {text:"Hola Pedro! Segun el reglamento, el horario de silencio empieza a las 10:00 PM. Despues de esa hora se pide mantener el volumen bajo.\n\nQuieres que te envie la seccion completa de ruido y convivencia?",out:false,time:"9:14 p.m.",bot:true},
    ]
  },
  reservas: {
    sb: {battery:54},
    messages: [
      {text:"Hola quiero reservar el salon de fiestas",out:true,time:"2:30 p.m."},
      {text:"Hola Ana! Con gusto te ayudo. Para que fecha lo necesitas?",out:false,time:"2:30 p.m.",bot:true},
      {text:"Para el sabado que viene",out:true,time:"2:31 p.m."},
      {text:"Perfecto, cuantas personas tienes en la lista y que estan celebrando?",out:false,time:"2:31 p.m.",bot:true},
      {text:"Es el cumple de mi hija, unas 25 personas. De 6 a 11pm",out:true,time:"2:32 p.m."},
      {text:"El salon esta libre en ese horario!\n\nReservado:\nSalon de fiestas\nSabado 15 marzo, 6pm - 11pm\nApto 7A - Cumpleanos\n~25 personas\n\nTe envio las reglas de uso? Y por cierto, espero que la pasen increible!",out:false,time:"2:32 p.m.",bot:true},
    ]
  },
  votaciones: {
    sb: {battery:88},
    messages: [
      {text:"Hola Gabriel! Hay una votacion abierta y nos encantaria contar con tu opinion:\n\nRenovar sistema de camaras de seguridad\nCosto: $2,500 por apto (cuota unica)\nCierra: Viernes 21 de marzo\n23 de 50 aptos han votado\n\n1 A favor\n2 En contra\n3 Necesito mas informacion",out:false,time:"7:00 p.m.",bot:true},
      {text:"3",out:true,time:"7:12 p.m."},
      {text:"Claro! Hay dos propuestas:\n\nOpcion A: Hikvision, 12 camaras HD, grabacion 30 dias - $2,500/apto\nOpcion B: Dahua, 8 camaras 4K, grabacion 15 dias - $1,800/apto\n\nAqui puedes ver las cotizaciones completas: bit.ly/camaras-tpd\n\nCuando te decidas, me avisas!",out:false,time:"7:12 p.m.",bot:true},
    ]
  },
  paquetes: {
    sb: {battery:91},
    messages: [
      {text:"Hola Sofia! Llego un paquete a tu nombre a recepcion. Lo recibio Jose en porteria a las 11:38am.",out:false,time:"11:42 a.m.",bot:true},
      {text:null,out:false,time:"11:42 a.m.",bot:true,isLabel:true},
      {text:"Ahh estoy de vacaciones! Regreso el martes",out:true,time:"12:15 p.m."},
      {text:"Entendido! Quieres que lo guardemos en el deposito hasta el martes? Queda seguro ahi.\n\nY si llega algo mas de aqui al martes, lo guardamos directamente. Te parece?",out:false,time:"12:15 p.m.",bot:true},
      {text:"Perfecto, muchas gracias!",out:true,time:"12:16 p.m."},
      {text:"Listo! Cuando regreses me escribes y te digo todo lo que te llego. Disfruta las vacaciones!",out:false,time:"12:16 p.m.",bot:true},
    ]
  },
  comunidad: {
    sb: {battery:67},
    messages: [
      {text:"Torneo de natacion del edificio!\n\nSabado 22 de marzo, 10am\nPiscina principal\n\nCategorias: ninos (6-12) y adultos\nPremios: trofeos + dia gratis de parrillera\n\n1 Quiero participar\n2 Solo quiero ir a ver",out:false,time:"5:00 p.m.",bot:true},
      {text:"1! Quiero participar",out:true,time:"5:22 p.m."},
      {text:"Genial! Para inscribirte necesito:\n\nCategoria: adultos o ninos?\nSi es ninos, nombre y edad del participante\nCuantas personas vas a inscribir?",out:false,time:"5:22 p.m.",bot:true},
      {text:"Adultos, solo yo",out:true,time:"5:23 p.m."},
      {text:"Listo, inscrito en categoria adultos! Participante #8.\n\nDato: la vecina del 3A organiza una practica el jueves a las 6pm. Te aviso?",out:false,time:"5:23 p.m.",bot:true},
    ]
  },
};

const tabList = [
  {id:"reglamento",icon:"\ud83d\udccb",label:"Reglamento"},
  {id:"reservas",icon:"\ud83c\udf89",label:"Reservas"},
  {id:"votaciones",icon:"\ud83d\uddf3\ufe0f",label:"Votaciones"},
  {id:"paquetes",icon:"\ud83d\udce6",label:"Paquetes"},
  {id:"comunidad",icon:"\ud83c\udfca",label:"Comunidad"},
];

const PackageLabel = () => (
  <div style={{display:"flex",justifyContent:"flex-start",marginBottom:4,animation:"bp 0.3s cubic-bezier(0.175,0.885,0.32,1.275)"}}>
    <div style={{maxWidth:"82%",borderRadius:8,overflow:"hidden",background:"#fff",border:"1px solid #e0dbd2",boxShadow:"0 1px 2px rgba(0,0,0,0.06)"}}>
      <div style={{background:C.accentD,color:"#fff",padding:"5px 10px",fontSize:10.5,fontWeight:700,letterSpacing:"0.5px",textTransform:"uppercase"}}>Torre Palma Dorada</div>
      <div style={{padding:"8px 10px"}}>
        <div style={{fontSize:11,color:C.txD,marginBottom:3}}>PAQUETE RECIBIDO</div>
        <div style={{fontSize:13,fontWeight:600,color:C.tx,marginBottom:4}}>Sofia Herrera - Apto 5C</div>
        <div style={{fontSize:10.5,color:C.txD}}>Tracking: 1Z999AA10123456784</div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:10.5,color:C.txD,marginTop:2}}>
          <span>11:38 AM - 4 Mar 2026</span>
          <span style={{color:C.accentD,fontWeight:600}}>En porteria</span>
        </div>
      </div>
    </div>
  </div>
);

const Features = () => {
  const [tab,setTab] = useState("reglamento");
  const [k,setK] = useState(0);
  const data = convos[tab];
  const msgs = data.messages;
  const sb = data.sb||{};
  return (
    <section style={{padding:"100px 24px",background:C.bgWarm}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:C.tx,marginBottom:16,lineHeight:1.2}}>
            Todo por <span style={{color:C.accentD}}>WhatsApp.</span>
          </h2>
          <p style={{fontSize:18,color:C.txM,maxWidth:540,margin:"0 auto",lineHeight:1.6}}>
            Tus residentes no necesitan bajar otra app. Solo abrir WhatsApp como hacen 80 veces al dia.
          </p>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:44}}>
          {tabList.map(t=>(
            <button key={t.id} onClick={()=>{setTab(t.id);setK(x=>x+1)}} style={{
              padding:"10px 20px",borderRadius:100,
              border:tab===t.id?"1.5px solid "+C.accentD:"1.5px solid "+C.surfD,
              background:tab===t.id?C.accentLight:"#fff",
              color:tab===t.id?C.accentD:C.txM,
              fontSize:14,fontWeight:tab===t.id?600:500,cursor:"pointer",transition:"all 0.25s",
              display:"flex",alignItems:"center",gap:8,whiteSpace:"nowrap",fontFamily:"inherit"
            }}>
              <span style={{fontSize:17}}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
        <div style={{maxWidth:340,margin:"0 auto",borderRadius:20,overflow:"hidden",background:C.waBg,boxShadow:"0 8px 40px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05)",border:"1px solid rgba(0,0,0,0.08)"}}>
          <StatusBar battery={sb.battery||73} lowBat={sb.lowBat} speaker={sb.speaker} bluetooth={sb.bluetooth}/>
          <WAHeader/>
          <div key={k} style={{padding:"10px 10px",minHeight:280,display:"flex",flexDirection:"column",background:C.waBg}}>
            <HoyBadge/>
            {msgs.map((m,i)=>{
              if(m.isLabel) return <PackageLabel key={k+"-"+i}/>;
              return <Bubble key={k+"-"+i} text={m.text} time={m.time} out={m.out} bot={m.bot} delay={i*900+300}/>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── DASHBOARD DATA ─── */
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
  {time:"9:00 AM",event:"Tecnico de ascensor - Mantenimiento",color:"#e67e22",status:"Confirmado"},
  {time:"11:30 AM",event:"Reunion proveedor fumigacion",color:C.accentD,status:"Pendiente"},
  {time:"2:00 PM",event:"Fumigacion pisos 1-5",color:C.accentD,status:"Notificado"},
  {time:"6:00 PM",event:"Salon reservado - Apto 7A",color:"#8b5cf6",status:"Reservado"},
];

const recentTickets = [
  {id:"#127",title:"Filtracion bano apto 3B",priority:"Alta",time:"Hace 2h",avatar:"MR"},
  {id:"#126",title:"Luz pasillo piso 8 fundida",priority:"Media",time:"Hace 5h",avatar:"JL"},
  {id:"#125",title:"Ruido excesivo apto 11A",priority:"Baja",time:"Ayer",avatar:"CP"},
];

const notifications = [
  {type:"broadcast",text:"Piscina cerrada por mantenimiento hasta manana 2pm",time:"Hace 1h",sent:"48 residentes notificados"},
  {type:"resolved",text:"Gimnasio reparado, ya esta abierto",time:"Hace 3h",sent:"Notificacion automatica enviada"},
  {type:"reminder",text:"Recordatorio de pago enviado a 12 aptos",time:"Ayer",sent:"12 mensajes enviados"},
];

/* ─── MAIN COMPONENT ─── */
export default function QondoLanding() {
  const [hv,setHv] = useState(false);
  useEffect(()=>{setTimeout(()=>setHv(true),200)},[]);

  return (
    <div style={{background:C.bg,minHeight:"100vh",fontFamily:"'DM Sans',-apple-system,sans-serif",color:C.tx,overflowX:"hidden"}}>
      <Head>
        <title>Qondo - Gestion de edificios por WhatsApp</title>
        <meta name="description" content="Qondo conecta tu edificio por WhatsApp. Tus residentes no necesitan bajar otra app." />
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
        "*{margin:0;padding:0;box-sizing:border-box}",
        "html{scroll-behavior:smooth}",
      ].join("\n")}</style>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"14px 24px",background:"rgba(247,245,240,0.88)",backdropFilter:"blur(16px)",borderBottom:"1px solid rgba(0,0,0,0.05)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:24,fontWeight:700,color:C.tx,letterSpacing:"-0.02em"}}>
            <span style={{color:C.accentD}}>q</span>ondo
          </div>
          <button style={{padding:"10px 28px",borderRadius:100,border:"none",background:C.accentD,color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
            Agenda un demo
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"120px 24px 80px",background:"linear-gradient(180deg,"+C.bg+" 0%,"+C.bgWarm+" 100%)"}}>
        <div style={{maxWidth:1200,width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",gap:80,flexWrap:"wrap"}}>
          <div style={{flex:"1 1 500px",animation:hv?"fu 0.8s ease forwards":"none",opacity:hv?1:0}}>
            {/* Push notification */}
            <div style={{display:"inline-flex",alignItems:"center",gap:10,padding:"10px 18px",borderRadius:14,background:"#fff",border:"1px solid "+C.surfD,boxShadow:"0 4px 16px rgba(0,0,0,0.06)",marginBottom:28}}>
              <div style={{width:36,height:36,borderRadius:10,background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
              </div>
              <div>
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
              <button style={{padding:"16px 36px",borderRadius:100,border:"none",background:C.accentD,color:"#fff",fontSize:16,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",boxShadow:"0 4px 20px rgba(5,150,105,0.25)"}}>
                {"Quiero Qondo \u2192"}
              </button>
              <button style={{padding:"16px 28px",borderRadius:100,border:"1.5px solid "+C.surfD,background:"#fff",color:C.txM,fontSize:16,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
                Ver demo
              </button>
            </div>
          </div>
          <div style={{flex:"0 0 auto",animation:hv?"fu 1s ease 0.3s forwards":"none",opacity:hv?1:0}}>
            <HeroPhone/>
          </div>
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

      <Features/>

      {/* ADMIN */}
      <section style={{padding:"100px 24px",background:C.bg}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:56}}>
            <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:700,color:C.tx,marginBottom:12,lineHeight:1.2,maxWidth:700,margin:"0 auto 12px"}}>
              Todo administrador merece un asistente.
            </h2>
            <p style={{fontSize:17,color:C.txM,maxWidth:620,margin:"0 auto",lineHeight:1.6}}>
              Sobre todo cuando el trabajo es gratis, nadie te da las gracias, y todos creen que te quedas con el vuelto.
            </p>
            <p style={{fontSize:15,color:C.txD,marginTop:8,fontStyle:"italic"}}>
              Qondo es el asistente que nunca pediste, para el cargo que nunca quisiste.
            </p>
          </div>
          <div style={{background:"#fff",borderRadius:20,border:"1px solid "+C.surfD,overflow:"hidden",boxShadow:"0 8px 40px rgba(0,0,0,0.06)"}}>
            <div style={{padding:"16px 24px",borderBottom:"1px solid "+C.surfD,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
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
                      <span style={{fontSize:11,color:C.txD}}>{m.label}</span>
                      <span style={{fontSize:13}}>{m.icon}</span>
                    </div>
                    <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:24,fontWeight:700,color:m.color}}>{m.value}</div>
                    <div style={{fontSize:10.5,color:C.txD,marginTop:2}}>{m.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
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
                  {notifications.map((n,i)=>(
                    <div key={i} style={{padding:"6px 0",borderBottom:i<notifications.length-1?"1px solid "+C.surfD:"none"}}>
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

      {/* CTA FINAL */}
      <section style={{padding:"100px 24px",textAlign:"center",background:C.bgWarm}}>
        <div style={{maxWidth:640,margin:"0 auto"}}>
          <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(28px,4.5vw,48px)",fontWeight:700,color:C.tx,lineHeight:1.15,marginBottom:4,letterSpacing:"-0.02em"}}>
            Tu edificio ya tiene WhatsApp.
          </h2>
          <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(28px,4.5vw,48px)",fontWeight:700,color:C.accentD,lineHeight:1.15,marginBottom:40,letterSpacing:"-0.02em"}}>
            Solo le falta Qondo.
          </h2>
          <button style={{padding:"18px 44px",borderRadius:100,border:"none",background:C.accentD,color:"#fff",fontSize:17,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",boxShadow:"0 4px 24px rgba(5,150,105,0.25)"}}>
            {"Quiero Qondo \u2192"}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:"36px 24px",borderTop:"1px solid "+C.surfD,textAlign:"center",background:C.bg}}>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:18,fontWeight:700,color:C.txD,marginBottom:8}}>
          <span style={{color:C.accentD}}>q</span>ondo
        </div>
        <p style={{fontSize:13,color:C.txD}}>2026 Qondo.</p>
      </footer>
    </div>
  );
}
