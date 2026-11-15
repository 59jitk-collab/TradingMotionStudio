
import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  random
} from "remotion";

const BLUE = "#168BFF";
const CYAN = "#65D8FF";
const WHITE = "#EAF5FF";
const BG = "#050B16";

const scenes = [
  {
    start: 0,
    title: "SMART MONEY",
    sub: "CONCEPTS",
    tag: "TRADING EDUCATION",
    desc: "Understand the language of market structure."
  },
  {
    start: 180,
    title: "MARKET",
    sub: "STRUCTURE",
    tag: "01 / STRUCTURE",
    desc: "Higher highs and higher lows describe an uptrend."
  },
  {
    start: 420,
    title: "FIND THE",
    sub: "LIQUIDITY",
    tag: "02 / LIQUIDITY",
    desc: "Equal highs and lows can attract liquidity."
  },
  {
    start: 690,
    title: "BOS &",
    sub: "CHOCH",
    tag: "03 / STRUCTURE BREAKS",
    desc: "Study breaks and shifts in market structure."
  },
  {
    start: 960,
    title: "ORDER",
    sub: "BLOCKS",
    tag: "04 / ORDER BLOCKS",
    desc: "Study the last opposing candle before displacement."
  },
  {
    start: 1260,
    title: "FAIR VALUE",
    sub: "GAP",
    tag: "05 / IMBALANCE",
    desc: "Understand price imbalance using three candles."
  },
  {
    start: 1560,
    title: "READ THE",
    sub: "MARKET",
    tag: "THE BIG PICTURE",
    desc: "Structure. Liquidity. Displacement. Context."
  }
];

const candles = [
  40,55,48,70,60,82,65,90,75,105,
  80,115,95,125,105,135,115,145,125,155,
  135,165,145,175,155,185,165,195,175,205,
  185,215,195,225,205,235,215,245,225,255
];

const Chart: React.FC<{frame:number;scene:number}> = ({
  frame,scene
}) => {
  const progress = interpolate(frame,[0,100],[0,40],{
    extrapolateRight:"clamp"
  });

  return (
    <div style={{
      position:"absolute",
      top:690,
      left:65,
      width:950,
      height:610,
      border:"1px solid #244766",
      borderRadius:24,
      background:"#09182A",
      overflow:"hidden",
      boxShadow:"0 0 50px #168BFF30"
    }}>
      {Array.from({length:8}).map((_,i)=>(
        <div key={i} style={{
          position:"absolute",
          top:`${i*14}%`,
          width:"100%",
          borderTop:"1px solid #24476655"
        }}/>
      ))}

      {scene===2 && (
        <div style={{
          position:"absolute",
          top:140,
          width:"100%",
          height:65,
          background:"#168BFF22",
          borderTop:`2px dashed ${CYAN}`,
          borderBottom:`2px dashed ${CYAN}`
        }}/>
      )}

      {scene===4 && (
        <div style={{
          position:"absolute",
          top:340,
          left:"25%",
          width:"50%",
          height:100,
          background:"#168BFF33",
          border:`2px solid ${BLUE}`
        }}/>
      )}

      {scene===5 && (
        <div style={{
          position:"absolute",
          top:210,
          left:"35%",
          width:"35%",
          height:110,
          background:"#65D8FF22",
          border:`2px dashed ${CYAN}`
        }}/>
      )}

      <div style={{
        position:"absolute",
        inset:20,
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        gap:7
      }}>
        {candles.map((v,i)=>{
          const visible=i<progress;
          const rising=i%4!==0;
          const h=35+(v%80);
          const y=100+((i*37)%260);

          return (
            <div key={i} style={{
              position:"relative",
              flex:1,
              height:"100%",
              opacity:visible?1:0.08
            }}>
              <div style={{
                position:"absolute",
                top:y-20,
                left:"45%",
                width:2,
                height:h+40,
                background:rising?CYAN:"#54718C"
              }}/>
              <div style={{
                position:"absolute",
                top:y,
                height:h,
                width:"100%",
                background:rising?BLUE:"#315D83",
                borderRadius:3,
                boxShadow:"0 0 12px #168BFF66"
              }}/>
            </div>
          );
        })}
      </div>

      <div style={{
        position:"absolute",
        bottom:18,
        left:20,
        color:"#7893AD",
        fontSize:17,
        letterSpacing:3
      }}>
        ILLUSTRATIVE PRICE ACTION
      </div>
    </div>
  );
};

export const SMCVideo: React.FC = () => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();

  const sceneIndex=scenes.findIndex((s,i)=>{
    const next=scenes[i+1];
    return frame>=s.start && (!next || frame<next.start);
  });

  const index=Math.max(0,sceneIndex);
  const scene=scenes[index];
  const local=frame-scene.start;

  const enter=spring({
    frame:local,
    fps,
    config:{damping:18,stiffness:80}
  });

  const fade=interpolate(
    local,[0,18,220,240],
    [0,1,1,0],
    {extrapolateRight:"clamp"}
  );

  const descriptions=[
    ["PRICE ACTION","MARKET STRUCTURE","LIQUIDITY"],
    ["HH = HIGHER HIGH","HL = HIGHER LOW","TREND CONTEXT"],
    ["EQUAL HIGHS","RESTING LIQUIDITY","SWEEP ≠ REVERSAL"],
    ["BREAK OF STRUCTURE","CHANGE OF CHARACTER","CONFIRM WITH CONTEXT"],
    ["SUPPLY ZONES","DEMAND ZONES","MARKET CONTEXT"],
    ["CANDLE ONE","DISPLACEMENT","CANDLE THREE"],
    ["STRUCTURE","LIQUIDITY","IMBALANCE"]
  ];

  return (
    <AbsoluteFill style={{
      background:BG,
      color:WHITE,
      fontFamily:"Arial,sans-serif",
      overflow:"hidden"
    }}>
      <AbsoluteFill style={{
        background:
          "radial-gradient(ellipse at 50% 45%,#103D68 0%,#081629 48%,#050B16 100%)"
      }}/>

      {Array.from({length:35}).map((_,i)=>(
        <div key={i} style={{
          position:"absolute",
          left:`${random(i)*100}%`,
          top:`${(random(i+100)+frame*.0008)*100%}`,
          width:4,
          height:4,
          borderRadius:"50%",
          background:CYAN,
          opacity:.25
        }}/>
      ))}

      <div style={{
        position:"absolute",
        top:100,
        left:75,
        color:CYAN,
        fontSize:24,
        letterSpacing:5
      }}>
        TRADING MOTION STUDIO
      </div>

      <div style={{
        position:"absolute",
        top:270,
        left:75,
        right:75,
        opacity:fade,
        transform:`translateY(${(1-enter)*60}px)`
      }}>
        <div style={{
          fontSize:27,
          color:CYAN,
          fontWeight:800,
          letterSpacing:5,
          marginBottom:30
        }}>
          {scene.tag}
        </div>

        <div style={{
          fontSize:88,
          fontWeight:900,
          lineHeight:1.08,
          letterSpacing:-2
        }}>
          {scene.title}
          <br/>
          <span style={{
            color:BLUE,
            textShadow:"0 0 35px #168BFF66"
          }}>
            {scene.sub}
          </span>
        </div>

        <div style={{
          fontSize:29,
          color:"#B5CCE1",
          lineHeight:1.5,
          marginTop:30
        }}>
          {scene.desc}
        </div>
      </div>

      <Chart frame={local} scene={index}/>

      <div style={{
        position:"absolute",
        top:1370,
        left:80,
        right:80,
        display:"flex",
        flexDirection:"column",
        gap:20
      }}>
        {descriptions[index].map((item,i)=>(
          <div key={item} style={{
            padding:"20px 25px",
            background:"#10365A88",
            borderLeft:`5px solid ${BLUE}`,
            fontSize:26,
            fontWeight:800,
            letterSpacing:2,
            color:WHITE,
            opacity:interpolate(
              local,[i*20,i*20+35],[0,1],
              {extrapolateRight:"clamp"}
            ),
            transform:`translateX(${Math.max(0,30-local)*-1}px)`
          }}>
            {item}
          </div>
        ))}
      </div>

      <div style={{
        position:"absolute",
        bottom:65,
        left:75,
        right:75
      }}>
        <div style={{
          height:5,
          background:"#24415A",
          borderRadius:10
        }}>
          <div style={{
            width:`${frame/1800*100}%`,
            height:"100%",
            background:BLUE,
            boxShadow:"0 0 15px #168BFF"
          }}/>
        </div>

        <div style={{
          display:"flex",
          justifyContent:"space-between",
          marginTop:18,
          color:"#7893AD",
          fontSize:18
        }}>
          <span>SMC EDUCATION</span>
          <span>{Math.floor(frame/fps)} / 60 SEC</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
            
