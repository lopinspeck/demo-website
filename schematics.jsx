// Schematic illustrations redrawn to match the actual 財政部稅務入口網 UI:
// cream/beige theme with teal primary buttons, beige sidebar, dashed-teal selects.
// Style is dictated by .sch-* classes in the main file plus literal hex colors
// for the gov portal's signature beige/teal palette.

// ---------- Portal palette (constants) ----------
const PALETTE = {
  beige:      "#E8DDC8",   // beige nav background
  beigeSoft:  "#F4ECDB",   // beige row backgrounds
  beigeLite:  "#FAF5EA",   // page bg tint
  cream:      "#FBF7EE",
  teal:       "#2E6F7A",   // primary button
  tealDark:   "#1F5C66",
  tealSoft:   "#D9E5E7",
  rule:       "#D8CDB6",
  ruleSoft:   "#EAE0CC",
  brown:      "#7A6A4F",   // section header text
  ink:        "#3A3329",
  inkMute:    "#8A7E68",
  red:        "#C0392B",
  gray:       "#9A9A9A",
};

// ---------- Reusable primitives ----------

// Top portal header bar w/ logo + nav
const PortalChrome = ({ breadcrumb }) => (
  <g>
    {/* top utility row */}
    <rect x="0" y="0" width="800" height="44" fill={PALETTE.cream} />
    {/* logo block */}
    <g transform="translate(20, 8)">
      <circle cx="14" cy="14" r="11" fill={PALETTE.beige} stroke={PALETTE.brown} strokeWidth="0.5"/>
      <text x="14" y="17" textAnchor="middle" style={{fontSize:9, fontFamily:'var(--serif)', fill:PALETTE.brown, fontWeight:700}}>財</text>
      <text x="32" y="13" style={{fontSize:11, fontFamily:'var(--serif)', fill:PALETTE.brown, fontWeight:700}}>財政部稅務入口網</text>
      <text x="32" y="24" style={{fontSize:7, fontFamily:'var(--mono)', fill:PALETTE.inkMute}}>eTax Portal, Ministry of Finance</text>
    </g>
    {/* utility links right */}
    <text x="780" y="16" textAnchor="end" style={{fontSize:8, fill:PALETTE.inkMute}}>網站導覽 | 常見問題 | 意見信箱 | 登入</text>
    {/* search bar slot */}
    <rect x="540" y="22" width="160" height="14" fill="white" stroke={PALETTE.rule}/>
    <rect x="704" y="22" width="40" height="14" fill={PALETTE.beige} stroke={PALETTE.rule}/>
    <text x="724" y="32" textAnchor="middle" style={{fontSize:7, fill:PALETTE.brown}}>進階</text>

    {/* main nav band */}
    <rect x="0" y="44" width="800" height="28" fill={PALETTE.beige}/>
    <line x1="0" y1="72" x2="800" y2="72" stroke={PALETTE.rule} strokeWidth="0.5"/>
    {["公告訊息","稅務資訊","線上服務","書表及檔案下載","交流園地","稅額試算","境外電商課稅"].map((t,i) => (
      <text key={i} x={48 + i*100} y="62" style={{fontSize:9.5, fill:PALETTE.ink, fontWeight:i===2?700:400}}>{t}</text>
    ))}

    {/* breadcrumb row */}
    {breadcrumb && (
      <>
        <rect x="0" y="72" width="800" height="22" fill={PALETTE.beigeLite}/>
        <text x="20" y="86" style={{fontSize:8.5, fill:PALETTE.brown}}>{breadcrumb}</text>
        <text x="780" y="86" textAnchor="end" style={{fontSize:8, fill:PALETTE.inkMute}}>字級設定  A-  A  A+</text>
      </>
    )}
  </g>
);

// Beige left sidebar
const Sidebar = ({ activeKey = "apply" }) => (
  <g transform="translate(0, 94)">
    <rect width="160" height="436" fill={PALETTE.beigeLite}/>
    {/* sidebar header */}
    <rect width="160" height="44" fill={PALETTE.beige}/>
    <rect x="6" y="14" width="3" height="16" fill={PALETTE.brown}/>
    <text x="16" y="28" style={{fontSize:13, fontFamily:'var(--serif)', fill:PALETTE.brown, fontWeight:700}}>線上查調</text>

    {/* items */}
    {[
      ["apply", "查調申請"],
      ["result", "結果調閱"],
    ].map(([key,label], i) => (
      <g key={key} transform={`translate(0, ${56 + i*44})`}>
        {activeKey === key && <rect width="160" height="32" fill={PALETTE.beige}/>}
        <text x="20" y="20" style={{fontSize:11, fill: activeKey===key ? PALETTE.brown : PALETTE.ink, fontWeight: activeKey===key ? 600:400}}>{label}</text>
      </g>
    ))}
  </g>
);

// Section header (beige bar with left brown accent)
const SectionHeader = ({ x, y, w, label }) => (
  <g transform={`translate(${x}, ${y})`}>
    <rect width={w} height="32" fill={PALETTE.beige}/>
    <rect x="10" y="9" width="3" height="14" fill={PALETTE.brown}/>
    <text x="20" y="21" style={{fontSize:12, fontFamily:'var(--serif)', fill:PALETTE.brown, fontWeight:700}}>{label}</text>
  </g>
);

// Teal primary button
const TealBtn = ({ x, y, w = 100, h = 32, label, fontSize = 12 }) => (
  <g transform={`translate(${x}, ${y})`}>
    <rect width={w} height={h} fill={PALETTE.teal}/>
    <text x={w/2} y={h/2 + 4} textAnchor="middle" style={{fontSize, fill:'white', fontWeight:500, letterSpacing:'0.1em'}}>{label}</text>
  </g>
);

// Gray ghost button
const GhostBtn = ({ x, y, w = 100, h = 32, label }) => (
  <g transform={`translate(${x}, ${y})`}>
    <rect width={w} height={h} fill={PALETTE.gray}/>
    <text x={w/2} y={h/2 + 4} textAnchor="middle" style={{fontSize:12, fill:'white', letterSpacing:'0.1em'}}>{label}</text>
  </g>
);

// Marker callout: numbered red dot + dashed line to label
const Marker = ({ x, y, label, dx = 40, dy = -28, n }) => {
  const lx = x + dx, ly = y + dy;
  return (
    <g>
      <path d={`M ${x} ${y} L ${lx} ${ly}`} stroke={PALETTE.red} strokeWidth="1.4" strokeDasharray="3 3" fill="none"/>
      <circle cx={x} cy={y} r="9" fill={PALETTE.red}/>
      <text x={x} y={y + 3.5} textAnchor="middle"
            style={{fontFamily: 'var(--mono)', fontSize: 10, fill: 'white', fontWeight: 700}}>{n}</text>
      <text x={lx} y={ly - 4} style={{fontFamily:'var(--mono)', fontSize:9.5, fill:PALETTE.red, letterSpacing:'0.04em', fontWeight:600}}>{label}</text>
    </g>
  );
};

// Browser frame chrome
const BrowserChrome = ({ url = "tax.nat.gov.tw" }) => (
  <g>
    <rect x="0" y="0" width="800" height="20" fill="#E5E5E5"/>
    <circle cx="12" cy="10" r="3" fill="#E66"/>
    <circle cx="22" cy="10" r="3" fill="#EC6"/>
    <circle cx="32" cy="10" r="3" fill="#6C6"/>
    <rect x="60" y="4" width="640" height="12" rx="2" fill="white" stroke="#CCC"/>
    <text x="68" y="13" style={{fontSize:8, fontFamily:'var(--mono)', fill:'#888'}}>{url}</text>
  </g>
);

// ---------- Step 0 — Prerequisites ----------
function Sch0() {
  return (
    <svg viewBox="0 0 800 550" preserveAspectRatio="xMidYMid meet">
      <rect width="800" height="550" fill={PALETTE.beigeLite}/>

      <text x="60" y="50" style={{fontSize:13, fontFamily:'var(--serif)', fill:PALETTE.brown, fontWeight:700}}>需要準備的三樣東西</text>
      <line x1="60" y1="60" x2="200" y2="60" stroke={PALETTE.teal} strokeWidth="1.5"/>

      {/* Card 1 — IC card */}
      <g transform="translate(60, 86)">
        <rect width="200" height="148" fill="white" stroke={PALETTE.rule}/>
        <rect x="30" y="28" width="140" height="84" fill={PALETTE.beigeSoft} stroke={PALETTE.rule}/>
        <rect x="48" y="46" width="28" height="22" fill={PALETTE.tealSoft} stroke={PALETTE.teal} strokeWidth="1"/>
        <line x1="86" y1="52" x2="148" y2="52" stroke={PALETTE.rule}/>
        <line x1="86" y1="60" x2="138" y2="60" stroke={PALETTE.rule}/>
        <line x1="86" y1="68" x2="148" y2="68" stroke={PALETTE.rule}/>
        <line x1="48" y1="92" x2="148" y2="92" stroke={PALETTE.rule}/>
        <text x="100" y="138" textAnchor="middle" style={{fontSize:11, fill:PALETTE.ink, fontWeight:500}}>工商憑證</text>
      </g>

      {/* Card 2 — Card reader */}
      <g transform="translate(300, 86)">
        <rect width="200" height="148" fill="white" stroke={PALETTE.rule}/>
        <rect x="34" y="58" width="132" height="48" rx="4" fill={PALETTE.beigeSoft} stroke={PALETTE.rule}/>
        <rect x="62" y="50" width="76" height="6" fill={PALETTE.brown} opacity="0.4"/>
        <circle cx="150" cy="80" r="2.5" fill={PALETTE.teal}/>
        <text x="100" y="138" textAnchor="middle" style={{fontSize:11, fill:PALETTE.ink, fontWeight:500}}>讀卡機</text>
      </g>

      {/* Card 3 — email */}
      <g transform="translate(540, 86)">
        <rect width="200" height="148" fill="white" stroke={PALETTE.rule}/>
        <rect x="50" y="50" width="100" height="64" fill={PALETTE.cream} stroke={PALETTE.rule}/>
        <path d="M 50 50 L 100 88 L 150 50" fill="none" stroke={PALETTE.teal} strokeWidth="1.4"/>
        <text x="100" y="138" textAnchor="middle" style={{fontSize:11, fill:PALETTE.ink, fontWeight:500}}>電子信箱</text>
      </g>

      {/* Note */}
      <g transform="translate(60, 274)">
        <rect width="680" height="220" fill="white" stroke={PALETTE.rule}/>
        <rect width="680" height="32" fill={PALETTE.beige}/>
        <rect x="10" y="9" width="3" height="14" fill={PALETTE.brown}/>
        <text x="20" y="21" style={{fontSize:12, fontFamily:'var(--serif)', fill:PALETTE.brown, fontWeight:700}}>會用到的兩個網址</text>

        <text x="28" y="68" style={{fontSize:10, letterSpacing:'0.08em', fill:PALETTE.inkMute}}>查詢所得（財政部稅務入口網）</text>
        <text x="28" y="90" style={{fontSize:13, fontFamily:'var(--mono)', fill:PALETTE.teal}}>tax.nat.gov.tw</text>

        <text x="28" y="130" style={{fontSize:10, letterSpacing:'0.08em', fill:PALETTE.inkMute}}>申請工商憑證（經濟部）</text>
        <text x="28" y="152" style={{fontSize:13, fontFamily:'var(--mono)', fill:PALETTE.teal}}>moeaca.nat.gov.tw</text>

        <text x="28" y="190" style={{fontSize:9.5, fill:PALETTE.red}}>※ 健保卡僅限獨資合夥組織、且 114/12/31 之負責人持有時適用</text>
      </g>
    </svg>
  );
}

// ---------- Step 1 — Choose 工商憑證 row ----------
function Sch1() {
  return (
    <svg viewBox="0 0 800 550" preserveAspectRatio="xMidYMid meet">
      <rect width="800" height="550" fill="white"/>
      <BrowserChrome />
      <g transform="translate(0, 20)">
        <PortalChrome breadcrumb="首頁 > 線上服務 > 線上查調 > 查詢方式" />

        <g transform="translate(60, 110)">
          <text x="0" y="0" style={{fontSize:13, fontFamily:'var(--serif)', fill:PALETTE.brown, fontWeight:700}}>▸ 查詢方式</text>
          <text x="0" y="22" style={{fontSize:10, fill:PALETTE.ink}}>查詢所得期間：115年4月28日起至6月1日止</text>
          <text x="0" y="38" style={{fontSize:10, fill:PALETTE.ink}}>授權代理期間：115年4月1日起至6月1日止</text>

          {/* Table */}
          <g transform="translate(0, 56)">
            {/* table header row */}
            <rect width="680" height="28" fill={PALETTE.tealSoft} stroke={PALETTE.rule}/>
            <text x="120" y="18" textAnchor="middle" style={{fontSize:10, fill:PALETTE.ink, fontWeight:600}}>查詢所得方式</text>
            <text x="460" y="18" textAnchor="middle" style={{fontSize:10, fill:PALETTE.ink, fontWeight:600}}>適用憑證</text>

            {/* group: 自行查詢 */}
            <rect x="0" y="28" width="680" height="22" fill={PALETTE.beigeSoft} stroke={PALETTE.rule}/>
            <text x="12" y="43" style={{fontSize:10, fill:PALETTE.ink, fontWeight:600}}>⊙ 自行查詢</text>

            {/* row: 所得查調申請 — TARGET */}
            <rect x="0" y="50" width="680" height="34" fill="white" stroke={PALETTE.rule}/>
            <text x="12" y="71" style={{fontSize:10, fill:PALETTE.ink}}>● 所得查調申請</text>
            {/* 工商憑證 - highlighted with red dashed border */}
            <rect x="244" y="56" width="92" height="22" fill="#1B7C3C"/>
            <rect x="241" y="53" width="98" height="28" fill="none" stroke={PALETTE.red} strokeWidth="1.4" strokeDasharray="3 2"/>
            <text x="290" y="71" textAnchor="middle" style={{fontSize:10, fill:'white', fontWeight:600}}>工商憑證</text>

            <rect x="346" y="56" width="92" height="22" fill="#7B4FA8"/>
            <text x="392" y="71" textAnchor="middle" style={{fontSize:9.5, fill:'white'}}>組織及團體憑證</text>

            <rect x="448" y="56" width="92" height="22" fill="#2E6FB5"/>
            <text x="494" y="71" textAnchor="middle" style={{fontSize:10, fill:'white'}}>自然人憑證</text>

            <rect x="550" y="56" width="92" height="22" fill="#C84A2B"/>
            <text x="596" y="71" textAnchor="middle" style={{fontSize:10, fill:'white'}}>健保卡</text>

            {/* group: 委託查詢 */}
            <rect x="0" y="84" width="680" height="22" fill={PALETTE.beigeSoft} stroke={PALETTE.rule}/>
            <text x="12" y="99" style={{fontSize:10, fill:PALETTE.ink, fontWeight:600}}>⊙ 委託查詢</text>

            {[
              ["代理人所得查調申請", ["g","p"]],
              ["授權代理人作業", ["g","p","b","r"]],
              ["註銷授權代理人作業", ["g","p","b","r"]],
            ].map(([label, btns], i) => {
              const colors = {g:"#1B7C3C", p:"#7B4FA8", b:"#2E6FB5", r:"#C84A2B"};
              const labels = {g:"工商憑證", p:"組織及團體憑證", b:"自然人憑證", r:"健保卡"};
              return (
                <g key={i} transform={`translate(0, ${106 + i*34})`}>
                  <rect width="680" height="34" fill="white" stroke={PALETTE.rule}/>
                  <text x="12" y="21" style={{fontSize:10, fill:PALETTE.ink}}>● {label}</text>
                  {btns.map((b, j) => (
                    <g key={j}>
                      <rect x={244 + j*102} y="6" width="92" height="22" fill={colors[b]}/>
                      <text x={244 + j*102 + 46} y="21" textAnchor="middle" style={{fontSize:9.5, fill:'white'}}>{labels[b]}</text>
                    </g>
                  ))}
                </g>
              );
            })}
          </g>
        </g>
      </g>

      <Marker x={324} y={252} label="點選「工商憑證」" dx={150} dy={-30} n="1"/>
    </svg>
  );
}

// ---------- Step 2 — 工商憑證登入 ----------
function Sch2() {
  return (
    <svg viewBox="0 0 800 550" preserveAspectRatio="xMidYMid meet">
      <rect width="800" height="550" fill="white"/>
      <BrowserChrome />
      <g transform="translate(0, 20)">
        <PortalChrome />

        <g transform="translate(140, 110)">
          {/* page title */}
          <text x="0" y="0" style={{fontSize:18, fontFamily:'var(--serif)', fill:PALETTE.brown, fontWeight:700}}>工商憑證登入</text>

          {/* form panel */}
          <rect x="0" y="20" width="520" height="120" fill={PALETTE.cream} stroke={PALETTE.rule}/>

          {/* statute # field */}
          <text x="20" y="48" style={{fontSize:11, fill:PALETTE.red}}>*</text>
          <rect x="32" y="38" width="22" height="22" fill={PALETTE.beige}/>
          <circle cx="43" cy="46" r="3.5" fill="none" stroke={PALETTE.brown} strokeWidth="0.8"/>
          <path d="M 38 56 Q 43 51 48 56" fill="none" stroke={PALETTE.brown} strokeWidth="0.8"/>
          <rect x="62" y="38" width="436" height="22" fill="white" stroke={PALETTE.rule}/>
          <text x="74" y="53" style={{fontSize:10, fill:PALETTE.inkMute}}>請輸入營利事業統一編號</text>

          {/* PIN field */}
          <text x="20" y="84" style={{fontSize:11, fill:PALETTE.red}}>*</text>
          <rect x="32" y="74" width="22" height="22" fill={PALETTE.beige}/>
          <rect x="38" y="80" width="10" height="10" fill="none" stroke={PALETTE.brown} strokeWidth="0.8"/>
          <path d="M 40 80 V 76 a 3 3 0 0 1 6 0 V 80" fill="none" stroke={PALETTE.brown} strokeWidth="0.8"/>
          <rect x="62" y="74" width="436" height="22" fill="white" stroke={PALETTE.rule}/>
          <text x="74" y="89" style={{fontSize:10, fill:PALETTE.inkMute}}>請輸入PIN碼</text>

          {/* captcha row */}
          <rect x="0" y="156" width="520" height="60" fill={PALETTE.cream} stroke={PALETTE.rule}/>
          <text x="20" y="190" style={{fontSize:11, fill:PALETTE.red}}>*</text>
          <rect x="32" y="180" width="22" height="22" fill={PALETTE.beige}/>
          <path d="M 43 184 L 48 188 L 48 196 L 43 200 L 38 196 L 38 188 Z" fill="none" stroke={PALETTE.brown} strokeWidth="0.8"/>
          <rect x="62" y="180" width="240" height="22" fill="white" stroke={PALETTE.rule}/>
          <text x="74" y="195" style={{fontSize:9.5, fill:PALETTE.inkMute}}>請輸入驗證碼（不分大小寫）</text>
          {/* captcha image */}
          <rect x="310" y="180" width="78" height="22" fill="#F0E6D0" stroke={PALETTE.rule}/>
          <text x="349" y="196" textAnchor="middle" style={{fontSize:13, fontFamily:'var(--serif)', fontStyle:'italic', fill:PALETTE.ink, fontWeight:600, letterSpacing:'0.05em'}}>I j s p Mt</text>
          <circle cx="402" cy="191" r="9" fill="none" stroke={PALETTE.brown} strokeWidth="0.8"/>
          <path d="M 397 188 a 5 5 0 1 1 -1 5" fill="none" stroke={PALETTE.brown} strokeWidth="0.8"/>
          <circle cx="424" cy="191" r="9" fill="none" stroke={PALETTE.brown} strokeWidth="0.8"/>
          <path d="M 419 191 L 423 188 L 423 194 Z" fill={PALETTE.brown}/>

          {/* Login button — full-width beige */}
          <rect x="0" y="232" width="520" height="42" fill={PALETTE.beige}/>
          <text x="260" y="258" textAnchor="middle" style={{fontSize:13, fill:PALETTE.brown, fontWeight:700, letterSpacing:'0.3em'}}>登入</text>
        </g>
      </g>

      <Marker x={232} y={194} label="輸入統編 / PIN" dx={-150} dy={-26} n="1"/>
      <Marker x={400} y={400} label="輸入驗證碼後登入" dx={130} dy={20} n="2"/>
    </svg>
  );
}

// ---------- Step 3 — 告知事項 modal ----------
function Sch3() {
  return (
    <svg viewBox="0 0 800 550" preserveAspectRatio="xMidYMid meet">
      <rect width="800" height="550" fill="white"/>
      <BrowserChrome />
      <g transform="translate(0, 20)">
        <PortalChrome />
        <rect x="0" y="94" width="800" height="436" fill={PALETTE.beigeLite}/>
      </g>

      {/* Modal */}
      <g transform="translate(110, 90)" filter="url(#shadow3)">
        <defs>
          <filter id="shadow3" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="6" floodOpacity="0.15"/>
          </filter>
        </defs>
        <rect width="580" height="420" fill="white" stroke={PALETTE.rule}/>

        {/* Title */}
        <text x="290" y="44" textAnchor="middle" style={{fontSize:18, fontFamily:'var(--serif)', fill:PALETTE.ink, fontWeight:700}}>告知事項</text>

        {/* Body lines */}
        <text x="32" y="80" style={{fontSize:9.5, fill:PALETTE.ink}}>依據「個人資料保護法」第八條第一項規定，於您填寫本局/本處各類信箱前，向您告知下列事項，請詳閱：</text>
        <text x="32" y="100" style={{fontSize:9.5, fill:PALETTE.ink}}>一、 蒐集之目的：稅務行政、客戶管理與服務<tspan fill={PALETTE.red}>(包含滿意度問卷調查)</tspan>、廉政行政、其他財政服務。</text>
        <text x="32" y="120" style={{fontSize:9.5, fill:PALETTE.ink}}>二、 蒐集之類別：本局/本處因提供服務需蒐集您的個人資料包含姓名、國民身分證統一編號、護照號碼、</text>
        <text x="32" y="134" style={{fontSize:9.5, fill:PALETTE.ink}}>　　 連絡方式等資訊。</text>
        <text x="32" y="156" style={{fontSize:9.5, fill:PALETTE.ink}}>三、 個人資料利用之期間、地區、對象及方式：</text>
        <text x="46" y="172" style={{fontSize:9.5, fill:PALETTE.ink}}>(一) 期間：本局/本處因提供服務所須之保存期間。</text>
        <text x="46" y="186" style={{fontSize:9.5, fill:PALETTE.ink}}>(二) 地區：中華民國境內（包含臺澎金馬地區）。</text>
        <text x="46" y="200" style={{fontSize:9.5, fill:PALETTE.ink}}>(三) 對象：本局/本處或案件權責之公務機關。</text>
        <text x="46" y="214" style={{fontSize:9.5, fill:PALETTE.ink}}>(四) 方式：以自動化機器或其他非自動化之利用方式。</text>
        <text x="32" y="234" style={{fontSize:9.5, fill:PALETTE.ink}}>四、 依據「個人資料保護法」第三條規定，您得<tspan fill={PALETTE.red}>就個人資料依法行使下列權利</tspan>：</text>
        <text x="46" y="250" style={{fontSize:9.5, fill:PALETTE.ink}}>(一) 得向本局/本處查詢、請求閱覽或請求製給複製本。</text>
        <text x="46" y="264" style={{fontSize:9.5, fill:PALETTE.ink}}>(二) 若您的個人資料有任何異動，得向本局/本處請求補充或更正，使其保持正確、最新及完整。</text>
        <text x="46" y="278" style={{fontSize:9.5, fill:PALETTE.ink}}>(三) 得向本局/本處請求停止蒐集、處理或利用及請求刪除…</text>
        <text x="32" y="300" style={{fontSize:9.5, fill:PALETTE.ink}}>五、 您可自由選擇是否提供相關個人資料，惟若您拒絕提供相關個人資料，本局/本處將無法提供相關服務。</text>
        <text x="32" y="324" style={{fontSize:9.5, fill:PALETTE.red}}>如果要查詢完整的隱私權聲明，可造訪本局/本處網站<tspan textDecoration="underline">隱私權聲明</tspan>取得相關資訊。</text>

        {/* Buttons */}
        <GhostBtn x={186} y={358} w={92} h={36} label="不接受"/>
        <g transform="translate(290, 358)">
          <rect width="92" height="36" fill={PALETTE.teal}/>
          <rect x="-3" y="-3" width="98" height="42" fill="none" stroke={PALETTE.red} strokeWidth="1.4" strokeDasharray="3 2"/>
          <text x="46" y="23" textAnchor="middle" style={{fontSize:13, fill:'white', fontWeight:600, letterSpacing:'0.2em'}}>接受</text>
        </g>
      </g>

      <Marker x={488} y={462} label="點「接受」繼續" dx={-50} dy={40} n="1"/>
    </svg>
  );
}

// ---------- Step 4 — 申辦資訊 form ----------
function Sch4() {
  return (
    <svg viewBox="0 0 800 550" preserveAspectRatio="xMidYMid meet">
      <rect width="800" height="550" fill="white"/>
      <BrowserChrome />
      <g transform="translate(0, 20)">
        <PortalChrome breadcrumb="首頁 > 線上服務 > 線上查調 > 查調申請" />
        <Sidebar activeKey="apply"/>

        {/* main content */}
        <g transform="translate(180, 110)">
          {/* page title */}
          <rect width="600" height="32" fill={PALETTE.beige}/>
          <text x="14" y="21" style={{fontSize:12, fontFamily:'var(--serif)', fill:PALETTE.brown, fontWeight:700}}>自行查調所得(事業機關團體及事務所)</text>

          {/* 申辦資訊 panel */}
          <SectionHeader x={0} y={48} w={600} label="申辦資訊"/>
          <rect x="0" y="80" width="600" height="120" fill="white" stroke={PALETTE.rule}/>

          <text x="22" y="108" style={{fontSize:9.5, fill:PALETTE.red}}>*</text>
          <text x="32" y="108" style={{fontSize:10, fill:PALETTE.ink}}>申請人(扣繳單位)統一編</text>
          <text x="32" y="120" style={{fontSize:10, fill:PALETTE.ink}}>號/身分證字號</text>
          <rect x="200" y="98" width="320" height="22" fill={PALETTE.beigeLite} stroke={PALETTE.rule}/>
          <text x="212" y="113" style={{fontSize:10, fontFamily:'var(--mono)', fill:PALETTE.ink}}>94511912</text>

          <text x="22" y="142" style={{fontSize:9.5, fill:PALETTE.red}}>*</text>
          <text x="32" y="142" style={{fontSize:10, fill:PALETTE.ink}}>申請人名稱</text>
          <rect x="200" y="132" width="320" height="22" fill={PALETTE.beigeLite} stroke={PALETTE.rule}/>
          <text x="212" y="147" style={{fontSize:10, fill:PALETTE.ink}}>讚浩國際工作室</text>

          <text x="22" y="178" style={{fontSize:9.5, fill:PALETTE.red}}>*</text>
          <text x="32" y="178" style={{fontSize:10, fill:PALETTE.ink, fontWeight:600}}>查詢年度</text>
          {/* dashed teal select */}
          <rect x="200" y="166" width="320" height="24" fill="white" stroke={PALETTE.teal} strokeWidth="1.2" strokeDasharray="3 2"/>
          <text x="212" y="183" style={{fontSize:11, fill:PALETTE.ink, fontWeight:600}}>民國114年</text>
          <path d="M 502 178 L 510 178 L 506 184 Z" fill={PALETTE.brown}/>

          {/* 聯絡資訊 panel */}
          <SectionHeader x={0} y={216} w={600} label="聯絡資訊"/>
          <rect x="0" y="248" width="600" height="220" fill="white" stroke={PALETTE.rule}/>

          {/* captcha */}
          <text x="22" y="282" style={{fontSize:9.5, fill:PALETTE.red}}>*</text>
          <text x="32" y="282" style={{fontSize:10, fill:PALETTE.ink}}>圖形驗證碼</text>
          <rect x="200" y="270" width="160" height="22" fill="white" stroke={PALETTE.rule}/>
          <text x="212" y="285" style={{fontSize:9, fill:PALETTE.inkMute}}>請輸入驗證碼 (不</text>
          <rect x="370" y="270" width="74" height="22" fill="#F0E6D0" stroke={PALETTE.rule}/>
          <text x="406" y="287" textAnchor="middle" style={{fontSize:14, fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:700, fill:'#3a4', letterSpacing:'0.04em'}}>hp Q4 kg</text>

          {/* email */}
          <text x="22" y="318" style={{fontSize:9.5, fill:PALETTE.red}}>*</text>
          <text x="32" y="318" style={{fontSize:10, fill:PALETTE.ink}}>聯絡人Email</text>
          <rect x="200" y="306" width="160" height="22" fill="white" stroke={PALETTE.rule}/>
          <text x="212" y="321" style={{fontSize:10, fontFamily:'var(--mono)', fill:PALETTE.inkMute}}>xxxx@ooo.com</text>
          <rect x="370" y="306" width="100" height="22" fill={PALETTE.beige}/>
          <text x="420" y="321" textAnchor="middle" style={{fontSize:9.5, fill:PALETTE.brown, fontWeight:600}}>寄送信件驗證碼</text>

          {/* mail code */}
          <text x="22" y="354" style={{fontSize:9.5, fill:PALETTE.red}}>*</text>
          <text x="32" y="354" style={{fontSize:10, fill:PALETTE.ink}}>信件驗證碼</text>
          <rect x="200" y="342" width="160" height="22" fill="white" stroke={PALETTE.rule}/>
          <text x="212" y="357" style={{fontSize:9, fill:PALETTE.inkMute}}>請輸入驗證碼後點選右方</text>
          <rect x="370" y="342" width="74" height="22" fill={PALETTE.beige}/>
          <text x="407" y="357" textAnchor="middle" style={{fontSize:9.5, fill:PALETTE.brown, fontWeight:600}}>按此驗證</text>

          {/* hint text */}
          <text x="22" y="392" style={{fontSize:9, fill:PALETTE.ink}}>步驟1. 請先填圖形驗證碼，再輸入您的Email位址，然後再按「<tspan fill={PALETTE.red}>寄送信件驗證碼</tspan>」</text>
          <text x="22" y="406" style={{fontSize:9, fill:PALETTE.ink}}>步驟2. 請到您指定的信箱打開本系統所寄之郵件取得信件驗證碼</text>
          <text x="22" y="420" style={{fontSize:9, fill:PALETTE.ink}}>步驟3. 回到本畫面填入信件驗證碼並按「驗證」，驗證成功後送出您的資料</text>

          {/* footer buttons */}
          <GhostBtn x={210} y={486} w={88} h={32} label="清除資料"/>
          <g transform="translate(308, 486)">
            <rect width="88" height="32" fill={PALETTE.teal}/>
            <rect x="-3" y="-3" width="94" height="38" fill="none" stroke={PALETTE.red} strokeWidth="1.4" strokeDasharray="3 2"/>
            <text x="44" y="21" textAnchor="middle" style={{fontSize:12, fill:'white', fontWeight:600, letterSpacing:'0.1em'}}>我要申辦</text>
          </g>
        </g>
      </g>

      <Marker x={702} y={290} label="選 民國114年" dx={-50} dy={-40} n="1"/>
      <Marker x={580} y={420} label="輸入 Email" dx={50} dy={-10} n="2"/>
      <Marker x={500} y={604} label="按「我要申辦」" dx={-30} dy={28} n="3"/>
    </svg>
  );
}

// ---------- Step 5 — 預覽彈窗 ----------
function Sch5() {
  return (
    <svg viewBox="0 0 800 550" preserveAspectRatio="xMidYMid meet">
      <rect width="800" height="550" fill="white"/>
      <BrowserChrome />
      <g transform="translate(0, 20)">
        <PortalChrome />
        <rect x="0" y="94" width="800" height="436" fill={PALETTE.beigeLite} opacity="0.8"/>
      </g>

      {/* Top alert banner */}
      <g transform="translate(40, 100)">
        <rect width="720" height="70" fill="white" stroke={PALETTE.rule}/>
        <text x="20" y="32" style={{fontSize:11, fill:PALETTE.ink}}>本彈跳頁為確認預覽頁，請在確認無誤後按下本頁最下方之「確認送出」鈕，否則案件將無法申辦成功</text>
        <g transform="translate(630, 26)">
          <rect width="68" height="32" fill={PALETTE.teal}/>
          <rect x="-3" y="-3" width="74" height="38" fill="none" stroke={PALETTE.red} strokeWidth="1.4" strokeDasharray="3 2"/>
          <text x="34" y="21" textAnchor="middle" style={{fontSize:12, fill:'white', fontWeight:600, letterSpacing:'0.2em'}}>確定</text>
        </g>
      </g>

      {/* Preview content card peeking from below */}
      <g transform="translate(120, 200)" opacity="0.9">
        <rect width="560" height="320" fill="white" stroke={PALETTE.rule}/>
        <SectionHeader x={0} y={0} w={560} label="申辦資訊"/>
        <g transform="translate(20, 50)">
          <text x="0" y="14" style={{fontSize:10, fill:PALETTE.ink}}>申請人(扣繳單位)統一編</text>
          <text x="0" y="26" style={{fontSize:10, fill:PALETTE.ink}}>號/身分證字號</text>
          <text x="180" y="20" style={{fontSize:11, fontFamily:'var(--mono)', fill:PALETTE.ink}}>94511912</text>
          <line x1="0" y1="48" x2="520" y2="48" stroke={PALETTE.ruleSoft} strokeDasharray="3 3"/>

          <text x="0" y="68" style={{fontSize:10, fill:PALETTE.ink}}>申請人名稱</text>
          <text x="180" y="68" style={{fontSize:11, fill:PALETTE.ink}}>讚浩國際工作室</text>
          <line x1="0" y1="84" x2="520" y2="84" stroke={PALETTE.ruleSoft} strokeDasharray="3 3"/>

          <text x="0" y="104" style={{fontSize:10, fill:PALETTE.ink}}>查詢年度</text>
          <text x="180" y="104" style={{fontSize:11, fill:PALETTE.ink}}>民國114年</text>
        </g>
        <SectionHeader x={0} y={170} w={560} label="聯絡人資訊"/>
        <g transform="translate(20, 220)">
          <text x="0" y="14" style={{fontSize:10, fill:PALETTE.ink}}>聯絡人Email</text>
          <text x="180" y="14" style={{fontSize:11, fontFamily:'var(--mono)', fill:PALETTE.ink}}>chengshucpa@gmail.com</text>
        </g>
      </g>

      <Marker x={696} y={146} label="按「確定」" dx={-30} dy={-44} n="1"/>
    </svg>
  );
}

// ---------- Step 6 — 確認送出 ----------
function Sch6() {
  return (
    <svg viewBox="0 0 800 550" preserveAspectRatio="xMidYMid meet">
      <rect width="800" height="550" fill="white"/>
      <BrowserChrome />
      <g transform="translate(0, 20)">
        <PortalChrome />
        <rect x="0" y="94" width="800" height="436" fill={PALETTE.beigeLite} opacity="0.7"/>
      </g>

      {/* Modal */}
      <g transform="translate(110, 90)" filter="url(#shadow6)">
        <defs>
          <filter id="shadow6" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="6" floodOpacity="0.15"/>
          </filter>
        </defs>
        <rect width="580" height="430" fill="white" stroke={PALETTE.rule}/>

        {/* close × */}
        <text x="556" y="28" textAnchor="end" style={{fontSize:14, fill:PALETTE.inkMute}}>×</text>

        {/* 申辦資訊 */}
        <SectionHeader x={20} y={26} w={540} label="申辦資訊"/>
        <rect x="20" y="58" width="540" height="120" fill="white" stroke={PALETTE.ruleSoft}/>
        <g transform="translate(40, 78)">
          <text x="0" y="14" style={{fontSize:10, fill:PALETTE.ink}}>申請人(扣繳單位)統一編</text>
          <text x="0" y="26" style={{fontSize:10, fill:PALETTE.ink}}>號/身分證字號</text>
          <text x="180" y="20" style={{fontSize:11, fontFamily:'var(--mono)', fill:PALETTE.ink}}>94511912</text>
          <line x1="0" y1="44" x2="500" y2="44" stroke={PALETTE.ruleSoft} strokeDasharray="3 3"/>

          <text x="0" y="64" style={{fontSize:10, fill:PALETTE.ink}}>申請人名稱</text>
          <text x="180" y="64" style={{fontSize:11, fill:PALETTE.ink}}>讚浩國際工作室</text>
          <line x1="0" y1="80" x2="500" y2="80" stroke={PALETTE.ruleSoft} strokeDasharray="3 3"/>

          <text x="0" y="100" style={{fontSize:10, fill:PALETTE.ink}}>查詢年度</text>
          <text x="180" y="100" style={{fontSize:11, fill:PALETTE.ink}}>民國114年</text>
        </g>

        {/* 聯絡人資訊 */}
        <SectionHeader x={20} y={208} w={540} label="聯絡人資訊"/>
        <rect x="20" y="240" width="540" height="64" fill="white" stroke={PALETTE.ruleSoft}/>
        <text x="60" y="276" style={{fontSize:10, fill:PALETTE.ink}}>聯絡人Email</text>
        <text x="220" y="276" style={{fontSize:11, fontFamily:'var(--mono)', fill:PALETTE.ink}}>chengshucpa@gmail.com</text>

        {/* Buttons */}
        <GhostBtn x={186} y={342} w={88} h={36} label="返回"/>
        <g transform="translate(298, 342)">
          <rect width="108" height="36" fill={PALETTE.teal}/>
          <rect x="-3" y="-3" width="114" height="42" fill="none" stroke={PALETTE.red} strokeWidth="1.4" strokeDasharray="3 2"/>
          <text x="54" y="23" textAnchor="middle" style={{fontSize:13, fill:'white', fontWeight:600, letterSpacing:'0.15em'}}>確認送出</text>
        </g>
      </g>

      <Marker x={518} y={442} label="按「確認送出」" dx={50} dy={20} n="1"/>
    </svg>
  );
}

// ---------- Step 7 — 查調通知 ----------
function Sch7() {
  return (
    <svg viewBox="0 0 800 550" preserveAspectRatio="xMidYMid meet">
      <rect width="800" height="550" fill="white"/>
      <BrowserChrome />
      <g transform="translate(0, 20)">
        <PortalChrome breadcrumb="首頁 > 線上服務 > 線上查調 > 查調申請"/>
        <Sidebar activeKey="apply"/>

        {/* main content */}
        <g transform="translate(180, 110)">
          <SectionHeader x={0} y={0} w={600} label="查調通知"/>
          <rect x="0" y="32" width="600" height="270" fill="white" stroke={PALETTE.rule}/>

          <g transform="translate(28, 60)">
            <text x="0" y="0" style={{fontSize:11, fill:PALETTE.brown}}>台端 <tspan fill={PALETTE.brown} fontWeight="600">讚浩國際工作室</tspan> 君申請查調 <tspan fill={PALETTE.brown} fontWeight="600">自行查調所得(事業機關團體及事務所)</tspan></text>

            <text x="0" y="36" style={{fontSize:11, fill:PALETTE.ink}}>取件案號：<tspan fill={PALETTE.red} fontFamily="var(--mono)" fontWeight="600">1150428_025610_OLSIMCA005</tspan></text>
            <text x="0" y="56" style={{fontSize:11, fill:PALETTE.ink}}>收件時間：<tspan fontFamily="var(--mono)">115-04-28 09:17:20</tspan></text>

            <text x="0" y="92" style={{fontSize:11, fill:PALETTE.ink}}>您將可於<tspan fontWeight="600">1小時後進行結果調閱</tspan></text>
            <text x="0" y="108" style={{fontSize:11, fill:PALETTE.ink}}>請靜候系統進行資料交換作業</text>
            <text x="0" y="124" style={{fontSize:11, fill:PALETTE.ink}}>當查詢結果完成後，我們將主動email通知您</text>

            <text x="0" y="160" style={{fontSize:10, fill:PALETTE.ink}}>若您對取件案號：<tspan fill={PALETTE.red} fontFamily="var(--mono)">1150428_025610_OLSIMCA005</tspan> 有任何疑義，</text>
            <text x="0" y="176" style={{fontSize:10, fill:PALETTE.ink}}>歡迎電洽服務窗口：財政部稅務入口網 <tspan fontWeight="600">0800-080-369</tspan></text>
          </g>

          <g transform="translate(238, 322)">
            <rect width="124" height="36" fill={PALETTE.teal}/>
            <text x="62" y="23" textAnchor="middle" style={{fontSize:12, fill:'white', fontWeight:600, letterSpacing:'0.15em'}}>返回清單</text>
          </g>
        </g>
      </g>

      <Marker x={392} y={186} label="記下案件編號" dx={140} dy={-30} n="1"/>
    </svg>
  );
}

// ---------- Step 8 — 結果調閱 list ----------
function Sch8() {
  return (
    <svg viewBox="0 0 800 550" preserveAspectRatio="xMidYMid meet">
      <rect width="800" height="550" fill="white"/>
      <BrowserChrome />
      <g transform="translate(0, 20)">
        <PortalChrome breadcrumb="首頁 > 線上服務 > 線上查調 > 結果調閱"/>
        <Sidebar activeKey="result"/>

        {/* main content */}
        <g transform="translate(180, 110)">
          <SectionHeader x={0} y={0} w={600} label="查調結果"/>
          <rect x="0" y="32" width="600" height="200" fill="white" stroke={PALETTE.rule}/>

          {/* table head */}
          <g transform="translate(0, 48)">
            <rect x="0" y="0" width="600" height="28" fill={PALETTE.beigeLite}/>
            {[
              ["申請案號", 100],
              ["查詢項目名稱", 250],
              ["查詢申請時間", 400],
              ["結果回傳時間", 510],
            ].map(([h,x],i) => (
              <text key={i} x={x} y="18" textAnchor="middle" style={{fontSize:10, fill:PALETTE.brown, fontWeight:600}}>{h}</text>
            ))}
          </g>

          {/* row 1 — 尚無結果 (latest) */}
          <g transform="translate(0, 80)">
            <rect width="600" height="44" fill="white" stroke={PALETTE.ruleSoft}/>
            <text x="100" y="27" textAnchor="middle" style={{fontSize:10, fontFamily:'var(--mono)', fill:PALETTE.ink}}>1150428_025610_OLSIMCA005</text>
            <text x="250" y="27" textAnchor="middle" style={{fontSize:10, fill:PALETTE.ink}}>自行查調所得(事業機關團體及事務所)</text>
            <text x="400" y="27" textAnchor="middle" style={{fontSize:10, fontFamily:'var(--mono)', fill:PALETTE.ink}}>115-04-28 09:17:20</text>
            <text x="510" y="27" textAnchor="middle" style={{fontSize:10, fill:PALETTE.gray}}>尚無結果</text>
          </g>

          {/* row 2 — completed */}
          <g transform="translate(0, 124)">
            <rect width="600" height="44" fill="white" stroke={PALETTE.ruleSoft}/>
            <text x="100" y="27" textAnchor="middle" style={{fontSize:10, fontFamily:'var(--mono)', fill:PALETTE.teal, fontWeight:600, textDecoration:'underline'}}>1150428_024998_OLSIMCA005</text>
            <text x="250" y="27" textAnchor="middle" style={{fontSize:10, fill:PALETTE.ink}}>自行查調所得(事業機關團體及事務所)</text>
            <text x="400" y="27" textAnchor="middle" style={{fontSize:10, fontFamily:'var(--mono)', fill:PALETTE.ink}}>115-04-28 09:13:23</text>
            <text x="510" y="27" textAnchor="middle" style={{fontSize:10, fontFamily:'var(--mono)', fill:PALETTE.ink}}>115-04-28 10:00:10</text>
          </g>
        </g>
      </g>

      <Marker x={86} y={222} label="點選「結果調閱」" dx={120} dy={-30} n="1"/>
      <Marker x={280} y={258} label="點案號進入明細" dx={150} dy={-26} n="2"/>
    </svg>
  );
}

// ---------- Step 9 — 案件明細 + 下載 + 密碼 ----------
function Sch9() {
  return (
    <svg viewBox="0 0 800 550" preserveAspectRatio="xMidYMid meet">
      <rect width="800" height="550" fill="white"/>
      <BrowserChrome />
      <g transform="translate(0, 20)">
        <PortalChrome breadcrumb="首頁 > 線上服務 > 線上查調 > 結果調閱"/>

        <g transform="translate(60, 110)">
          <SectionHeader x={0} y={0} w={680} label="案件明細資料"/>
          <rect x="0" y="32" width="680" height="380" fill="white" stroke={PALETTE.rule}/>

          {/* description */}
          <text x="20" y="60" style={{fontSize:10, fill:PALETTE.brown, fontWeight:600}}>讚浩國際工作室 您於 115-04-28 09:13:23 申請查調 自行查調所得(事業機關團體及事務所) (查調案號：</text>
          <text x="20" y="74" style={{fontSize:10, fontFamily:'var(--mono)', fill:PALETTE.brown, fontWeight:600}}>1150428_024998_OLSIMCA005)</text>
          <text x="20" y="98" style={{fontSize:10, fill:PALETTE.ink}}>完成日期：<tspan fontFamily="var(--mono)">115-04-28 10:00:10</tspan></text>

          {/* table */}
          <g transform="translate(20, 116)">
            {/* header */}
            <text x="180" y="14" style={{fontSize:10, fill:PALETTE.brown, fontWeight:600}}>項目名稱</text>
            <text x="380" y="14" style={{fontSize:10, fill:PALETTE.brown, fontWeight:600}}>狀態</text>
            <text x="460" y="14" style={{fontSize:10, fill:PALETTE.brown, fontWeight:600}}>結案時間</text>
            <line x1="0" y1="22" x2="640" y2="22" stroke={PALETTE.rule}/>

            {/* row */}
            <text x="0" y="46" style={{fontSize:10, fill:PALETTE.ink}}>自行查調所得(事業機關團體及事務所)</text>
            <text x="180" y="46" style={{fontSize:10, fill:PALETTE.brown}}></text>
            <text x="380" y="46" style={{fontSize:10, fill:PALETTE.ink, fontWeight:600}}>已結案</text>
            <text x="460" y="46" style={{fontSize:10, fontFamily:'var(--mono)', fill:PALETTE.ink}}>115-04-28 10:00:10</text>
            {/* action buttons */}
            <g transform="translate(540, 30)">
              <rect width="32" height="22" fill="white" stroke={PALETTE.rule}/>
              <text x="16" y="15" textAnchor="middle" style={{fontSize:9.5, fill:PALETTE.ink}}>檢視</text>
            </g>
            <g transform="translate(578, 30)">
              <rect width="44" height="22" fill="white" stroke={PALETTE.teal}/>
              <text x="22" y="15" textAnchor="middle" style={{fontSize:9.5, fill:PALETTE.teal, fontWeight:600}}>下載</text>
              {/* folder icon */}
              <rect x="32" y="6" width="8" height="6" fill={PALETTE.brown} opacity="0.7"/>
              <rect x="3" y="-3" width="44" height="28" fill="none" stroke={PALETTE.red} strokeWidth="1.4" strokeDasharray="3 2"/>
            </g>
            <g transform="translate(628, 30)">
              <rect width="32" height="22" fill="white" stroke={PALETTE.rule}/>
              <text x="16" y="15" textAnchor="middle" style={{fontSize:9.5, fill:PALETTE.ink}}>刪除</text>
            </g>
            <line x1="0" y1="62" x2="640" y2="62" stroke={PALETTE.ruleSoft}/>
          </g>

          {/* password block */}
          <g transform="translate(20, 200)">
            <text x="0" y="0" style={{fontSize:10, fill:PALETTE.ink}}>*「所得資料下載查詢結果」(註：左邊為一個按鈕，按了就可以把檔案下載下來)，所得資料下載查詢結果檔案密碼：</text>
            <g transform="translate(0, 12)">
              <text x="0" y="14" style={{fontSize:13, fontFamily:'var(--mono)', fill:PALETTE.red, fontWeight:700, letterSpacing:'0.18em'}}>uA9XFQMsiJ</text>
              <rect x="-4" y="-2" width="118" height="22" fill="none" stroke={PALETTE.red} strokeWidth="1.2" strokeDasharray="3 2"/>
              <text x="120" y="14" style={{fontSize:10, fill:PALETTE.ink}}>(註：密碼為亂數產生的10位英數字)</text>
            </g>
          </g>

          {/* notes block */}
          <g transform="translate(20, 270)">
            <rect x="0" y="0" width="3" height="14" fill={PALETTE.brown}/>
            <text x="10" y="12" style={{fontSize:11, fontFamily:'var(--serif)', fill:PALETTE.brown, fontWeight:700}}>注意事項：</text>
            <text x="20" y="36" style={{fontSize:10, fill:PALETTE.ink}}>1. 資料查調日期為 115-04-28。</text>
            <text x="20" y="56" style={{fontSize:10, fill:PALETTE.ink}}>2. 本筆資料將可保留<tspan fill={PALETTE.red}>一個月至 115-05-28</tspan>。<tspan fill={PALETTE.red}>請注意！刪除資料後，本查詢結果將無法再進行查詢的作業。</tspan></text>
            <text x="20" y="76" style={{fontSize:10, fill:PALETTE.ink}}>3. 本查詢結果僅供報稅參考，同時提供 CSV 檔作為 PDF 檔的輔助資料，方便進行資料比對及運用。</text>
          </g>
        </g>
      </g>

      <Marker x={648} y={262} label="按「下載」" dx={30} dy={-40} n="1"/>
      <Marker x={120} y={344} label="抄下這組密碼" dx={-30} dy={-42} n="2"/>
    </svg>
  );
}

const SCHEMATICS = { Sch0, Sch1, Sch2, Sch3, Sch4, Sch5, Sch6, Sch7, Sch8, Sch9 };
window.SCHEMATICS = SCHEMATICS;
